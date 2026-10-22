"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HOME_VERSIONS } from "@/lib/homeVersions";
import { getServicesMenu } from "@/lib/serviceNavigation";
import { ChevronDown } from "@/components/ui/ChevronDown";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { V2, contactHref } from "@/components/v2/routes";
import { Button } from "@/components/v2/ui/Button";
import styles from "./Navbar.module.css";

type MenuLink = { label: string; href: string; external?: boolean };

type NavItem = {
  label: string;
  /** Without a menu the item is a plain link. */
  href?: string;
  menu?: { id: string; links: readonly MenuLink[] };
  /** Whether the current path belongs to this item. */
  isActive: (pathname: string) => boolean;
};

/** Right-to-left reading order, so the first entry renders furthest right
    (Figma 3709:659). */
const NAV_ITEMS: NavItem[] = [
  {
    label: "الرئيسية",
    menu: { id: "home", links: HOME_VERSIONS },
    isActive: (path) => path === V2.home,
  },
  { label: "من نحن", href: V2.about, isActive: (path) => path === V2.about },
  {
    label: "الخدمات",
    menu: {
      id: "services",
      links: getServicesMenu(V2.services),
    },
    isActive: (path) => path.startsWith(V2.services),
  },
  { label: "القطاعات", href: V2.sectors, isActive: (path) => path === V2.sectors },
  { label: "الأكاديمية", href: V2.academy, isActive: (path) => path === V2.academy },
  { label: "أعمالنا", href: V2.works, isActive: (path) => path === V2.works },
  { label: "تواصل معنا", href: V2.contact, isActive: (path) => path === V2.contact },
];

const cx = (...names: (string | false | undefined)[]) =>
  names.filter(Boolean).join(" ");

/** Figma "Transformix pill header" (3709:654): a 1240 x 92 white pill with the
    logo on the right, the links in the middle and the consultation CTA on the
    left. Below 1024px it folds into a full-screen sheet. */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetMenu, setSheetMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  /* Any navigation — a link in the sheet, or the browser's back button —
     leaves every menu closed on the new page. */
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenMenu(null);
    setSheetOpen(false);
    setSheetMenu(null);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenMenu(null);
      setSheetOpen(false);
    };
    const onResize = () => {
      setOpenMenu(null);
      setSheetOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* A tap opens a menu without a mouseleave to close it again, so a press
     anywhere outside the links does. */
  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openMenu]);

  /* The sheet covers the viewport, so the page behind it must not scroll. */
  useEffect(() => {
    if (!sheetOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [sheetOpen]);

  const closeAll = () => {
    setOpenMenu(null);
    setSheetOpen(false);
    setSheetMenu(null);
  };

  return (
    <header className={cx(styles.header, scrolled && styles.scrolled)}>
      <div className={styles.pill}>
        <Link href={V2.home} className={styles.logo} aria-label="Transformix — الرئيسية">
          <Image src="/v2/brand/logo.png" alt="" width={170} height={45} priority />
        </Link>

        <nav ref={navRef} className={styles.nav} aria-label="التنقل الرئيسي">
          <ul className={styles.list}>
            {NAV_ITEMS.map((item) => {
              const active = item.isActive(pathname);
              if (!item.menu) {
                return (
                  <li key={item.label} className={styles.item}>
                    <Link
                      href={item.href!}
                      className={cx(styles.link, active && styles.active)}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              const { id, links } = item.menu;
              const open = openMenu === id;
              return (
                <li
                  key={item.label}
                  className={cx(styles.item, styles.hasMenu)}
                  onMouseEnter={() => setOpenMenu(id)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    type="button"
                    className={cx(styles.link, active && styles.active)}
                    aria-expanded={open}
                    aria-controls={`v2-menu-${id}`}
                    onClick={() => setOpenMenu(open ? null : id)}
                  >
                    {item.label}
                    <ChevronDown className={styles.chevron} />
                  </button>
                  <ul
                    id={`v2-menu-${id}`}
                    className={cx(styles.menu, open && styles.menuOpen)}
                  >
                    {links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noopener noreferrer" : undefined}
                          className={cx(
                            styles.menuLink,
                            link.href === pathname && styles.menuLinkActive,
                          )}
                          aria-current={link.href === pathname ? "page" : undefined}
                          onClick={closeAll}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>

        <LanguageSwitch />
        <div className={styles.cta}>
          <Button href={V2.contact}>اطلب استشارة مجانية</Button>
        </div>

        <button
          type="button"
          className={styles.burger}
          aria-label="فتح القائمة"
          aria-expanded={sheetOpen}
          aria-controls="v2-sheet"
          onClick={() => setSheetOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        id="v2-sheet"
        className={cx(styles.sheet, sheetOpen && styles.sheetOpen)}
        aria-hidden={!sheetOpen}
        inert={!sheetOpen}
      >
        <div className={styles.sheetHead}>
          <Link href={V2.home} className={styles.sheetLogo} onClick={closeAll}>
            <Image src="/v2/brand/logo.png" alt="Transformix" width={136} height={36} />
          </Link>
          <button
            type="button"
            className={styles.close}
            aria-label="إغلاق القائمة"
            onClick={closeAll}
          >
            <span />
            <span />
          </button>
        </div>

        <ul className={styles.sheetList}>
          {NAV_ITEMS.map((item) => {
            const active = item.isActive(pathname);
            if (!item.menu) {
              return (
                <li key={item.label}>
                  <Link
                    href={item.href!}
                    className={cx(styles.sheetLink, active && styles.sheetActive)}
                    aria-current={active ? "page" : undefined}
                    onClick={closeAll}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }

            const { id, links } = item.menu;
            const open = sheetMenu === id;
            return (
              <li key={item.label}>
                <button
                  type="button"
                  className={cx(styles.sheetLink, styles.sheetTrigger, active && styles.sheetActive)}
                  aria-expanded={open}
                  aria-controls={`v2-sheet-${id}`}
                  onClick={() => setSheetMenu(open ? null : id)}
                >
                  {item.label}
                  <ChevronDown className={styles.chevron} />
                </button>
                <ul
                  id={`v2-sheet-${id}`}
                  className={cx(styles.sheetMenu, open && styles.sheetMenuOpen)}
                >
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className={cx(
                          styles.sheetMenuLink,
                          link.href === pathname && styles.sheetActive,
                        )}
                        onClick={closeAll}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>

        <Button href={contactHref()} className={styles.sheetCta}>
          اطلب استشارة مجانية
        </Button>
      </div>
    </header>
  );
}
