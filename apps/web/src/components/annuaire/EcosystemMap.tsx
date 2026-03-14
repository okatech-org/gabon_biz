'use client';

import { motion } from 'framer-motion';
import { DIGITAL_ECOSYSTEM_STATS } from '@/lib/annuaire-data';
import { useState } from 'react';
import { useI18n } from '@/lib/i18n/i18nContext';

// Simplified SVG coordinates for Gabon provinces (approximate center points)
const PROVINCE_COORDS: Record<string, { x: number; y: number }> = {
  'Estuaire':        { x: 140, y: 180 },
  'Haut-Ogooué':     { x: 330, y: 300 },
  'Moyen-Ogooué':    { x: 180, y: 250 },
  'Ngounié':         { x: 220, y: 320 },
  'Nyanga':          { x: 180, y: 400 },
  'Ogooué-Ivindo':   { x: 300, y: 160 },
  'Ogooué-Lolo':     { x: 300, y: 250 },
  'Ogooué-Maritime': { x: 100, y: 280 },
  'Woleu-Ntem':      { x: 250, y: 80 },
};

export default function EcosystemMap() {
  const { tr } = useI18n();
  const [hovered, setHovered] = useState<string | null>(null);
  const provinces = DIGITAL_ECOSYSTEM_STATS.provinces;

  return (
    <div className="relative bg-gray-100 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 overflow-hidden">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">
        {tr('ann.geo_title')}
      </h3>

      <div className="relative mx-auto" style={{ maxWidth: 440, aspectRatio: '1 / 1.1' }}>
        <svg viewBox="0 0 440 480" className="w-full h-full">
          {/* Background shape (simplified Gabon outline) */}
          <path
            d="M120,30 C160,20 220,15 280,30 C340,50 360,80 370,130 C380,180 370,220 360,260 C350,300 340,340 320,380 C300,420 260,440 220,450 C180,440 140,420 120,380 C100,340 80,300 70,260 C60,220 65,180 80,130 C95,80 100,50 120,30 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-gray-300 dark:text-gray-700"
          />
          {/* Province background fill */}
          <path
            d="M120,30 C160,20 220,15 280,30 C340,50 360,80 370,130 C380,180 370,220 360,260 C350,300 340,340 320,380 C300,420 260,440 220,450 C180,440 140,420 120,380 C100,340 80,300 70,260 C60,220 65,180 80,130 C95,80 100,50 120,30 Z"
            fill="currentColor"
            className="text-emerald-50 dark:text-emerald-950/30"
          />

          {/* Province dots */}
          {Object.entries(PROVINCE_COORDS).map(([name, coords]) => {
            const provData = provinces.find((p) => p.name === name);
            const count = provData?.count || 0;
            const hasStartups = count > 0;
            const radius = hasStartups ? Math.max(8, Math.min(count * 4, 24)) : 4;

            return (
              <g
                key={name}
                onMouseEnter={() => setHovered(name)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer"
              >
                <motion.circle
                  cx={coords.x}
                  cy={coords.y}
                  r={radius}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  fill={hasStartups ? '#10b981' : '#9ca3af'}
                  opacity={hasStartups ? 0.8 : 0.3}
                  className="transition-all duration-200"
                  style={{ transformOrigin: `${coords.x}px ${coords.y}px` }}
                />
                {hasStartups && (
                  <text
                    x={coords.x}
                    y={coords.y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[10px] font-bold fill-white pointer-events-none"
                  >
                    {count}
                  </text>
                )}
                {/* Label */}
                <text
                  x={coords.x}
                  y={coords.y + radius + 14}
                  textAnchor="middle"
                  className={`text-[9px] font-medium pointer-events-none transition-all duration-200
                    ${hovered === name ? 'fill-emerald-600 dark:fill-emerald-400' : hasStartups ? 'fill-gray-600 dark:fill-gray-400' : 'fill-gray-400 dark:fill-gray-600'}`}
                >
                  {name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {hovered && (
          <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700 text-sm z-10">
            <div className="font-semibold text-gray-900 dark:text-white">{hovered}</div>
            <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              {provinces.find((p) => p.name === hovered)?.count || 0} startup{(provinces.find((p) => p.name === hovered)?.count || 0) > 1 ? 's' : ''} {tr('ann.tech')}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          {tr('ann.geo_present')}
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600" />
          {tr('ann.geo_none')}
        </div>
      </div>
    </div>
  );
}
