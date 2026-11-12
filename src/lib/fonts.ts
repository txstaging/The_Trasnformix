import localFont from "next/font/local";

/* Secondary faces the artboards call for. Neither is preloaded: each covers a
   handful of blocks, so they are fetched only when a rule that uses them
   actually paints.

   Every face is self-hosted from google/fonts (OFL, see app/fonts/), never
   loaded through next/font/google: Google Fonts at times answers with
   `fonts.gstatic.com/l/font?kit=…&…` links, which Turbopack cannot parse
   ("next/font/google queries have exactly one entry"), and that fails the
   whole build, the Docker one included. */

export const alexandria = localFont({
  variable: "--font-alexandria",
  src: "../app/fonts/Alexandria-Medium.woff2",
  weight: "500",
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
    /* The V2 page banner's tablet and mobile titles (Figma 4642:1171). */
    { path: "../app/fonts/Tajawal-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  declarations: [
    { prop: "ascent-override", value: "64.3%" },
    { prop: "descent-override", value: "35.7%" },
    { prop: "line-gap-override", value: "20%" },
  ],
  display: "swap",
  preload: false,
});

export const inter = localFont({
  variable: "--font-inter",
  src: "../app/fonts/Inter-Regular.woff2",
  weight: "400",
  display: "swap",
  preload: false,
});

/**
 * Noto Serif — the outlined counters of the home stats band (Figma 3648:6893).
 * The artboard draws them as vector glyphs; setting them as stroked text lets
 * them count up from zero.
 */
export const notoSerif = localFont({
  variable: "--font-noto-serif",
  src: "../app/fonts/NotoSerif-Regular.woff2",
  weight: "400",
  display: "swap",
  preload: false,
});

/**
 * Plus Jakarta Sans — the Latin labels and card numbers of the contact and
 * service pages (Figma 4431:12108, 4431:12464, 4431:12992), and the TX
 * Community event covers (4416:4905). Self-hosted (OFL, see
 * app/fonts/PlusJakartaSans-OFL.txt): Google Fonts at times answers this
 * family with `fonts.gstatic.com/l/font?kit=…&…` links, which Turbopack's
 * next/font/google cannot parse ("queries have exactly one entry"), failing
 * every page until the cache is cleared. The file is Google's latin subset of
 * the variable font, so it carries every weight from 200 to 800.
 */
export const jakarta = localFont({
  variable: "--font-jakarta",
  src: "../app/fonts/PlusJakartaSans-Latin.woff2",
  weight: "200 800",
  style: "normal",
  display: "swap",
  preload: false,
});
