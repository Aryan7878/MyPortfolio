import { motion } from "framer-motion";
import { ArrowUpRight, Users, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";
import { GithubIcon } from "./SocialIcons";
import { FadeIn } from "./FadeIn";

interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  role: string;
  teamSize: number;
  duration: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  highlights: string[];
  github: string;
  demo: string;
}

const projects: Project[] = [
  {
    id: "edusec-labs",
    slug: "/projects/edusec-labs",
    title: "EduSec Labs",
    tagline: "Cybersecurity Learning Platform",
    description:
      "A full-stack cybersecurity education platform with an interactive dashboard, Docker-powered virtual labs (Kali Linux VM, DVWA), and an AI tutor for ethical hacking and vulnerability testing. OWASP-focused learning modules bridge theory and real-world security skills.",
    image: "/edusec.png",
    role: "Full Stack Developer",
    teamSize: 6,
    duration: "Jul 2025 – Nov 2025",
    tags: ["React", "Vite", "Node.js", "Express", "MongoDB", "Docker", "JWT", "VirtualBox"],
    metrics: [
      { label: "AI Tutor", value: "Built-in" },
      { label: "Lab Env", value: "Docker" },
      { label: "Focus", value: "OWASP Top 10" },
    ],
    highlights: [
      "Cybersecurity education platform",
      "Docker-powered virtual labs",
      "Kali Linux VM + DVWA integration",
      "AI Tutor for ethical hacking",
      "OWASP-focused learning modules",
    ],
    github: "https://github.com/Aryan7878/edusec-lab",
    demo: "#",
  },
  {
    id: "smartcart",
    slug: "/projects/smartcart",
    title: "SmartCart",
    tagline: "AI-Powered Price Intelligence Platform",
    description:
      "A full-stack web application that tracks and analyzes product price trends using an AI-based analytics engine. Calculates volatility index, trend scores, drop probability, and generates buy recommendations from historical price data.",
    image: "/smartcart.png",
    role: "Full Stack Developer",
    teamSize: 5,
    duration: "Feb 2026 – Apr 2026",
    tags: ["React", "Node.js", "Express", "MongoDB", "TailwindCSS", "Recharts", "JavaScript"],
    metrics: [
      { label: "Price Tracking", value: "Real-time" },
      { label: "AI Engine", value: "Built-in" },
      { label: "Analytics", value: "Historical" },
    ],
    highlights: [
      "AI-powered price intelligence",
      "Historical trend analysis",
      "Volatility & recommendation engine",
      "Interactive analytics dashboard",
    ],
    github: "https://github.com/Aryan7878/smartcart",
    demo: "https://smartcart-t7jw.onrender.com/",
  },
];

function MetaPill({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted">
      <Icon size={11} className="text-muted" />
      {label}
    </span>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="px-2.5 py-1 text-xs font-mono text-muted border border-border rounded-md bg-bg hover:text-secondary transition-colors">
      {label}
    </span>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <FadeIn delay={index * 0.1}>
      <motion.article
        id={`project-${project.id}`}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="group flex flex-col border border-border rounded-2xl overflow-hidden bg-surface hover:border-border-hover transition-all duration-300 hover:shadow-xl hover:shadow-black/30 h-full"
      >
        {/* Screenshot */}
        <Link 
          to={project.slug} 
          className="block relative overflow-hidden border-b border-border bg-bg aspect-[16/9] shrink-0 group/img"
        >
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="px-4 py-2 text-xs font-mono text-primary bg-bg/95 border border-border rounded-md shadow-lg transform translate-y-2 group-hover/img:translate-y-0 transition-all duration-300">
              Read Case Study →
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-surface/30 to-transparent" />
        </Link>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Header row */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs font-mono text-muted mb-1">{project.tagline}</p>
              <h3 className="text-lg font-semibold text-primary tracking-tight">{project.title}</h3>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 ml-4 mt-0.5">
              <a
                id={`${project.id}-github-link`}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 border border-border rounded-lg text-secondary hover:text-primary hover:border-border-hover transition-all duration-200"
                aria-label={`${project.title} GitHub`}
                onClick={(e) => e.stopPropagation()}
              >
                <GithubIcon size={13} />
              </a>
              {project.demo !== "#" && (
                <a
                  id={`${project.id}-demo-link`}
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 border border-border rounded-lg text-secondary hover:text-primary hover:border-border-hover transition-all duration-200"
                  aria-label={`${project.title} Live Demo`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ArrowUpRight size={13} />
                </a>
              )}
            </div>
          </div>

          {/* Metadata row */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4 pb-4 border-b border-border">
            <MetaPill icon={User} label={project.role} />
            <MetaPill icon={Users} label={`Team of ${project.teamSize}`} />
            <MetaPill icon={Calendar} label={project.duration} />
          </div>

          {/* Description */}
          <p className="text-sm text-secondary leading-relaxed mb-4 flex-1">{project.description}</p>

          {/* Highlights */}
          <ul className="mb-4 space-y-1.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-xs text-secondary">
                <span className="w-1 h-1 rounded-full bg-muted shrink-0 mt-1.5" />
                {h}
              </li>
            ))}
          </ul>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2 mb-4 p-3.5 bg-bg rounded-xl border border-border">
            {project.metrics.map((m) => (
              <div key={m.label} className="text-center">
                <p className="text-sm font-semibold text-primary leading-none mb-1">{m.value}</p>
                <p className="text-xs text-muted">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>

          {/* View Case Study link */}
          <Link
            to={project.slug}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-primary transition-colors duration-200 group/link"
          >
            View case study
            <ArrowUpRight size={11} className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        </div>
      </motion.article>
    </FadeIn>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-28 border-t border-border" aria-label="Projects section">
      <div className="section-container">
        <FadeIn>
          <p className="section-label mb-3">Featured Projects</p>
          <h2 className="text-3xl font-semibold tracking-tight text-primary leading-snug mb-2">
            Selected work
          </h2>
          <p className="text-secondary text-sm mb-12 max-w-lg">
            End-to-end projects built with production-quality code, real team
            collaboration, and a focus on measurable impact.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-5 items-start">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
