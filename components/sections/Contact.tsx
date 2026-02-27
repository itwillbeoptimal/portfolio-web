'use client';

import { useEffect, useRef } from 'react';
import { IoMailOutline } from 'react-icons/io5';
import { SiGithub, SiLinkedin, SiVelog } from 'react-icons/si';
import SectionHeader from '@/components/ui/SectionHeader';
import { gsap } from '@/lib/gsap';

const EMAIL = 'itwillbeoptimal@gmail.com';
const LINKEDIN_URL =
  'https://www.linkedin.com/in/%EC%A7%80%ED%9B%88-%EA%B9%80-52313831a/';
const GITHUB_URL = 'https://github.com/itwillbeoptimal';
const VELOG_URL = 'https://velog.io/@itwillbeoptimal/posts';

const links = [
  {
    href: `mailto:${EMAIL}`,
    Icon: IoMailOutline,
    label: '이메일',
    external: false,
  },
  { href: LINKEDIN_URL, Icon: SiLinkedin, label: 'LinkedIn', external: true },
  { href: GITHUB_URL, Icon: SiGithub, label: 'GitHub', external: true },
  { href: VELOG_URL, Icon: SiVelog, label: 'velog', external: true },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 20,
        opacity: 0,
        immediateRender: false,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 82%',
          once: true,
        },
      });

      if (iconsRef.current) {
        gsap.from(iconsRef.current.querySelectorAll('a'), {
          y: 20,
          opacity: 0,
          immediateRender: false,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: iconsRef.current,
            start: 'top 88%',
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
      id="contact"
      className="relative py-24 md:py-44 px-6 md:px-16 xl:px-24 overflow-hidden"
    >
      <div
        className="absolute pointer-events-none bottom-[-10%] right-[-5%] w-[60vw] h-[60vw] blur-[80px]"
        style={{
          background:
            'radial-gradient(circle, rgba(0,102,255,0.07) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute pointer-events-none bottom-[10%] left-[-5%] w-[40vw] h-[40vw] blur-[70px]"
        style={{
          background:
            'radial-gradient(circle, rgba(0,255,135,0.05) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />
      <div className="relative z-10">
        <SectionHeader index="04" label="CONTACT" />
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20 md:mb-28"
        >
          <h2 className="font-paperozi font-extrabold leading-none tracking-tight">
            연락처
          </h2>
          <p className="text-[var(--muted)] leading-relaxed max-w-xs md:text-right">
            새로운 프로젝트나 협업 기회가 있다면
            <br />
            언제든지 연락 주시면 감사하겠습니다 🙇‍♂️
          </p>
        </div>
        <div ref={iconsRef} className="flex items-center gap-14 md:gap-20">
          {links.map(({ href, Icon, label, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="contact-link group flex items-center justify-center transition-colors duration-300 text-muted"
              {...(external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              <Icon size={36} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
