"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { CompMedia } from "@/components/ui/CompMedia";
import { ArrowLink } from "@/components/ui/ArrowLink";
import styles from "./ServicesTabs.module.css";

type ServiceItem = {
  title: string;
  icon: string;
  text: string;
  width: number;
  fontSize: number;
  /** The row's link label; "اعرف المزيد" when omitted. */
  link?: string;
};

type ServiceMedia = {
  /** Motion composition under public/videos, poster'd by `image`. */
  video: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  left: number;
  top: number;
};

type ServiceTab = {
  id: string;
  label: string;
  icon: string;
  media: ServiceMedia | null;
  items: ServiceItem[];
};

/* Right-to-left order, so the variant drawn as active sits furthest right and
   opens by default. */
const TABS: ServiceTab[] = [
  {
    id: "data-ai",
    label: "البيانات والذكاء الاصطناعي",
    icon: "/icons/lucide-brain-circuit.svg",
    media: null,
    items: [
      /* Figma 3648:7100 */
      {
        title: "تحليل وهندسة البيانات",
        icon: "/icons/lucide-chart-pie.svg",
        text: "نحوّل بياناتك المعقدة إلى لوحات تحكم ومؤشرات دقيقة تكشف فرص النمو غير المستغلة، وتمنحك رؤية استباقية لاتخاذ قرارات استراتيجية حاسمة.",
        width: 455,
        fontSize: 18,
        link: "اكتشف حلول البيانات",
      },
      {
        title: "ذكاء الأعمال ولوحات التحكم",
        icon: "/icons/lucide-brain.svg",
        text: "نصمم لوحات تحكم تفاعلية وتقارير ذكية تجمع مؤشرات أدائك الرئيسية (KPIs) في شاشة واحدة، لتمنحك رؤية فورية وشاملة تسهّل متابعة النمو واتخاذ القرارات بدقة.",
        width: 415,
        fontSize: 18,
        link: "استكشف لوحات التحكم",
      },
      {
        title: "حلول الذكاء الاصطناعي",
        icon: "/icons/lucide-astroid.svg",
        text: "نبتكر أنظمة ذكية (AI Agents) ومساعدين افتراضيين مخصصين لأتمتة المهام اليومية، والارتقاء بتجربة عملائك، ومضاعفة الإنتاجية على مدار الساعة.",
        width: 415,
        fontSize: 16,
      },
    ],
  },
  {
    id: "web",
    label: "تطوير المواقع",
    icon: "/icons/lucide-globe.svg",
    media: null,
    items: [
      {
        title: "إنشاء المتاجر الإلكترونية",
        icon: "/icons/lucide-shopping-bag.svg",
        text: "نبني متاجر إلكترونية سهلة الاستخدام تدعم رحلة الشراء وإدارة المنتجات والطلبات بكفاءة.",
        width: 479,
        fontSize: 16,
      },
      {
        title: "تطوير مواقع Odoo وZoho",
        icon: "/icons/lucide-earth.svg",
        text: "نربط الموقع بأنظمة Odoo وZoho لتوحيد المبيعات، العملاء والعمليات داخل منظومة متكاملة.",
        width: 415,
        fontSize: 16,
      },
      {
        title: "تطوير WordPress",
        icon: "/icons/lucide-globe.svg",
        text: "نطوّر مواقع WordPress مرنة وسهلة الإدارة مع تخصيص التصميم والوظائف حسب احتياجك.",
        width: 415,
        fontSize: 16,
      },
    ],
  },
  {
    id: "studio",
    label: "استديو الابداع",
    icon: "/icons/lucide-gem.svg",
    media: null,
    items: [
      {
        title: "تصميم UI/UX",
        icon: "/icons/lucide-monitor-speaker.svg",
        text: "نصمم تجارب رقمية سهلة وواضحة توازن بين احتياجات المستخدم وأهداف الأعمال.",
        width: 479,
        fontSize: 16,
      },
      {
        title: "التسويق الرقمي",
        icon: "/icons/lucide-earth.svg",
        text: "نخطط وننفذ حملات ومحتوى يساعد العلامة على الوصول للجمهور وتحقيق أهدافها التسويقية.",
        width: 415,
        fontSize: 16,
      },
      {
        title: "إنتاج المحتوى والفيديو",
        icon: "/icons/lucide-tv-minimal-play.svg",
        text: "نحوّل الأفكار إلى محتوى بصري وفيديوهات تساعد على جذب الانتباه وتوصيل الرسالة بوضوح.",
        width: 415,
        fontSize: 16,
      },
    ],
  },
  {
    /* HEADS UP: Desktop-82 keeps the ERP headings but still carries the studio
       variant's body copy and its monitor / megaphone / play glyphs — the three
       paragraphs below describe design and marketing work, not ERP. Reproduced
       as drawn; swap `text` and `icon` here once the ERP copy is written.
       The card shows the Odoo gallery in place of a motion comp. */
    id: "erp",
    label: " ERP",
    icon: "/icons/lucide-chart-no-axes-combined.svg",
    media: null,
    items: [
      {
        title: "تطبيق وتخصيص Odoo",
        icon: "/icons/lucide-monitor-speaker.svg",
        text: "نصمم تجارب رقمية سهلة وواضحة توازن بين احتياجات المستخدم وأهداف الأعمال.",
        width: 479,
        fontSize: 16,
      },
      {
        title: "حلول Zoho",
        icon: "/icons/lucide-megaphone.svg",
        text: "نخطط وننفذ حملات ومحتوى يساعد العلامة على الوصول للجمهور وتحقيق أهدافها التسويقية.",
        width: 415,
        fontSize: 16,
      },
      {
        title: "أتمتة عمليات الأعمال",
        icon: "/icons/lucide-tv-minimal-play.svg",
        text: "نحوّل الأفكار إلى محتوى بصري وفيديوهات تساعد على جذب الانتباه وتوصيل الرسالة بوضوح.",
        width: 415,
        fontSize: 16,
      },
    ],
  },
];

