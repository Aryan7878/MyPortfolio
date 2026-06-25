import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { FadeIn } from "./FadeIn";

const contactLinks = [
  {
    id: "contact-github",
    icon: GithubIcon,
    label: "GitHub",
    handle: "@Aryan7878",
    href: "https://github.com/Aryan7878",
    description: "Source code, contributions, projects",
  },
  {
    id: "contact-linkedin",
    icon: LinkedinIcon,
    label: "LinkedIn",
    handle: "aryanch7878",
    href: "https://www.linkedin.com/in/aryanch7878",
    description: "Professional profile, experience, network",
  },
  {
    id: "contact-email",
    icon: Mail,
    label: "Email",
    handle: "aryanch7878@gmail.com",
    href: "mailto:aryanch7878@gmail.com",
    description: "Fastest way to reach me for opportunities",
  },
  {
    id: "contact-phone",
    icon: Phone,
    label: "Phone",
    handle: "+91 7014194189",
    href: "tel:+917014194189",
    description: "Available for calls · Mon–Fri",
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-28 border-t border-border" aria-label="Contact section">
      <div className="section-container">
        <div className="max-w-2xl">
          <FadeIn>
            <p className="section-label mb-4">Contact</p>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-primary leading-[1.1] mb-5">
              Let's build something great.
            </h2>
            <p className="text-secondary text-sm leading-relaxed mb-12 max-w-md">
              I'm actively looking for SDE roles. If you have an opening, a
              project idea, or just want to talk engineering — my inbox is
              always open.
            </p>
          </FadeIn>

          <div className="space-y-3">
            {contactLinks.map((link, i) => (
              <FadeIn key={link.id} delay={i * 0.08}>
                <motion.a
                  id={link.id}
                  href={link.href}
                  target={link.href.startsWith("mailto") || link.href.startsWith("tel") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="group flex items-center justify-between p-5 border border-border rounded-xl bg-surface hover:border-border-hover hover:bg-[#161616] transition-colors duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg border border-border bg-bg flex items-center justify-center group-hover:border-border-hover transition-colors shrink-0">
                      <link.icon size={15} className="text-secondary group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary leading-none mb-1">
                        {link.label}
                      </p>
                      <p className="text-xs text-muted">{link.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-mono text-secondary hidden sm:block">
                      {link.handle}
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="text-muted group-hover:text-secondary transition-colors"
                    />
                  </div>
                </motion.a>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
