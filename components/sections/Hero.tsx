'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { BsChevronDoubleDown } from 'react-icons/bs';
import { gsap } from '@/lib/gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    let ctx: ReturnType<typeof gsap.context> | undefined;

    const runAnimation = () => {
      const atTop = window.scrollY === 0;
      const lines = [line1Ref.current, line2Ref.current, line3Ref.current];

      ctx = gsap.context(() => {
        if (atTop) {
          gsap.to(lines, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            stagger: 0.2,
            delay: 0.2,
          });
          gsap.to(scrollRef.current, {
            opacity: 1,
            duration: 1,
            delay: 0.9,
          });
        } else {
          gsap.set(lines, { opacity: 1, y: 0 });
          gsap.set(scrollRef.current, { opacity: 1 });
        }

        const exitItems = [
          { el: line1Ref.current, start: '10% top', end: '30% top' },
          { el: line2Ref.current, start: '20% top', end: '40% top' },
          { el: line3Ref.current, start: '30% top', end: '50% top' },
        ];

        exitItems.forEach(({ el, start, end }) => {
          gsap.to(el, {
            opacity: 0,
            y: -40,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: section,
              start,
              end,
              scrub: true,
            },
          });
        });

        gsap.to(scrollRef.current, {
          opacity: 0,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '5% top',
            scrub: true,
          },
        });
      }, sectionRef);
    };

    document.addEventListener('preloader:complete', runAnimation, {
      once: true,
    });

    return () => {
      document.removeEventListener('preloader:complete', runAnimation);
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative w-full h-[140vh]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 md:px-16 overflow-hidden">
        <div className="flex flex-col w-full max-w-xl">
          <h3
            ref={line1Ref}
            className="text-[var(--muted)] tracking-[0.15em] mb-1 md:mb-2"
            style={{ opacity: 0 }}
          >
            반갑습니다
            <span className="inline font-display">,</span>
          </h3>
          <h2
            ref={line2Ref}
            className="font-extrabold tracking-[-0.03em] leading-none mb-2 md:mb-3"
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            <span
              style={{
                background: 'var(--gradient-h)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              프론트엔드
            </span>
            <span> 개발자</span>
          </h2>
          <div
            ref={line3Ref}
            className="flex items-end justify-end gap-2 md:gap-4"
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            <Image
              src="/calligraphy.gif"
              alt="김지훈"
              width={800}
              height={422}
              priority
              unoptimized
              style={{ height: 'clamp(2.8rem, 7.5vw, 6.5rem)', width: 'auto' }}
            />
            <h2 className="font-extrabold tracking-[-0.03em] leading-none shrink-0">
              입니다
              <span className="inline font-display">.</span>
            </h2>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="absolute"
          style={{
            opacity: 0,
            bottom: 'calc(4rem + env(safe-area-inset-bottom))',
          }}
        >
          <BsChevronDoubleDown className="float-down text-2xl text-[var(--muted)]" />
        </div>
      </div>
    </section>
  );
}
