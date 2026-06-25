import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Calendar, User, ExternalLink } from "lucide-react";
import { GithubIcon } from "../components/SocialIcons";

const sections = [
  {
    id: "overview",
    title: "Project Overview",
    content:
      "EduSec Labs is a comprehensive cybersecurity education platform designed to make practical security skills accessible to learners at every level. The platform combines structured courses, hands-on Docker-powered virtual labs, and an AI tutor to create a full learning ecosystem for offensive and defensive security.",
  },
  {
    id: "problem",
    title: "Problem Statement",
    content:
      "Most cybersecurity courses are either purely theoretical or require expensive dedicated hardware for lab setups. Students struggle to find an affordable, structured environment where they can safely practice real-world attack and defense techniques. Existing platforms lack an integrated AI assistant to guide learners through complex vulnerability concepts.",
  },
  {
    id: "solution",
    title: "Solution",
    content:
      "EduSec Labs provides an all-in-one platform: Docker-powered virtual lab environments (Kali Linux VM, DVWA) that run in isolated containers, structured OWASP Top 10 learning modules, progress tracking, and an AI tutor powered by LLM to answer security-specific questions and guide exploit exercises in real time.",
  },
  {
    id: "architecture",
    title: "Architecture",
    content:
      "The system follows a MERN stack architecture. The React + Vite frontend communicates with an Express/Node.js REST API server. MongoDB stores user data, progress, course content, and lab configurations. Docker manages isolated lab environments per session. JWT handles authentication with role-based access. VirtualBox + Vagrant provision the Kali Linux and DVWA environments.",
  },
  {
    id: "features",
    title: "Key Features",
  },
  {
    id: "team",
    title: "Team Structure",
    content:
      "Collaborative 6-member engineering team. As a Full-Stack Developer, my primary focus was designing user validation states, integrating Node.js authentication middlewares, and bridging data between database models and frontend visualizations. Team members specialized in Docker network configuration, VM packaging, and AI prompt engineering.",
  },
  {
    id: "challenges",
    title: "Technical Challenges",
    content:
      "The biggest challenge was provisioning isolated lab environments without compromising host machine security. Docker networking had to be carefully configured to sandbox each session. Integrating the AI tutor while keeping response latency low required streaming responses. JWT refresh token rotation across concurrent lab sessions also required careful state management.",
  },
  {
    id: "lessons",
    title: "Lessons Learned",
    content:
      "Docker container orchestration and network isolation are non-trivial at scale. Streaming LLM responses significantly improve perceived performance. Designing for both security and usability simultaneously requires constant trade-off analysis. Working in a team of 6 reinforced the importance of clear API contracts and daily sync-ups.",
  },
];

const features = [
  "Interactive dashboard with course progress tracking",
  "Docker-powered Kali Linux VM and DVWA lab environments",
  "OWASP Top 10 focused curriculum with guided modules",
  "AI Tutor for ethical hacking and vulnerability Q&A",
  "JWT-based authentication with student and admin roles",
  "Certificate generation on course completion",
  "Session isolation — each user gets their own lab container",
];

const techStack = {
  Frontend: ["React", "Vite", "TailwindCSS", "JavaScript"],
  Backend: ["Node.js", "Express.js", "REST API", "JWT"],
  Database: ["MongoDB", "Mongoose"],
  "DevOps & Labs": ["Docker", "VirtualBox", "Vagrant", "Kali Linux", "DVWA"],
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as const } },
};

export function EduSecDetail() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pt-14">
      {/* Hero */}
      <div className="border-b border-border">
        <div className="section-container py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
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

            {/* Title */}
            <motion.p variants={itemVariants} className="text-xs font-mono text-muted mb-2">
              Cybersecurity Learning Platform
            </motion.p>
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-semibold tracking-tight text-primary leading-tight mb-4"
            >
              EduSec Labs
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-secondary text-base leading-relaxed max-w-2xl mb-8"
            >
              A full-stack cybersecurity education platform with Docker-powered virtual labs, OWASP-focused curriculum, and an AI tutor for ethical hacking and vulnerability testing.
            </motion.p>

            {/* Meta */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-border"
            >
              {[
                { icon: User, label: "Role", value: "Full Stack Developer" },
                { icon: Users, label: "Team Size", value: "6 members" },
                { icon: Calendar, label: "Duration", value: "Jul 2025 – Nov 2025" },
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
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/Aryan7878/edusec-lab"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-primary hover:border-border-hover hover:bg-surface transition-all duration-200"
              >
                <GithubIcon size={14} />
                View on GitHub
              </a>
              <span
                className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-muted cursor-not-allowed bg-surface/30 opacity-60 font-mono"
                title="Live demo sandbox must be hosted locally due to VM container virtualization"
              >
                <ExternalLink size={14} />
                Live Demo (Local Setup)
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Screenshot */}
      <div className="section-container py-10">
        <div className="rounded-2xl overflow-hidden border border-border">
          <img
            src="/edusec.png"
            alt="EduSec Labs Dashboard"
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
