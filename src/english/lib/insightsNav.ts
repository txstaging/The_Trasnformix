/* The insights list and its articles (lib/insights.ts). Kept apart from the
   articles so the navbar can link the list without shipping their text. */

export const INSIGHTS_HREF = "/en/insights";
export const INSIGHTS_LABEL = "Insights & Analysis";

export const insightHref = (slug: string) => `${INSIGHTS_HREF}/${slug}`;
