import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, useInView, useAnimation } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import {
  GitBranch,
  Star,
  ExternalLink,
  GitCommit,
  GitMerge,
  GitPullRequest,
  Zap,
  BookOpen,
  Clock,
  Activity,
  Code2,
  AlertCircle,
  Plus,
  Tag,
  MessageSquare,
} from "lucide-react";
import { FadeIn } from "./FadeIn";
import {
  fetchGitHubUser,
  fetchRepoAggregates,
  fetchLanguageStats,
  fetchPublicEvents,
  fetchPinnedRepos,
  fetchContributionStats,
  timeAgo,
  type LanguageStat,
  type PinnedRepo,
  type ActivityEvent,
} from "../lib/github";

// ─── Skeleton shimmer ─────────────────────────────────────────────────────────
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-lg bg-gradient-to-r from-[#1a1a1a] via-[#222] to-[#1a1a1a] bg-[length:400%_100%] animate-pulse ${className}`}
    />
  );
}

// ─── Error card ───────────────────────────────────────────────────────────────
function ErrorCard({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 py-8 text-center">
      <AlertCircle size={18} className="text-muted" />
      <p className="text-xs text-muted font-mono max-w-[220px] leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-[10px] font-mono text-secondary hover:text-primary transition-colors border border-border px-3 py-1 rounded-md"
        >
          Retry
        </button>
      )}
    </div>
  );
}

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
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── Language bar ─────────────────────────────────────────────────────────────
function LangBar({
  name,
  percentage,
  color,
  delay,
}: {
  name: string;
  percentage: number;
  color: string;
  delay: number;
}) {
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
      <span className="w-[88px] shrink-0 text-xs font-mono text-secondary text-right truncate">
        {name}
      </span>
      <div
        className="flex-1 h-[5px] rounded-full overflow-hidden"
        style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={controls}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <span className="w-10 shrink-0 text-[10px] font-mono text-muted">
        {percentage.toFixed(1)}%
      </span>
    </div>
  );
}

// ─── Activity event renderer ──────────────────────────────────────────────────
function eventToActivity(event: ActivityEvent): {
  icon: React.ElementType;
  type: string;
  repo: string;
  desc: string;
  date: string;
  link: string;
} | null {
  const repoName = event.repo.name.split("/")[1] ?? event.repo.name;
  const repoLink = `https://github.com/${event.repo.name}`;
  const date = timeAgo(event.created_at);

  switch (event.type) {
    case "PushEvent": {
      const commits = (event.payload.commits as Array<{ message: string }> | undefined) ?? [];
      const msg = commits[0]?.message?.split("\n")[0] ?? "Pushed commits";
      return { icon: GitCommit, type: "Commit", repo: repoName, desc: msg, date, link: repoLink };
    }
    case "PullRequestEvent": {
      const action = event.payload.action as string;
      if (action === "closed" && event.payload.pull_request) {
        const pr = event.payload.pull_request as { merged?: boolean; title?: string };
        if (pr.merged) {
          return {
            icon: GitMerge,
            type: "Merged PR",
            repo: repoName,
            desc: (pr.title as string) ?? "Merged pull request",
            date,
            link: repoLink,
          };
        }
      }
      if (action === "opened") {
        const pr = event.payload.pull_request as { title?: string };
        return {
          icon: GitPullRequest,
          type: "Opened PR",
          repo: repoName,
          desc: (pr.title as string) ?? "Opened pull request",
          date,
          link: repoLink,
        };
      }
      return null;
    }
    case "CreateEvent": {
      const refType = event.payload.ref_type as string;
      if (refType === "repository") {
        return {
          icon: Plus,
          type: "Created repo",
          repo: repoName,
          desc: `Created repository ${repoName}`,
          date,
          link: repoLink,
        };
      }
      if (refType === "tag") {
        return {
          icon: Tag,
          type: "Tagged release",
          repo: repoName,
          desc: `Tagged ${event.payload.ref ?? ""}`,
          date,
          link: repoLink,
        };
      }
      return null;
    }
    case "IssuesEvent": {
      const issue = event.payload.issue as { title?: string };
      return {
        icon: MessageSquare,
        type: "Issue",
        repo: repoName,
        desc: (issue?.title as string) ?? "Issue activity",
        date,
        link: repoLink,
      };
    }
    case "WatchEvent":
      return null; // skip stars
    default:
      return null;
  }
}

