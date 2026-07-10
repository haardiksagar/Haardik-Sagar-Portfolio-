"use client";

import { useState, useEffect } from "react";
import { profile, socials } from "../content";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [msgOpen, setMsgOpen] = useState(false);
  const [days, setDays] = useState(0);

  useEffect(() => {
    const target = 686;
    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    
    let counterInterval: NodeJS.Timeout;

    const startCounter = () => {
      let frame = 0;
      const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

      counterInterval = setInterval(() => {
        frame++;
        const progress = easeOutExpo(frame / totalFrames);
        setDays(Math.round(target * progress));

        if (frame >= totalFrames) {
          clearInterval(counterInterval);
        }
      }, frameRate);
    };

    if (typeof window !== 'undefined' && (window as any).introFinished) {
      startCounter();
    } else {
      window.addEventListener('introComplete', startCounter, { once: true });
    }

    return () => {
      if (counterInterval) clearInterval(counterInterval);
      window.removeEventListener('introComplete', startCounter);
    };
  }, []);

  return (
    <header className="animate-fadeUp">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-y-6">
        <h1 className="font-display italic text-[15vw] leading-[0.9] sm:text-6xl md:text-7xl text-paper">
          {profile.handle}
          <span className="text-gold">.</span>
        </h1>
        
        <nav className="sm:mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 relative"> {/*backdrop-blur-md border border-white/10 rounded-full px-6 py-3 shadow-sm">*/}
          {socials.map((s) => {
            if (s.label === "MSG") {
              return (
                <div key={s.label} className="relative flex items-center">
                  <button
                    onClick={() => setMsgOpen(!msgOpen)}
                    className="font-mono text-xs tracking-[0.1em] text-muted hover:text-gold transition-colors duration-200 uppercase outline-none p-0 m-0 bg-transparent leading-none"
                  >
                    {s.label}
                  </button>
                  {msgOpen && (
                    <div className="absolute top-full mt-2 left-0 sm:left-auto sm:right-0 bg-panel border border-line rounded-md p-3 shadow-xl z-50 min-w-[200px] animate-fadeUp">
                      <p className="font-mono text-[10px] text-muted mb-1 uppercase tracking-wider">Email me at</p>
                      <a 
                        href={`mailto:${profile.email}`} 
                        className="font-mono text-xs text-paper hover:text-gold transition-colors duration-200 block truncate"
                      >
                        {profile.email}
                      </a>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <a
                key={s.label}
                href={s.href}
                title={s.title}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="font-mono text-xs tracking-[0.1em] text-muted hover:text-gold transition-colors duration-200 uppercase outline-none p-0 m-0 bg-transparent leading-none"
              >
                {s.label}
              </a>
            );
          })}
        </nav>
      </div>
      
      <p className="mt-5 font-mono text-sm text-muted max-w-[46ch]">
        <span className="text-goldDim">$</span> {profile.tagline}
      </p>

      <ThemeToggle />
      
      <div className="mt-12 font-mono text-lg sm:text-xl text-muted tracking-wide animate-fadeUp" style={{ animationDelay: '0.2s' }}>
        i've been building things for <span className="text-paper font-semibold">{days.toLocaleString()}</span> days.
      </div>
    </header>
  );
}
