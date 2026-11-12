"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./Academies.module.css";

/** A card's copy held to two lines, with the artboard's inline "… قراءة المزيد"
    over the end of the second line (Figma 4701:2354). The call only shows
    when the copy actually runs longer, and opens it in place. */
export function ClampText({ text }: { text: string }) {
  const id = useId();
  const ref = useRef<HTMLParagraphElement>(null);
  const [open, setOpen] = useState(false);
  /* Assume it overflows until measured, so the call doesn't pop in. */
  const [overflows, setOverflows] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || open) return;
    const measure = () => setOverflows(node.scrollHeight > node.clientHeight + 1);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [open]);

  return (
    <div className={open ? `${styles.clamp} ${styles.clampOpen}` : styles.clamp}>
      <p ref={ref} id={id} className={styles.clampText}>
        {text}
      </p>
      {overflows && !open && (
        <button
          type="button"
          className={styles.more}
          aria-expanded={false}
          aria-controls={id}
          onClick={() => setOpen(true)}
        >
          <span className={styles.moreFade} aria-hidden />
          <span className={styles.moreLabel}>… قراءة المزيد</span>
        </button>
      )}
      {open && (
        <button
          type="button"
          className={styles.less}
          aria-expanded
          aria-controls={id}
          onClick={() => setOpen(false)}
        >
          عرض أقل
        </button>
      )}
    </div>
  );
}
