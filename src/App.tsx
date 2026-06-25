import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { EduSecDetail } from "./pages/EduSecDetail";
import { SmartCartDetail } from "./pages/SmartCartDetail";

function HomePage() {
  return (
    <main>
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

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg text-primary">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/edusec-labs" element={<EduSecDetail />} />
          <Route path="/projects/smartcart" element={<SmartCartDetail />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
