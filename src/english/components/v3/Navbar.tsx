"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HOME_VERSIONS } from "@/english/lib/homeVersions";
import { getServicesMenu } from "@/english/lib/serviceNavigation";
import { ChevronDown } from "@/english/components/ui/ChevronDown";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { Arrow, ease } from "@/english/components/v3/Motion";
import { V3 } from "@/english/components/v3/routes";
import styles from "@/english/components/v3/HomeV3.module.css";

const links = [
  { label: "About us", href: V3.about },
  { label: "Services", href: V3.services },
  { label: "Industries", href: V3.sectors },
  { label: "Our work", href: V3.works },
  { label: "Academy", href: V3.academy },
  { label: "Contact us", href: V3.contact },
];

const serviceLinks = getServicesMenu(V3.services);

export function Navbar() {
  const [menu, setMenu] = useState(false);
  const [versions, setVersions] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const versionRef = useRef<HTMLButtonElement>(null);
  const serviceRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) { setVersions(false); setServicesOpen(false); setMenu(false); }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || (!menu && !versions && !servicesOpen)) return;
      setMenu(false);
      setVersions(false);
      setServicesOpen(false);
      if (menu) toggleRef.current?.focus();
      else if (servicesOpen) serviceRef.current?.focus();
      else versionRef.current?.focus();
    };
    const resize = () => { setMenu(false); setVersions(false); setServicesOpen(false); };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", resize);
    };
  }, [menu, versions, servicesOpen]);

  return (
    <header className={styles.header} ref={ref}>
      <div className={styles.navbar}>
        <a href={"/en/v3"} className={styles.logo} aria-label={"Transformix — Home"}>
          <Image src="/images/logo-wide.png" alt="Transformix" width={180} height={60} preload />
        </a>
        <nav className={styles.desktopNav} aria-label={"Main navigation"}>
          <div className={styles.versionWrap}>
            <button ref={versionRef} type="button" aria-expanded={versions} aria-controls="v3-versions" onClick={() => { setVersions(!versions); setServicesOpen(false); }}>
              {" Home "}<ChevronDown className={styles.chevron} />
            </button>
            {versions && <div id="v3-versions" className={styles.versionMenu}>
              {HOME_VERSIONS.map(v => <a key={v.href} href={v.href} aria-current={v.href === pathname ? "page" : undefined} onClick={() => setVersions(false)}>{v.label}<span aria-hidden="true">{v.href === "/en/v3" ? "↖" : ""}</span></a>)}
            </div>}
          </div>
          {links.map(link => link.href === V3.services ? (
            <div key={link.href} className={styles.versionWrap}
              onMouseEnter={() => { setServicesOpen(true); setVersions(false); }}
              onMouseLeave={() => setServicesOpen(false)}
              onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setServicesOpen(false); }}>
              <button ref={serviceRef} type="button" aria-expanded={servicesOpen} aria-controls="v3-services-menu"
                data-active={pathname.startsWith(V3.services)}
                onClick={() => { setServicesOpen(!servicesOpen); setVersions(false); }}
                onKeyDown={event => {
                  if (event.key !== "ArrowDown") return;
                  event.preventDefault(); setServicesOpen(true);
                  requestAnimationFrame(() => document.querySelector<HTMLAnchorElement>("#v3-services-menu a")?.focus());
                }}>
                {link.label} <ChevronDown className={styles.chevron} />
              </button>
              {servicesOpen && <div id="v3-services-menu" className={`${styles.versionMenu} ${styles.servicesMenu}`}>
                {serviceLinks.map(service => <Link key={service.href} href={service.href}
                  target={service.external ? "_blank" : undefined} rel={service.external ? "noopener noreferrer" : undefined}
                  aria-current={pathname === service.href ? "page" : undefined}
                  onClick={() => setServicesOpen(false)}>{service.label}</Link>)}
              </div>}
            </div>
          ) : <Link key={link.href} href={link.href} aria-current={pathname.startsWith(link.href) ? "page" : undefined}>{link.label}</Link>)}
        </nav>
        <LanguageSwitch />
        <Link className={styles.navCta} href={V3.contact}>{"Get a free consultation "}<Arrow /></Link>
        <button ref={toggleRef} className={styles.menuToggle} type="button" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} aria-controls="v3-mobile-menu" onClick={() => { setMenu(!menu); setServicesOpen(false); setVersions(false); }}>
          <span style={{ transform: menu ? "translateY(4px) rotate(45deg)" : undefined }} />
          <span style={{ transform: menu ? "translateY(-4px) rotate(-45deg)" : undefined }} />
        </button>
      </div>
      <AnimatePresence>
        {menu && <motion.nav id="v3-mobile-menu" className={styles.mobileMenu} aria-label={"Main navigation"} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease }}>
          <div className={styles.mobileVersions}>{HOME_VERSIONS.map(v => <a key={v.href} href={v.href} aria-current={v.href === pathname ? "page" : undefined} onClick={() => setMenu(false)}>{v.label}</a>)}</div>
          {links.map(link => link.href === V3.services ? (
            <div key={link.href} className={styles.mobileServiceGroup}>
              <button type="button" aria-expanded={servicesOpen} aria-controls="v3-mobile-services"
                onClick={() => setServicesOpen(!servicesOpen)}>{link.label}<ChevronDown className={styles.chevron} /></button>
              {servicesOpen && <div id="v3-mobile-services" className={styles.mobileServicesMenu}>
                {serviceLinks.map(service => <Link key={service.href} href={service.href}
                  target={service.external ? "_blank" : undefined} rel={service.external ? "noopener noreferrer" : undefined}
                  aria-current={pathname === service.href ? "page" : undefined}
                  onClick={() => { setMenu(false); setServicesOpen(false); }}>{service.label}</Link>)}
              </div>}
            </div>
          ) : <Link key={link.href} href={link.href} aria-current={pathname.startsWith(link.href) ? "page" : undefined} onClick={() => setMenu(false)}>{link.label}<Arrow /></Link>)}
          <Link href={V3.contact} onClick={() => setMenu(false)}>{"Get a free consultation "}<Arrow /></Link>
        </motion.nav>}
      </AnimatePresence>
    </header>
  );
}
