/* The insights list and its articles (lib/insights.ts). Kept apart from the
   articles so the navbar can link the list without shipping their text. */

export const INSIGHTS_HREF = "/insights";
export const INSIGHTS_LABEL = "الرؤى والتحليلات";

export const insightHref = (slug: string) => `${INSIGHTS_HREF}/${slug}`;
