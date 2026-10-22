// Small English-only adaptations applied after translating the original source.
export function adjustEnglishSource(file, code) {
  if (file === "src/components/sections/Testimonials.tsx") {
    code = code.replace("position * step - offset", "offset - position * step");
  }
  code = code.replace(/import\s*\{([^}]+)\}\s*from "framer-motion";/g, (statement, members) => {
    if (!/\buseReducedMotion\b/.test(members)) return statement;
    const remaining = members.split(",").map(member => member.trim()).filter(member => member && member !== "useReducedMotion");
    return `${remaining.length ? `import { ${remaining.join(", ")} } from "framer-motion";\n` : ""}import { useReducedMotion } from "@/english/lib/useReducedMotion";`;
  });
  if (file === "src/lib/footerNavigation.ts") {
    code = code.replace(/const base =[^;]+;/, 'const base = version === "v1" ? "/en" : `/en/${version}`;');
  }
  if (file === "src/components/v3/routes.ts") {
    code = code.replace(/export function localHref[\s\S]*$/, `export function localHref(href: string) {
  if (!href.startsWith("/") || href.startsWith("/en/v3")) return href;
  const local = href.replace(/^\\/en(?=\\/|$)/, "");
  if (local === "/" || local === "" || local === "/v2") return V3.home;
  return \`/en/v3\${local.replace(/^\\/v2(?=\\/|#|$)/, "")}\`;
}
`);
  }
  if (/src\/components\/(?:contact\/(?:ContactForm|ContactModal)|v[234]\/(?:contact\/)?ContactForm)\.tsx$/.test(file)) {
    code = code.replace('"use client";', '"use client";\n\nimport { englishContactFetch as fetch } from "@/english/lib/contact";');
  }
  if (file === "src/components/contact/ContactModal.tsx") {
    code = code.replace('pathname === "/"', 'pathname === "/en"').replace('router.push("/")', 'router.push("/en")');
  }
  if (file === "src/components/sections/Hero.module.css") {
    code += `\n/* English copy flows naturally while preserving the video dimensions. */
@media (min-width: 1025px) {
  .hero { height: auto; padding-top: 10.7rem; }
  .content { position: relative; top: auto; }
  .video { position: relative; left: auto; top: auto; transform: none; margin: 8rem auto 0; }
}\n`;
  }
  if (file === "src/components/sections/StatsPanel.module.css") code += '\n.cardTitle, .dark .cardTitle { white-space: normal; }\n';
  if (file === "src/components/sections/Footer.module.css") code += '\n.footer .tagline { max-width: 100%; height: auto; min-height: 2.6rem; white-space: normal; }\n';
  if (file === "src/components/sections/PageHero.module.css" || file === "src/components/sections/about/AboutEcosystem.module.css") code += '\n.title { height: auto; }\n';
  if (file === "src/components/sections/PageHero.module.css") {
    code += `\n@media (min-width: 1025px) {
  .hero { height: auto; min-height: var(--hero-h); padding-block: var(--copy-t, 16.8rem) 4rem; }
  .stage { height: auto; }
  .content { position: relative; top: auto; }
}\n`;
  }
  if (file === "src/components/sections/about/AboutVision.module.css") code += '\n.title { white-space: normal; }\n@media (min-width: 1025px) { .title { font-size: 3.2rem; } }\n';
  if (file === "src/components/sections/about/AboutPartners.module.css") code += '\n.text { height: auto; }\n';
  if (file === "src/components/sections/Navbar.module.css") {
    code += `\n@media (min-width: 1025px) {
  .inner { gap: 1.2rem; }
  .list { gap: 24px; }
  .link { font-size: 1.6rem; }
  .cta { --pill-size: 1.4rem; --pill-gap: 1.4rem; }
}
@media (max-width: 1024px) {
  .logo, .slim .logo { right: auto; left: 3rem; }
  .burger, .slim .burger { left: auto; right: 2rem; }
}\n`;
  }
  if (file === "src/components/sections/about/AboutProcess.module.css") {
    code += `\n@media (max-width: 640px) { .title { width: 100%; max-width: 100%; height: auto; white-space: normal; } }\n`;
  }
  if (file === "src/components/v2/layout/Navbar.module.css") {
    code += `\n.menuLink { white-space: normal; }\n`;
  }
  if (file === "src/components/ui/PillButton.module.css") {
    code += `\n/* English labels may need more room than the fixed Arabic artboard width. */
.root { width: fit-content; }
.label { min-width: 0; white-space: normal; }
.arrow { transform: none; }
.root:hover .arrow, .root:focus-visible .arrow { transform: translateX(0.3rem); }\n`;
  }
  if (file === "src/components/ui/ArrowLink.module.css") {
    code += `\n.root { max-width: 100%; }
.label { white-space: normal; }
.icon { transform: none; }
.root:hover .icon, .root:focus-visible .icon { transform: translateX(0.5rem); }\n`;
  }
  if (file === "src/components/v2/ui/Button.module.css") {
    code += `\n.button { width: fit-content; }
.label { min-width: 0; white-space: normal; }
.arrow { transform: scaleX(-1); }
.button:hover .arrow, .button:focus-visible .arrow { transform: scaleX(-1) translateX(-0.2rem); }\n`;
  }
  if (file === "src/components/v3/Hero.tsx") {
    code = code.replace('{"for growing "}<span>{"Business"}', '{"for "}<span>{"business growth"}');
  }
  if (file === "src/components/v3/HomeV3.module.css") {
    code += `\n.heroCopy h1 { font-size: clamp(48px, 5.4vw, 90px); line-height: 1.12; }
@media (max-width: 640px) { .heroCopy h1 { font-size: clamp(36px, 9vw, 56px); } }\n`;
  }
  if (file === "src/components/v4/V4.module.css") {
    code += `\n.hero h1 > i { left: auto; right: 0; top: auto; bottom: 0; transform: scaleX(-1); }
@media (max-width: 1100px) { .hero h1 > i { display: none; } }\n`;
  }
  if (file === "src/components/v3/Motion.tsx") code = code.replace('d="M18 18 6 6m0 0v11M6 6h11"', 'd="M6 18 18 6m0 0v11M18 6H7"');
  if (file === "src/components/v4/Motion.tsx") code = code.replace('d="M25 7 7 25M7 7v18h18"', 'd="M7 7 25 25M25 7v18H7"');
  if (file === "src/components/v4/Pages.tsx") code = code.replace('Arrow, MotionSection, Reveal', 'Arrow, MotionSection');
  return code;
}
