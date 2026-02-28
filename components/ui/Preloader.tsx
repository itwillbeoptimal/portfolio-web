'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const PRELOADER_CHARS = 'KIM JIHUN'.split('').map((char, i) => ({
  id: `char-${i}`,
  char,
}));

export default function Preloader() {
  const [complete, setComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        document.dispatchEvent(new CustomEvent('preloader:complete'));
        setComplete(true);
      },
    });

    tl.to(progressRef.current, {
      scaleX: 1,
      duration: 1.5,
      ease: 'power3.inOut',
    });

    if (textRef.current) {
      tl.fromTo(
        textRef.current.querySelectorAll('.char'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.8, ease: 'power3.out' },
        '-=0.5',
      );
    }

    tl.to(
      containerRef.current,
      { yPercent: -100, duration: 1, ease: 'power4.inOut' },
      '+=0.4',
    );

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (complete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[var(--bg)] flex flex-col justify-center items-center text-[var(--neon)] font-display"
    >
      <div className="overflow-hidden mb-6">
        <div
          ref={textRef}
          className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase flex"
        >
          {PRELOADER_CHARS.map(({ id, char }) => (
            <span
              key={id}
              className={`char inline-block ${char === ' ' ? 'w-2' : ''}`}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
      <div className="w-48 h-px bg-[var(--border-strong)] overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-[var(--neon)] origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </div>
  );
}
