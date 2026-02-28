'use client';

import React, { useEffect, useRef } from 'react';
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiJavascript,
  SiTailwindcss,
  SiFramer,
  SiStyledcomponents,
  SiJest,
  SiTestinglibrary,
  SiStorybook,
  SiPrettier,
  SiEslint,
  SiReactquery,
  SiAxios,
  SiReacthookform,
  SiZod,
  SiRecoil,
  SiExpress,
} from 'react-icons/si';
import SectionHeader from '@/components/ui/SectionHeader';
import { useClipReveal } from '@/hooks/useClipReveal';
import { gsap } from '@/lib/gsap';

const SKILLS_ROW1_LABELS = [
  'HTML5',
  'CSS3',
  'JavaScript',
  'TypeScript',
  'React',
  'React Native',
  'Next.js',
  'TanStack Query',
  'Jotai',
  'Recoil',
  'React Hook Form',
  'Zod',
];

const SKILLS_ROW2_LABELS = [
  'Emotion',
  'Tailwind CSS',
  'Framer Motion',
  'STOMP.js',
  'GitHub',
  'Figma',
  'Notion',
  'Slack',
  'Discord',
];

const skillsRow1 = [...SKILLS_ROW1_LABELS, ...SKILLS_ROW1_LABELS].map(
  (skill, i) => ({ id: `row1-${i}`, skill }),
);
const skillsRow2 = [...SKILLS_ROW2_LABELS, ...SKILLS_ROW2_LABELS].map(
  (skill, i) => ({ id: `row2-${i}`, skill }),
);

interface IconProps {
  size?: number;
  style?: React.CSSProperties;
}
interface TechItem {
  name: string;
  icon?: React.ComponentType<IconProps>;
  color?: string;
}

