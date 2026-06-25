import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Copy, Check, Circle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { FadeIn } from "./FadeIn";
import { Toast } from "./Toast";

const EMAIL = "aryanch7878@gmail.com";

const contactLinks = [
  {
    id: "contact-github",
    icon: GithubIcon,
    label: "GitHub",
    handle: "@Aryan7878",
    href: "https://github.com/Aryan7878",
    description: "Source code, contributions, projects",
    copyable: false,
  },
  {
    id: "contact-linkedin",
    icon: LinkedinIcon,
    label: "LinkedIn",
    handle: "aryanch7878",
    href: "https://www.linkedin.com/in/aryanch7878",
    description: "Professional profile, experience, network",
    copyable: false,
  },
  {
    id: "contact-email",
    icon: Mail,
    label: "Email",
    handle: EMAIL,
    href: `mailto:${EMAIL}`,
    description: "Fastest way to reach me for opportunities",
    copyable: true,
  },
  {
    id: "contact-location",
    icon: MapPin,
    label: "Location",
    handle: "Mathura, India · UTC+5:30",
    href: null,
    description: "Available for remote & on-site roles",
    copyable: false,
  },
];

export function Contact() {
  const [toastVisible, setToastVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setToastVisible(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setToastVisible(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-28 border-t border-border" aria-label="Contact section">
      <div className="section-container">
        <div className="max-w-2xl">
          <FadeIn>
            <p className="section-label mb-4">Contact</p>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-primary leading-[1.1] mb-5">
              Let's build something great.
            </h2>
            <p className="text-secondary text-sm leading-relaxed mb-6 max-w-md">
              I'm actively looking for SDE roles. If you have an opening, a
              project idea, or just want to talk engineering — my inbox is
              always open.
            </p>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-10 text-xs font-mono text-secondary border border-border rounded-full bg-surface/50">
              <Circle
                size={6}
                className="fill-green-500 text-green-500 animate-pulse"
                aria-hidden="true"
              />
              Open to Full-Time SDE Roles
            </div>
          </FadeIn>

          <div className="space-y-3">
            {contactLinks.map((link, i) => {
              const isEmail = link.id === "contact-email";
              const isLocation = link.id === "contact-location";

              const inner = (
                <div className="group flex items-center justify-between p-5 border border-border rounded-xl bg-surface hover:border-border-hover hover:bg-[#161616] transition-colors duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg border border-border bg-bg flex items-center justify-center group-hover:border-border-hover transition-colors shrink-0">
                      <link.icon
                        size={15}
                        className="text-secondary group-hover:text-primary transition-colors"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary leading-none mb-1">
                        {link.label}
                      </p>
                      <p className="text-xs text-muted">{link.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-mono text-secondary hidden sm:block">
                      {link.handle}
                    </span>

                    {/* Copy button for email */}
                    {isEmail && (
                      <button
                        onClick={handleCopyEmail}
                        aria-label="Copy email address"
                        className="p-1.5 rounded-md text-muted hover:text-primary hover:bg-bg border border-transparent hover:border-border transition-all duration-200"
                      >
                        {copied ? (
                          <Check size={13} className="text-green-500" />
                        ) : (
                          <Copy size={13} />
                        )}
                      </button>
                    )}

                    {!isLocation && (
                      <ArrowUpRight
                        size={14}
                        className="text-muted group-hover:text-secondary transition-colors"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>
              );

              return (
                <FadeIn key={link.id} delay={i * 0.08}>
                  {isLocation ? (
                    <div id={link.id}>{inner}</div>
                  ) : (
                    <motion.a
                      id={link.id}
                      href={link.href!}
                      target={
                        link.href?.startsWith("mailto") ||
                        link.href?.startsWith("tel")
                          ? "_self"
                          : "_blank"
                      }
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      aria-label={`${link.label}: ${link.handle}`}
                    >
                      {inner}
                    </motion.a>
                  )}
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>

      <Toast
        message="Email copied to clipboard"
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </section>
  );
}
