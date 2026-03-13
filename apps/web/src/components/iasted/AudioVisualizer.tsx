'use client';

import React from 'react';

interface AudioVisualizerProps {
  /** Audio level 0–1 */
  level: number;
  /** Number of bars */
  bars?: number;
  /** Bar color */
  color?: string;
  /** Container size class */
  className?: string;
}

/**
 * Animated vertical bars that oscillate based on audio level.
 * Used in the VoiceMicButton during 'speaking' state.
 */
export function AudioVisualizer({
  level,
  bars = 5,
  color = '#10b981',
  className = '',
}: AudioVisualizerProps) {
  return (
    <div className={`flex items-center justify-center gap-[2px] ${className}`}>
      {Array.from({ length: bars }).map((_, i) => {
        // Create a wave-like pattern with offset per bar
        const offset = Math.sin((Date.now() / 200) + i * 1.2) * 0.3 + 0.4;
        const height = Math.max(0.15, level * offset + 0.1);

        return (
          <div
            key={i}
            className="rounded-full transition-all duration-100"
            style={{
              width: 3,
              height: `${Math.round(height * 20)}px`,
              minHeight: 3,
              maxHeight: 20,
              backgroundColor: color,
              opacity: 0.7 + level * 0.3,
            }}
          />
        );
      })}
    </div>
  );
}

/**
 * CSS-only animated audio bars (used when we don't have a real audio level).
 * Pure CSS animation for the speaking state.
 */
export function AudioBarsAnimated({
  color = '#10b981',
  className = '',
}: {
  color?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-center gap-[2px] ${className}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="rounded-full"
          style={{
            width: 2.5,
            backgroundColor: color,
            animation: `iasted-bar ${0.6 + i * 0.15}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes iasted-bar {
          0% { height: 4px; opacity: 0.5; }
          100% { height: 16px; opacity: 1; }
        }
      `}</style>
    </div>
  );
}
