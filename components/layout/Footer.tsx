export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-16 xl:px-24 py-10 md:py-12 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[var(--border)]">
      <span className="text-[14px] text-[var(--muted)]">
        © {year} 김지훈. All rights reserved.
      </span>
      <span className="font-mono text-[13px] text-[var(--muted)]">
        Built with Next.js
      </span>
    </footer>
  );
}
