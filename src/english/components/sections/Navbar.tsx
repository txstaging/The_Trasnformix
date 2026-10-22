"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PillButton } from "@/english/components/ui/PillButton";
import { HOME_VERSIONS } from "@/english/lib/homeVersions";
import { getServicesMenu, type ServiceMenuLink } from "@/english/lib/serviceNavigation";
import { ChevronDown } from "@/english/components/ui/ChevronDown";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import styles from "@/english/components/sections/Navbar.module.css";

type MenuId = "home" | "services";

/** Right-to-left reading order, so the first entry renders furthest right.
    Section links are rooted at "/" so they resolve from every page; the item
    whose href matches the current route is drawn in its active state. */
const NAV_ITEMS: { label: string; href: string; menu?: MenuId }[] = [
  /* The versions menu is hidden for launch; add `menu: "home"` back to show it. */
  { label: "Home", href: "/en" },
  { label: "About us", href: "/en/about" },
  { label: "Services", href: "/en/services", menu: "services" },
  /* Figma 3642:6444 — the sectors page is labelled الصناعات in the bar. */
  { label: "Industries", href: "/en/sectors" },
  /* Figma 3817:48362 — the products page sits right after the sectors. */
  { label: "Products", href: "/en/products" },
  { label: "Our work", href: "/en/works" },
  { label: "Academy", href: "/en/academy" },
  { label: "Contact us", href: "/en/contact" },
];

/* Service entries open the existing sites; the overview stays in this version. */
const MENUS: Record<MenuId, { links: readonly ServiceMenuLink[] }> = {
  home: { links: HOME_VERSIONS },
  services: { links: getServicesMenu("/en/services") },
};

const cx = (...names: (string | false | undefined)[]) =>
  names.filter(Boolean).join(" ");

type NavbarProps = {
  /** `slim` is the 72px small-screen bar of the about artboard (Figma
      2515:60114): a white bar with a hairline, a 60 x 53 lockup and a 21 x 24
      bars glyph. The desktop bar is identical in both variants. */
  variant?: "default" | "slim";
};

