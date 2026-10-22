"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, MotionConfig, useScroll } from "framer-motion";
import { useReducedMotion } from "@/english/lib/useReducedMotion";
import { createContext, useContext, useEffect, useRef, useState, useTransition, type ComponentProps, type ReactNode } from "react";
import { HOME_VERSIONS } from "@/english/lib/homeVersions";
import { getServicesMenu } from "@/english/lib/serviceNavigation";
import { ChevronDown } from "@/english/components/ui/ChevronDown";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { Arrow, ease, MotionSection } from "@/english/components/v4/Motion";
import styles from "@/english/components/v4/V4.module.css";
import serviceStyles from "@/english/components/v4/ServicesMenu.module.css";

const navigation = [
  ["Home", "/en/v4"], ["About us", "/en/v4/about"], ["Our services", "/en/v4/services"],
  ["Our work", "/en/v4/works"], ["Industries", "/en/v4/sectors"], ["Academy", "/en/v4/academy"], ["Contact us", "/en/v4/contact"],
] as const;
const serviceLinks = getServicesMenu("/en/v4/services");
const NavigationContext = createContext<(href: string) => void>(() => {});

export function RouteLink({ href, children, onClick, ...props }: ComponentProps<typeof Link>) {
  const navigate = useContext(NavigationContext);
  return <Link href={href} {...props} onClick={(event) => {
    onClick?.(event);
    const target = typeof href === "string" ? href : "";
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.target === "_blank" || !target.startsWith("/en/v4") || target.includes("#") || target === `${location.pathname}${location.search}`) return;
    event.preventDefault(); navigate(target);
  }}>{children}</Link>;
}

function Opening({ complete }: { complete: () => void }) {
  const reduced = useReducedMotion();
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, []);
  return <motion.div className={styles.opening} data-v4-opening role="status" aria-label={"Transformix — Loading"}
    initial={{ clipPath: "inset(0 0 0 0)" }} animate={{ clipPath: "inset(0 0 100% 0)" }}
    transition={{ delay: reduced ? 0.25 : 1.65, duration: reduced ? 0.15 : 0.85, ease }} onAnimationComplete={complete}>
    <div className={styles.openingTop}><span>TRANSFORMIX®</span><span>VERSION / 04</span></div>
    <div className={styles.openingWord} dir="ltr" aria-hidden="true">
      <motion.span initial={reduced ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.1, ease }}>TRANSFORMIX</motion.span>
    </div>
    <div className={styles.openingBottom}><span>{"BUSINESS × TECHNOLOGY"}</span><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: reduced ? 0.2 : 1.6, ease }} /><span>04 / 04</span></div>
  </motion.div>;
}

function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => { const frame = requestAnimationFrame(() => { setOpen(false); setServicesOpen(false); }); return () => cancelAnimationFrame(frame); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = requestAnimationFrame(() => document.querySelector<HTMLAnchorElement>("#v4-menu a")?.focus());
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
      if (event.key !== "Tab") return;
      const controls = [toggleRef.current, ...document.querySelectorAll<HTMLElement>("#v4-menu a, #v4-menu button")].filter((item): item is HTMLElement => !!item);
      const first = controls[0]; const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    window.addEventListener("keydown", escape);
    return () => { cancelAnimationFrame(focusFrame); document.body.style.overflow = previous; window.removeEventListener("keydown", escape); };
  }, [open]);
  return <>
    <header className={styles.header}>
      <RouteLink href={"/en/v4"} aria-label={"Transformix — Home"} className={styles.logo}><Image src="/images/logo-wide.png" width={300} height={100} sizes="170px" style={{ height: "auto" }} loading="eager" alt="Transformix" /></RouteLink>
      <span className={styles.headerNote}>{"BUSINESS × TECHNOLOGY"}</span>
      <LanguageSwitch />
      <RouteLink href={"/en/v4/contact"} className={styles.headerContact}>{"Start a conversation "}<Arrow /></RouteLink>
      <button ref={toggleRef} className={`${styles.menuButton} ${open ? styles.menuOpen : ""}`} aria-expanded={open} aria-controls="v4-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => { setOpen(!open); setServicesOpen(false); }}><span /><span /></button>
    </header>
    <AnimatePresence>{open && <motion.nav id="v4-menu" className={styles.menu} aria-label={"Main menu"} initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: reduced ? 0.1 : 0.65, ease }}>
      <div className={styles.menuLinks}>{navigation.map(([label, href], index) => <motion.div key={href} initial={reduced ? false : { y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.045 + 0.15, duration: 0.5 }}>
        {href === "/en/v4/services" ? <>
          <button type="button" className={serviceStyles.trigger} aria-expanded={servicesOpen} aria-controls="v4-services-menu"
            onClick={() => setServicesOpen(!servicesOpen)}><small dir="ltr">0{index + 1}</small>{label}<ChevronDown /></button>
          {servicesOpen && <div id="v4-services-menu" className={serviceStyles.dropdown}>
            {serviceLinks.map(service => <RouteLink key={service.href} href={service.href}
              target={service.external ? "_blank" : undefined} rel={service.external ? "noopener noreferrer" : undefined}
              aria-current={pathname === service.href ? "page" : undefined}
              onClick={() => { setOpen(false); setServicesOpen(false); }}>{service.label}</RouteLink>)}
          </div>}
        </> : <RouteLink href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}><small dir="ltr">0{index + 1}</small>{label}<Arrow /></RouteLink>}
      </motion.div>)}</div>
      <div className={styles.menuMeta}><p>{"Choose a version"}</p><div>{HOME_VERSIONS.map(version => <Link key={version.href} href={version.href} onClick={() => setOpen(false)} aria-current={version.href === "/en/v4" ? "page" : undefined}>{version.label}</Link>)}</div><a href="mailto:info@thetransformix.com">info@thetransformix.com</a></div>
    </motion.nav>}</AnimatePresence>
  </>;
}

