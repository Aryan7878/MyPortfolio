import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      aria-label="404 Page not found"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="text-center px-6"
      >
        {/* 404 */}
        <p className="font-mono text-[80px] sm:text-[120px] font-semibold text-border leading-none select-none mb-6">
          404
        </p>

        <h1 className="text-xl font-semibold text-primary mb-2">
          Page not found
        </h1>
        <p className="text-sm text-secondary mb-10 max-w-xs mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface border border-border text-primary text-sm rounded-md hover:border-border-hover hover:bg-[#161616] transition-all duration-200"
        >
          ← Back to Home
        </Link>
      </motion.div>
    </main>
  );
}
