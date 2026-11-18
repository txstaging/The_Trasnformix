"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./MediaBuying.module.css";

export type MediaStickyItem = { title: string; text: string };

/** The capabilities' sticky scroll reveal (Figma 4973:8629). It is the
    shared reveal without a call under each item: the text column scrolls
    inside the box, the item nearest the top is the active one (the rest stand
    at 30%) and the photo card repeats its title. Below 1024px the box stops
    scrolling and the items stack under the photo. */
export function MediaSticky({ label, image, alt, items }: {
  label: string;
  image: string;
  alt: string;
  items: readonly MediaStickyItem[];
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const frame = useRef(0);
  const [active, setActive] = useState(0);

  const measure = useCallback(() => {
    const box = scroller.current;
    const nodes = itemRefs.current;
    if (!box || !nodes[0]) return;
    const line = box.scrollTop + nodes[0].offsetTop;
    let nearest = 0;
    let gap = Infinity;
    nodes.forEach((node, index) => {
      if (!node) return;
      const distance = Math.abs(node.offsetTop - line);
      if (distance < gap) {
        gap = distance;
        nearest = index;
      }
    });
    setActive(nearest);
  }, []);

  const onScroll = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(measure);
  }, [measure]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return (
    <div className={styles.sticky}>
      <div className={styles.stickyCard}>
        <Image className={styles.stickyImage} src={image} alt={alt} fill sizes="440px" />
        <span className={styles.stickyShade} aria-hidden />
        <p className={styles.stickyCardTitle} aria-hidden>
          {items[active]?.title}
        </p>
      </div>

      <div ref={scroller} className={styles.stickyScroller} onScroll={onScroll} role="region" aria-label={label} tabIndex={0}>
        <ol className={styles.stickyList}>
          {items.map((item, index) => (
            <li
              key={item.title}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              className={index === active ? `${styles.stickyItem} ${styles.stickyItemActive}` : styles.stickyItem}
            >
              <h3 className={styles.stickyTitle}>{item.title}</h3>
              <p className={styles.stickyText}>{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
