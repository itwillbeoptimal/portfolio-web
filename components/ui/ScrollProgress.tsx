'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return undefined;

    const trigger = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (barRef.current) {
          gsap.set(barRef.current, { scaleX: self.progress });
        }
      },
    });

    const observer = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });

    observer.observe(document.documentElement);

    return () => {
      observer.disconnect();
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 h-[2px] z-[9999] origin-left w-full"
      style={{
        background: 'var(--gradient-h)',
        transform: 'scaleX(0)',
      }}
    />
  );
}
