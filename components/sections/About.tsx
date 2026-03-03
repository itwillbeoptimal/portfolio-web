'use client';

import { useEffect, useRef } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import { useClipReveal } from '@/hooks/useClipReveal';
import { gsap } from '@/lib/gsap';

const PARAGRAPH_TEXTS = [
  '아이디어는 거창한 문제보다 사용자가 실제로 겪는 작은 불편에서 시작된다고 생각합니다. 마이크가 제대로 입력되고 있는지 알 수 없는 순간이나, 알림이 오지 않아 다시 웹을 열어야 하는 상황처럼 사소해 보이지만 계속 신경 쓰이는 지점들을 그냥 넘기지 않으려 합니다.',
  '이러한 문제를 해결하는 과정에서 브라우저가 생각보다 다양한 역할을 할 수 있음을 배우고 있습니다. 사용자가 지금 어떤 동작을 하고 있고 어떤 과정이 진행 중인지 분명하게 보여주는 방법을 고민하며, 주어진 환경 안에서 이를 구현할 수 있는 방식을 찾아가고 있습니다.',
  '복잡해지기 쉬운 로직은 한 번에 구현하기보다, 역할에 따라 나누어 정리하려고 합니다. 제가 작성한 코드의 구조가 잘 정돈되어 있고 각 부분의 역할이 분명할 때 보람을 느낍니다.',
];

const paragraphs = PARAGRAPH_TEXTS.map((text, pi) => ({
  key: `para-${pi}`,
  text,
  words: text
    .split(' ')
    .map((word, wi) => ({ wordKey: `p${pi}-w${wi}`, word })),
}));

const PROFILE_ROWS = [
  { label: 'Birth', value: '2001. 02. 09.' },
  { label: 'Phone', value: '010-8512-3922' },
  { label: 'Location', value: '서울특별시 관악구' },
  { label: 'Email', value: 'itwillbeoptimal@gmail.com' },
  { label: 'Education', value: '부경대 컴퓨터공학과 (4.39/4.5)' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useClipReveal(titleRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 82%',
            once: true,
          },
        },
      );

      if (bodyRef.current) {
        gsap.fromTo(
          bodyRef.current.querySelectorAll('.reveal-word'),
          { opacity: 0.2 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: 'none',
            scrollTrigger: {
              trigger: bodyRef.current,
              start: 'top 75%',
              end: 'bottom 60%',
              scrub: true,
            },
          },
        );
      }

      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 82%',
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-44 px-6 md:px-16 xl:px-24"
    >
      <SectionHeader index="01" label="ABOUT" />
      <h2
        ref={titleRef}
        className="font-paperozi font-extrabold leading-none tracking-tight mb-14 md:mb-20"
        style={{ clipPath: 'inset(0 100% 0 0)' }}
      >
        소개
      </h2>
      <blockquote
        ref={quoteRef}
        className="mb-20 md:mb-28 pl-6 md:pl-8 max-w-3xl border-l-2 border-neon"
      >
        <h4 className="leading-[2]">
          기술적 완성도와 함께 사용자의 편의를 고민하는 프론트엔드 개발자
          김지훈입니다. 오류 없이 작동하는 것을 넘어, 사용자에게 자연스럽게
          받아들여지는 경험을 만들고자 합니다.
        </h4>
      </blockquote>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-14 md:gap-24">
        <div ref={bodyRef} className="md:col-span-3 space-y-10 md:space-y-14">
          {paragraphs.map(({ key, words }) => (
            <p
              key={key}
              className="text-[1.25rem] md:text-[1.6rem] leading-[2.0] font-medium flex flex-wrap gap-x-[0.25em]"
            >
              {words.map(({ wordKey, word }) => (
                <span
                  key={wordKey}
                  className="reveal-word inline-block opacity-20"
                >
                  {word}
                </span>
              ))}
            </p>
          ))}
        </div>
        <div
          ref={statsRef}
          className="md:col-span-2 flex flex-col gap-6 mt-4 md:mt-0"
        >
          <div className="p-8 md:p-12 flex flex-col items-center hover-glow transition-all duration-300 bg-card border border-[var(--border)]">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 border border-[var(--border)] relative group">
              <img
                src="/photo.webp"
                alt="Profile"
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              />
            </div>
            <h3 className="mb-6 text-[1.6rem] font-bold">김지훈</h3>
            <div className="w-full flex flex-col gap-5 text-left">
              {PROFILE_ROWS.map(({ label, value }, i) => (
                <div
                  key={label}
                  className={`flex justify-between items-center pb-4 ${i < PROFILE_ROWS.length - 1 ? 'border-b border-[var(--border)]' : ''}`}
                >
                  <span className="text-[var(--muted)]">{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
