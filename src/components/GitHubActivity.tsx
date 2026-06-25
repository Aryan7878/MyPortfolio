import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  GitBranch,
  Star,
  ExternalLink,
  GitCommit,
  GitMerge,
  Zap,
  BookOpen,
  Clock,
  Activity,
  Code2,
} from "lucide-react";
import { FadeIn } from "./FadeIn";

// ─── Types ────────────────────────────────────────────────────────────────────
interface DayData {
  level: 0 | 1 | 2 | 3 | 4;
  count: number;
  date: Date;
}

interface TooltipState {
  count: number;
  date: Date;
}

// ─── Contribution data ────────────────────────────────────────────────────────
const generateContributions = (): DayData[][] => {
  const weeks: DayData[][] = [];
  const today = new Date();
  const WEEKS = 53;

  for (let w = 0; w < WEEKS; w++) {
    const week: DayData[] = [];
    for (let d = 0; d < 7; d++) {
      const dayOffset = w * 7 + d;
      const date = new Date(today);
      date.setDate(today.getDate() - (WEEKS * 7 - dayOffset));

      const isWeekend = d === 0 || d === 6;
      const seed = Math.sin(dayOffset * 0.17 + 1.3) * Math.cos(dayOffset * 0.06 + 0.4);

      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (isWeekend) {
        if (seed > 0.65) level = 2;
        else if (seed > 0.4) level = 1;
      } else {
        if (seed > 0.72) level = 4;
        else if (seed > 0.35) level = 3;
        else if (seed > -0.1) level = 2;
        else if (seed > -0.55) level = 1;
      }

      const countMap: Record<number, number> = {
        0: 0,
        1: 1 + Math.abs(Math.round(seed * 1.5)),
        2: 3 + Math.abs(Math.round(seed * 2.5)),
        3: 6 + Math.abs(Math.round(seed * 4)),
        4: 10 + Math.abs(Math.round(seed * 6)),
      };

      week.push({ level, count: countMap[level], date });
    }
    weeks.push(week);
  }
  return weeks;
};

const contributionsData = generateContributions();

const getMonthLabels = () => {
  const labels: { label: string; weekIndex: number }[] = [];
  let lastMonth = -1;
  contributionsData.forEach((week, wIndex) => {
    const firstDay = week[0];
    if (!firstDay) return;
    const month = firstDay.date.getMonth();
    if (month !== lastMonth) {
      labels.push({
        label: firstDay.date.toLocaleDateString("en-US", { month: "short" }),
        weekIndex: wIndex,
      });
      lastMonth = month;
    }
  });
  return labels;
};

const monthLabels = getMonthLabels();

const cellColor = (level: number) => {
  switch (level) {
    case 1: return { bg: "#0e4429", border: "#196436" };
    case 2: return { bg: "#006d32", border: "#26a641" };
    case 3: return { bg: "#26a641", border: "#39d353" };
    case 4: return { bg: "#39d353", border: "#56f97f" };
    default: return { bg: "#161b22", border: "#21262d" };
  }
};

// ─── Stats ────────────────────────────────────────────────────────────────────
const githubStats = [
  { label: "Repositories", value: 24, suffix: "", description: "Public & private projects", icon: BookOpen },
  { label: "Contributions", value: 1420, suffix: "+", description: "+18% vs last year", icon: Activity },
  { label: "Current Streak", value: 14, suffix: " days", description: "Consecutive commit days", icon: Zap },
  { label: "Active Days", value: 218, suffix: "", description: "Days with commits this year", icon: Clock },
];

// ─── Languages ────────────────────────────────────────────────────────────────
const languages = [
  { name: "JavaScript", percentage: 42, color: "#f1e05a" },
  { name: "TypeScript", percentage: 31, color: "#3178c6" },
  { name: "Python", percentage: 13, color: "#3572a5" },
  { name: "HTML / CSS", percentage: 8, color: "#e34c26" },
  { name: "Dockerfile", percentage: 4, color: "#384d54" },
  { name: "Shell", percentage: 2, color: "#89e051" },
];

// ─── Repos ────────────────────────────────────────────────────────────────────
const pinnedRepos = [
  {
    name: "edusec-labs",
    description: "Docker-powered virtual sandbox for cybersecurity learning modules and offensive security challenges.",
    lang: "TypeScript",
    langColor: "#3178c6",
    stars: 8,
    forks: 3,
    updatedAt: "2 days ago",
    link: "https://github.com/Aryan7878/edusec-lab",
  },
  {
    name: "smartcart",
    description: "Price intelligence platform with regression analytics, real-time scrapers, and buy-score engine.",
    lang: "JavaScript",
    langColor: "#f1e05a",
    stars: 12,
    forks: 4,
    updatedAt: "5 days ago",
    link: "https://github.com/Aryan7878/smartcart",
  },
  {
    name: "portfolio",
    description: "Personal engineering portfolio built with Vite, React, and Framer Motion. Fully open source.",
    lang: "TypeScript",
    langColor: "#3178c6",
    stars: 5,
    forks: 1,
    updatedAt: "today",
    link: "https://github.com/Aryan7878",
  },
];

