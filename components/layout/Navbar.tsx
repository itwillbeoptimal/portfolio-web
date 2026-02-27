'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const NAV_LINKS = [
  { label: '소개', href: '#about' },
  { label: '프로젝트', href: '#projects' },
  { label: '기술 스택', href: '#skills' },
  { label: '연락처', href: '#contact' },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, delay: 1.4, ease: 'power3.out' },
    );
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-16 xl:px-24 py-5 md:py-8 flex items-center justify-between"
      style={{
        background: scrolled ? 'rgba(8,8,8,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        transition: 'background 0.4s, border-color 0.4s',
      }}
    >
      <a
        href="#hero"
        className="font-mono text-neon text-[13px] md:text-sm tracking-[0.2em] uppercase font-bold"
      >
        KIM JIHUN
      </a>
      <ul className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-300 relative group"
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300 [background:var(--gradient-h)]" />
            </a>
          </li>
        ))}
      </ul>
      <a
        href="mailto:itwillbeoptimal@gmail.com"
        className="hidden md:inline font-mono text-[13px] md:text-sm tracking-[0.1em] px-4 py-2 relative overflow-hidden group border border-[rgba(0,255,135,0.4)]"
      >
        <span className="relative text-neon z-10 group-hover:text-[var(--bg)] transition-colors duration-300">
          연락하기
        </span>
        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 [background:var(--gradient)]" />
      </a>
    </nav>
  );
}
