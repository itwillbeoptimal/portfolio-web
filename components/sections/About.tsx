'use client';

import { useEffect, useRef } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import { useClipReveal } from '@/hooks/useClipReveal';
import { gsap } from '@/lib/gsap';

const PARAGRAPH_TEXTS = [
  '기술적 완성도와 함께 사용자의 편의를 고민하는 프론트엔드 개발자 김지훈입니다. 마이크 입력 상태를 알기 어려운 순간이나 알림이 오지 않아 다시 웹을 확인해야 하는 상황처럼, 사소하지만 신경 쓰이는 문제를 그냥 지나치지 않습니다.',
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

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

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
        className="mb-12 md:mb-20 pl-6 md:pl-8 border-l-2 border-neon"
      >
        <h2 className="font-semibold text-[1.3rem] md:text-[1.5rem] leading-[2]">
          아이디어는 거창한 문제보다 작은 불편에서 시작됩니다.
        </h2>
      </blockquote>
      <div ref={bodyRef} className="space-y-10 md:space-y-14">
        {paragraphs.map(({ key, words }) => (
          <p
            key={key}
            className="text-[1.1rem] md:text-[1.3rem] leading-[2] flex flex-wrap gap-x-[0.25em]"
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
    </section>
  );
}
