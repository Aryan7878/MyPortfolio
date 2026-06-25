import { FadeIn } from "./FadeIn";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    id: "placement-coordinator",
    company: "GLA University",
    role: "Placement Drive Coordinator",
    period: "September 2024",
    location: "Mathura, India",
    description:
      "Coordinated campus placement drives, acting as a liaison between the university training & placement cell, corporate recruiters, and over 500+ student candidates during high-pressure recruitment cycles.",
    tags: ["Operations", "Stakeholder Management", "Event Coordination", "Database Tracking", "Communication"],
    highlights: [
      "Assisted recruiters from top tech firms during on-campus recruitment and technical evaluation processes",
      "Organized and managed coding practice contests, mock interviews, and system bootcamps for candidate batches",
      "Maintained high-integrity databases tracking student applications, eligibility checklists, and round-wise outcomes",
      "Resolved dynamic operational conflicts, scheduling errors, and candidate questions under tight timelines",
    ],
  },
  {
    id: "sih-2025",
    company: "Smart India Hackathon",
    role: "Team Leader (SIH 2025)",
    period: "August 2025",
    location: "Mathura, India",
    description:
      "Led a 6-member team of developers to design, develop, and present a full-stack software prototype addressing a national-level problem statement. Orchestrated system design, API contracts, and panel reviews.",
    tags: ["Team Leadership", "System Architecture", "MERN Stack", "Git & GitHub", "Project Management"],
    highlights: [
      "Spearheaded overall software architecture design and divided database/frontend/backend workloads",
      "Chaired weekly syncs, monitored task velocity via Kanban boards, and resolved blocker items across developers",
      "Designed robust REST API standards, establishing smooth integration of MERN stack components",
      "Presented and defended the prototype's architecture and usability successfully before the national evaluation panel",
    ],
  },
  {
    id: "internpe",
    company: "InternPe",
    role: "Python Programming Intern",
    period: "17 June 2024 – 14 July 2024",
    duration: "1 month",
    location: "Remote",
    description:
      "Completed a structured internship at InternPe focused on real-world web development and software engineering practices. Delivered functional modules as part of the program curriculum alongside a team of interns.",
    tags: ["Python", "Web Development", "OOP", "Scripting", "Frontend Fundamentals"],
    highlights: [
      "Completed hands-on training in web development and software development projects",
      "Worked on real-world tasks involving front-end development and programming fundamentals",
      "Strengthened problem-solving skills and practical implementation of core development concepts",
      "Gained exposure to project structuring, debugging, and collaborative development",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-28 border-t border-border" aria-label="Experience section">
      <div className="section-container">
        <FadeIn>
          <p className="section-label mb-3">Experience</p>
          <h2 className="text-3xl font-semibold tracking-tight text-primary leading-snug mb-12">
            Professional Experience
          </h2>
        </FadeIn>

        <div className="relative">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border hidden sm:block" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <FadeIn key={exp.id} delay={i * 0.1}>
                <div id={`exp-${exp.id}`} className="flex gap-6 sm:gap-8">
                  {/* Dot */}
                  <div className="hidden sm:flex flex-col items-center shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full border border-border bg-surface flex items-center justify-center z-10">
                      <Briefcase size={10} className="text-secondary" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 p-6 border border-border rounded-xl bg-surface hover:border-border-hover transition-colors duration-300">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                      <div>
                        <h3 className="text-base font-semibold text-primary leading-snug">{exp.role}</h3>
                        <p className="text-sm text-secondary mt-0.5">{exp.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-mono text-muted">{exp.period}</p>
                        <p className="text-xs text-muted mt-0.5">{exp.location} · {exp.duration}</p>
                      </div>
                    </div>

                    <div className="h-px bg-border my-4" />

                    <p className="text-sm text-secondary leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Key Outcomes */}
                    <div className="mb-4">
                      <p className="text-xs font-mono text-muted mb-2 uppercase tracking-widest">Key Outcomes</p>
                      <ul className="space-y-1.5">
                        {exp.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-xs text-secondary leading-relaxed">
                            <span className="w-1 h-1 rounded-full bg-muted shrink-0 mt-1.5" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Skills */}
                    <div>
                      <p className="text-xs font-mono text-muted mb-2 uppercase tracking-widest">Skills Used</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-xs font-mono text-muted border border-border rounded-md bg-bg"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