// ─── Stats card skeletons ─────────────────────────────────────────────────────
function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-6 border border-border rounded-2xl bg-surface">
          <Skeleton className="w-4 h-4 mb-4" />
          <Skeleton className="w-16 h-6 mb-2" />
          <Skeleton className="w-24 h-3 mb-1" />
          <Skeleton className="w-20 h-2" />
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function GitHubActivity() {
  // ── Data queries ─────────────────────────────────────────────────────────
  const userQuery = useQuery({
    queryKey: ["gh-user"],
    queryFn: fetchGitHubUser,
  });

  const aggregatesQuery = useQuery({
    queryKey: ["gh-aggregates"],
    queryFn: fetchRepoAggregates,
  });

  const langQuery = useQuery({
    queryKey: ["gh-languages"],
    queryFn: fetchLanguageStats,
  });

  const eventsQuery = useQuery({
    queryKey: ["gh-events"],
    queryFn: fetchPublicEvents,
  });

  const pinnedQuery = useQuery({
    queryKey: ["gh-pinned"],
    queryFn: fetchPinnedRepos,
  });

  const contribQuery = useQuery({
    queryKey: ["gh-contributions"],
    queryFn: fetchContributionStats,
  });

  // ── Derived values ────────────────────────────────────────────────────────
  const user = userQuery.data;
  const aggregates = aggregatesQuery.data;
  const langs: LanguageStat[] = langQuery.data ?? [];
  const pinned: PinnedRepo[] = pinnedQuery.data ?? [];
  const contrib = contribQuery.data;

  const statsLoading = userQuery.isLoading || aggregatesQuery.isLoading || contribQuery.isLoading;

  const statsData = [
    {
      label: "Repositories",
      value: user?.public_repos ?? 0,
      suffix: "",
      description: "Public repositories",
      icon: BookOpen,
    },
    {
      label: "Contributions",
      value: contrib?.totalContributions ?? 0,
      suffix: "+",
      description: "This year",
      icon: Activity,
    },
    {
      label: "Current Streak",
      value: contrib?.currentStreak ?? 0,
      suffix: " days",
      description: "Consecutive commit days",
      icon: Zap,
    },
    {
      label: "Followers",
      value: user?.followers ?? 0,
      suffix: "",
      description: `Following ${user?.following ?? 0}`,
      icon: Clock,
    },
  ];

  // Activity feed — filter events to meaningful types, limit to 6
  const activityItems = (eventsQuery.data ?? [])
    .map(eventToActivity)
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .slice(0, 6);

  const now = new Date();
  const lastUpdated = `${now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })} at ${now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;

  return (
    <section
      id="github"
      className="py-28 border-t border-border relative"
      aria-label="GitHub Activity Section"
    >
      <div className="section-container">
        {/* Header */}
        <FadeIn>
          <p className="section-label mb-3">Activity</p>
          <h2 className="text-3xl font-semibold tracking-tight text-primary leading-snug mb-2">
            Engineering Dashboard
          </h2>
          <p className="text-secondary text-sm mb-14 max-w-lg">
            Consistent coding habits, open-source contributions, and technical depth — built in
            public.
          </p>
        </FadeIn>

        {/* Stats row */}
        {statsLoading ? (
          <StatsSkeleton />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsData.map((stat, i) => (
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
        )}

        {/* Main grid */}
        <div className="grid lg:grid-cols-[1.9fr_1fr] gap-6 items-start">
          {/* Left column */}
          <div className="space-y-6">
            {/* Contribution heatmap */}
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

                {/* Header */}
                <div className="relative flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-sm font-semibold text-primary">Contribution Graph</h3>
                    <p className="text-[11px] text-muted mt-0.5 font-mono">
                      {contribQuery.isLoading
                        ? "Loading…"
                        : contribQuery.error
                        ? "Could not load contribution total"
                        : `${contrib?.totalContributions.toLocaleString()} contributions · Last updated ${lastUpdated}`}
                    </p>
                  </div>
                  <a
                    href="https://github.com/Aryan7878"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-mono text-muted hover:text-primary transition-colors"
                  >
                    github.com/Aryan7878
                    <ExternalLink size={9} />
                  </a>
                </div>

                {/* Real contribution calendar */}
                <div className="relative overflow-x-auto pb-2 select-none">
                  <GitHubCalendar
                    username="Aryan7878"
                    colorScheme="dark"
                    theme={{
                      dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                    }}
                    fontSize={10}
                    blockSize={10}
                    blockMargin={3}
                    blockRadius={2}
                    style={{ color: "#555", fontFamily: "JetBrains Mono, monospace" }}
                    labels={{
                      totalCount: "{{count}} contributions in the last year",
                    }}
                    errorMessage="Unable to load contribution graph"
                  />
                </div>
              </div>
            </FadeIn>

            {/* Recent Activity */}
            <FadeIn delay={0.05}>
              <div className="p-7 border border-border rounded-2xl bg-surface">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-sm font-semibold text-primary">Recent Activity</h3>
                    <p className="text-[11px] text-muted mt-0.5">
                      Latest commits and pull requests
                    </p>
                  </div>
                  <Code2 size={14} className="text-muted" />
                </div>

                {eventsQuery.isLoading ? (
                  <div className="space-y-4 ml-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex gap-3">
                        <Skeleton className="w-4 h-4 rounded-full shrink-0 mt-0.5" />
                        <div className="flex-1 space-y-1.5">
                          <Skeleton className="h-3 w-full" />
                          <Skeleton className="h-2 w-2/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : eventsQuery.error || activityItems.length === 0 ? (
                  <ErrorCard
                    message={
                      eventsQuery.error
                        ? "Could not load activity feed."
                        : "No recent public activity found."
                    }
                    onRetry={() => eventsQuery.refetch()}
                  />
                ) : (
                  <ol className="relative border-l border-border ml-2">
                    {activityItems.map((item, i) => (
                      <FadeIn key={i} delay={i * 0.05}>
                        <li className="pl-6 pb-5 last:pb-0 relative">
                          <span className="absolute -left-[9px] top-0.5 w-[17px] h-[17px] rounded-full bg-surface border border-border flex items-center justify-center">
                            <item.icon size={8} className="text-muted" />
                          </span>
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-xs text-primary font-medium leading-snug truncate">
                                {item.desc}
                              </p>
                              <p className="text-[10px] font-mono text-muted mt-0.5">
                                <span className="text-secondary">{item.type}</span>
                                {" · "}
                                <a
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-primary transition-colors"
                                >
                                  {item.repo}
                                </a>
                              </p>
                            </div>
                            <span className="text-[10px] font-mono text-muted shrink-0 pt-0.5">
                              {item.date}
                            </span>
                          </div>
                        </li>
                      </FadeIn>
                    ))}
                  </ol>
                )}
              </div>
            </FadeIn>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Languages */}
            <FadeIn>
              <div className="p-7 border border-border rounded-2xl bg-surface">
                <h3 className="text-sm font-semibold text-primary mb-1">Languages</h3>
                <p className="text-[11px] text-muted mb-6 font-mono">By repository byte usage</p>

                {langQuery.isLoading ? (
                  <div className="space-y-3.5">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="w-[88px] h-3" />
                        <Skeleton className="flex-1 h-[5px]" />
                        <Skeleton className="w-8 h-3" />
                      </div>
                    ))}
                  </div>
                ) : langQuery.error ? (
                  <ErrorCard
                    message="Could not load language data."
                    onRetry={() => langQuery.refetch()}
                  />
                ) : (
                  <div className="space-y-3.5">
                    {langs.map((lang, i) => (
                      <LangBar key={lang.name} {...lang} delay={i * 0.06} />
                    ))}
                  </div>
                )}
              </div>
            </FadeIn>

            {/* Pinned repos */}
            <div className="space-y-3">
              <FadeIn>
                <p className="text-xs font-mono text-muted tracking-widest uppercase px-1 mb-1">
                  Pinned Repositories
                </p>
              </FadeIn>

              {pinnedQuery.isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-5 border border-border rounded-xl bg-surface space-y-3">
                    <div className="flex justify-between">
                      <Skeleton className="w-32 h-4" />
                      <Skeleton className="w-4 h-4" />
                    </div>
                    <Skeleton className="w-full h-3" />
                    <Skeleton className="w-5/6 h-3" />
                    <div className="flex gap-4">
                      <Skeleton className="w-16 h-3" />
                      <Skeleton className="w-10 h-3" />
                      <Skeleton className="w-10 h-3" />
                    </div>
                  </div>
                ))
              ) : pinnedQuery.error ? (
                <div className="p-5 border border-border rounded-xl bg-surface">
                  <ErrorCard
                    message={
                      !import.meta.env.VITE_GITHUB_TOKEN
                        ? "Add VITE_GITHUB_TOKEN to .env to load pinned repos."
                        : "Could not load pinned repositories."
                    }
                    onRetry={() => pinnedQuery.refetch()}
                  />
                </div>
              ) : pinned.length === 0 ? (
                <div className="p-5 border border-border rounded-xl bg-surface">
                  <ErrorCard message="No pinned repositories found." />
                </div>
              ) : (
                pinned.map((repo, i) => {
                  const langColor =
                    repo.primaryLanguage?.color ??
                    (repo.primaryLanguage?.name
                      ? "#8b949e"
                      : "#8b949e");
                  const updatedAgo = timeAgo(repo.updatedAt);
                  return (
                    <FadeIn key={repo.name} delay={i * 0.07}>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block p-5 border border-border rounded-xl bg-surface hover:border-border-hover hover:bg-[#161616] hover:-translate-y-0.5 transition-all duration-200 hover:shadow-xl hover:shadow-black/25"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 16 16"
                              className="text-muted shrink-0"
                              fill="currentColor"
                            >
                              <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 000 2h.75a.75.75 0 010 1.5H4.5A2.5 2.5 0 012 13.5v-11zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
                            </svg>
                            <span className="text-sm font-mono font-medium text-primary group-hover:text-white truncate transition-colors">
                              {repo.name}
                            </span>
                          </div>
                          <ExternalLink
                            size={11}
                            className="text-muted group-hover:text-primary transition-colors shrink-0"
                          />
                        </div>
                        <p className="text-xs text-secondary leading-relaxed mb-4 line-clamp-2">
                          {repo.description || "No description available."}
                        </p>
                        <div className="flex items-center gap-4 text-[10px] font-mono text-muted">
                          {repo.primaryLanguage && (
                            <span className="flex items-center gap-1.5">
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: langColor }}
                              />
                              {repo.primaryLanguage.name}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Star size={12} />
                            {repo.stargazerCount}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitBranch size={12} />
                            {repo.forkCount}
                          </span>
                          <span className="ml-auto">Updated {updatedAgo}</span>
                        </div>
                      </a>
                    </FadeIn>
                  );
                })
              )}

              {/* Extra stats: total stars + forks across all repos */}
              {(aggregates || aggregatesQuery.isLoading) && (
                <FadeIn delay={0.1}>
                  <div className="flex gap-3 mt-1">
                    {[
                      {
                        label: "Total Stars",
                        icon: Star,
                        value: aggregates?.stars,
                      },
                      {
                        label: "Total Forks",
                        icon: GitBranch,
                        value: aggregates?.forks,
                      },
                    ].map(({ label, icon: Icon, value }) => (
                      <div
                        key={label}
                        className="flex-1 p-4 border border-border rounded-xl bg-surface flex items-center gap-2"
                      >
                        <Icon size={12} className="text-muted shrink-0" />
                        <div>
                          {aggregatesQuery.isLoading ? (
                            <Skeleton className="w-8 h-4 mb-1" />
                          ) : (
                            <p className="text-sm font-semibold text-primary leading-none mb-0.5">
                              <AnimatedCounter target={value ?? 0} />
                            </p>
                          )}
                          <p className="text-[10px] font-mono text-muted">{label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
