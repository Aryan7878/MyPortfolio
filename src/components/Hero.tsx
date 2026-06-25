import { motion } from "framer-motion";
import { ArrowUpRight, Download, FileText, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

const currentlyItems = [
  "Building EduSec Labs",
  "Exploring AI Agents & LLM Applications",
  "Practicing DSA and System Design",
  "Open to SDE Opportunities",
];

const RESUME_URL = "/Aryan_Chaudhary_Resume.pdf";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-14"
      aria-label="Hero section"
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(#ededed 1px, transparent 1px), linear-gradient(90deg, #ededed 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.022) 0%, transparent 70%)",
        }}
      />

      <div className="section-container w-full py-24">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-14">
          {/* Left: Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-2xl"
          >
            {/* Status badge */}
            <motion.div variants={itemVariants} className="mb-7">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono text-secondary border border-border rounded-full bg-surface/50">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"
                  aria-hidden="true"
                />
                Actively Seeking SDE Opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-primary leading-[1.06] mb-5"
            >
              Aryan
              <br />
              Chaudhary
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-secondary leading-snug mb-4 font-normal"
            >
              Building software at the intersection of{" "}
              <span className="text-primary font-medium">Full-Stack Development</span>,{" "}
              <span className="text-primary font-medium">AI</span>, and{" "}
              <span className="text-primary font-medium">Cybersecurity</span>.
            </motion.p>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-sm text-secondary leading-relaxed mb-8 max-w-md"
            >
              I develop scalable web applications, intelligent systems, and
              cybersecurity learning platforms focused on solving real-world
              problems.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col gap-3 mb-10">
              <div className="flex flex-wrap items-center gap-3">
                {/* View Work */}
                <a
                  id="hero-view-work-btn"
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-bg text-sm font-medium rounded-md hover:bg-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-1 focus-visible:ring-offset-bg"
                >
                  View Work
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>

                {/* View Resume */}
                <a
                  id="hero-resume-view-btn"
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View resume (opens in new tab)"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-primary text-sm rounded-md hover:border-border-hover hover:bg-surface transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1 focus-visible:ring-offset-bg"
                >
                  <FileText size={14} aria-hidden="true" />
                  View Resume
                </a>

                {/* Download Resume */}
                <a
                  id="hero-resume-download-btn"
                  href={RESUME_URL}
                  download="Aryan_Chaudhary_Resume.pdf"
                  aria-label="Download resume as PDF"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-secondary text-sm rounded-md hover:border-border-hover hover:bg-surface hover:text-primary transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1 focus-visible:ring-offset-bg"
                >
                  <Download size={14} aria-hidden="true" />
                  Download
                </a>
              </div>

              <div className="flex items-center gap-1">
                <a
                  id="hero-github-btn"
                  href="https://github.com/Aryan7878"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="inline-flex items-center gap-2 px-4 py-2 text-secondary text-sm hover:text-primary transition-colors duration-200 rounded-md hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <GithubIcon size={14} aria-hidden="true" />
                  GitHub
                </a>
                <a
                  id="hero-linkedin-btn"
                  href="https://www.linkedin.com/in/aryanch7878"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="inline-flex items-center gap-2 px-4 py-2 text-secondary text-sm hover:text-primary transition-colors duration-200 rounded-md hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <LinkedinIcon size={14} aria-hidden="true" />
                  LinkedIn
                </a>
              </div>
            </motion.div>

            {/* Currently */}
            <motion.div variants={itemVariants}>
              <div className="p-5 border border-border rounded-xl bg-surface/50">
                <p className="text-xs font-mono text-muted mb-3 tracking-widest uppercase">
                  Currently
                </p>
                <ul className="space-y-2">
                  {currentlyItems.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-secondary">
                      <ArrowRight size={12} className="text-muted shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Profile Picture */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex-shrink-0 flex justify-center md:justify-end md:mt-[3.5rem]"
          >
            <motion.div
              whileHover={{ scale: 1.025 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative"
              style={{ width: "350px", height: "437px" }}
            >
              <div
                className="w-full h-full rounded-2xl overflow-hidden border border-border/60"
                style={{
                  boxShadow: "0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                <img
                  src="/aryan.jpg"
                  alt="Aryan Chaudhary, Software Developer"
                  width={350}
                  height={437}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs font-mono text-muted tracking-widest">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-border to-transparent"
        />
      </motion.div>
    </section>
  );
}
