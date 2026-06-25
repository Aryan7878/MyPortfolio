import { FadeIn } from "./FadeIn";
import { Trophy, Users, Briefcase, Cpu } from "lucide-react";

const achievements = [
  {
    id: "sih-leader",
    icon: Trophy,
    category: "Hackathon",
    title: "Smart India Hackathon 2025",
    subtitle: "Team Leader · Team of 6",
    highlights: [
      "Led project planning and task distribution across 6 members",
      "Coordinated development activities and sprint execution",
      "Represented the team during evaluations and jury presentations",
      "Qualified for SIH External Round (national level)",
    ],
  },
  {
    id: "sih-qualifier",
    icon: Cpu,
    category: "Competition",
    title: "SIH External Round Qualifier",
    subtitle: "National Level",
    highlights: [
      "Qualified for the external (national) round of Smart India Hackathon",
      "Competed against hundreds of teams across India",
      "Recognized for technical solution quality and presentation",
    ],
  },
  {
    id: "placement-coordinator",
    icon: Briefcase,
    category: "Leadership",
    title: "Placement Drive Coordinator",
    subtitle: "GLA University",
    highlights: [
      "Coordinated recruitment activities for 100+ students",
      "Managed communication between recruiters and students",
      "Assisted with scheduling and execution of placement drives",
    ],
  },
  {
    id: "hackathon-coordinator",
    icon: Users,
    category: "Leadership",
    title: "Hackathon Coordinator",
    subtitle: "GLA University",
    highlights: [
      "Organized coding competitions and hackathons",
      "Managed event logistics and technical operations",
      "Ensured smooth participant experience end-to-end",
    ],
  },
];

export function Achievements() {
  return (
    <section
      id="achievements"
      className="py-28 border-t border-border"
      aria-label="Leadership and Impact section"
    >
      <div className="section-container">
        <FadeIn>
          <p className="section-label mb-3">Leadership & Impact</p>
          <h2 className="text-3xl font-semibold tracking-tight text-primary leading-snug mb-2">
            Beyond the code
          </h2>
          <p className="text-secondary text-sm mb-12 max-w-lg">
            I lead teams, coordinate events, and operate in high-pressure
            environments — not just ship features.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 gap-4">
          {achievements.map((item, i) => (
            <FadeIn key={item.id} delay={i * 0.07}>
              <div
                id={`achievement-${item.id}`}
                className="group p-6 border border-border rounded-xl bg-surface hover:border-border-hover hover:bg-[#161616] transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="shrink-0 w-9 h-9 rounded-lg border border-border bg-bg flex items-center justify-center group-hover:border-border-hover transition-colors">
                    <item.icon size={14} className="text-secondary group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-muted mb-0.5">{item.category}</p>
                    <h3 className="text-sm font-semibold text-primary leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-secondary mt-0.5">{item.subtitle}</p>
                  </div>
                </div>
                <ul className="space-y-1.5 pl-[52px]">
                  {item.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs text-secondary leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-muted shrink-0 mt-1.5" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