const competencies: { category: string; items: TechItem[] }[] = [
  {
    category: '언어 및 프레임워크',
    items: [
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'React Native', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
      { name: 'Express.js', icon: SiExpress, color: '#FFFFFF' },
    ],
  },
  {
    category: '상태 및 데이터',
    items: [
      { name: 'TanStack Query', icon: SiReactquery, color: '#FF4154' },
      { name: 'Jotai', color: '#888888' },
      { name: 'Recoil', icon: SiRecoil, color: '#3578E5' },
      { name: 'Axios', icon: SiAxios, color: '#5A29E4' },
      { name: 'React Hook Form', icon: SiReacthookform, color: '#EC5990' },
      { name: 'Zod', icon: SiZod, color: '#3068B7' },
    ],
  },
  {
    category: 'UI 및 스타일링',
    items: [
      { name: 'Emotion', icon: SiStyledcomponents, color: '#DB7093' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Framer Motion', icon: SiFramer, color: '#FFFFFF' },
    ],
  },
  {
    category: '테스트 및 품질 관리',
    items: [
      { name: 'Jest', icon: SiJest, color: '#C21325' },
      {
        name: 'React Testing Library',
        icon: SiTestinglibrary,
        color: '#E33332',
      },
      { name: 'Storybook', icon: SiStorybook, color: '#FF4785' },
      { name: 'ESLint', icon: SiEslint, color: '#4B32C3' },
      { name: 'Prettier', icon: SiPrettier, color: '#F7B93E' },
    ],
  },
];

interface MarqueeItem {
  id: string;
  skill: string;
}

function MarqueeRow({
  items,
  direction,
  speed = 32,
}: {
  items: MarqueeItem[];
  direction: 'left' | 'right';
  speed?: number;
}) {
  return (
    <div className="overflow-hidden py-5 md:py-7 border-y border-[var(--border)]">
      <div
        className={`marquee-track ${direction === 'left' ? 'marquee-left' : 'marquee-right'}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {items.map(({ id, skill }) => (
          <span
            key={id}
            className="marquee-item font-display text-[1.5rem] md:text-[2rem] font-bold uppercase tracking-wide mx-6 transition-all duration-300 cursor-default text-muted opacity-[0.35]"
          >
            {skill}
            <span className="mx-5 text-neon opacity-40">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useClipReveal(titleRef, 1.3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.from(gridRef.current.querySelectorAll('.skill-card'), {
          y: 32,
          opacity: 0,
          stagger: 0.08,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 82%',
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative py-24 md:py-44">
      <div className="px-6 md:px-16 xl:px-24">
        <SectionHeader index="03" label="SKILLS" />
      </div>
      <div className="px-6 md:px-16 xl:px-24 mb-10 overflow-hidden">
        <h2
          ref={titleRef}
          className="font-paperozi font-extrabold leading-none tracking-tight mb-12 md:mb-16"
          style={{ clipPath: 'inset(0 100% 0 0)' }}
        >
          기술 스택
        </h2>
      </div>
      <div className="space-y-0">
        <MarqueeRow items={skillsRow1} direction="left" speed={30} />
        <MarqueeRow items={skillsRow2} direction="right" speed={38} />
      </div>

      <div
        ref={gridRef}
        className="px-6 md:px-16 xl:px-24 mt-20 md:mt-28 grid grid-cols-1 lg:grid-cols-4 auto-rows-[minmax(240px,auto)] gap-5 md:gap-8"
      >
        {competencies.map(({ category, items }) => (
          <div
            key={category}
            className="skill-card relative p-8 md:p-10 hover-glow transition-all duration-300 group cursor-default overflow-hidden md:col-span-1 bg-card border border-[var(--border)]"
            data-cursor-hover
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;

              const hoveredLi = (e.target as HTMLElement).closest('li');
              let color = 'rgba(0, 255, 135, 0.15)';
              if (hoveredLi) {
                const iconSpan = hoveredLi.querySelector('.icon-wrapper');
                if (iconSpan) {
                  const brandColor = (iconSpan as HTMLElement).dataset.color;
                  if (brandColor && brandColor.startsWith('#')) {
                    const r = parseInt(brandColor.slice(1, 3), 16);
                    const g = parseInt(brandColor.slice(3, 5), 16);
                    const b = parseInt(brandColor.slice(5, 7), 16);
                    color = `rgba(${r},${g},${b},0.15)`;
                  }
                }
              }

              gsap.to(e.currentTarget.querySelector('.glow-bg'), {
                x,
                y,
                background: `radial-gradient(circle at center, ${color} 0%, transparent 60%)`,
                duration: 0.4,
                ease: 'power2.out',
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget.querySelector('.glow-bg'), {
                opacity: 0,
                duration: 0.5,
              });
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget.querySelector('.glow-bg'), {
                opacity: 1,
                duration: 0.3,
              });
            }}
          >
            <div
              className="glow-bg absolute w-[400px] h-[400px] rounded-full pointer-events-none opacity-0 mix-blend-screen"
              style={{
                top: -200,
                left: -200,
                background:
                  'radial-gradient(circle at center, rgba(0,255,135,0.15) 0%, transparent 60%)',
                filter: 'blur(40px)',
              }}
            />
            <div className="relative z-10 w-full h-full flex flex-col">
              <h3 className="font-mono text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] mb-8 text-neon">
                {category}
              </h3>
              <ul className="flex flex-col gap-5 flex-1">
                {items.map(({ name, icon: Icon, color }) => (
                  <li key={name} className="flex items-center gap-3">
                    <span
                      className="icon-wrapper flex items-center justify-center w-6 h-6"
                      data-color={color}
                    >
                      {Icon ? (
                        <Icon
                          size={16}
                          style={{
                            color: color || 'var(--muted)',
                            flexShrink: 0,
                          }}
                        />
                      ) : (
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0"
                          style={{
                            background: color || 'var(--muted)',
                            opacity: 0.7,
                          }}
                        />
                      )}
                    </span>
                    <span className="text-[15.5px] md:text-[16.5px] text-[var(--muted)] group-hover:text-[var(--text)] transition-colors duration-300 leading-[2.1]">
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
