interface SectionHeaderProps {
  index: string;
  label: string;
  className?: string;
}

export default function SectionHeader({
  index,
  label,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={`flex items-center gap-5 mb-12 md:mb-20 ${className ?? ''}`}
    >
      <span className="font-mono text-[13px] md:text-sm tracking-[0.3em] uppercase font-bold text-neon">
        {index}
      </span>
      <div className="flex-1 h-px bg-[var(--border)]" />
      <span className="font-mono text-[13px] md:text-sm tracking-[0.3em] uppercase text-[var(--muted)]">
        {label}
      </span>
    </div>
  );
}
