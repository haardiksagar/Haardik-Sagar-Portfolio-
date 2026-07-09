export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-mono text-[16px] tracking-[0.15em] text-gold/80 select-none">
        //
      </span>
      <h2 className="font-mono text-[16px] tracking-[0.2em] uppercase text-muted">
        {children}
      </h2>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
