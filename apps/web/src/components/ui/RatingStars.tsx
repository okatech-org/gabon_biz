'use client';

import React from 'react';

interface RatingStarsProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  count?: number;
}

export default function RatingStars({ rating, size = 16, showValue = true, count }: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: fullStars }).map((_, i) => (
          <svg key={`full-${i}`} width={size} height={size} viewBox="0 0 20 20" fill="#F59E0B">
            <path d="M10 1.5l2.4 5.1 5.6.8-4 3.9 1 5.5L10 14l-5 2.8 1-5.5-4-3.9 5.6-.8z" />
          </svg>
        ))}
        {hasHalf && (
          <svg key="half" width={size} height={size} viewBox="0 0 20 20">
            <defs><clipPath id="half-clip"><rect x="0" y="0" width="10" height="20" /></clipPath></defs>
            <path d="M10 1.5l2.4 5.1 5.6.8-4 3.9 1 5.5L10 14l-5 2.8 1-5.5-4-3.9 5.6-.8z" fill="#E5E7EB" />
            <path d="M10 1.5l2.4 5.1 5.6.8-4 3.9 1 5.5L10 14l-5 2.8 1-5.5-4-3.9 5.6-.8z" fill="#F59E0B" clipPath="url(#half-clip)" />
          </svg>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <svg key={`empty-${i}`} width={size} height={size} viewBox="0 0 20 20" fill="#E5E7EB">
            <path d="M10 1.5l2.4 5.1 5.6.8-4 3.9 1 5.5L10 14l-5 2.8 1-5.5-4-3.9 5.6-.8z" />
          </svg>
        ))}
      </div>
      {showValue && (
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{rating.toFixed(1)}</span>
      )}
      {count !== undefined && (
        <span className="text-xs text-gray-400 dark:text-gray-500">({count})</span>
      )}
    </div>
  );
}
