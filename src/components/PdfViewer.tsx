"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import Loader from "./Loader";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  pdfUrl: string;
}

interface CacheEntry {
  blob: Blob;
  timestamp: number;
  size: number;
}

// Memory-safe cache with size limits and TTL
class PdfCache {
  private cache = new Map<string, CacheEntry>();
  private readonly MAX_CACHE_SIZE = 20 * 1024 * 1024; // 20MB total
  private readonly MAX_ENTRIES = 1; // Max 1 PDFs in memory
  private readonly TTL = 30 * 60 * 1000; // 30 minutes

  set(key: string, blob: Blob): void {
    // Clean expired entries first
    this.cleanExpired();
    
    // If adding this would exceed limits, clear oldest entries
    while (this.cache.size >= this.MAX_ENTRIES) {
      this.removeOldest();
    }
    
    // Check total size limit
    const newSize = blob.size;
    let totalSize = this.getTotalSize();
    
    while (totalSize + newSize > this.MAX_CACHE_SIZE && this.cache.size > 0) {
      this.removeOldest();
      totalSize = this.getTotalSize();
    }
    
    this.cache.set(key, {
      blob,
      timestamp: Date.now(),
      size: newSize
    });
  }

  get(key: string): Blob | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;
    
    // Check if expired
    if (Date.now() - entry.timestamp > this.TTL) {
      this.cache.delete(key);
      return undefined;
    }
    
    return entry.blob;
  }

  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  private cleanExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.TTL) {
        this.cache.delete(key);
      }
    }
  }

  private removeOldest(): void {
    let oldestKey = '';
    let oldestTime = Date.now();
    
    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldestKey = key;
      }
    }
    
    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  private getTotalSize(): number {
    return Array.from(this.cache.values()).reduce((total, entry) => total + entry.size, 0);
  }

  clear(): void {
    this.cache.clear();
  }
}

// Single instance for the entire app
const pdfCache = new PdfCache();

// Cache key generator
const getCacheKey = (url: string) => `pdf_${url.split('/').pop() || 'unknown'}`;

export default function PdfViewer({ pdfUrl }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pdfData, setPdfData] = useState<string | Blob | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState<'checking-cache' | 'downloading' | 'ready'>('checking-cache');
  const abortControllerRef = useRef<AbortController | null>(null);
  const cacheKey = getCacheKey(pdfUrl);

  // Memory-safe PDF loading with proper cleanup
  const loadPdf = useCallback(async () => {
    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    try {
      setIsLoading(true);
      setLoadingStatus('checking-cache');

      // Check in-memory cache first
      if (pdfCache.has(cacheKey)) {
        const cachedBlob = pdfCache.get(cacheKey);
        if (cachedBlob && !signal.aborted) {
          setPdfData(cachedBlob);
          setLoadingStatus('ready');
          setIsLoading(false);
        }
        return;
      }

      // Fetch from network with abort signal
      setLoadingStatus('downloading');
      
      const response = await fetch(pdfUrl, {
        cache: 'force-cache',
        signal, // Allow cancellation
      });
      
      if (signal.aborted) return;
      
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.status}`);
      }

      const blob = await response.blob();
      
      if (signal.aborted) return;
      
      // Validate PDF blob
      if (blob.size === 0) {
        throw new Error('Received empty PDF file');
      }
      
      // Only cache if blob is reasonable size (< 10MB)
      if (blob.size < 10 * 1024 * 1024) {
        pdfCache.set(cacheKey, blob);
      } else {
        console.warn(`📄 PDF too large to cache (${(blob.size / 1024 / 1024).toFixed(1)}MB)`);
      }

      setPdfData(blob);
      setLoadingStatus('ready');
      setIsLoading(false);

    } catch (error) {
      if (signal.aborted) return;
      
      console.error('Error loading PDF:', error);
      setIsLoading(false);
      // Fallback to direct URL if caching fails
      setPdfData(pdfUrl);
      setLoadingStatus('ready');
    }
  }, [pdfUrl, cacheKey]);

  useEffect(() => {
    loadPdf();
    
    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadPdf]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  function onDocumentLoadProgress() {
    const statusMessages = {
      'checking-cache': 'Checking cache...',
      'downloading': 'Downloading resume...',
      'ready': 'Loading resume...'
    };

    return (
      <div className="flex flex-col items-center w-full space-y-4">
        <div className="text-gray-400 text-sm">
          {statusMessages[loadingStatus]}
        </div>
        <Loader />
      </div>
    );
  }

  if (isLoading || !pdfData) {
    return (
      <div className="flex flex-col items-center w-full py-12">
        {onDocumentLoadProgress()}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full md:overflow-visible overflow-x-auto px-0">
      <div className="min-w-0 w-full">
        <Document
          file={pdfData}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={onDocumentLoadProgress}
          className="w-full flex justify-center"
        >
          {Array.from(new Array(numPages), (el, index) => (
            <div key={`page_${index + 1}`} className="w-full flex justify-center mb-4">
              <Page
                pageNumber={index + 1}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                scale={1.5} // Adjust scale as needed for optimal viewing
                className="shadow-lg"
              />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
} 