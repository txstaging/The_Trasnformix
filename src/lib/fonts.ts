import { Alexandria, Inter } from "next/font/google";
import localFont from "next/font/local";

/* Secondary faces the artboards call for. Neither is preloaded: each covers a
   handful of blocks, so they are fetched only when a rule that uses them
   actually paints. */

/** Step counters "01"–"05" — Figma 2515:59888 sets them in Alexandria 500. */
export const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
  preload: false,
});

/**
 * Tajawal — the 375 footers (Figma 2524:3054) and the home reviews band
 * (Figma 2150:25508). Self-hosted from google/fonts (OFL, see
 * app/fonts/Tajawal-OFL.txt) so its vertical metrics can be pinned: the font
 * does not set USE_TYPO_METRICS, so Windows would place it by its win metrics
 * (1016 / 375) while Figma and macOS use hhea (643 / 357 / 200), dropping
 * every line about 0.2em below the artboard.
 */
export const tajawal = localFont({
  variable: "--font-tajawal",
  src: [
    { path: "../app/fonts/Tajawal-Regular.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/Tajawal-Bold.woff2", weight: "700", style: "normal" },
  ],
  declarations: [
    { prop: "ascent-override", value: "64.3%" },
    { prop: "descent-override", value: "35.7%" },
    { prop: "line-gap-override", value: "20%" },
  ],
  display: "swap",
  preload: false,
});

/** The phone field of the contact form — Figma 2551:7973 sets it in Inter. */
export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
});
