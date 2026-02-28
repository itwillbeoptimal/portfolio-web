'use client';

import { useEffect, useRef } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import { useClipReveal } from '@/hooks/useClipReveal';
import { gsap } from '@/lib/gsap';

const PARAGRAPH_TEXTS = [
  '아이디어는 주로 사용자가 실제로 겪는 불편함에서 시작됩니다. 마이크 입력 여부를 알기 어려운 상황이나 업로드 중 화면이 멈춘 것처럼 느껴지는 순간, 알림이 오지 않아 다시 웹을 열어야 하는 번거로움 같은 경험들에 관심을 둡니다.',
  '이러한 문제를 해결하는 과정에서 브라우저가 생각보다 많은 역할을 수행할 수 있다는 점을 탐구하고 있습니다. Web Audio API를 활용한 음성 시각화처럼 사용자의 상태를 직관적으로 전달하거나, 환경 제약 속에서도 가능한 구현 방식을 찾아보는 시도에 흥미를 느낍니다.',
  '또한 복잡해지기 쉬운 인증 흐름이나 실시간 통신 구조를 어떻게 하면 더 명확하게 구성할 수 있을지 고민합니다. 아직 배워가는 단계이지만, 구조를 정리한 뒤 코드의 의도가 분명해질 때 보람을 느낍니다.',
  '웹과 모바일 환경을 모두 경험하며 각 환경의 제약을 이해하고, 그 안에서 현실적인 선택지를 찾아가고 있습니다. 가능한 범위를 정확히 인식한 상태에서 더 나은 사용자 경험을 만드는 개발자가 되고자 합니다.',
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
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-8 border border-[var(--border)] relative group">
              <img
                src="/photo.webp"
                alt="Profile"
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              />
            </div>
            <h3 className="text-[1.6rem] font-bold">김지훈</h3>
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
