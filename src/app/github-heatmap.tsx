"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const SUITS = [
  { name: 'spade', path: '/spade.png' },
  { name: 'heart', path: '/heart.png' },
  { name: 'club', path: '/club.png' },
  { name: 'diamond', path: '/diamond.png' },
];

const GRID_SIZE = 10; // Number of rows/columns for the grid of aces

export default function GlassmorphicPanel({ children, boxWidth }: { children: React.ReactNode; boxWidth: number; }) {
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);
  const [suitPositions, setSuitPositions] = useState<Array<{ row: number; col: number; suit: typeof SUITS[0] }>>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  // Generate random positions for suits when component mounts
  useEffect(() => {
    const positions: Array<{ row: number; col: number; suit: typeof SUITS[0] }> = [];
    const totalCells = GRID_SIZE * GRID_SIZE;
    const suitsPerType = Math.floor(totalCells / SUITS.length);

    // Create array of all possible positions
    const allPositions = Array.from({ length: totalCells }, (_, i) => ({
      row: Math.floor(i / GRID_SIZE),
      col: i % GRID_SIZE
    }));

    // Shuffle the positions
    for (let i = allPositions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allPositions[i], allPositions[j]] = [allPositions[j], allPositions[i]];
    }

    // Distribute suits evenly
    SUITS.forEach((suit, suitIndex) => {
      for (let i = 0; i < suitsPerType; i++) {
        const position = allPositions[suitIndex * suitsPerType + i];
        positions.push({
          row: position.row,
          col: position.col,
          suit
        });
      }
    });

    setSuitPositions(positions);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!panelRef.current) return;

    const rect = panelRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Calculate which grid cell the mouse is over
    const cellWidth = rect.width / GRID_SIZE;
    const cellHeight = rect.height / GRID_SIZE;

    const col = Math.floor(x / cellWidth);
    const row = Math.floor(y / cellHeight);

    // Check for valid cell indices to prevent out-of-bounds errors
    if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
      // Update hoveredCell state only if it's a new cell
      if (!hoveredCell || (hoveredCell.row !== row || hoveredCell.col !== col)) {
        setHoveredCell({ row, col });
      }
    } else {
      // Mouse is outside any defined cell, clear hovered state
      if (hoveredCell) {
        setHoveredCell(null);
      }
    }
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
  };

  const calculateSuitPosition = (row: number, col: number) => {
    const panelHeight = panelRef.current?.clientHeight || 800;
    const cellWidth = boxWidth / GRID_SIZE;
    const cellHeight = panelHeight / GRID_SIZE;

    return {
      left: `${col * cellWidth}px`,
      top: `${row * cellHeight}px`,
      width: `${cellWidth}px`,
      height: `${cellHeight}px`,
    };
  };

  const renderSuits = () => {
    return suitPositions.map(({ row, col, suit }) => {
      const isHovered = hoveredCell && hoveredCell.row === row && hoveredCell.col === col;
      const position = calculateSuitPosition(row, col);

      return (
        <div
          key={`${row}-${col}-${suit.name}`}
          className="absolute transition-all duration-600 pointer-events-none"
          style={{
            opacity: isHovered ? 0.2 : 0.02,
            zIndex: 1,
            ...position,
            transform: `scale(${isHovered ? 1.02 : 1}) rotate(${isHovered ? '2deg' : '0deg'})`,
          }}
        >
          <Image
            src={suit.path}
            alt={suit.name}
            fill
            className="object-cover"
            sizes={`${position.width}px`}
          />
        </div>
      );
    });
  };

  return (
    <div
      ref={panelRef}
      className="border border-[#2a3340] bg-gradient-to-br from-[#181c23] via-[#23233a] to-[#181c23] bg-opacity-90 shadow-xl flex flex-col relative overflow-hidden h-full"
      style={{ width: boxWidth, minWidth: 320, maxWidth: '100%', margin: '0 auto' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Subtle colorful hue overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-br from-cyan-400/5 via-pink-400/5 to-teal-300/5" />
      {/* Interactive background layer with Suits */}
      <div className="absolute inset-0 h-full pointer-events-none" style={{ zIndex: 1 }}>
        {renderSuits()}
      </div>

      {/* Main content with higher z-index */}
      <div className="relative z-10 flex flex-col flex-1">
        {children}
      </div>
    </div>
  );
} 