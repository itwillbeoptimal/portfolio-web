'use client';

import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import { SiGithub } from 'react-icons/si';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SectionHeader from '@/components/ui/SectionHeader';
import { useLenis } from '@/components/ui/SmoothScroll';
import { projects, type Project } from '@/data/projects';
import { useClipReveal } from '@/hooks/useClipReveal';
import { gsap } from '@/lib/gsap';
import type { Swiper as SwiperType } from 'swiper';

const pad = (n: number) => String(n).padStart(2, '0');

function InlineCode({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('`') && part.endsWith('`') && part.length > 2 ? (
          <code
            // eslint-disable-next-line react/no-array-index-key
            key={`${part.slice(0, 12)}-${i}`}
            className="font-mono text-[0.82em] px-1.5 py-0.5 rounded-sm text-neon"
            style={{
              background: 'rgba(0,255,135,0.07)',
              border: '1px solid rgba(0,255,135,0.15)',
            }}
          >
            {part.slice(1, -1)}
          </code>
        ) : (
          // eslint-disable-next-line react/no-array-index-key
          <span key={`${part.slice(0, 12)}-${i}`}>{part}</span>
        ),
      )}
    </>
  );
}

const isVideo = (src: string) => /\.(mp4|webm|mov|ogg)$/i.test(src);

