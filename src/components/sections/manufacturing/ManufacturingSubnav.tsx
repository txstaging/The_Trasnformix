import Link from "next/link";
import styles from "@/app/(arabic)/manufacturing/page.module.css";

const SECTIONS = [
  { id: "efficiency", label: "إدارة أكثر كفاءة", href: "/manufacturing" },
  { id: "management", label: "بناء نظام الإدارة والحوكمة", href: "/manufacturing/management" },
  { id: "planning", label: "إدارة التصنيع وتخطيط المواد", href: "/manufacturing/planning" },
  { id: "analytics", label: "الذكاء الاصطناعي والتحليلات", href: "/manufacturing/analytics" },
  { id: "academy", label: "الأكاديميات وإدارة المعرفة", href: "/manufacturing/academy" },
];

export function ManufacturingSubnav({ active }: { active: "efficiency" | "management" | "planning" | "analytics" | "academy" }) {
  return (
    <nav className={styles.sectionNav} aria-label="أقسام الصناعة والتصنيع">
      <div className={styles.sectionNavInner}>
        {SECTIONS.map((section) => (
          <Link
            key={section.id}
            href={section.href}
            className={`${styles.sectionLink} ${section.id === active ? styles.active : ""}`}
            aria-current={section.id === active ? "page" : undefined}
          >
            {section.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
