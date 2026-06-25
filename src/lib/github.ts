// ─── GitHub API — data layer with sessionStorage cache ────────────────────────
//
// All fetch functions respect a 15-minute sessionStorage TTL so the app never
// hammers the API.  The GraphQL calls require VITE_GITHUB_TOKEN.

const USERNAME = "Aryan7878";
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;
const CACHE_TTL_MS = 15 * 60 * 1_000; // 15 min

// ─── Language color map ───────────────────────────────────────────────────────
export const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572a5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  Go: "#00add8",
  Rust: "#dea584",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Ruby: "#701516",
  Kotlin: "#a97bff",
  Swift: "#f05138",
  PHP: "#4f5d95",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Dart: "#00b4ab",
};

// ─── Cache helpers ────────────────────────────────────────────────────────────
interface CacheEntry<T> {
  data: T;
  expiry: number;
}

function cacheGet<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() > entry.expiry) {
      sessionStorage.removeItem(key);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

function cacheSet<T>(key: string, data: T): void {
  try {
    const entry: CacheEntry<T> = { data, expiry: Date.now() + CACHE_TTL_MS };
    sessionStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // storage quota exceeded — ignore
  }
}

// ─── REST fetch wrapper ───────────────────────────────────────────────────────
async function restFetch<T>(path: string): Promise<T> {
  const key = `gh_rest_${path}`;
  const cached = cacheGet<T>(key);
  if (cached !== null) return cached;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (!res.ok) throw new Error(`GitHub REST ${res.status}: ${path}`);
  const data: T = await res.json();
  cacheSet(key, data);
  return data;
}

// ─── GraphQL fetch wrapper ────────────────────────────────────────────────────
async function graphqlFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const key = `gh_gql_${query.slice(0, 120)}_${JSON.stringify(variables ?? {})}`;
  const cached = cacheGet<T>(key);
  if (cached !== null) return cached;

  if (!TOKEN) throw new Error("VITE_GITHUB_TOKEN is not set — GraphQL API requires authentication.");

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) throw new Error(`GitHub GraphQL ${res.status}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);
  cacheSet(key, json.data);
  return json.data;
}

// ─── Types ────────────────────────────────────────────────────────────────────
export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  bio: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
}

export interface PinnedRepo {
  name: string;
  description: string;
  url: string;
  stargazerCount: number;
  forkCount: number;
  updatedAt: string;
  primaryLanguage: { name: string; color: string } | null;
}

export interface ContributionStats {
  totalContributions: number;
  currentStreak: number;
  weeks: ContributionWeek[];
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionDay {
  contributionCount: number;
  date: string;
}

export interface LanguageStat {
  name: string;
  percentage: number;
  color: string;
  bytes: number;
}

export interface ActivityEvent {
  id: string;
  type: string;
  repo: { name: string };
  payload: Record<string, unknown>;
  created_at: string;
}

// ─── Fallback static data when API limits are exceeded or token is missing ─────
const FALLBACK_USER: GitHubUser = {
  login: "Aryan7878",
  name: "Aryan Chaudhary",
  avatar_url: "https://github.com/Aryan7878.png",
  followers: 1,
  following: 1,
  public_repos: 9,
  bio: "Software Developer",
};

const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 1,
    name: "MyPortfolio",
    full_name: "Aryan7878/MyPortfolio",
    description: null,
    html_url: "https://github.com/Aryan7878/MyPortfolio",
    stargazers_count: 0,
    forks_count: 0,
    language: "TypeScript",
    updated_at: new Date().toISOString(),
    fork: false,
  },
  {
    id: 2,
    name: "SmartCart",
    full_name: "Aryan7878/SmartCart",
    description: null,
    html_url: "https://github.com/Aryan7878/SmartCart",
    stargazers_count: 0,
    forks_count: 0,
    language: "JavaScript",
    updated_at: new Date().toISOString(),
    fork: false,
  },
  {
    id: 3,
    name: "edusec-lab",
    full_name: "Aryan7878/edusec-lab",
    description: null,
    html_url: "https://github.com/Aryan7878/edusec-lab",
    stargazers_count: 0,
    forks_count: 0,
    language: "JavaScript",
    updated_at: new Date().toISOString(),
    fork: false,
  },
];

const FALLBACK_LANGUAGES: LanguageStat[] = [
  { name: "JavaScript", percentage: 55.6, color: "#f1e05a", bytes: 50000 },
  { name: "TypeScript", percentage: 22.2, color: "#3178c6", bytes: 20000 },
  { name: "Python", percentage: 11.1, color: "#3572a5", bytes: 10000 },
  { name: "Java", percentage: 5.6, color: "#b07219", bytes: 5000 },
  { name: "CSS", percentage: 5.5, color: "#563d7c", bytes: 4900 },
];

const FALLBACK_EVENTS: ActivityEvent[] = [
  {
    id: "fallback-1",
    type: "PushEvent",
    repo: { name: "Aryan7878/MyPortfolio" },
    payload: {
      commits: [{ message: "feat: implement engineering dashboard & custom cursor" }],
    },
    created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
  },
  {
    id: "fallback-2",
    type: "CreateEvent",
    repo: { name: "Aryan7878/immersion2026-78" },
    payload: { ref_type: "repository" },
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
  },
  {
    id: "fallback-3",
    type: "PushEvent",
    repo: { name: "Aryan7878/SmartCart" },
    payload: {
      commits: [{ message: "refactor: optimize search functionality" }],
    },
    created_at: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: "fallback-4",
    type: "PushEvent",
    repo: { name: "Aryan7878/edusec-lab" },
    payload: {
      commits: [{ message: "feat: add user authentication and security features" }],
    },
    created_at: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
  },
];

// ─── REST: user profile ───────────────────────────────────────────────────────
export async function fetchGitHubUser(): Promise<GitHubUser> {
  try {
    return await restFetch<GitHubUser>(`/users/${USERNAME}`);
  } catch (error) {
    console.warn("fetchGitHubUser failed, falling back to static data:", error);
    return FALLBACK_USER;
  }
}

// ─── REST: repos ─────────────────────────────────────────────────────────────
export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const pages: GitHubRepo[] = [];
    for (let page = 1; page <= 3; page++) {
      const chunk = await restFetch<GitHubRepo[]>(
        `/users/${USERNAME}/repos?per_page=100&page=${page}&sort=updated`
      );
      pages.push(...chunk);
      if (chunk.length < 100) break;
    }
    return pages;
  } catch (error) {
    console.warn("fetchGitHubRepos failed, falling back to static data:", error);
    return FALLBACK_REPOS;
  }
}

// ─── REST: aggregate stars + forks across all repos ──────────────────────────
export async function fetchRepoAggregates(): Promise<{ stars: number; forks: number }> {
  try {
    const repos = await fetchGitHubRepos();
    const owned = repos.filter((r) => !r.fork);
    const stars = owned.reduce((s, r) => s + r.stargazers_count, 0);
    const forks = owned.reduce((s, r) => s + r.forks_count, 0);
    return { stars, forks };
  } catch (error) {
    console.warn("fetchRepoAggregates failed, falling back to static data:", error);
    return { stars: 0, forks: 0 };
  }
}

// ─── REST: languages across all repos ────────────────────────────────────────
export async function fetchLanguageStats(): Promise<LanguageStat[]> {
  try {
    const repos = await fetchGitHubRepos();
    const owned = repos.filter((r) => !r.fork && r.language);

    if (owned.length === 0 || repos === FALLBACK_REPOS) {
      return FALLBACK_LANGUAGES;
    }

    const byteMap: Record<string, number> = {};
    const concurrency = 6;
    for (let i = 0; i < owned.length; i += concurrency) {
      const slice = owned.slice(i, i + concurrency);
      const results = await Promise.allSettled(
        slice.map((r) =>
          restFetch<Record<string, number>>(`/repos/${r.full_name}/languages`)
        )
      );
      for (const result of results) {
        if (result.status === "fulfilled") {
          for (const [lang, bytes] of Object.entries(result.value)) {
            byteMap[lang] = (byteMap[lang] ?? 0) + bytes;
          }
        }
      }
    }

    const total = Object.values(byteMap).reduce((s, b) => s + b, 0);
    if (total === 0) return FALLBACK_LANGUAGES;

    return Object.entries(byteMap)
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage: Math.round((bytes / total) * 1000) / 10,
        color: LANG_COLORS[name] ?? "#8b949e",
      }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 8);
  } catch (error) {
    console.warn("fetchLanguageStats failed, falling back to static data:", error);
    return FALLBACK_LANGUAGES;
  }
}

// ─── REST: public events ──────────────────────────────────────────────────────
export async function fetchPublicEvents(): Promise<ActivityEvent[]> {
  try {
    const events = await restFetch<ActivityEvent[]>(`/users/${USERNAME}/events/public?per_page=30`);
    if (!events || events.length === 0) return FALLBACK_EVENTS;
    return events;
  } catch (error) {
    console.warn("fetchPublicEvents failed, falling back to static data:", error);
    return FALLBACK_EVENTS;
  }
}

// ─── GraphQL: pinned repos ────────────────────────────────────────────────────
const PINNED_QUERY = `
  query PinnedRepos($login: String!) {
    user(login: $login) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
            updatedAt
            primaryLanguage { name color }
          }
        }
      }
    }
  }
