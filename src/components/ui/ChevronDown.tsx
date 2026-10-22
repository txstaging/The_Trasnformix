import type { SVGProps } from "react";

/** A centered chevron whose direction follows the trigger's expanded state. */
export function ChevronDown(props: SVGProps<SVGSVGElement>) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" {...props}>
    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}