// ─── Activity ─────────────────────────────────────────────────────────────────
const recentActivity = [
  { icon: GitMerge, type: "Merged PR", repo: "edusec-labs", desc: "Implemented Docker integration", date: "2d ago" },
  { icon: GitCommit, type: "Commit", repo: "edusec-labs", desc: "Built AI Tutor module with LangChain", date: "3d ago" },
  { icon: GitCommit, type: "Commit", repo: "smartcart", desc: "Analytics engine with linear regression", date: "5d ago" },
  { icon: GitMerge, type: "Merged PR", repo: "smartcart", desc: "Improved buy-score recommendation system", date: "1w ago" },
  { icon: GitCommit, type: "Commit", repo: "portfolio", desc: "Designed portfolio v2 with Framer Motion", date: "1w ago" },
  { icon: GitCommit, type: "Commit", repo: "edusec-labs", desc: "Strengthened JWT auth & route guards", date: "2w ago" },
];

// ─── Animated counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

// ─── Language bar ─────────────────────────────────────────────────────────────
function LangBar({ name, percentage, color, delay }: { name: string; percentage: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        width: `${percentage}%`,
        transition: { duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] },
      });
    }
  }, [isInView, controls, percentage, delay]);

  return (
    <div ref={ref} className="flex items-center gap-3">
      <span className="w-[88px] shrink-0 text-xs font-mono text-secondary text-right">{name}</span>
      <div className="flex-1 h-[5px] rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={controls}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <span className="w-8 shrink-0 text-[10px] font-mono text-muted">{percentage}%</span>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function GitHubActivity() {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const totalContributions = contributionsData.flat().reduce((s, d) => s + d.count, 0);

  return (
    <section id="github" className="py-28 border-t border-border relative" aria-label="GitHub Activity Section">
      <div className="section-container">
        {/* Header */}
        <FadeIn>
          <p className="section-label mb-3">Activity</p>
          <h2 className="text-3xl font-semibold tracking-tight text-primary leading-snug mb-2">
            Engineering Dashboard
          </h2>
          <p className="text-secondary text-sm mb-14 max-w-lg">
            Consistent coding habits, open-source contributions, and technical depth — built in public.
          </p>
        </FadeIn>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {githubStats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.06}>
              <div className="p-6 border border-border rounded-2xl bg-surface hover:border-border-hover transition-colors duration-200 cursor-default">
                <stat.icon size={14} className="text-muted mb-4" />
                <p className="text-2xl font-semibold text-primary leading-none mb-1.5">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs font-medium text-secondary mb-0.5">{stat.label}</p>
                <p className="text-[10px] font-mono text-muted">{stat.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[1.9fr_1fr] gap-6 items-start">
          {/* Left */}
          <div className="space-y-6">
            {/* Heatmap */}
            <FadeIn>
              <div className="relative p-7 border border-border rounded-2xl bg-surface overflow-hidden">
                {/* Radial spotlight */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(39,211,83,0.045) 0%, transparent 70%)",
                  }}
                />

                {/* Heatmap header */}
                <div className="relative flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-sm font-semibold text-primary">Contribution Graph</h3>
                    <p className="text-[11px] text-muted mt-0.5 font-mono">
                      {totalContributions.toLocaleString()} contributions · Last updated today
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-muted font-mono">
                    <span>Less</span>
                    {([0, 1, 2, 3, 4] as const).map((l) => {
                      const c = cellColor(l);
                      return (
                        <div
                          key={l}
                          className="w-3 h-3 rounded-[3px]"
                          style={{ backgroundColor: c.bg, border: `1px solid ${c.border}` }}
                        />
                      );
                    })}
                    <span>More</span>
                  </div>
                </div>

                {/* Grid */}
                <div className="relative overflow-x-auto pb-2 select-none">
                  {/* Month labels */}
                  <div className="relative h-4 min-w-[620px] mb-1">
                    {monthLabels.map(({ label, weekIndex }) => (
                      <span
                        key={`${label}-${weekIndex}`}
                        className="absolute text-[9px] font-mono text-muted"
                        style={{ left: `${(weekIndex / 53) * 100}%` }}
                      >
                        {label}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-1 min-w-[620px]">
                    {/* Day-of-week axis */}
                    <div className="flex flex-col gap-[3px] mr-1">
                      {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                        <div
                          key={i}
                          className="h-[10px] text-[8px] font-mono text-muted leading-none flex items-center"
                        >
                          {d}
                        </div>
                      ))}
                    </div>

                    {/* Cells */}
                    <div className="flex gap-[3px]">
                      {contributionsData.map((week, wIndex) => (
                        <div key={wIndex} className="flex flex-col gap-[3px]">
                          {week.map((day, dIndex) => {
                            const c = cellColor(day.level);
                            return (
                              <motion.div
                                key={dIndex}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 0.2,
                                  delay: (wIndex * 7 + dIndex) * 0.0008,
                                  ease: "easeOut",
                                }}
                                className="w-[10px] h-[10px] rounded-[2px] cursor-crosshair transition-transform hover:scale-125"
                                style={{ backgroundColor: c.bg, border: `1px solid ${c.border}` }}
                                onMouseEnter={() => setTooltip({ count: day.count, date: day.date })}
                                onMouseLeave={() => setTooltip(null)}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Status bar */}
                <div className="relative flex items-center justify-between mt-5 text-[11px] font-mono">
                  <span>
                    {tooltip ? (
                      <span className="text-secondary">
                        {tooltip.count} {tooltip.count === 1 ? "contribution" : "contributions"} on{" "}
                        {tooltip.date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    ) : (
                      <span className="text-muted">Hover a cell for details</span>
                    )}
                  </span>
                  <a
                    href="https://github.com/Aryan7878"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-muted hover:text-primary transition-colors"
                  >
                    github.com/Aryan7878
                    <ExternalLink size={9} />
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Recent Activity */}
            <FadeIn delay={0.05}>
              <div className="p-7 border border-border rounded-2xl bg-surface">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-sm font-semibold text-primary">Recent Activity</h3>
                    <p className="text-[11px] text-muted mt-0.5">Latest commits and pull requests</p>
                  </div>
                  <Code2 size={14} className="text-muted" />
                </div>
                <ol className="relative border-l border-border ml-2">
                  {recentActivity.map((item, i) => (
                    <FadeIn key={i} delay={i * 0.05}>
                      <li className="pl-6 pb-5 last:pb-0 relative">
                        <span className="absolute -left-[9px] top-0.5 w-[17px] h-[17px] rounded-full bg-surface border border-border flex items-center justify-center">
                          <item.icon size={8} className="text-muted" />
                        </span>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs text-primary font-medium leading-snug">{item.desc}</p>
                            <p className="text-[10px] font-mono text-muted mt-0.5">
                              <span className="text-secondary">{item.type}</span>
                              {" · "}{item.repo}
                            </p>
                          </div>
                          <span className="text-[10px] font-mono text-muted shrink-0 pt-0.5">{item.date}</span>
                        </div>
                      </li>
                    </FadeIn>
                  ))}
                </ol>
              </div>
            </FadeIn>
          </div>

          {/* Right */}
          <div className="space-y-6">
            {/* Languages */}
            <FadeIn>
              <div className="p-7 border border-border rounded-2xl bg-surface">
                <h3 className="text-sm font-semibold text-primary mb-1">Languages</h3>
                <p className="text-[11px] text-muted mb-6 font-mono">By repository usage</p>
                <div className="space-y-3.5">
                  {languages.map((lang, i) => (
                    <LangBar key={lang.name} {...lang} delay={i * 0.06} />
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Pinned repos */}
            <div className="space-y-3">
              <FadeIn>
                <p className="text-xs font-mono text-muted tracking-widest uppercase px-1 mb-1">
                  Pinned Repositories
                </p>
              </FadeIn>
              {pinnedRepos.map((repo, i) => (
                <FadeIn key={repo.name} delay={i * 0.07}>
                  <a
                    href={repo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-5 border border-border rounded-xl bg-surface hover:border-border-hover hover:bg-[#161616] hover:-translate-y-0.5 transition-all duration-200 hover:shadow-xl hover:shadow-black/25"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <svg width="13" height="13" viewBox="0 0 16 16" className="text-muted shrink-0" fill="currentColor">
                          <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 000 2h.75a.75.75 0 010 1.5H4.5A2.5 2.5 0 012 13.5v-11zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
                        </svg>
                        <span className="text-sm font-mono font-medium text-primary group-hover:text-white truncate transition-colors">
                          {repo.name}
                        </span>
                      </div>
                      <ExternalLink size={11} className="text-muted group-hover:text-primary transition-colors shrink-0" />
                    </div>
                    <p className="text-xs text-secondary leading-relaxed mb-4">{repo.description}</p>
                    <div className="flex items-center gap-4 text-[10px] font-mono text-muted">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.langColor }} />
                        {repo.lang}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star size={9} />
                        {repo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitBranch size={9} />
                        {repo.forks}
                      </span>
                      <span className="ml-auto">Updated {repo.updatedAt}</span>
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