function Footer() {
  return <footer className={styles.footer}><MotionSection mode="depth">
    <div className={styles.footerTop}><p>{"From your challenge to a digital solution that drives growth"}</p><RouteLink href={"/en/v4/contact"}>{"Let us talk."}<Arrow /></RouteLink></div>
    <div className={styles.footerLinks}><div><RouteLink href={"/en/v4"} aria-label={"Transformix — Home"}><Image src="/images/logo-wide.png" alt="" width={300} height={100} sizes="185px" style={{ height: "auto" }} /></RouteLink><p>{"Your complete technology partner"}</p></div><nav aria-label={"Footer links"}>{navigation.slice(1).map(([label, href]) => <RouteLink key={href} href={href}>{label}</RouteLink>)}</nav><div dir="ltr"><a href="mailto:info@thetransformix.com">info@thetransformix.com</a><span>BUSINESS MEETS TECHNOLOGY</span></div></div>
    <div className={styles.footerBottom}><span>© {new Date().getFullYear()} Transformix</span><div>{HOME_VERSIONS.map(v => <Link href={v.href} key={v.href} aria-current={v.href === "/en/v4" ? "page" : undefined}>{v.label}</Link>)}</div><a href="#v4-top">{"Back to top ↑"}</a></div>
  </MotionSection></footer>;
}

function Frame({ children, home }: { children: ReactNode; home: boolean }) {
  const [opening, setOpening] = useState(false);
  useEffect(() => {
    if (!home) return;
    const frame = requestAnimationFrame(() => setOpening(true));
    const replay = (event: PageTransitionEvent) => { if (event.persisted) setOpening(true); };
    window.addEventListener("pageshow", replay); return () => { cancelAnimationFrame(frame); window.removeEventListener("pageshow", replay); };
  }, [home]);
  return <>{opening && <Opening complete={() => setOpening(false)} />}<div inert={opening}><Header /><main id="v4-main" tabIndex={-1}>{children}</main><Footer /></div></>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "cover" | "waiting" | "reveal">("idle");
  const [destination, setDestination] = useState("");
  const [pending, startTransition] = useTransition();
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    if (phase !== "waiting" || pending) return;
    const frame = requestAnimationFrame(() => setPhase("reveal"));
    return () => cancelAnimationFrame(frame);
  }, [phase, pending]);
  const navigate = (href: string) => { if (phase !== "idle") return; setDestination(href); setPhase("cover"); };
  return <MotionConfig reducedMotion="user"><NavigationContext.Provider value={navigate}>
    <div className={styles.site} id="v4-top">
      <a href="#v4-main" className={styles.skip}>{"Skip to content"}</a>
      <motion.div className={styles.progress} style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <div inert={phase !== "idle"}><Frame key={pathname} home={pathname === "/en/v4"}>{children}</Frame></div>
      {phase !== "idle" && <motion.div className={styles.curtain} aria-hidden="true" initial={{ y: "100%" }} animate={{ y: phase === "reveal" ? "-100%" : "0%" }} transition={{ duration: reduced ? 0.1 : 0.55, ease }} onAnimationComplete={() => {
        if (phase === "cover") { setPhase("waiting"); startTransition(() => router.push(destination)); }
        if (phase === "reveal") { setPhase("idle"); document.getElementById("v4-main")?.focus({ preventScroll: true }); }
      }}><span dir="ltr">TRANSFORMIX®</span><i /></motion.div>}
    </div>
  </NavigationContext.Provider></MotionConfig>;
}
