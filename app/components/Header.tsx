import { profile, socials } from "../content";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="animate-fadeUp">
      <h1 className="font-display italic text-[15vw] leading-[0.9] sm:text-6xl md:text-7xl text-paper">
        {profile.handle}
        <span className="text-gold">.</span>
      </h1>

      <p className="mt-5 font-mono text-sm text-muted max-w-[46ch]">
        <span className="text-goldDim">$</span> {profile.tagline}
      </p>

      <nav className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
        {socials.map((s, i) => (
          <a
            key={s.label}
            href={s.href}
            title={s.title}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="font-mono text-xs tracking-[0.1em] text-muted hover:text-gold transition-colors duration-200"
          >
            {s.label}
          </a>
        ))}
      </nav>
      <ThemeToggle />
    </header>
  );
}
