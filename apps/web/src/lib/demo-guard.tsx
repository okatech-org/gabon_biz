'use client';

// GABON BIZ — Demo Guard Hook
// Intercepts write actions in demo mode and shows a simulated toast

import { useAuth } from '@/lib/auth-context';
import { useCallback, useState } from 'react';

interface DemoToast {
  id: number;
  actionName: string;
}

export function useDemoGuard() {
  const { user } = useAuth();
  const isDemo = !!user?.isDemo;
  const [toasts, setToasts] = useState<DemoToast[]>([]);

  const guardAction = useCallback(
    (actionName: string, callback: () => void) => {
      if (isDemo) {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, actionName }]);
        // Auto-dismiss after 3 seconds
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
        return;
      }
      callback();
    },
    [isDemo]
  );

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { isDemo, guardAction, toasts, dismissToast };
}

// Toast display component
export function DemoToasts({ toasts, onDismiss }: { toasts: DemoToast[]; onDismiss: (id: number) => void }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 shadow-lg animate-in slide-in-from-right"
          style={{ minWidth: 320 }}
        >
          <span className="text-blue-500 text-lg">ℹ️</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
              Action simulée ✓
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              En mode démo, &quot;{toast.actionName}&quot; n&apos;est pas réellement exécutée.
            </p>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-blue-400 hover:text-blue-600 text-sm"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
