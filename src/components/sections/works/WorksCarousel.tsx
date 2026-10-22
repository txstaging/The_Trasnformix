"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import styles from "./WorksCarousel.module.css";

export type WorkCarouselProject = {
  name: string;
  category: string;
  src: string;
  href: string;
  crop: { left: number; top: number; width: number; height: number };
};

const wrap = (value: number, total: number) => ((value % total) + total) % total;
const percent = (value: number, total: number) => `${(value / total) * 100}%`;

function CarouselCard({
  project,
  index,
  total,
  position,
  active,
  reducedMotion,
  select,
}: {
  project: WorkCarouselProject;
  index: number;
  total: number;
  position: MotionValue<number>;
  active: boolean;
  reducedMotion: boolean;
  select: () => void;
}) {
  const offset = useTransform(position, (value) => {
    const mapped = wrap(index - value, total);
    return mapped > total / 2 ? mapped - total : mapped;
  });
  const distance = useTransform(offset, Math.abs);
  // CSS lengths let the original size interpolation adapt to every breakpoint.
  const width = useTransform(distance, (value) => {
    const blend = Math.min(value, 1);
    return `calc(var(--center-width) * ${1 - blend} + var(--side-width) * ${blend})`;
  });
  const height = useTransform(distance, (value) => {
    const blend = Math.min(value, 1);
    return `calc(var(--center-height) * ${1 - blend} + var(--side-height) * ${blend})`;
  });
  const marginLeft = useTransform(width, (value) => `calc(${value} / -2)`);
  const marginTop = useTransform(height, (value) => `calc(${value} / -2)`);
  const x = useTransform(offset, (value) => {
    const absolute = Math.abs(value);
    const first = Math.min(absolute, 1);
    const rest = Math.max(absolute - 1, 0) * 0.85;
    return `calc(${Math.sign(value)} * ((var(--center-width) / 2 + var(--carousel-gap) + var(--side-width) / 2) * ${first} + (var(--side-width) + var(--carousel-gap)) * ${rest}))`;
  });
  const z = useTransform(distance, (value) =>
    reducedMotion ? "0px" : `calc(var(--carousel-depth) * ${-value})`,
  );
  const rotateY = useTransform(offset, (value) =>
    reducedMotion ? 0 : Math.sign(value) * Math.min(Math.abs(value) * 35, 90),
  );
  const zIndex = useTransform(distance, (value) => 1000 - Math.round(value * 10));
  const opacity = useTransform(distance, [0, 5, 7], [1, 1, 0]);

  return (
    <motion.article
      className={styles.card}
      aria-hidden={!active}
      style={{ width, height, marginLeft, marginTop, x, z, rotateY, zIndex, opacity }}
    >
      <a
        className={styles.cardLink}
        href={project.href}
        tabIndex={active ? 0 : -1}
        aria-label={`${project.name} — ${project.category}`}
        draggable={false}
        onClick={(event) => {
          if (!active) {
            event.preventDefault();
            select();
          }
        }}
      >
        <Image
          className={styles.cardImage}
          src={project.src}
          alt={project.name}
          width={project.crop.width}
          height={project.crop.height}
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 74vw, 604px"
          draggable={false}
          style={{
            left: percent(project.crop.left, 604),
            top: percent(project.crop.top, 391),
            width: percent(project.crop.width, 604),
            height: percent(project.crop.height, 391),
          }}
        />
        <span className={styles.caption} dir="rtl">
          <span className={styles.captionCopy}>
            <span className={styles.category}>{project.category}</span>
            <span className={styles.projectName} dir="auto">{project.name}</span>
          </span>
          <Image
            className={styles.captionIcon}
            src="/icons/lucide-external-link.svg"
            alt=""
            width={29}
            height={29}
            aria-hidden
          />
        </span>
      </a>
    </motion.article>
  );
}

