import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

export function Toast({ message, visible, onClose }: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(onClose, 2200);
    return () => clearTimeout(t);
  }, [visible, onClose]);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-6 right-6 z-[9997] pointer-events-none"
    >
      <AnimatePresence>
        {visible && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex items-center gap-2.5 px-4 py-2.5 bg-surface border border-border rounded-lg shadow-xl shadow-black/40 pointer-events-auto"
          >
            {/* Check mark */}
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="6.5" cy="6.5" r="6" stroke="#555" />
              <path
                d="M3.5 6.5l2 2 4-4"
                stroke="#ededed"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xs font-mono text-secondary">{message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
