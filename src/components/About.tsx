import { FadeIn } from "./FadeIn";
import { GraduationCap, Code2, Brain, Shield } from "lucide-react";

const highlights = [
  {
    icon: GraduationCap,
    title: "Education",
    description: "B.Tech in Computer Science Engineering at GLA University. Graduating 2027.",
  },
  {
    icon: Code2,
    title: "MERN Stack Development",
    description: "Designing and implementing scalable full-stack web applications with modern architectures using React, Node.js, Express, and MongoDB.",
  },
  {
    icon: Brain,
    title: "DSA & System Design",
    description: "Strong problem-solving foundation in Data Structures and Algorithms with a focus on writing optimized, maintainable code and scalable systems.",
  },
  {
    icon: Shield,
    title: "AI & Cybersecurity",
    description: "Building intelligent software platforms incorporating Large Language Models, AI agents, and practical cybersecurity learning environments.",
  },
];

const quickFacts = [
  "Final Year B.Tech CSE",
  "GLA University, Mathura",
  "MERN Stack Developer",
  "SIH 2025 Team Leader",
  "Open to SDE Roles",
  "Full Stack & AI Enthusiast",
];

const techEcosystem = [
  {
    category: "Frontend",
    items: ["React", "TypeScript", "Vite", "TailwindCSS", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "REST API", "JWT Auth"],
  },
  {
    category: "Database",
    items: ["MongoDB", "Mongoose", "Firebase"],
  },
  {
    category: "AI & Tools",
    items: ["LangChain", "OpenAI API", "Python", "Git", "Postman"],
  },
];

export function About() {
  return (
    <section id="about" className="py-28 border-t border-border" aria-label="About section">
      <div className="section-container">
        {/* Top: text + quick facts on left, highlight cards on right */}
        <div className="grid md:grid-cols-[1fr_1.6fr] gap-16 items-start mb-16">
          {/* Left */}
          <div>
            <FadeIn>
              <p className="section-label mb-4">About</p>
              <h2 className="text-3xl font-semibold tracking-tight text-primary leading-snug mb-6">
                Building thoughtful
                <br />
                software that matters.
              </h2>
              <p className="text-secondary text-sm leading-relaxed mb-4">
                I'm a Final Year Computer Science student at GLA University with a strong interest in Full-Stack Development, AI, and Cybersecurity.
              </p>
              <p className="text-secondary text-sm leading-relaxed mb-4">
                I enjoy building software that solves practical problems, from cybersecurity learning platforms to AI-powered analytics systems. Through hackathons, leadership roles, and collaborative projects, I've developed both technical and teamwork skills.
              </p>
              <p className="text-secondary text-sm leading-relaxed mb-8">
                I'm currently preparing for software engineering opportunities where I can contribute, learn, and build impactful products.
              </p>

              {/* Quick Facts */}
              <div className="p-5 border border-border rounded-xl bg-surface/50">
                <p className="text-xs font-mono text-muted mb-3 tracking-widest uppercase">Quick Facts</p>
                <ul className="space-y-2">
                  {quickFacts.map((fact) => (
                    <li key={fact} className="flex items-center gap-2 text-xs text-secondary">
                      <span className="w-1 h-1 rounded-full bg-muted shrink-0" />
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          {/* Right: Highlight cards */}
          <div className="grid sm:grid-cols-2 gap-3">
            {highlights.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="group p-5 border border-border rounded-xl bg-surface hover:border-border-hover hover:bg-[#161616] transition-all duration-300 cursor-default">
                  <div className="mb-3 w-8 h-8 flex items-center justify-center rounded-lg bg-bg border border-border group-hover:border-border-hover transition-colors">
                    <item.icon size={15} className="text-secondary group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-sm font-medium text-primary mb-1.5">{item.title}</h3>
                  <p className="text-xs text-secondary leading-relaxed">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Bottom: Tech Ecosystem */}
        <FadeIn delay={0.1}>
          <div className="border border-border rounded-xl bg-surface/30 p-6">
            <p className="text-xs font-mono text-muted mb-5 tracking-widest uppercase">Tech Ecosystem</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {techEcosystem.map((group) => (
                <div key={group.category}>
                  <p className="text-xs font-medium text-primary mb-3">{group.category}</p>
                  <ul className="space-y-1.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="text-xs text-secondary font-mono px-2 py-1 rounded-md bg-bg border border-border/60 hover:border-border-hover hover:text-primary transition-colors duration-150 cursor-default"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
