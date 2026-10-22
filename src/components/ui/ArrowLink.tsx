import Image from "next/image";
import styles from "./ArrowLink.module.css";

type ArrowLinkProps = {
  children: string;
  href?: string;
  /** `sm` is the 24px in-body link, `lg` the 47px "عرض المزيد" link. */
  size?: "sm" | "lg";
  icon?: string;
  className?: string;
};

export function ArrowLink({
  children,
  href = "#",
  size = "sm",
  icon = "/icons/arrow-link.svg",
  className,
}: ArrowLinkProps) {
  const isLarge = size === "lg";

  return (
    <a
      href={href}
      className={[styles.root, isLarge && styles.lg, className]
        .filter(Boolean)
        .join(" ")}
    >
      <Image
        className={styles.icon}
        src={icon}
        alt=""
        width={isLarge ? 47 : 24}
        height={isLarge ? 47 : 24}
        aria-hidden
      />
      <span className={styles.label}>{children}</span>
    </a>
  );
}
