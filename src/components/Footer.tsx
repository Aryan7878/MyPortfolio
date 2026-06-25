import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

const socialLinks = [
  {
    id: "footer-github",
    icon: GithubIcon,
    label: "GitHub",
    href: "https://github.com/Aryan7878",
  },
  {
    id: "footer-linkedin",
    icon: LinkedinIcon,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aryanch7878",
  },
  {
    id: "footer-email",
    icon: Mail,
    label: "Email",
    href: "mailto:aryanch7878@gmail.com",
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border pt-12 pb-8" aria-label="Footer">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 mb-10">
          {/* Left: Brand + bio */}
          <div className="max-w-xs">
            <p className="font-mono font-medium text-sm text-primary tracking-wider mb-3">
              Aryan Chaudhary
            </p>
            <p className="text-xs text-secondary leading-relaxed">
              Software Developer building scalable web applications, AI-powered
              solutions, and cybersecurity platforms.
            </p>
          </div>

          {/* Right: Social links */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-mono text-muted mb-1 uppercase tracking-widest">
              Connect
            </p>
            {socialLinks.map((link) => (
              <a
                key={link.id}
                id={link.id}
                href={link.href}
                target={link.href.startsWith("mailto") ? "_self" : "_blank"}
                rel="noopener noreferrer"
                aria-label={link.label}
                className="inline-flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors duration-200 group"
              >
                <link.icon
                  size={13}
                  className="text-muted group-hover:text-secondary transition-colors"
                  aria-hidden="true"
                />
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs font-mono text-muted">
            Designed &amp; Built by Aryan Chaudhary &mdash; &copy; {year}
          </p>
          <p className="text-xs font-mono text-muted">
            React &middot; TypeScript &middot; Vite &middot; Tailwind &middot; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
