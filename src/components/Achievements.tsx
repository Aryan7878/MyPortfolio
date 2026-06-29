import { FadeIn } from "./FadeIn";
import { Trophy, Users, Briefcase, Code2 } from "lucide-react";

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
    id: "competitive-programming",
    icon: Code2,
    category: "Competitive Programming",
    title: "LeetCode & HackerRank",
    subtitle: "Problem Solving & DSA",
    highlights: [
      "Solved 200+ coding problems across Data Structures and Algorithms on LeetCode.",
      "Earned HackerRank Skill Certifications in Problem Solving, Java, JavaScript, SQL, React, and CSS.",
      "Achieved 5★ Python, 5★ C, and 3★ Java badges on HackerRank.",
      "Continuously strengthening algorithmic thinking, debugging, and interview-ready coding skills through consistent practice.",
    ],
    pills: [
      { label: "200+ Problems", icon: "🏆" },
      { label: "5★ Python", icon: "⭐" },
      { label: "7 Certifications", icon: "📜" },
    ],
    hasLogos: true,
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

function AchievementCard({ item }: { item: typeof achievements[number] }) {
  return (
    <div
      id={`achievement-${item.id}`}
      className="group p-6 border border-border rounded-xl bg-surface hover:border-border-hover hover:bg-[#161616] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.45),0_0_15px_rgba(255,255,255,0.015)]"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="shrink-0 w-9 h-9 rounded-lg border border-border bg-bg flex items-center justify-center group-hover:border-border-hover transition-colors">
          <item.icon size={14} className="text-secondary group-hover:text-primary transition-colors" />
        </div>
        <div>
          <p className="text-xs font-mono text-muted mb-0.5">{item.category}</p>
          <h3 className="text-sm font-semibold text-primary leading-snug flex items-center gap-2">
            <span>{item.title}</span>
            {item.hasLogos && (
              <span className="inline-flex items-center gap-1.5 ml-1 text-muted">
                {/* LeetCode logo */}
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="opacity-45 hover:opacity-100 hover:text-[#FFA116] transition-all duration-200 cursor-help"
                  aria-hidden="true"
                >
                  <title>LeetCode</title>
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                </svg>
                {/* HackerRank logo */}
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="opacity-45 hover:opacity-100 hover:text-[#2EC866] transition-all duration-200 cursor-help"
                  aria-hidden="true"
                >
                  <title>HackerRank</title>
                  <path d="M0 0v24h24V0zm9.95 8.002h1.805c.061 0 .111.05.111.111v7.767c0 .061-.05.111-.11.111H9.95c-.061 0-.111-.05-.111-.11v-2.87H7.894v2.87c0 .06-.05.11-.11.11H5.976a.11.11 0 01-.11-.11V8.112c0-.06.05-.11.11-.11h1.806c.061 0 .11.05.11.11v2.869H9.84v-2.87c0-.06.05-.11.11-.11zm2.999 0h5.778c.061 0 .111.05.111.11v7.767a.11.11 0 01-.11.112h-5.78a.11.11 0 01-.11-.11V8.111c0-.06.05-.11.11-.11z" />
                </svg>
              </span>
            )}
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
      {item.pills && (
        <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-border/50">
          {item.pills.map((pill) => (
            <div
              key={pill.label}
              className="flex flex-col items-center justify-center p-2 border border-border rounded-lg bg-bg hover:border-border-hover hover:scale-[1.03] transition-all duration-200 cursor-default shadow-sm hover:shadow-md"
            >
              <span className="text-sm mb-1">{pill.icon}</span>
              <span className="text-[9px] font-mono text-muted text-center leading-none">{pill.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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

        <div className="grid sm:grid-cols-2 gap-4 items-start">
          {/* Column 1 */}
          <div className="space-y-4">
            {achievements
              .filter((_, idx) => idx % 2 === 0)
              .map((item, i) => (
                <FadeIn key={item.id} delay={i * 0.1}>
                  <AchievementCard item={item} />
                </FadeIn>
              ))}
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            {achievements
              .filter((_, idx) => idx % 2 === 1)
              .map((item, i) => (
                <FadeIn key={item.id} delay={i * 0.1 + 0.07}>
                  <AchievementCard item={item} />
                </FadeIn>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
