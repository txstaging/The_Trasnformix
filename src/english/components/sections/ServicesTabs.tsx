"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { CompMedia } from "@/english/components/ui/CompMedia";
import { ArrowLink } from "@/english/components/ui/ArrowLink";
import styles from "@/english/components/sections/ServicesTabs.module.css";

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
    label: "Data and artificial intelligence",
    icon: "/icons/lucide-brain-circuit.svg",
    media: null,
    items: [
      /* Figma 3648:7100 */
      {
        title: "Data analytics and engineering",
        icon: "/icons/lucide-chart-pie.svg",
        text: "We turn complex data into dashboards and precise metrics that reveal untapped growth opportunities and give you the insight to make strategic decisions.",
        width: 455,
        fontSize: 18,
        link: "Explore data solutions",
      },
      {
        title: "Business intelligence and dashboards",
        icon: "/icons/lucide-brain.svg",
        text: "We design interactive dashboards and reports that bring your key performance indicators together in one place, making it easier to track growth and make informed decisions.",
        width: 415,
        fontSize: 18,
        link: "Explore dashboards",
      },
      {
        title: "Artificial intelligence solutions",
        icon: "/icons/lucide-astroid.svg",
        text: "We build custom AI agents and virtual assistants to automate daily tasks, improve customer experiences, and support productivity around the clock.",
        width: 415,
        fontSize: 16,
      },
    ],
  },
  {
    id: "web",
    label: "Web development",
    icon: "/icons/lucide-globe.svg",
    media: null,
    items: [
      {
        title: "E-commerce development",
        icon: "/icons/lucide-shopping-bag.svg",
        text: "We build accessible online stores that support the buying journey and efficient product and order management.",
        width: 479,
        fontSize: 16,
      },
      {
        title: "Odoo and Zoho website development",
        icon: "/icons/lucide-earth.svg",
        text: "We connect your website to Odoo and Zoho to bring sales, customers, and operations into one system.",
        width: 415,
        fontSize: 16,
      },
      {
        title: "WordPress development",
        icon: "/icons/lucide-globe.svg",
        text: "Flexible WordPress websites with design and functionality tailored to your needs.",
        width: 415,
        fontSize: 16,
      },
    ],
  },
  {
    id: "studio",
    label: "Creative studio",
    icon: "/icons/lucide-gem.svg",
    media: null,
    items: [
      {
        title: "UI/UX design",
        icon: "/icons/lucide-monitor-speaker.svg",
        text: "Clear, intuitive digital experiences that balance user needs with business goals.",
        width: 479,
        fontSize: 16,
      },
      {
        title: "Digital marketing",
        icon: "/icons/lucide-earth.svg",
        text: "We plan and deliver campaigns and content that help brands reach their audiences and achieve their marketing goals.",
        width: 415,
        fontSize: 16,
      },
      {
        title: "Content and video production",
        icon: "/icons/lucide-tv-minimal-play.svg",
        text: "We turn ideas into visual content and videos that attract attention and communicate clearly.",
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
        title: "Odoo implementation and customization",
        icon: "/icons/lucide-monitor-speaker.svg",
        text: "Clear, intuitive digital experiences that balance user needs with business goals.",
        width: 479,
        fontSize: 16,
      },
      {
        title: "Zoho solutions",
        icon: "/icons/lucide-megaphone.svg",
        text: "We plan and deliver campaigns and content that help brands reach their audiences and achieve their marketing goals.",
        width: 415,
        fontSize: 16,
      },
      {
        title: "Business process automation",
        icon: "/icons/lucide-tv-minimal-play.svg",
        text: "We turn ideas into visual content and videos that attract attention and communicate clearly.",
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
    label: "Data and AI project gallery",
    frames: [
      /* Figma 3648:7131 — the card rests on the circuit-brain artwork. */
      {
        images: ["/images/services-brain.png"],
        alt: "A brain formed from electronic circuits representing artificial intelligence",
      },
      {
        images: ["/images/services-ai-law-agent.jpg"],
        alt: "Law Agent legal assistant interface on a laptop",
        /* Centring the wide artwork would cut the Law Agent lockup. */
        position: "left center",
      },
      {
        images: ["/images/services-ai-al-hamra.jpg"],
        alt: "Al Hamra project dashboard with an interactive map and intelligent assistant",
      },
      {
        images: ["/images/services-ai-cooperative.jpg"],
        alt: "The cooperative project team in front of a dashboard and digital globe",
      },
    ],
  },
  web: {
    label: "Web development project gallery",
    /* The client lockups sit in the bottom corner of each mockup. */
    position: "center bottom",
    frames: [
      {
        images: ["/images/services-web-future-experts.png"],
        alt: "Future Experts website pages displayed at an angle",
      },
      {
        images: ["/images/services-web-diomedea.png"],
        alt: "Diomedea education website on a laptop screen",
      },
      {
        images: ["/images/services-web-tafahom.png"],
        alt: "Tafahom legal consulting website on a laptop screen",
      },
    ],
  },
  studio: {
    label: "Creative studio project gallery",
    frames: [
      {
        images: ["/images/services-studio-rozana.jpg"],
        alt: "Rozana Al Bukhari brand identity applied to a USB drive",
      },
      {
        images: [
          "/images/services-studio-future-coffee.jpg",
          "/images/services-studio-future-merch.jpg",
        ],
        alt: "Future Experts brand identity on a cup, watch, and clothing",
      },
      {
        images: ["/images/services-studio-kun.jpg"],
        alt: "KUN brand identity on a display board",
      },
      {
        images: ["/images/services-studio-reem.jpg"],
        alt: "Reem Bakhit logo embroidered on fabric",
      },
    ],
  },
  erp: {
    label: "ERP systems project gallery",
    frames: [
      {
        images: ["/images/services-erp-work-orders.jpg"],
        alt: "Work orders in the Odoo manufacturing application on a laptop",
      },
      {
        images: ["/images/services-erp-apps.jpg"],
        alt: "Odoo applications on a desktop monitor",
      },
      {
        images: ["/images/services-erp-manufacturing-orders.jpg"],
        alt: "Odoo manufacturing order board grouped by status on a laptop",
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
        <div className={styles.tabs} role="tablist" aria-label={"Transformix services"}>
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
                  {item.link ?? "Learn more"}
                </ArrowLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
