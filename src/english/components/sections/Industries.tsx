"use client";

import Image from "next/image";
import { useRef, type PointerEvent, type MouseEvent } from "react";
import { ClampText } from "@/english/components/academies/ClampText";
import { Reveal } from "@/english/components/ui/Reveal";
import styles from "@/english/components/sections/Industries.module.css";

type Industry = {
  key: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  icon: string;
};

/* Figma 4619:821 — the six sectors, in the order the navbar lists them. The
   row runs from the reading start, so the first one opens at the right. */
const INDUSTRIES: Industry[] = [
  {
    key: "cooperatives",
    title: "Cooperatives & Associations",
    text: "We use investor and member management platforms, ERP solutions, AI agents and analytics to serve cooperatives and associations, covering membership, services, governance, voting and reporting. Our solutions draw on experience building digital systems for this field and an understanding of its operating requirements.",
    cta: "Explore cooperative solutions",
    href: "/en/sectors#cooperatives",
    icon: "/icons/home/industry-cooperatives.svg",
  },
  {
    key: "industry",
    title: "Industry & Manufacturing",
    text: "We combine industrial digital transformation expertise with ERP for manufacturing, inventory and quality management, alongside analytics, AI and specialised applications. We focus on the processes where our teams and past projects have built up experience, such as production planning, performance tracking, operational data integration and quality improvement.",
    cta: "Explore industrial solutions",
    href: "/en/sectors#industry",
    icon: "/icons/home/industry-manufacturing.svg",
  },
  {
    key: "education",
    title: "Education and training",
    text: "We apply learning platforms, content management, assessments and AI solutions to build customisable training and education experiences, drawing on our experience developing digital platforms and applied learning programmes for organisations and training centres.",
    cta: "Explore education solutions",
    href: "/en/sectors#education",
    icon: "/icons/home/industry-education.svg",
  },
  {
    key: "ecommerce",
    title: "E-commerce & Retail",
    text: "We connect store platforms and multi-vendor marketplaces with order and inventory management, ERP, CRM, analytics and multi-channel marketing. Our digital commerce experience lets us build integrated operating flows and buying experiences that fit each business model.",
    cta: "Explore commerce solutions",
    href: "/en/sectors",
    icon: "/icons/home/industry-ecommerce.svg",
  },
  {
    key: "tourism",
    title: "Tourism, Services & Reservations",
    text: "We apply booking platforms, digital applications, customer management, payments and automation to develop tourism services and manage availability, service providers and the booking experience. These solutions build on our experience in service applications, platforms and operational integration.",
    cta: "Explore tourism & booking solutions",
    href: "/en/sectors",
    icon: "/icons/home/industry-tourism.svg",
  },
  {
    key: "logistics",
    title: "Logistics",
    text: "We combine order, inventory, fulfilment and delivery management and third-party logistics (3PL) platforms with e-commerce, ERP and analytics integration, supporting operations tracking and better coordination between parties according to each operating model.",
    cta: "Explore logistics solutions",
    href: "/en/sectors",
    icon: "/icons/home/industry-logistics.svg",
  },
];

/** The sectors as a sideways row of cards (after the artboard's horizontal
    carousel). A mouse can drag the row; touch and the keyboard scroll it
    natively. */
export function Industries() {
  const rail = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0 || !rail.current) return;
    drag.current = { x: event.clientX, left: rail.current.scrollLeft, moved: false };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (!state || !rail.current) return;
    const delta = event.clientX - state.x;
    if (!state.moved && Math.abs(delta) < 6) return;
    state.moved = true;
    rail.current.dataset.dragging = "true";
    rail.current.scrollLeft = state.left - delta;
  };

  const endDrag = () => {
    if (rail.current) delete rail.current.dataset.dragging;
    /* Keep `moved` until the click that ends the drag has been swallowed. */
    if (drag.current && !drag.current.moved) drag.current = null;
  };

  const swallowClick = (event: MouseEvent<HTMLDivElement>) => {
    if (drag.current?.moved) {
      event.preventDefault();
      event.stopPropagation();
    }
    drag.current = null;
  };

  return (
    <section id="industries" className={styles.section} aria-labelledby="industries-title">
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <h2 id="industries-title" className={styles.title}>{"Sectors & Specialisations"}</h2>
          <p className={styles.lead}>{"We deliver digital transformation, AI and enterprise systems across a wide range of sectors, with a specialised focus on six fields where Transformix draws on its teams' expertise, past work, products and the applications it has built. This expertise is applied to the operational and regulatory needs of each activity."}</p>
        </Reveal>

        <div
          ref={rail}
          className={styles.rail}
          role="region"
          aria-label="Sectors & Specialisations"
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={swallowClick}
        >
          {INDUSTRIES.map((industry) => (
            <article key={industry.key} className={styles.card}>
              <div className={styles.cardHead}>
                <div className={styles.tile} aria-hidden="true">
                  <Image src={industry.icon} alt="" width={28} height={28} draggable={false} />
                </div>
                <h3 className={styles.cardTitle}>{industry.title}</h3>
              </div>
              <ClampText text={industry.text} />
              <a href={industry.href} className={styles.link} draggable={false}>
                {industry.cta}
                <Image className={styles.arrow} src="/icons/home/arrow-forward.svg" alt="" width={20} height={20} aria-hidden draggable={false} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