function ProjectGallery({ images }: { images: string[] }) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const syncVideos = useCallback((realIndex: number) => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === realIndex) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, []);

  const handleSwiper = useCallback(
    (s: SwiperType) => {
      setSwiper(s);
      syncVideos(s.realIndex);
    },
    [syncVideos],
  );

  const handleSlideChange = useCallback(
    (s: SwiperType) => {
      setActiveIndex(s.realIndex);
      syncVideos(s.realIndex);
    },
    [syncVideos],
  );

  if (!images || images.length === 0) return null;

  return (
    <div className="detail-item mb-10 max-w-3xl">
      <div
        data-cursor-normal
        className="border border-[var(--border)] overflow-hidden aspect-video"
      >
        <Swiper
          modules={[EffectFade]}
          effect="fade"
          loop
          slidesPerView={1}
          onSwiper={handleSwiper}
          onSlideChange={handleSlideChange}
          style={{ width: '100%', height: '100%' }}
        >
          {images.map((src, i) => (
            <SwiperSlide key={src}>
              {isVideo(src) ? (
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  src={src}
                  className="w-full h-full object-cover block"
                  muted
                  loop
                  playsInline
                  autoPlay
                />
              ) : (
                <img
                  src={src}
                  alt={`슬라이드 ${i + 1}`}
                  className="w-full h-full object-cover block"
                  loading="lazy"
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex items-center justify-between mt-3 px-0.5">
        <span className="font-mono text-[11px] tracking-[0.15em] text-muted">
          <span className="text-foreground">{pad(activeIndex + 1)}</span>
          {' / '}
          {pad(images.length)}
        </span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => swiper?.slidePrev()}
            className="font-mono text-[11px] text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200 px-2 py-1 border border-[var(--border)] tracking-[0.1em]"
            aria-label="이전"
          >
            이전
          </button>
          <button
            type="button"
            onClick={() => swiper?.slideNext()}
            className="font-mono text-[11px] text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200 px-2 py-1 border border-[var(--border)] tracking-[0.1em]"
            aria-label="다음"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectRow({
  project,
  index,
  isOpen,
  onToggle,
  rowRefs,
  detailRefs,
}: {
  project: Project;
  index: number;
  isOpen: boolean;
  onToggle: (id: string) => void;
  rowRefs: { current: (HTMLDivElement | null)[] };
  detailRefs: { current: (HTMLDivElement | null)[] };
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useLayoutEffect(() => {
    const rows = rowRefs.current;
    const details = detailRefs.current;
    rows[index] = rowRef.current;
    details[index] = detailRef.current;
    return () => {
      rows[index] = null;
      details[index] = null;
    };
  }, [index, rowRefs, detailRefs]);

  useEffect(() => {
    if (!detailRef.current) return;

    if (!initialized.current) {
      gsap.set(detailRef.current, {
        height: 0,
        opacity: 0,
        overflow: 'hidden',
      });
      initialized.current = true;
    }

    if (isOpen) {
      gsap.to(detailRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.55,
        ease: 'power3.out',
      });
      gsap.fromTo(
        detailRef.current.querySelectorAll('.detail-item'),
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.5,
          ease: 'power3.out',
          delay: 0.08,
        },
      );
    } else {
      gsap.to(detailRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: 'power3.inOut',
      });
    }
  }, [isOpen]);

  const dimSiblings = useCallback(
    (currentTarget: HTMLElement, opacity: string) => {
      const parent = currentTarget.parentElement;
      if (!parent) return;
      Array.from(parent.children).forEach((siblingEl) => {
        if (siblingEl !== currentTarget) {
          (siblingEl as HTMLElement).style.opacity = opacity;
        }
      });
    },
    [],
  );

  return (
    <div
      ref={rowRef}
      className="px-4 border-b border-[var(--border)] group/row relative"
      style={{
        transition: 'background 0.3s, opacity 0.3s',
        background: isOpen ? 'rgba(0,255,135,0.02)' : 'transparent',
      }}
      onMouseEnter={(e) => dimSiblings(e.currentTarget, '0.3')}
      onMouseLeave={(e) => dimSiblings(e.currentTarget, '1')}
    >
      <button
        type="button"
        {...(!isOpen && { 'data-cursor-view': true })}
        className="w-full text-left py-10 md:py-16 px-0 focus:outline-none"
        onClick={() => onToggle(project.id)}
        aria-expanded={isOpen}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 pointer-events-none">
          <span
            className="font-mono text-[12px] md:text-sm shrink-0 md:w-10 font-bold"
            style={{ color: isOpen ? 'var(--neon)' : 'var(--muted)' }}
          >
            {project.index}
          </span>
          <div className="flex-1 min-w-0">
            <h3
              className="font-display font-bold leading-tight transition-colors duration-300"
              style={{ color: isOpen ? 'var(--neon)' : 'var(--text)' }}
            >
              {project.title}
            </h3>
            <p className="text-[14px] md:text-[15px] text-[var(--muted)] mt-2.5 leading-[1.9]">
              {project.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 md:w-64 shrink-0">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] md:text-[11px] text-[var(--muted)] px-2 py-0.5 border border-[var(--border-strong)]"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 shrink-0 pointer-events-auto">
            <span className="font-mono text-[12px] md:text-sm text-[var(--muted)]">
              {project.year}
            </span>
            <span
              className="w-5 h-5 flex items-center justify-center font-mono text-base"
              style={{
                color: isOpen ? 'var(--neon)' : 'var(--muted)',
                transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                transition:
                  'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s',
              }}
            >
              +
            </span>
          </div>
        </div>
      </button>
      <div ref={detailRef} className="overflow-hidden">
        <div className="pt-8 pb-16 px-4 md:pb-24 relative z-10">
          <ProjectGallery images={project.images} />
          <p className="detail-item text-[1.1rem] md:text-[1.25rem] text-[var(--muted)] leading-[2.1] mb-14 max-w-3xl font-light">
            {project.description}
          </p>
          <div className="space-y-14 md:space-y-16">
            {project.details.map((detail, i) => (
              <div key={detail.title} className="detail-item">
                <div className="flex flex-col gap-8 md:gap-12">
                  <div className="flex gap-4">
                    <span
                      className="font-mono text-[12px] md:text-sm shrink-0 mt-0.5 w-5 font-bold text-neon"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h4 className="font-semibold leading-snug">
                      {detail.title}
                    </h4>
                  </div>
                  <div className="flex gap-4 items-start">
                    <span
                      className="font-mono text-[11px] md:text-xs tracking-[0.1em] uppercase shrink-0 mt-1 px-2.5 py-1 text-muted border border-[var(--border-strong)]"
                      style={{ background: 'rgba(237,235,231,0.03)' }}
                    >
                      문제
                    </span>
                    <p className="text-[var(--muted)] leading-[2]">
                      <InlineCode text={detail.problem} />
                    </p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <span
                      className="font-mono text-[11px] md:text-xs tracking-[0.1em] uppercase shrink-0 mt-1 px-2.5 py-1 text-neon"
                      style={{
                        border: '1px solid rgba(0,255,135,0.35)',
                        background: 'rgba(0,255,135,0.05)',
                      }}
                    >
                      해결
                    </span>
                    <p className="leading-[2]">
                      <InlineCode text={detail.solution} />
                    </p>
                  </div>
                </div>
                {i < project.details.length - 1 && (
                  <div className="mt-14 h-px bg-[var(--border)]" />
                )}
              </div>
            ))}
          </div>
          <div className="detail-item mt-14 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] md:text-[11px] tracking-[0.1em] uppercase text-[var(--muted)] px-2.5 py-1 border border-[var(--border-strong)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-github inline-flex items-center gap-2 font-mono text-[12px] md:text-sm px-5 py-2.5 shrink-0 self-start md:self-auto transition-all duration-300 hover-glow text-neon border border-[rgba(0,255,135,0.4)]"
            >
              <SiGithub size={13} />
              GitHub에서 보기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>(
    Array(projects.length).fill(null),
  );
  const detailRefs = useRef<(HTMLDivElement | null)[]>(
    Array(projects.length).fill(null),
  );
  const lenis = useLenis();

  const handleToggle = useCallback(
    (id: string) => {
      const nextId = id === expanded ? null : id;

      if (nextId && expanded) {
        const oldIndex = projects.findIndex((p) => p.id === expanded);
        const newIndex = projects.findIndex((p) => p.id === nextId);
        const newRow = rowRefs.current[newIndex];
        const oldDetail = detailRefs.current[oldIndex];
        const captured = nextId;

        setExpanded(null);

        if (newIndex > oldIndex && oldDetail) {
          lenis?.stop();
          let prevHeight = oldDetail.offsetHeight;
          let rafId: number;
          const followShrink = () => {
            const curr = oldDetail.offsetHeight;
            const delta = prevHeight - curr;
            if (delta > 0) {
              window.scrollTo(0, Math.max(0, window.scrollY - delta));
            }
            prevHeight = curr;
            rafId = requestAnimationFrame(followShrink);
          };
          rafId = requestAnimationFrame(followShrink);

          setTimeout(() => {
            cancelAnimationFrame(rafId);
            lenis?.start();
            setExpanded(captured);
            if (newRow && lenis) {
              requestAnimationFrame(() =>
                lenis.scrollTo(newRow, { offset: -80 }),
              );
            }
          }, 400);
        } else {
          setTimeout(() => {
            setExpanded(captured);
            if (newRow && lenis) {
              requestAnimationFrame(() =>
                lenis.scrollTo(newRow, { offset: -80 }),
              );
            }
          }, 400);
        }
      } else if (nextId) {
        setExpanded(nextId);
        const newRow =
          rowRefs.current[projects.findIndex((p) => p.id === nextId)];
        if (newRow && lenis) {
          requestAnimationFrame(() => lenis.scrollTo(newRow, { offset: -80 }));
        }
      } else {
        setExpanded(null);
      }
    },
    [expanded, lenis],
  );

  useClipReveal(titleRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (listRef.current) {
        gsap.fromTo(
          listRef.current.querySelectorAll(':scope > *'),
          { x: -24, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: listRef.current, start: 'top 76%' },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-28 md:py-48 px-6 md:px-16 xl:px-24"
    >
      <SectionHeader index="02" label="PROJECTS" />
      <h2
        ref={titleRef}
        className="font-paperozi font-extrabold leading-none tracking-tight mb-10 md:mb-14"
        style={{ clipPath: 'inset(0 100% 0 0)' }}
      >
        프로젝트
      </h2>
      <p className="text-[0.875rem] md:text-[0.9375rem] text-[var(--muted)] mb-14 md:mb-20 leading-relaxed">
        각 항목을 클릭하면 구현 내용을 확인할 수 있습니다.
      </p>
      <div ref={listRef} className="relative border-t border-[var(--border)]">
        {projects.map((project, i) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={i}
            isOpen={expanded === project.id}
            onToggle={handleToggle}
            rowRefs={rowRefs}
            detailRefs={detailRefs}
          />
        ))}
      </div>
    </section>
  );
}