export function Navbar({ variant = "default" }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const [sheetMenu, setSheetMenu] = useState<MenuId | null>(null);
  const navList = useRef<HTMLUListElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = () => {
      setMenuOpen(false);
      setOpenMenu(null);
      setSheetMenu(null);
    };
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (menuOpen) burgerRef.current?.focus();
      else navList.current?.querySelector<HTMLButtonElement>('[aria-expanded="true"]')?.focus();
      setMenuOpen(false);
      setOpenMenu(null);
      setSheetMenu(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  /* A tap opens the pop-over without ever producing a mouseleave, so anything
     pressed outside the links has to close it. */
  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!navList.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openMenu]);

  /* The sheet covers the viewport, so the page behind it must not scroll. */
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sheetRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const controls = Array.from(sheetRef.current?.querySelectorAll<HTMLElement>("a, button") ?? [])
        .filter((element) => element.getClientRects().length > 0 && !element.closest("[inert]"));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", trapFocus);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", trapFocus);
    };
  }, [menuOpen]);

  const closeAll = () => {
    setMenuOpen(false);
    setOpenMenu(null);
    setSheetMenu(null);
  };

  const renderMenu = (menu: MenuId, id: string, className: string) => (
    <ul
      id={id}
      className={cx(className, menu === "services" && styles.menuServices)}
      inert={id.startsWith("sheet-") ? sheetMenu !== menu : openMenu !== menu}
    >
      {MENUS[menu].links.map(({ label, href, external }) => (
        <li key={label}>
          <Link
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={cx(styles.menuLink, href === pathname && styles.menuLinkActive)}
            aria-current={href === pathname ? "page" : undefined}
            onClick={closeAll}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <header
      className={cx(
        styles.header,
        variant === "slim" && styles.slim,
        scrolled && styles.scrolled,
      )}
    >
      <div className={styles.inner}>
        <Link href={"/en"} className={styles.logo} aria-label="Transformix">
          <Image
            className={styles.logoWide}
            src="/images/logo-wide.png"
            alt=""
            width={174}
            height={58}
            priority
          />
          <Image
            className={styles.logoCompact}
            src="/icons/logo-mobile.svg"
            alt=""
            width={47}
            height={35}
            priority
          />
          {variant === "slim" && (
            <Image
              className={styles.logoBar}
              src="/icons/logo-bar.svg"
              alt=""
              width={60}
              height={53}
              priority
            />
          )}
        </Link>

        <nav className={styles.nav} aria-label={"Main navigation"}>
          <ul ref={navList} className={styles.list}>
            {NAV_ITEMS.map((item) =>
              item.menu ? (
                <li
                  key={item.label}
                  className={cx(styles.item, styles.itemMenu)}
                  onMouseEnter={() => setOpenMenu(item.menu!)}
                  onMouseLeave={() => setOpenMenu(null)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenMenu(null);
                  }}
                >
                  <button
                    type="button"
                    className={cx(
                      styles.link,
                      styles.trigger,
                      isActive(item.href) && styles.active,
                    )}
                    aria-haspopup="true"
                    aria-expanded={openMenu === item.menu}
                    aria-controls={`nav-${item.menu}-menu`}
                    onClick={() => setOpenMenu(openMenu === item.menu ? null : item.menu!)}
                    onKeyDown={(event) => {
                      if (event.key !== "ArrowDown") return;
                      event.preventDefault();
                      setOpenMenu(item.menu!);
                      requestAnimationFrame(() => document.getElementById(`nav-${item.menu}-menu`)?.querySelector("a")?.focus());
                    }}
                  >
                    {item.label}
                    <ChevronDown className={styles.chevron} />
                  </button>
                  {renderMenu(
                    item.menu,
                    `nav-${item.menu}-menu`,
                    cx(
                      styles.menu,
                      styles.dropdown,
                      openMenu === item.menu && styles.dropdownOpen,
                    ),
                  )}
                </li>
              ) : (
                <li key={item.label} className={styles.item}>
                  <Link
                    href={item.href}
                    className={cx(
                      styles.link,
                      item.href === pathname && styles.active,
                    )}
                    aria-current={item.href === pathname ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <LanguageSwitch />
        <div className={styles.cta}>
          <PillButton>{"Get a consultation"}</PillButton>
        </div>

        <button
          ref={burgerRef}
          type="button"
          className={styles.burger}
          aria-label={"Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
        >
          <Image
            className={styles.burgerGlyph}
            src="/icons/lucide-menu.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden
          />
          {variant === "slim" && (
            <Image
              className={styles.burgerBars}
              src="/icons/menu-bars.svg"
              alt=""
              width={21}
              height={24}
              aria-hidden
            />
          )}
        </button>

        <div
          ref={sheetRef}
          id="mobile-menu"
          className={cx(styles.sheet, menuOpen && styles.sheetOpen)}
          role="dialog"
          aria-modal={menuOpen ? true : undefined}
          aria-label={"Main navigation"}
          aria-hidden={!menuOpen}
          inert={!menuOpen}
        >
          <button
            type="button"
            className={styles.close}
            aria-label={"Close menu"}
            onClick={() => { closeAll(); burgerRef.current?.focus(); }}
          >
            <span />
            <span />
          </button>

          <ul className={styles.sheetList}>
            {NAV_ITEMS.map((item) =>
              item.menu ? (
                <li key={item.label} className={styles.sheetItem}>
                  <button
                    type="button"
                    className={cx(
                      styles.sheetTrigger,
                      isActive(item.href) && styles.sheetActive,
                    )}
                    aria-expanded={sheetMenu === item.menu}
                    aria-controls={`sheet-${item.menu}-menu`}
                    onClick={() => setSheetMenu(sheetMenu === item.menu ? null : item.menu!)}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={styles.sheetChevron} />
                  </button>
                  {renderMenu(
                    item.menu,
                    `sheet-${item.menu}-menu`,
                    cx(
                      styles.menu,
                      styles.sheetMenu,
                      sheetMenu === item.menu && styles.sheetMenuOpen,
                    ),
                  )}
                </li>
              ) : (
                <li key={item.label} className={styles.sheetItem}>
                  <Link
                    href={item.href}
                    className={cx(
                      styles.sheetLink,
                      item.href === pathname && styles.sheetActive,
                    )}
                    aria-current={item.href === pathname ? "page" : undefined}
                    onClick={closeAll}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}

            <li className={styles.sheetCtaItem}>
              <PillButton size="compact">{"Get a consultation"}</PillButton>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
