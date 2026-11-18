"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AcademyAction, type Action } from "@/components/academies/AcademyAction";
import creative from "./Creative.module.css";

export type StickyItem = {
  title: string;
  /** One paragraph, or several: the first reads in the ink colour, the rest in grey. */
  text: string | readonly string[];
  /** The item's photo, shown on the sticky card while the item is active. */
  image: string;
  /** Where the item's call leads, as a link; an item may have none. */
  action?: Pick<Action, "label" | "href">;
};

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

/** Sticky scroll reveal (Figma V2/Sticky Scroll Reveal 4901:9129; after
    ui.aceternity.com/components/sticky-scroll-reveal). The text column scrolls
    inside the box; the item nearest the top is the active one, the others
    stand at 30%, and the card beside it fades to the active item's photo
    (400ms). Below 1024px the box stops being a scroller: the items stack,
    each with its own photo.

    The column is a scrollable region the keyboard can reach, and focusing a
    call inside it scrolls its item into place — so it never hides content from
    anyone who cannot use a wheel. */
export function StickyScrollReveal({ id, label, items, flat, bare }: {
  id?: string;
  /** Names the scrolling region for assistive technology. */
  label: string;
  items: readonly StickyItem[];
  /** Every paragraph reads in the grey, where the first would be the ink. */
  flat?: boolean;
  /** Draws the box with no rule or fill, as one artboard has it. */
  bare?: boolean;
}) {
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
    <div id={id} className={cx(creative.sticky, bare && creative.stickyBare)}>
      <div className={creative.stickyCard} aria-hidden>
        {items.map((item, index) => (
          <Image
            key={item.title}
            className={cx(creative.stickyCardImage, index === active && creative.stickyCardImageActive)}
            src={item.image}
            alt=""
            fill
            sizes="440px"
          />
        ))}
        <span className={creative.stickyCardShade} />
      </div>

      <div
        ref={scroller}
        className={creative.stickyScroller}
        onScroll={onScroll}
        role="region"
        aria-label={label}
        tabIndex={0}
      >
        <ol className={creative.stickyList}>
          {items.map((item, index) => (
            <li
              key={item.title}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              className={cx(creative.stickyItem, index === active && creative.stickyItemActive)}
            >
              <div className={creative.stickyPhoto} aria-hidden>
                <Image className={creative.stickyPhotoImage} src={item.image} alt="" fill sizes="100vw" />
              </div>
              <h3 className={creative.stickyTitle}>{item.title}</h3>
              {(typeof item.text === "string" ? [item.text] : item.text).map((paragraph, at, all) => (
                <p key={paragraph} className={cx(creative.stickyText, !flat && all.length > 1 && at === 0 && creative.stickyTextLead)}>
                  {paragraph}
                </p>
              ))}
              {item.action && <AcademyAction action={{ ...item.action, tone: "link" }} />}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
