"use client";

import { useEffect, useRef } from "react";
import { CREATIVE_LABEL, CREATIVE_NAV, creativeHref, type CreativeKey } from "@/lib/creativeNav";
import creative from "./Creative.module.css";

/** The section's local nav (Figma V2/Local Nav 4923:9136): nine tabs under
    the site's navbar, the current one bold with a 2px brand underline. Where
    the tabs run past the screen the current one is brought into view. */
export function CreativeNav({ current }: { current: CreativeKey }) {
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    /* `block: "nearest"` keeps the page where it is; only the row moves. */
    list.current
      ?.querySelector<HTMLElement>('[aria-current="page"]')
      ?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [current]);

  return (
    <nav className={creative.localNav} aria-label={CREATIVE_LABEL}>
      <ul ref={list} className={creative.localNavList}>
        {CREATIVE_NAV.map((entry) => {
          const here = entry.key === current;
          return (
            <li key={entry.key} className={creative.localNavItem}>
              <a
                href={creativeHref(entry.key)}
                className={here ? `${creative.localNavLink} ${creative.localNavCurrent}` : creative.localNavLink}
                aria-current={here ? "page" : undefined}
                aria-label={entry.title && !here ? entry.title : undefined}
              >
                {entry.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
