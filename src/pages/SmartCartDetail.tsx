import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Users, Calendar, User } from "lucide-react";
import { GithubIcon } from "../components/SocialIcons";

const sections = [
  {
    id: "overview",
    title: "Project Overview",
    content:
      "SmartCart is an AI-powered price intelligence platform that tracks product prices across sources and uses machine learning analytics to surface actionable insights. It helps buyers make smarter purchase decisions by predicting price drops, scoring volatility, and recommending the optimal time to buy.",
  },
  {
    id: "problem",
    title: "Problem Statement",
    content:
      "Online shoppers struggle to determine whether a product's current price is a genuine deal or an inflated value before a sale. Price history data exists but is fragmented, and few platforms offer intelligent recommendations based on trend patterns — most just show raw historical charts without interpretation.",
  },
  {
    id: "solution",
    title: "Solution",
    content:
      "SmartCart provides a unified dashboard that ingests product price data, runs an analytics engine to compute volatility index, trend scores, and drop probability, and surfaces a clear buy/wait recommendation per product. The interactive dashboard (built with Recharts) makes historical trends easy to understand at a glance.",
  },
  {
    id: "architecture",
    title: "Architecture",
    content:
      "Full-stack MERN architecture: React + TailwindCSS frontend, Node.js/Express REST API, MongoDB for price history storage. The analytics engine runs server-side — computing volatility (standard deviation of price over N days), trend score (linear regression slope), and drop probability (percentage of days with price below current). Recharts handles all data visualization on the frontend.",
  },
  {
    id: "features",
    title: "Key Features",
  },
  {
    id: "team",
    title: "Team Structure",
    content:
      "A cross-functional team of 5 developers. In my role as a Full Stack Developer, I designed the database models for price history caching and implemented the linear regression & volatility math modules on the backend, while collaborating on the responsive Recharts data dashboard frontend implementation.",
  },
  {
    id: "challenges",
    title: "Technical Challenges",
    content:
      "Building a reliable analytics engine from scratch without an ML library required understanding statistical fundamentals (volatility, regression). Ensuring the Recharts dashboard was responsive across viewports without sacrificing data density was a UI challenge. Managing historical price data in MongoDB efficiently required careful schema design and indexing strategies.",
  },
  {
    id: "lessons",
    title: "Lessons Learned",
    content:
      "You don't always need a heavy ML framework to build an 'AI' feature — well-designed statistical algorithms can be equally powerful and much more interpretable. Clean data schema design pays off enormously when querying time-series data. Recharts is flexible but requires careful configuration for polished, production-quality charts.",
  },
];

const features = [
  "AI analytics engine: volatility index and trend score computation",
  "Drop probability score — how likely the price will fall further",
  "Buy recommendation system based on composite score",
  "Interactive price history charts built with Recharts",
  "Product catalog with real-time price tracking",
  "Clean analytics dashboard with filters and sorting",
  "Full-stack MERN REST API with modular backend architecture",
];

const techStack = {
  Frontend: ["React", "TailwindCSS", "Recharts", "JavaScript"],
  Backend: ["Node.js", "Express.js", "REST API"],
  Database: ["MongoDB", "Mongoose"],
  Analytics: ["Volatility Index", "Linear Regression", "Drop Probability"],
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as const } },
};

export function SmartCartDetail() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pt-14">
      {/* Hero */}
      <div className="border-b border-border">
        <div className="section-container py-16">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* Back */}
            <motion.div variants={itemVariants} className="mb-8">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors"
              >
                <ArrowLeft size={14} />
                Back to Portfolio
              </Link>
            </motion.div>

            <motion.p variants={itemVariants} className="text-xs font-mono text-muted mb-2">
              AI-Powered Price Intelligence Platform
            </motion.p>
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-semibold tracking-tight text-primary leading-tight mb-4"
            >
              SmartCart
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-secondary text-base leading-relaxed max-w-2xl mb-8"
            >
              A full-stack web application that tracks product price trends and uses an AI analytics engine to compute volatility, trend scores, and buy recommendations from historical price data.
            </motion.p>

            {/* Meta */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-border"
            >
              {[
                { icon: User, label: "Role", value: "Full Stack Developer" },
                { icon: Users, label: "Team Size", value: "5 members" },
                { icon: Calendar, label: "Duration", value: "Feb 2026 – Apr 2026" },
              ].map((m) => (
                <div key={m.label}>
                  <p className="text-xs font-mono text-muted mb-1">{m.label}</p>
                  <div className="flex items-center gap-1.5 text-sm text-primary">
                    <m.icon size={13} className="text-muted" />
                    {m.value}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Links */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <a
                href="https://github.com/Aryan7878/smartcart"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-primary hover:border-border-hover hover:bg-surface transition-all duration-200"
              >
                <GithubIcon size={14} />
                View on GitHub
              </a>
              <a
                href="https://smartcart-t7jw.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-bg rounded-lg text-sm font-medium hover:bg-accent transition-colors duration-200"
              >
                Live Demo
                <ArrowUpRight size={14} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Screenshot */}
      <div className="section-container py-10">
        <div className="rounded-2xl overflow-hidden border border-border">
          <img
            src="/smartcart.png"
            alt="SmartCart Analytics Dashboard"
            className="w-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="section-container pb-24">
        <div className="max-w-2xl space-y-14">
          {sections.map((sec) => (
            <motion.section
              key={sec.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] as const }}
            >
              <h2 className="text-lg font-semibold text-primary mb-3">{sec.title}</h2>
              <div className="h-px bg-border mb-4" />
              {sec.id === "features" ? (
                <ul className="space-y-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-secondary">
                      <span className="w-1 h-1 rounded-full bg-muted shrink-0 mt-2" />
                      {f}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-secondary leading-relaxed">{sec.content}</p>
              )}
            </motion.section>
          ))}

          {/* Tech Stack */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="text-lg font-semibold text-primary mb-3">Tech Stack</h2>
            <div className="h-px bg-border mb-5" />
            <div className="space-y-4">
              {Object.entries(techStack).map(([cat, items]) => (
                <div key={cat} className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <p className="text-xs font-mono text-muted sm:w-28 shrink-0 pt-1">{cat}</p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 text-xs font-mono text-secondary border border-border rounded-md bg-surface"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
