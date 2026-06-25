import { Suspense, lazy, Component, type ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { GitHubActivity } from "./components/GitHubActivity";
import { Achievements } from "./components/Achievements";
import { TechStack } from "./components/TechStack";
import { Contact } from "./components/Contact";
import { LoadingScreen } from "./components/LoadingScreen";
import { CustomCursor } from "./components/CustomCursor";

// ── Lazy-loaded routes for code splitting ─────────────────────────────────────
const EduSecDetail = lazy(() =>
  import("./pages/EduSecDetail").then((m) => ({ default: m.EduSecDetail }))
);
const SmartCartDetail = lazy(() =>
  import("./pages/SmartCartDetail").then((m) => ({ default: m.SmartCartDetail }))
);
const NotFound = lazy(() =>
  import("./pages/NotFound").then((m) => ({ default: m.NotFound }))
);

// ── Route-level loading fallback ──────────────────────────────────────────────
function PageFallback() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      aria-label="Loading page"
      aria-live="polite"
    >
      <p className="text-xs font-mono text-muted tracking-widest animate-pulse">Loading…</p>
    </div>
  );
}

// ── Error boundary ────────────────────────────────────────────────────────────
interface EBState {
  hasError: boolean;
  message: string;
}

class ErrorBoundary extends Component<{ children: ReactNode }, EBState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: Error): EBState {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-sm">
            <p className="font-mono text-4xl text-border font-semibold mb-4 select-none">500</p>
            <h1 className="text-lg font-semibold text-primary mb-2">Something went wrong</h1>
            <p className="text-sm text-secondary mb-8">
              An unexpected error occurred. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 border border-border text-primary text-sm rounded-md hover:border-border-hover hover:bg-surface transition-all duration-200"
            >
              Refresh page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Home page ─────────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Projects />
      <Experience />
      <GitHubActivity />
      <Achievements />
      <TechStack />
      <Contact />
    </main>
  );
}

// ── Root app ──────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* Premium loading screen — first visit only */}
        <LoadingScreen />

        {/* Subtle desktop cursor dot */}
        <CustomCursor />

        {/* Skip-to-content for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-surface focus:border focus:border-border focus:text-primary focus:text-sm focus:rounded-md focus:font-mono"
        >
          Skip to main content
        </a>

        <div className="min-h-screen bg-bg text-primary">
          <Navbar />
          <ErrorBoundary>
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects/edusec-labs" element={<EduSecDetail />} />
                <Route path="/projects/smartcart" element={<SmartCartDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
