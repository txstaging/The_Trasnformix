"use client";

import Image from "next/image";
import { useId, useMemo, useState, type CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { WORK_FILTERS, type WorkFilter, type WorkProject } from "./projects";
import styles from "./WorksGallery.module.css";

/** Cards per page; the artboard shows sixteen before "عرض المزيد". */
const PAGE_SIZE = 16;

const CARD_WIDTH = 604;
const FRAME = 462;

const rem = (px: number) => `${px / 10}rem`;
const pct = (value: number, of: number) => `${(value / of) * 100}%`;

const cx = (...names: (string | false | undefined)[]) =>
  names.filter(Boolean).join(" ");

/* Letter-case and Arabic letter forms that should not decide a match. */
const normalise = (text: string) =>
  text
    .toLowerCase()
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[\u064B-\u0652]/g, "")
    .trim();

const matches = (project: WorkProject, query: string) => {
  if (!query) return true;
  const haystack = normalise(
    [project.title, ...project.tags.map((tag) => tag.label)].join(" "),
  );
  return normalise(query)
    .split(/\s+/)
    .every((word) => haystack.includes(word));
};

function WorkCard({ project, index }: { project: WorkProject; index: number }) {
  const frame = project.frame ?? FRAME;
  const { crop } = project;

  const body = (
    <>
      {/* The picture keeps the artboard's crop at any width: its box is set in
          per cent of the 604-wide window it sits in. */}
      <div
        className={styles.media}
        style={{ aspectRatio: `${CARD_WIDTH} / ${frame}` }}
      >
        <Image
          className={cx(styles.mediaImage, crop.fit === "cover" && styles.cover)}
          style={{
            left: pct(crop.x, CARD_WIDTH),
            top: pct(crop.y, frame),
            width: pct(crop.w, CARD_WIDTH),
            height: pct(crop.h, frame),
          }}
          src={project.image}
          alt={project.title}
          width={Math.round(crop.w)}
          height={Math.round(crop.h)}
          sizes="(max-width: 640px) 110vw, (max-width: 1024px) 60vw, 52vw"
        />
      </div>

      <div className={styles.info}>
        <h3 dir="auto" className={styles.title}>
          {project.title}
        </h3>
        <ul className={styles.tags} aria-label="الخدمات">
          {project.tags.map((tag) => (
            <li
              key={tag.label}
              className={styles.tag}
              style={{ "--w": rem(tag.width ?? 133) } as CSSProperties}
            >
              {tag.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  const delay = (index % 2) * 110;

  return project.behanceUrl ? (
    <Reveal
      as="a"
      href={project.behanceUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} على Behance (يفتح في علامة تبويب جديدة)`}
      className={styles.card}
      delay={delay}
    >
      {body}
    </Reveal>
  ) : (
    <Reveal as="article" className={styles.card} delay={delay}>
      {body}
    </Reveal>
  );
}

/** Figma 2418:33318 — filters, search and the project grid (states 2418:33317,
    2418:39853 and 2422:2951). */
export function WorksGallery() {
  const [filterId, setFilterId] = useState<WorkFilter["id"]>("all");
  const [query, setQuery] = useState("");
  const [pages, setPages] = useState(1);
  const searchId = useId();

  const filter = WORK_FILTERS.find((item) => item.id === filterId) ?? WORK_FILTERS[0];

  const results = useMemo(
    () => filter.projects.filter((project) => matches(project, query)),
    [filter, query],
  );

  const visible = results.slice(0, pages * PAGE_SIZE);
  const hasMore = results.length > visible.length;

  const selectFilter = (id: WorkFilter["id"]) => {
    setFilterId(id);
    setPages(1);
  };

  return (
    <section className={styles.section} aria-labelledby={`${searchId}-heading`}>
      <h2 id={`${searchId}-heading`} className={styles.visuallyHidden}>
        أعمالنا
      </h2>

      <div className={cx(styles.inner, filterId !== "all" && styles.filtered)}>
        <div className={styles.toolbar}>
          <div className={styles.chips} role="group" aria-label="تصفية الأعمال حسب الخدمة">
            {WORK_FILTERS.map((item) => {
              const active = item.id === filterId;
              const chip = (
                <button
                  type="button"
                  className={cx(
                    styles.chip,
                    item.id === "all" && styles.chipAll,
                    active && styles.chipActive,
                  )}
                  aria-pressed={active}
                  onClick={() => selectFilter(item.id)}
                >
                  {item.label}
                </button>
              );

              return item.width ? (
                <span
                  key={item.id}
                  className={styles.chipSlot}
                  style={{ "--w": rem(item.width) } as CSSProperties}
                >
                  {chip}
                </span>
              ) : (
                <span key={item.id} className={styles.chipSlotAll}>
                  {chip}
                </span>
              );
            })}
          </div>

          <div className={styles.search}>
            <label htmlFor={searchId} className={styles.visuallyHidden}>
              ابحث في الأعمال
            </label>
            <input
              id={searchId}
              className={styles.searchInput}
              type="search"
              placeholder="ابحث"
              autoComplete="off"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPages(1);
              }}
            />
            <Image
              className={styles.searchIcon}
              src="/icons/search.svg"
              alt=""
              width={18}
              height={18}
              aria-hidden
            />
          </div>
        </div>

        <p className={styles.visuallyHidden} aria-live="polite">
          {results.length === 0 ? "لا توجد نتائج" : `${results.length} عمل`}
        </p>

        {visible.length > 0 ? (
          <div className={styles.grid}>
            {visible.map((project, index) => (
              <WorkCard
                key={`${filter.id}-${project.key}`}
                project={project}
                index={index}
              />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>
            {query
              ? "لا توجد أعمال تطابق بحثك."
              : "لا توجد أعمال في هذا القسم حاليًا."}
          </p>
        )}

        {/* Drawn under every state of the grid. It pages through the list,
            and stays in place (inert) once everything is showing. */}
        <button
          type="button"
          className={styles.more}
          aria-disabled={!hasMore}
          onClick={() => hasMore && setPages((count) => count + 1)}
        >
          عرض المزيد
        </button>
      </div>
    </section>
  );
}
