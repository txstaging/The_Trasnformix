"use client";

import type { CSSProperties } from "react";
import { ShaderEffect } from "@/lib/custom-effect-runtime/index";
import type { Shader } from "@/lib/custom-effect-runtime/types";
import {
  manifest as lightRaysManifest,
  render as renderLightRays,
  setup as setupLightRays,
} from "@/lib/custom-effects/CodeComponentId_ef36259fe6234eefc467a13193e7fb6ffc6f04e7_585";
import styles from "./ServicesOrbit.module.css";

/* Figma "Light rays" shader settings, exactly as authored on each layer.
   Module-level so the runtime sees a stable array and sets up only once. */
const lightRays = (params: Record<string, unknown>): Shader[] => [
  { setup: setupLightRays, render: renderLightRays, manifest: lightRaysManifest, params },
];

/** The orb's own rays (3813:10807, 3813:10814). */
const ORB_RAYS = lightRays({
  speed: 0.32999998331069946,
  lightSource: { x: 50, y: 0, radius: 85, angle: 90 },
  inputMode: 0,
  intensity: 0.19999998807907104,
  threshold: 0.5,
  beamSoftness: 0.38999998569488525,
  color1: { r: 0.16156862676143646, g: 0.10196078568696976, b: 0.9960784316062927, a: 1 },
  colorBlend: 0,
  spread: 0.5,
  glow: 0.5,
  color2: { r: 0.3490196168422699, g: 0.5768627524375916, b: 1, a: 1 },
  density: 0.28999999165534973,
});

const tintRays = (radius: number, angle: number) =>
  lightRays({
    speed: 0.5,
    lightSource: { x: 50, y: 100, radius, angle },
    inputMode: 0,
    intensity: 0.20000000298023224,
    threshold: 0.5,
    beamSoftness: 0.5,
    color1: { r: 0.10196078568696976, g: 0.653333306312561, b: 0.9960784316062927, a: 1 },
    colorBlend: 0,
    spread: 0.5,
    glow: 0.5,
    color2: { r: 1, g: 0.3490196168422699, b: 0.43581700325012207, a: 1 },
    density: 0.5,
  });

/** The two coloured washes, each authored with its own light source
    (3813:10811 / 10818 and 3813:10812 / 10819). */
const TINT_A = tintRays(78.62458801269531, -46.26792907714844);
const TINT_B = tintRays(73.03366088867188, -133.2053985595703);

type Tint = {
  shaders: Shader[];
  /** Offset of the 730px glow's centre from the layer's centre, design px. */
  x: number;
  y: number;
  /** The glow's own rotation; every glow is also flipped vertically. */
  rotate: number;
  mask: "upper" | "lower";
  /** Where the 572px sphere mask sits, as exported. The offsets are from the
      glow's unflipped box, so the mask clips that box — and with it the
      shader's output, as Figma's mask group does. */
  maskX: number;
  maskY: number;
  /** The front orb's glows are solid brand blue. */
  solid?: boolean;
};

type Orb = {
  /** Offset of the orb's centre from the layer's centre, design px. */
  x: number;
  y: number;
  box: number;
  rotate: number;
  /** The front orb is filled almost solid. */
  solid?: boolean;
  tints: Tint[];
};

/* Figma 3813:10806 and 3813:10813 — two light orbs rising over the bottom of
   the services panel. Each is a 572px sphere lit by its own rays, plus two
   blurred, colour-burned glows clipped to the sphere. The rear orb is a faint
   halo; the front one is a near-solid blue sphere. */
const ORBS: Orb[] = [
  {
    x: -4.5,
    y: 502.5,
    box: 572,
    rotate: 180,
    tints: [
      { shaders: TINT_A, x: 360.5, y: 380.5, rotate: 180, mask: "upper", maskX: -286, maskY: 201 },
      { shaders: TINT_B, x: -369.5, y: 380.5, rotate: 180, mask: "upper", maskX: 444, maskY: 201 },
    ],
  },
  {
    x: 0.01,
    y: 658.71,
    box: 582.417,
    rotate: 178.95,
    solid: true,
    tints: [
      {
        shaders: TINT_A,
        x: -364.98,
        y: 780.71,
        rotate: 0,
        mask: "lower",
        maskX: 444,
        maskY: -43,
        solid: true,
      },
      {
        shaders: TINT_B,
        x: 365.02,
        y: 780.71,
        rotate: 0,
        mask: "lower",
        maskX: -286,
        maskY: -43,
        solid: true,
      },
    ],
  },
];

const GLOW_BOX = 730;

const rem = (px: number) => `${px / 10}rem`;

const place = (x: number, y: number, box: number, rotate: number) =>
  ({
    "--x": rem(x),
    "--y": rem(y),
    "--box": rem(box),
    "--rotate": `${rotate}deg`,
  }) as CSSProperties;

/** The orbs are decorative; they render through Figma's shader runtime where
    the browser supports WebGPU with HTML-in-Canvas, and as their plain layers
    everywhere else. */
export function ServicesOrbit() {
  return (
    <div className={styles.layer} aria-hidden>
      {ORBS.map((orb) => (
        <div key={orb.y}>
          <div className={styles.slot} style={place(orb.x, orb.y, orb.box, orb.rotate)}>
            <div className={styles.flip}>
              <ShaderEffect className={styles.orbCanvas} shaders={ORB_RAYS}>
                <div className={`${styles.orb} ${orb.solid ? styles.orbSolid : styles.orbHalo}`}>
                  <div className={styles.orbFill} />
                  <div className={styles.orbShade} />
                </div>
              </ShaderEffect>
            </div>
          </div>

          {orb.tints.map((tint) => (
            <div
              key={tint.x}
              className={`${styles.slot} ${styles.tintSlot}`}
              style={
                {
                  ...place(tint.x, tint.y, GLOW_BOX, tint.rotate),
                  "--mask": `url("/images/services-orbit/orbit-mask-${tint.mask}.svg")`,
                  "--mask-x": rem(tint.maskX),
                  "--mask-y": rem(tint.maskY),
                } as CSSProperties
              }
            >
              <div className={styles.flip}>
                <ShaderEffect className={styles.tintCanvas} shaders={tint.shaders}>
                  <div className={`${styles.tint} ${tint.solid ? styles.tintSolid : ""}`} />
                </ShaderEffect>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
