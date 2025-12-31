import { siteConfig } from '../../content';
import Link from 'next/link';
import PdfViewer from "../../components/PdfViewer";

export default function ResumePage() {
  return (
    <section className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Resume</h1>
      <div className="flex justify-center mb-8">
        <Link
          href={siteConfig.about.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 border border-gray-600 rounded-lg hover:border-blue-400 hover:text-blue-400 transition text-lg font-medium"
        >
          Download PDF Ashish
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </Link>
      </div>
      <PdfViewer pdfUrl={siteConfig.about.resumeUrl} />
    </section>
  );
} 