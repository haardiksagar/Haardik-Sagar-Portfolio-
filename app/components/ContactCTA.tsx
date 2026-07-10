import { contact, profile } from "../content";
import FadeInSection from "./FadeInSection";

export default function ContactCTA() {
  return (
    <FadeInSection>
      <div className="flex flex-col items-center justify-center text-center px-6 py-12 mt-4 mb-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl relative overflow-hidden">
        {/* Subtle glow effect behind */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm h-full bg-gold/10 blur-[80px] -z-10 rounded-full pointer-events-none" />
        
        <h2 className="font-display text-3xl sm:text-4xl text-paper mb-4 lowercase">
          {contact.heading}
        </h2>
        <p className="font-mono text-sm text-muted max-w-md mx-auto leading-relaxed mb-8">
          {contact.message}
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 font-mono text-sm tracking-[0.1em] text-ink bg-gold hover:bg-paper transition-colors duration-300 uppercase px-6 py-3 rounded-full font-semibold"
        >
          Send an Email
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </FadeInSection>
  );
}
