import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "@/english/components/v2/ui/Media.module.css";
import motion from "@/english/components/v2/ui/Motion.module.css";

/** Where Figma places an image inside its frame, in % of the frame. */
export type Crop = { left: number; top: number; width: number; height: number };

type MediaProps = {
  src: string;
  alt: string;
  /** The frame's design size in px; it keeps this ratio when it narrows. */
  width: number;
  height: number;
  /** Corner radius in design px. */
  radius?: number;
  fit?: "cover" | "contain";
  crop?: Crop;
  /** Rendered width hint for the image optimiser. */
  sizes?: string;
  priority?: boolean;
  className?: string;
};

const pct = (n: number) => `${n}%`;

/** A fixed-ratio image frame, the way the artboards draw every photo and
    dashboard render. */
export function Media({
  src,
  alt,
  width,
  height,
  radius = 0,
  fit = "cover",
  crop,
  sizes = `(max-width: 1024px) 100vw, ${width}px`,
  priority,
  className,
}: MediaProps) {
  return (
    <div
      className={[styles.frame, motion.settle, className].filter(Boolean).join(" ")}
      style={
        {
          "--w": `${width / 10}rem`,
          "--ratio": `${width} / ${height}`,
          "--radius": `${radius / 10}rem`,
          ...(crop && {
            "--crop-left": pct(crop.left),
            "--crop-top": pct(crop.top),
            "--crop-w": pct(crop.width),
            "--crop-h": pct(crop.height),
          }),
        } as CSSProperties
      }
    >
      {crop ? (
        /* The image overhangs the frame by the crop, so it is sized here and
           placed by CSS rather than filling the frame. */
        <Image
          className={styles.cropped}
          src={src}
          alt={alt}
          width={Math.round((width * crop.width) / 100)}
          height={Math.round((height * crop.height) / 100)}
          sizes={sizes}
          priority={priority}
          quality={90}
        />
      ) : (
        <Image
          className={fit === "contain" ? styles.contain : styles.cover}
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={90}
        />
      )}
    </div>
  );
}
