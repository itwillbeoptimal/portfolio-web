'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;

    const dot = dotRef.current!;
    const circle = circleRef.current!;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const ctx = gsap.context(() => {
      gsap.set([dot, circle], { x: mouseX, y: mouseY });

      const onMove = (e: PointerEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        gsap.to(dot, {
          x: mouseX,
          y: mouseY,
          duration: 0.1,
          ease: 'power2.out',
        });
        gsap.to(circle, {
          x: mouseX,
          y: mouseY,
          duration: 0.6,
          ease: 'power3.out',
        });
      };

      window.addEventListener('pointermove', onMove);

      return () => {
        window.removeEventListener('pointermove', onMove);
      };
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;

    const dot = dotRef.current!;
    const circle = circleRef.current!;
    const text = textRef.current!;

    const onEnterView = () => {
      setIsHovering(true);
      gsap.to(circle, {
        scale: 3.5,
        backgroundColor: 'var(--neon)',
        border: 'none',
        duration: 0.4,
        ease: 'power3.out',
      });
      gsap.to(text, { scale: 1, opacity: 1, duration: 0.3, delay: 0.1 });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };

    const onEnterLink = () => {
      setIsHovering(true);
      gsap.to(circle, {
        scale: 2.5,
        backgroundColor: 'transparent',
        border: '1px solid var(--neon)',
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };

    const onLeave = () => {
      setIsHovering(false);
      gsap.to(circle, {
        scale: 1,
        backgroundColor: 'transparent',
        border: '1px solid var(--neon)',
        opacity: 0.4,
        duration: 0.4,
        ease: 'power3.out',
      });
      gsap.to(text, { scale: 0, opacity: 0, duration: 0.2 });
      gsap.to(dot, { scale: 1, duration: 0.2, delay: 0.1 });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor-normal]')) {
        onLeave();
      } else if (target.closest('[data-cursor-view]')) {
        onEnterView();
      } else if (target.closest('a, button, [data-cursor-hover]')) {
        onEnterLink();
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const related = e.relatedTarget as HTMLElement;
      const wasView = target.closest('[data-cursor-view]');
      const wasLink = target.closest('a, button, [data-cursor-hover]');

      if (
        (wasView && !wasView.contains(related)) ||
        (wasLink && !wasLink.contains(related))
      ) {
        onLeave();
      }
    };

    document.body.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.body.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 [@media(pointer:coarse)]:hidden"
        style={{
          background: 'var(--neon)',
          willChange: 'transform',
          mixBlendMode: isHovering ? 'normal' : 'difference',
        }}
      />
      <div
        ref={circleRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 opacity-40 flex items-center justify-center overflow-hidden [@media(pointer:coarse)]:hidden"
        style={{
          border: '1px solid var(--neon)',
          willChange: 'transform',
          mixBlendMode: isHovering ? 'normal' : 'difference',
        }}
      >
        <span
          ref={textRef}
          className="font-mono text-[8px] font-bold text-[var(--bg)] opacity-0 scale-0 tracking-widest"
          style={{ willChange: 'transform, opacity' }}
        >
          VIEW
        </span>
      </div>
    </>
  );
}
