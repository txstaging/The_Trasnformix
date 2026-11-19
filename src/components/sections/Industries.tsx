"use client";

import Image from "next/image";
import { useRef, type PointerEvent, type MouseEvent } from "react";
import { ClampText } from "@/components/academies/ClampText";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Industries.module.css";

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
    title: "التعاونيات والجمعيات",
    text: "نُوظّف منصات إدارة المستثمرين والأعضاء وحلول ERP والوكلاء الأذكياء والتحليلات لخدمة التعاونيات والجمعيات، بما يشمل إدارة العضوية والخدمات والحوكمة والتصويت والتقارير. وتستند حلولنا إلى خبرة في تطوير أنظمة رقمية لهذا المجال وفهم متطلباته التشغيلية.",
    cta: "استكشف حلول التعاونيات",
    href: "/sectors#cooperatives",
    icon: "/icons/home/industry-cooperatives.svg",
  },
  {
    key: "industry",
    title: "الصناعة والتصنيع",
    text: "نجمع خبرات التحول الرقمي الصناعي وأنظمة ERP للتصنيع وإدارة المخزون والجودة مع التحليلات والذكاء الاصطناعي والتطبيقات المتخصصة. ونركز على العمليات التي تراكمت فيها خبرة فرقنا ومشروعاتنا السابقة، مثل تخطيط الإنتاج، وتتبع الأداء، وتكامل بيانات التشغيل، وتحسين الجودة.",
    cta: "استكشف الحلول الصناعية",
    href: "/manufacturing",
    icon: "/icons/home/industry-manufacturing.svg",
  },
  {
    key: "education",
    title: "التعليم والتدريب",
    text: "نُوظّف منصات التعلم وإدارة المحتوى والتقييمات وحلول الذكاء الاصطناعي في بناء تجارب تدريب وتعليم قابلة للتخصيص، مستفيدين من خبراتنا في تطوير المنصات الرقمية وبرامج التعلم التطبيقي للمؤسسات ومراكز التدريب.",
    cta: "استكشف حلول التعليم",
    href: "/sectors#education",
    icon: "/icons/home/industry-education.svg",
  },
  {
    key: "ecommerce",
    title: "التجارة الإلكترونية والتجزئة",
    text: "نربط منصات المتاجر والأسواق متعددة البائعين بأنظمة إدارة الطلبات والمخزون وERP وCRM والتحليلات والتسويق متعدد القنوات. وتتيح خبراتنا في التجارة الرقمية تطوير مسارات تشغيل وتجربة شراء متكاملة وفق نموذج كل نشاط.",
    cta: "استكشف حلول التجارة",
    href: "/sectors",
    icon: "/icons/home/industry-ecommerce.svg",
  },
  {
    key: "tourism",
    title: "السياحة والخدمات والحجوزات",
    text: "نُوظّف منصات الحجوزات والتطبيقات الرقمية وأنظمة إدارة العملاء والمدفوعات والأتمتة لتطوير الخدمات السياحية وإدارة التوافر ومقدمي الخدمات وتجربة الحجز. وتستند الحلول إلى خبراتنا في التطبيقات الخدمية والمنصات والربط التشغيلي.",
    cta: "استكشف حلول السياحة والحجوزات",
    href: "/sectors",
    icon: "/icons/home/industry-tourism.svg",
  },
  {
    key: "logistics",
    title: "الخدمات اللوجستية",
    text: "نجمع حلول إدارة الطلبات والمخزون والتجهيز والتوصيل ومنصات الخدمات اللوجستية للطرف الثالث (3PL) مع تكامل التجارة الإلكترونية وERP والتحليلات. وندعم بذلك متابعة العمليات وتحسين التنسيق بين الأطراف وفق متطلبات كل نموذج تشغيلي.",
    cta: "استكشف الحلول اللوجستية",
    href: "/sectors",
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
          <h2 id="industries-title" className={styles.title}>القطاعات والتخصصات</h2>
          <p className={styles.lead}>
            نقدم حلول التحول الرقمي والذكاء الاصطناعي والأنظمة المؤسسية لمختلف القطاعات، مع تركيز متخصص على ستة مجالات تستند فيها ترانسفورمكس إلى خبرات فرقها، وأعمالها السابقة، ومنتجاتها، والتطبيقات التي طورتها. وتُوظّف هذه الخبرات وفق الاحتياجات التشغيلية والتنظيمية لكل نشاط.
          </p>
        </Reveal>

        <div
          ref={rail}
          className={styles.rail}
          role="region"
          aria-label="القطاعات والتخصصات"
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