`;

const FALLBACK_PINNED: PinnedRepo[] = [
  {
    name: "MyPortfolio",
    description: "Modern & minimal developer portfolio website built with React, TypeScript, Vite, and Tailwind CSS.",
    url: "https://github.com/Aryan7878/MyPortfolio",
    stargazerCount: 0,
    forkCount: 0,
    updatedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    primaryLanguage: { name: "TypeScript", color: "#3178c6" },
  },
  {
    name: "SmartCart",
    description: "E-commerce shopping cart system with real-time stock management and order checkout workflow.",
    url: "https://github.com/Aryan7878/SmartCart",
    stargazerCount: 0,
    forkCount: 0,
    updatedAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
    primaryLanguage: { name: "JavaScript", color: "#f1e05a" },
  },
  {
    name: "edusec-lab",
    description: "Secure laboratory management system for educational institutions tracking inventory and student grades.",
    url: "https://github.com/Aryan7878/edusec-lab",
    stargazerCount: 0,
    forkCount: 0,
    updatedAt: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
    primaryLanguage: { name: "JavaScript", color: "#f1e05a" },
  },
];

const FALLBACK_CONTRIBUTIONS: ContributionStats = {
  totalContributions: 76,
  currentStreak: 2,
  weeks: [],
};

export async function fetchPinnedRepos(): Promise<PinnedRepo[]> {
  try {
    const data = await graphqlFetch<{
      user: { pinnedItems: { nodes: PinnedRepo[] } };
    }>(PINNED_QUERY, { login: USERNAME });
    return data.user.pinnedItems.nodes;
  } catch (error) {
    console.warn("fetchPinnedRepos failed, falling back to static data:", error);
    return FALLBACK_PINNED;
  }
}

// ─── GraphQL: contribution stats + streak ────────────────────────────────────
const CONTRIBUTIONS_QUERY = `
  query Contributions($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

function calcStreak(weeks: ContributionWeek[]): number {
  const days = weeks
    .flatMap((w) => w.contributionDays)
    .sort((a, b) => (a.date < b.date ? -1 : 1));

  // Walk backwards from today
  const todayStr = new Date().toISOString().slice(0, 10);
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    const day = days[i];
    if (day.date > todayStr) continue; // skip future days
    if (day.contributionCount > 0) {
      streak++;
    } else {
      // allow a gap of 1 day (today may not have contributions yet)
      if (streak === 0 && i === days.length - 1) continue;
      break;
    }
  }
  return streak;
}

export async function fetchContributionStats(): Promise<ContributionStats> {
  try {
    const data = await graphqlFetch<{
      user: {
        contributionsCollection: {
          contributionCalendar: {
            totalContributions: number;
            weeks: ContributionWeek[];
          };
        };
      };
    }>(CONTRIBUTIONS_QUERY, { login: USERNAME });

    const cal = data.user.contributionsCollection.contributionCalendar;
    return {
      totalContributions: cal.totalContributions,
      currentStreak: calcStreak(cal.weeks),
      weeks: cal.weeks,
    };
  } catch (error) {
    console.warn("fetchContributionStats failed, falling back to static data:", error);
    return FALLBACK_CONTRIBUTIONS;
  }
}

// ─── Utility: relative time ───────────────────────────────────────────────────
export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60_000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  const weeks = Math.floor(days / 7);
  if (mins < 2) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hrs < 24) return `${hrs}h ago`;
  if (days < 7) return `${days}d ago`;
  return `${weeks}w ago`;
}
