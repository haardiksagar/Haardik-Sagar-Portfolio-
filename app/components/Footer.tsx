import { profile } from "../content";
import ViewCounter from "./ViewCounter";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 mb-10 flex flex-col items-center justify-center gap-4 border-t border-line/70 pt-8 pb-4">
      <div className="flex flex-col items-center gap-1">
        <p className="text-[15px] text-muted text-center">
          Built and designed by {profile.name}.
        </p>
        <p className="text-[15px] text-muted2 text-center">
          All rights reserved. © {year}
        </p>
      </div>
      
      <div className="font-mono text-xs tracking-wider text-muted hover:text-gold transition-colors duration-300">
        <ViewCounter />
      </div>
    </footer>
  );
}
