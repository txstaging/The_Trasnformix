"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./SocialMedia.module.css";

export type SocialStickyItem = {
  title: string;
  /** The first reads in the darker ink, the rest in the secondary grey. */
  paragraphs: readonly string[];
  /** The item's photo, shown on the sticky card while the item is active. */
  image: string;
};

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

/** The capabilities' sticky scroll reveal (Figma "V2/Sticky Scroll Reveal —
    Social Media capabilities" 4984:9685, seven variants). The same behaviour as
    the hub's (creative/StickyScrollReveal): the text column scrolls inside the
    box, the item nearest the top is active and the others stand at 30%, and the
    card fades to the active item's photo with its title over it. Its items carry
    three paragraphs and no call, so the page keeps its own copy. Below 1024px
    the items stack, each over its own photo. */
export function SocialSticky({ label, items }: { label: string; items: readonly SocialStickyItem[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const frame = useRef(0);
  const [active, setActive] = useState(0);

  /* The active item is the one whose top lies nearest the line the first
     item starts on (the column's top padding). */
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
      <div className={styles.stickyCard} aria-hidden>
        {items.map((item, index) => (
          <Image
            key={item.image}
            className={cx(styles.stickyCardImage, index === active && styles.stickyCardImageActive)}
            src={item.image}
            alt=""
            fill
            sizes="440px"
          />
        ))}
        <span className={styles.stickyCardShade} />
        <span className={styles.stickyCardLabel}>{items[active]?.title}</span>
      </div>

      <div
        ref={scroller}
        className={styles.stickyScroller}
        onScroll={onScroll}
        role="region"
        aria-label={label}
        tabIndex={0}
      >
        <ol className={styles.stickyList}>
          {items.map((item, index) => (
            <li
              key={item.title}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              className={cx(styles.stickyItem, index === active && styles.stickyItemActive)}
            >
              <div className={styles.stickyPhoto} aria-hidden>
                <Image className={styles.stickyPhotoImage} src={item.image} alt="" fill sizes="100vw" />
              </div>
              <h3 className={styles.stickyTitle}>{item.title}</h3>
              {item.paragraphs.map((paragraph, number) => (
                <p key={paragraph} className={number === 0 ? styles.stickyLead : styles.stickyText}>
                  {paragraph}
                </p>
              ))}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
