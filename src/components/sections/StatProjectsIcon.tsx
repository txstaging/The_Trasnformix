import type { CSSProperties } from "react";
import styles from "./StatProjectsIcon.module.css";

/* Figma 3800:4885 "g3660" — the light buildings mark of the 51+ card, kept
   as the artboard's own 19 stroked layers. Each entry is [layer, left, top,
   width, height] in px inside the 53.2 × 52 group: the layer's box offset by
   half its 1.58px stroke, which every export overhangs by. */
const LAYERS: [string, number, number, number, number][] = [
  ["g3671", 6.359, 1.209, 25.1331, 50.5689],
  ["g3674", 29.909, 1.209, 17.9609, 28.1605],
  ["g3678", 29.909, 1.209, 24.0915, 6.50283],
  ["g3682", 43.159, 6.129, 10.8366, 7.60685],
  ["g3686", -0.001, 1.209, 7.93801, 6.50283],
  ["g3690", -0.001, 6.129, 7.93812, 7.60685],
  ["g3694", 29.909, 27.789, 9.77165, 23.99],
  ["g3698", 12.119, 44.219, 5.03812, 8.56807],
  ["g3702", 12.119, 38.239, 19.3724, 7.56235],
  ["g3706", 12.119, 32.539, 19.3724, 7.56235],
  ["g3710", 12.119, 26.849, 19.3724, 7.56235],
  ["g3714", 12.119, 21.159, 19.3724, 7.56235],
  ["g3718", 12.119, 15.469, 4.51923, 2.56958],
  ["g3722", 18.599, 17.639, 12.8933, 5.38448],
  ["g3726", 12.119, 1.209, 10.9565, 11.5102],
  ["g3730", 33.619, 21.259, 10.4251, 4.57196],
  ["g3734", 33.619, 15.249, 10.4251, 4.57196],
  ["g3738", 33.619, 9.179, 5.23376, 4.57196],
  ["g3742", 16.799, 1.209, 1.58199, 10.4917],
];

const rem = (px: number) => `${px / 10}rem`;

/** The 54 × 54 light "projects" icon; the 54px box clips it the way the
    artboard's clip path does. */
export function StatProjectsIcon({ className }: { className?: string }) {
  return (
    <span className={[styles.icon, className].filter(Boolean).join(" ")} aria-hidden>
      <span className={styles.group}>
        {LAYERS.map(([name, left, top, width, height]) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={name}
            className={styles.layer}
            src={`/icons/stat-projects-light/${name}.svg`}
            alt=""
            width={width}
            height={height}
            style={
              {
                left: rem(left),
                top: rem(top),
                width: rem(width),
                height: rem(height),
              } as CSSProperties
            }
          />
        ))}
      </span>
    </span>
  );
}