const rem = (px: number) => `${px / 10}rem`;

type GalleryFrame = {
  /** One image fills the card; two stack as a collage. */
  images: readonly string[];
  alt: string;
  /** Overrides the gallery's crop anchor for this frame alone. */
  position?: string;
};

type Gallery = {
  label: string;
  frames: readonly GalleryFrame[];
  /** Where the crop anchors once the card turns wider than the frames. */
  position?: string;
};

/* Hover galleries, cross-fading every 2.2s while the pointer stays on the card. */
const GALLERIES: Partial<Record<string, Gallery>> = {
  "data-ai": {
    label: "معرض أعمال البيانات والذكاء الاصطناعي",
    frames: [
      /* Figma 3648:7131 — the card rests on the circuit-brain artwork. */
      {
        images: ["/images/services-brain.png"],
        alt: "دماغ على شكل دائرة إلكترونية يرمز إلى الذكاء الاصطناعي",
      },
      {
        images: ["/images/services-ai-law-agent.jpg"],
        alt: "واجهة المساعد القانوني Law Agent على حاسوب محمول",
        /* Centring the wide artwork would cut the Law Agent lockup. */
        position: "left center",
      },
      {
        images: ["/images/services-ai-al-hamra.jpg"],
        alt: "لوحة مؤشرات مشروع الحمراء مع خريطة تفاعلية ومساعد ذكي",
      },
      {
        images: ["/images/services-ai-cooperative.jpg"],
        alt: "فريق مشروع التعاونية أمام لوحة بيانات ومجسم أرضي رقمي",
      },
    ],
  },
  web: {
    label: "معرض أعمال تطوير المواقع",
    /* The client lockups sit in the bottom corner of each mockup. */
    position: "center bottom",
    frames: [
      {
        images: ["/images/services-web-future-experts.png"],
        alt: "صفحات موقع Future Experts معروضة بشكل مائل",
      },
      {
        images: ["/images/services-web-diomedea.png"],
        alt: "موقع Diomedea التعليمي على شاشة حاسوب محمول",
      },
      {
        images: ["/images/services-web-tafahom.png"],
        alt: "موقع تفاهم للاستشارات القانونية على شاشة حاسوب محمول",
      },
    ],
  },
  studio: {
    label: "معرض أعمال استديو الإبداع",
    frames: [
      {
        images: ["/images/services-studio-rozana.jpg"],
        alt: "تصميم هوية روزانا البخاري مطبق على ذاكرة USB",
      },
      {
        images: [
          "/images/services-studio-future-coffee.jpg",
          "/images/services-studio-future-merch.jpg",
        ],
        alt: "تطبيقات هوية Future Experts على كوب وساعة وملابس",
      },
      {
        images: ["/images/services-studio-kun.jpg"],
        alt: "تصميم هوية كن مطبق على لوحة عرض",
      },
      {
        images: ["/images/services-studio-reem.jpg"],
        alt: "شعار ريم بخيت مطرز على القماش",
      },
    ],
  },
  erp: {
    label: "معرض أعمال أنظمة ERP",
    frames: [
      {
        images: ["/images/services-erp-work-orders.jpg"],
        alt: "أوامر العمل في تطبيق التصنيع على Odoo معروضة على حاسوب محمول",
      },
      {
        images: ["/images/services-erp-apps.jpg"],
        alt: "شاشة تطبيقات Odoo على شاشة مكتبية",
      },
      {
        images: ["/images/services-erp-manufacturing-orders.jpg"],
        alt: "لوحة أوامر التصنيع في Odoo مقسمة حسب الحالة على حاسوب محمول",
      },
    ],
  },
};

