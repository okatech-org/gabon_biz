import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: { width: 32, height: 32, fontSize: '1rem' },
  md: { width: 48, height: 48, fontSize: '1.5rem' },
  lg: { width: 64, height: 64, fontSize: '2rem' },
};

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const s = sizeMap[size];
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      <div
        style={{
          width: s.width,
          height: s.height,
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #E67E22, #D35400)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: s.fontSize,
        }}
      >
        GB
      </div>
      <span
        style={{
          fontWeight: 700,
          fontSize: s.fontSize,
          color: '#2C3E50',
        }}
      >
        GABON <span style={{ color: '#E67E22' }}>BIZ</span>
      </span>
    </div>
  );
}
