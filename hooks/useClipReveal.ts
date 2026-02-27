'use client';

import { useEffect, type RefObject } from 'react';
import { gsap } from '@/lib/gsap';

export function useClipReveal(
  ref: RefObject<HTMLElement | null>,
  duration = 1.2,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: el, start: 'top 80%' },
        },
      );
    });

    return () => ctx.revert();
  }, [ref, duration]);
}
