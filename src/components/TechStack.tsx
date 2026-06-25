import { FadeIn } from "./FadeIn";

const techCategories = [
  {
    label: "Languages",
    items: ["Java", "JavaScript", "Python", "SQL"],
  },
  {
    label: "Frontend",
    items: ["React", "Vite", "Tailwind CSS", "Bootstrap", "HTML5", "CSS3"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"],
  },
  {
    label: "Database",
    items: ["MongoDB", "Mongoose", "MySQL"],
  },
  {
    label: "DevOps & Tools",
    items: ["Docker", "VirtualBox", "Vagrant", "Git", "GitHub", "Postman"],
  },
];

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 text-xs font-mono text-secondary border border-border rounded-lg bg-bg hover:border-border-hover hover:text-primary transition-all duration-200 cursor-default">
      {label}
    </span>
  );
}

export function TechStack() {
  return (
    <section id="tech" className="py-28 border-t border-border" aria-label="Tech stack section">
      <div className="section-container">
        <FadeIn>
          <p className="section-label mb-3">Tech Stack</p>
          <h2 className="text-3xl font-semibold tracking-tight text-primary leading-snug mb-2">
            Tools of the trade
          </h2>
          <p className="text-secondary text-sm mb-12 max-w-lg">
            Technologies I use to design, build, and ship — across the full
            stack.
          </p>
        </FadeIn>

        <div className="space-y-7">
          {techCategories.map((cat, i) => (
            <FadeIn key={cat.label} delay={i * 0.06}>
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="sm:w-32 shrink-0 pt-1">
                  <p className="text-xs font-mono text-muted">{cat.label}</p>
                </div>
                <div className="flex-1">
                  <div className="h-px bg-border mb-4 hidden sm:block" />
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <Badge key={item} label={item} />
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
