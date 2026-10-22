"use client";

import Image from "next/image";
import { CompMedia } from "@/english/components/ui/CompMedia";
import { Reveal } from "@/english/components/ui/Reveal";
import { useInView } from "@/lib/useInView";
import styles from "@/english/components/sections/AllInOne.module.css";

export function AllInOne() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.banner}>
          <Image
            className={styles.bannerPlate}
            src="/icons/tree.svg"
            alt=""
            width={1173}
            height={121}
            aria-hidden
          />
          <h2 className={styles.bannerTitle}>{"Everything you need in one place"}</h2>
        </Reveal>

        <div className={styles.body}>
          <div
            ref={ref}
            className={[styles.diagram, inView && styles.diagramIn]
              .filter(Boolean)
              .join(" ")}
          >
            <div className={styles.diagramInner}>
              <CompMedia
                name="diagram"
                poster="/images/comp-3-1.png"
                width={639}
                height={567}
                label={"Diagram showing Transformix services branching from one source"}
              />
            </div>
          </div>

          <Reveal as="p" className={styles.caption}>
            {" Discover how Transformix brings creativity and technology together to build digital services and solutions that help your company grow with confidence. "}</Reveal>
        </div>
      </div>
    </section>
  );
}
