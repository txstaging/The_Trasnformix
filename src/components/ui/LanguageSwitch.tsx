"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import styles from "./LanguageSwitch.module.css";

const subscribe = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
  };
};

export function LanguageSwitch() {
  const pathname = usePathname();
  const suffix = useSyncExternalStore(subscribe, () => window.location.search + window.location.hash, () => "");
  const isEnglish = /^\/en(?:\/|$)/.test(pathname);
  const targetPath = isEnglish ? pathname.replace(/^\/en(?=\/|$)/, "") || "/" : `/en${pathname === "/" ? "" : pathname}`;
  const language = isEnglish ? "ar" : "en";
  const label = isEnglish ? "View this page in Arabic" : "عرض هذه الصفحة باللغة الإنجليزية";

  return (
    <a className={styles.link} data-language-switch href={`${targetPath}${suffix}`}
      lang={language} hrefLang={language} dir="ltr" aria-label={label} title={label}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18" />
      </svg>
      <span className={styles.label}>{isEnglish ? "العربية" : "EN"}</span>
    </a>
  );
}
