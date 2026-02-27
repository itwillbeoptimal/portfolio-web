'use client';

import { useEffect, useRef } from 'react';
import { BsChevronDoubleDown } from 'react-icons/bs';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const kimRef = useRef<HTMLHeadingElement>(null);
  const jihunRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        kimRef.current,
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.4, ease: 'power4.out', delay: 0.15 },
      );
      gsap.fromTo(
        jihunRef.current,
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.4, ease: 'power4.out', delay: 0.3 },
      );
      gsap.fromTo(
        metaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.75 },
      );
      gsap.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out', delay: 1.1 },
      );

      gsap.to(kimRef.current, {
        x: '-60vw',
        opacity: 0,
        ease: 'none',
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });
      gsap.to(jihunRef.current, {
        x: '60vw',
        opacity: 0,
        ease: 'none',
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });
      gsap.to(metaRef.current, {
        opacity: 0,
        y: 12,
        ease: 'none',
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '35% top',
          scrub: true,
        },
      });
      gsap.to(scrollRef.current, {
        opacity: 0,
        ease: 'none',
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '25% top',
          scrub: true,
        },
      });
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full overflow-hidden h-[120vh]"
    >
      <div className="sticky top-0 w-full h-screen bg-[var(--bg)] flex flex-col items-center justify-center">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at center, rgba(8,8,8,0) 30%, rgba(8,8,8,1) 75%)',
          }}
        />
        <div className="relative z-10 flex flex-col items-center pointer-events-none select-none">
          <div className="flex flex-col items-center">
            <div className="overflow-hidden pb-2">
              <h1
                ref={kimRef}
                className="font-display font-black leading-[0.85] tracking-[-0.04em] text-center m-0 text-foreground"
              >
                KIM
              </h1>
            </div>
            <div className="overflow-hidden pb-2">
              <h1
                ref={jihunRef}
                className="font-display font-black leading-[0.85] tracking-[-0.04em] text-center m-0 text-foreground"
              >
                JIHUN
              </h1>
            </div>
          </div>
          <div
            ref={metaRef}
            className="mt-8 md:mt-10 flex flex-col items-center gap-3"
          >
            <p className="text-[0.9rem] tracking-[0.3em] uppercase">
              Frontend Developer
            </p>
            <p
              className="font-sans tracking-[0.02em] leading-[1.8] text-center"
              style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)' }}
            >
              기능만 동작하는 화면에 만족하지 않는 개발자
            </p>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="absolute bottom-8 md:bottom-12 z-30 flex items-center"
        >
          <BsChevronDoubleDown className="float-down text-2xl" />
        </div>
      </div>
    </section>
  );
}