export function ServicesTabs() {
  const [activeId, setActiveId] = useState(TABS[0].id);
  const [galleryFrame, setGalleryFrame] = useState(0);
  const [galleryPlaying, setGalleryPlaying] = useState(false);
  const active = TABS.find((tab) => tab.id === activeId) ?? TABS[0];
  const media = active.media;
  const gallery = GALLERIES[active.id];

  useEffect(() => {
    if (!galleryPlaying || !gallery) return;

    const intervalId = window.setInterval(() => {
      setGalleryFrame((current) => (current + 1) % gallery.frames.length);
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, [gallery, galleryPlaying]);

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState<CSSProperties | null>(null);
  /** 1 when moving to a later tab, -1 to an earlier one — panels enter from that side. */
  const [direction, setDirection] = useState(1);

  const showTab = (tabId: string) => {
    const from = TABS.findIndex((tab) => tab.id === activeId);
    const to = TABS.findIndex((tab) => tab.id === tabId);
    if (to !== from) setDirection(to > from ? 1 : -1);
    setGalleryPlaying(false);
    setGalleryFrame(0);
    setActiveId(tabId);
  };

  /* The highlight pill slides to whichever tab is open. */
  useLayoutEffect(() => {
    const measure = () => {
      const button = tabRefs.current[TABS.findIndex((tab) => tab.id === activeId)];
      if (!button) return;
      setIndicator({
        width: button.offsetWidth,
        height: button.offsetHeight,
        transform: `translate(${button.offsetLeft}px, ${button.offsetTop}px)`,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeId]);

  /* Desktop only: the section is a tall scroll track and the stage pins
     inside it, so scrolling steps through the tabs one by one before the
     page carries on to the next section. */
  const pinned = () => window.matchMedia("(min-width: 1025px)").matches;

  /** Where the stage pins, and how far the track scrolls while it is pinned. */
  const trackMetrics = () => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return null;
    const stickTop = parseFloat(getComputedStyle(stage).top) || 0;
    const distance = section.offsetHeight - stage.offsetHeight;
    return { section, stickTop, distance };
  };

  useEffect(() => {
    let frame = 0;
    let lastIndex = -1;

    const update = () => {
      frame = 0;
      const metrics = trackMetrics();
      if (!pinned() || !metrics || metrics.distance <= 0) return;
      const { section, stickTop, distance } = metrics;
      const travelled = stickTop - section.getBoundingClientRect().top;
      const progress = Math.min(1, Math.max(0, travelled / distance));
      const index = Math.min(TABS.length - 1, Math.floor(progress * TABS.length));
      if (index === lastIndex) return;
      if (lastIndex !== -1) setDirection(index > lastIndex ? 1 : -1);
      lastIndex = index;
      setGalleryPlaying(false);
      setGalleryFrame(0);
      setActiveId(TABS[index].id);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  /* A click scrolls to the middle of that tab's stretch of the track, so the
     scroll position and the open tab never disagree. */
  const selectTab = (tabId: string) => {
    const metrics = trackMetrics();
    if (!pinned() || !metrics || metrics.distance <= 0) {
      showTab(tabId);
      return;
    }
    const { section, stickTop, distance } = metrics;
    const index = TABS.findIndex((tab) => tab.id === tabId);
    const trackStart = window.scrollY + section.getBoundingClientRect().top - stickTop;
    window.scrollTo({
      top: trackStart + (distance * (index + 0.5)) / TABS.length,
      behavior: "smooth",
    });
  };

  const startGallery = () => {
    if (!gallery || galleryPlaying) return;

    setGalleryFrame(1);
    setGalleryPlaying(true);
  };

  const stopGallery = () => {
    setGalleryPlaying(false);
    setGalleryFrame(0);
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className={styles.section}
      style={
        {
          "--tab-steps": TABS.length - 1,
          "--enter-dir": direction,
        } as CSSProperties
      }
    >
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.tabs} role="tablist" aria-label="خدمات Transformix">
          {indicator && (
            <span className={styles.tabIndicator} style={indicator} aria-hidden />
          )}
          {TABS.map((tab, index) => {
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                className={[styles.tab, isActive && styles.tabActive]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => selectTab(tab.id)}
              >
                <Image
                  className={styles.tabIcon}
                  src={tab.icon}
                  alt=""
                  width={24}
                  height={24}
                  aria-hidden
                />
                <span dir="auto">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Each poster is cropped differently inside the 530 x 686 card, so the
            box travels with the tab rather than living in the stylesheet. */}
        <div
          className={styles.media}
          tabIndex={gallery ? 0 : undefined}
          aria-label={gallery?.label}
          onPointerEnter={startGallery}
          onPointerLeave={stopGallery}
          onFocus={startGallery}
          onBlur={stopGallery}
          style={
            media
              ? ({
                  "--media-x": rem(media.left),
                  "--media-y": rem(media.top),
                  "--media-w": rem(media.width),
                  "--media-h": rem(media.height),
                } as CSSProperties)
              : undefined
          }
        >
          {media && (
            <CompMedia
              key={active.id}
              className={`${styles.mediaImage} ${styles.fading}`}
              name={media.video}
              poster={media.image}
              width={media.width}
              height={media.height}
              label={media.alt}
            />
          )}
          <div key={active.id} className={styles.mediaSwap}>
          {gallery?.frames.map((frame, index) => (
            <div
              key={frame.images[0]}
              className={[
                styles.gallerySlide,
                index === galleryFrame && styles.gallerySlideActive,
              ]
                .filter(Boolean)
                .join(" ")}
              aria-hidden={index !== galleryFrame}
            >
              {frame.images.length === 1 ? (
                <Image
                  className={styles.galleryImage}
                  style={{ objectPosition: frame.position ?? gallery.position }}
                  src={frame.images[0]}
                  alt={index === galleryFrame ? frame.alt : ""}
                  fill
                  sizes="(max-width: 1024px) 100vw, 530px"
                />
              ) : (
                <div className={styles.galleryCollage}>
                  {frame.images.map((image) => (
                    <div key={image} className={styles.galleryCollagePanel}>
                      <Image
                        className={styles.galleryImage}
                        style={{ objectPosition: frame.position ?? gallery.position }}
                        src={image}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 100vw, 530px"
                      />
                    </div>
                  ))}
                  {index === galleryFrame && (
                    <span className={styles.srOnly}>{frame.alt}</span>
                  )}
                </div>
              )}
            </div>
          ))}
          </div>
        </div>

        <div
          className={styles.list}
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
        >
          {active.items.map((item, index) => (
            <div key={`${active.id}-${item.title}`} className={styles.itemBlock}>
              {index > 0 && (
                <hr
                  className={[styles.divider, index === 2 && styles.dividerWarm]
                    .filter(Boolean)
                    .join(" ")}
                />
              )}
              <div
                className={`${styles.item} ${styles.fading}`}
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className={styles.itemHead}>
                  <Image
                    className={styles.itemIcon}
                    src={item.icon}
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden
                  />
                  <h3 dir="auto" className={styles.itemTitle}>
                    {item.title}
                  </h3>
                </div>

                <p
                  dir="auto"
                  className={styles.itemText}
                  style={
                    {
                      "--item-width": rem(item.width),
                      "--item-size": rem(item.fontSize),
                    } as CSSProperties
                  }
                >
                  {item.text}
                </p>

                <ArrowLink href="#services" icon="/icons/arrow-service-light.svg">
                  {item.link ?? "اعرف المزيد"}
                </ArrowLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
