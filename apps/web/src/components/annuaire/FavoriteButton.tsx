'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';

export default function FavoriteButton({ enterpriseId }: { enterpriseId: string }) {
  const [fav, setFav] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('gabon-biz-favs');
    return saved ? JSON.parse(saved).includes(enterpriseId) : false;
  });

  const toggle = () => {
    setFav((prev: boolean) => {
      const saved: string[] = JSON.parse(localStorage.getItem('gabon-biz-favs') || '[]');
      const next = prev ? saved.filter((id) => id !== enterpriseId) : [...saved, enterpriseId];
      localStorage.setItem('gabon-biz-favs', JSON.stringify(next));
      return !prev;
    });
  };

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(); }}
      className={`p-1.5 rounded-full border-none cursor-pointer transition-all duration-200
        ${fav
          ? 'bg-red-50 dark:bg-red-900/20 text-red-500'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
        }`}
      title={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    >
      <Heart size={16} fill={fav ? 'currentColor' : 'none'} />
    </button>
  );
}
