import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SESSION_KEY = "ac_loaded";

export function LoadingScreen() {
  // Only show on first visit in this browser session
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem(SESSION_KEY);
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!show) return;

    // Mark as shown so refreshes skip the screen
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }

    // Hard timeout: dismiss after 800ms regardless
    const timer = setTimeout(() => setShow(false), 800);

    // Also dismiss as soon as the page is fully loaded
    if (document.readyState === "complete") {
      clearTimeout(timer);
      // Brief intentional delay for a polished fade
      setTimeout(() => setShow(false), 300);
    } else {
      const onLoad = () => {
        clearTimeout(timer);
        setTimeout(() => setShow(false), 300);
      };
      window.addEventListener("load", onLoad, { once: true });
      return () => {
        clearTimeout(timer);
        window.removeEventListener("load", onLoad);
      };
    }

    return () => clearTimeout(timer);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg"
          aria-label="Loading portfolio"
          aria-live="polite"
        >
          {/* Monogram */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="font-mono font-semibold text-2xl text-primary tracking-widest mb-5 select-none"
          >
            AC
          </motion.div>

          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="text-[11px] font-mono text-muted tracking-widest uppercase select-none"
          >
            Loading Portfolio...
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-px bg-border"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