export function WorksCarousel({ projects }: { projects: WorkCarouselProject[] }) {
  const instructionsId = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const snapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didPan = useRef(false);
  const [activeSlot, setActiveSlot] = useState(0);
  const reducedMotion = useReducedMotion() ?? false;
  const target = useMotionValue(0);
  const spring = useSpring(target, {
    stiffness: 180,
    damping: 100,
    mass: 1,
    restDelta: 0.001,
  });
  const position = reducedMotion ? target : spring;
  // The supplied carousel repeats its pool to keep wrapping outside the viewport.
  const cards = useMemo(
    () => Array.from({ length: Math.ceil(18 / projects.length) }, () => projects).flat(),
    [projects],
  );
  const activeProject = activeSlot % projects.length;

  useMotionValueEvent(position, "change", (value) => {
    const next = wrap(Math.round(value), cards.length);
    setActiveSlot((current) => current === next ? current : next);
  });

  useEffect(() => () => {
    if (snapTimeout.current) clearTimeout(snapTimeout.current);
  }, []);

  const clearSnap = () => {
    if (snapTimeout.current) clearTimeout(snapTimeout.current);
  };

  const navigate = (delta: number) => {
    clearSnap();
    target.set(Math.round(target.get()) + delta);
  };

  const selectProject = (index: number) => {
    const current = Math.round(target.get());
    let delta = wrap(index - current, projects.length);
    if (delta > projects.length / 2) delta -= projects.length;
    clearSnap();
    target.set(current + delta);
  };

  return (
    <div className={styles.carousel}>
      <p id={instructionsId} className={styles.visuallyHidden}>
        اسحب لعرض المشاريع، أو استخدم السهمين الأيمن والأيسر للتنقل.
      </p>
      <motion.div
        ref={viewportRef}
        className={styles.viewport}
        role="region"
        aria-roledescription="عارض شرائح"
        aria-label="مشاريع Transformix"
        aria-describedby={instructionsId}
        tabIndex={0}
        dir="ltr"
        onPointerDown={() => { didPan.current = false; }}
        onClickCapture={(event) => {
          if (didPan.current && event.detail > 0) {
            event.preventDefault();
            event.stopPropagation();
            didPan.current = false;
          }
        }}
        onWheel={(event) => {
          if (event.ctrlKey) return;
          const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
            ? event.deltaX : event.deltaY * 0.8;
          target.set(target.get() + delta * 0.004);
          clearSnap();
          snapTimeout.current = setTimeout(() => target.set(Math.round(target.get())), 150);
        }}
        onPanStart={() => {
          didPan.current = true;
          clearSnap();
        }}
        onPan={(_, info) => {
          // A swipe crosses the same fraction of a project on small screens.
          const width = viewportRef.current?.clientWidth ?? 1440;
          const sensitivity = 0.005 * Math.max(1, 700 / width);
          target.set(target.get() - info.delta.x * sensitivity);
        }}
        onPanEnd={(_, info) => {
          const momentum = Math.max(-2, Math.min(2, -info.velocity.x * 0.0015));
          target.set(Math.round(target.get() + momentum));
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            navigate(event.key === "ArrowRight" ? 1 : -1);
          } else if (event.key === "Home" || event.key === "End") {
            event.preventDefault();
            selectProject(event.key === "Home" ? 0 : projects.length - 1);
          }
        }}
      >
        <div className={styles.scene}>
          {cards.map((project, index) => (
            <CarouselCard
              key={`${project.src}-${index}`}
              project={project}
              index={index}
              total={cards.length}
              position={position}
              active={index === activeSlot}
              reducedMotion={reducedMotion}
              select={() => {
                selectProject(index % projects.length);
                viewportRef.current?.focus({ preventScroll: true });
              }}
            />
          ))}
        </div>
      </motion.div>

      <div className={styles.controls} dir="ltr">
        <button type="button" className={styles.arrow} aria-label="المشروع السابق" onClick={() => navigate(-1)}>
          <span aria-hidden>←</span>
        </button>
        <div className={styles.pagination} role="group" aria-label="اختيار مشروع">
          {projects.map((project, index) => (
            <button
              key={project.src}
              type="button"
              className={styles.pageButton}
              aria-label={`عرض ${project.name} — ${project.category}`}
              aria-current={index === activeProject ? "true" : undefined}
              onClick={() => selectProject(index)}
            >
              <span className={styles.dot} />
            </button>
          ))}
        </div>
        <button type="button" className={styles.arrow} aria-label="المشروع التالي" onClick={() => navigate(1)}>
          <span aria-hidden>→</span>
        </button>
      </div>
      <p className={styles.visuallyHidden} aria-live="polite" aria-atomic="true">
        {activeProject + 1} من {projects.length}: {projects[activeProject].name}، {projects[activeProject].category}
      </p>
    </div>
  );
}
