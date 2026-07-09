import { profile, stack } from "../content";

const lines: [string, string][] = [
  ["Languages", stack.Languages],
  [" AI Skills & Tools", stack.AI_Skills_Tools],
  ["Frontend", stack.Frontend],
  ["Frameworks & Libraries:", stack.Frameworks_Libraries],
  ["Developer_Tools", stack.Developer_Tools],
  ["Databases", stack.Databases]
];

export default function Terminal() {
  return (
    <div className="group rounded-lg border border-neutral-800 bg-panel overflow-hidden">
      <div className="flex items-center gap-1.5 border-b border-neutral-800 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3c] group-hover:bg-[#ff5f56] transition-colors duration-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3c] group-hover:bg-[#ffbd2e] transition-colors duration-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3c] group-hover:bg-[#27c93f] transition-colors duration-300" />
        <span className="ml-3 font-mono text-[11px] text-muted2">
          ~/{profile.handle} — zsh
        </span>
      </div>

      <div className="px-5 py-5 font-mono text-[13px] leading-7">
        <p className="text-muted">
          <span className="text-gold">~/{profile.handle}</span>
        </p>
        <p className="text-paper">
          <span className="text-gold">$</span> cat stack.txt
        </p>
        <div className="mt-1">
          {lines.map(([key, value]) => (
            <p key={key}>
              <span className="text-goldDim">{key}</span>
              <span className="text-muted2">: </span>
              <span className="text-muted">{value}</span>
            </p>
          ))}
        </div>
        <p className="mt-1 text-paper">
          <span className="text-gold">$</span>{" "}
          <span className="animate-blink">▍</span>
        </p>
      </div>
    </div>
  );
}
