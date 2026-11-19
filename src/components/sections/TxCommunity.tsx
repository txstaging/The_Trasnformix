import Image from "next/image";
import { ClampText } from "@/components/academies/ClampText";
import { Reveal } from "@/components/ui/Reveal";
import { communityHref } from "@/lib/communityNav";
import styles from "./TxCommunity.module.css";

type Program = {
  key: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  icon: string;
};

/* Figma 4619:1090 — the two community programs, the talks first. */
const PROGRAMS: Program[] = [
  {
    key: "talks",
    title: "حوارات ولقاءات TX",
    text: "جلسات وحوارات مركزة مع خبراء وممارسين حول التكنولوجيا والمنتجات الرقمية واحتياجات السوق، تتيح الاطلاع على تجارب عملية وبناء علاقات مهنية مفيدة.",
    cta: "استكشف حوارات ولقاءات TX",
    href: communityHref("talks"),
    icon: "/icons/home/community-talks.svg",
  },
  {
    key: "talent",
    title: "المواهب والشراكات المجتمعية",
    text: "تعاون مع الجامعات والأندية التقنية والمجتمعات المهنية، والمشاركة في الأنشطة والمسابقات القائمة، مع فرص للتدريب العملي والإرشاد واكتشاف المواهب والفرق الواعدة.",
    cta: "انضم إلى مجتمع TX",
    href: communityHref("join"),
    icon: "/icons/home/community-talent.svg",
  },
];

/** TX Community (Figma 4619:1047): the pitch and its two programs beside a
    photo of the community at work. */
export function TxCommunity() {
  return (
    <section id="community" className={styles.section} aria-labelledby="community-title">
      <div className={styles.inner}>
        <div className={styles.content}>
          <Reveal className={styles.head}>
            <h2 id="community-title" className={styles.title}>مجتمع TX</h2>
            <p className={styles.lead}>
              مساحة للتواصل المهني وتبادل الخبرات بين المطورين والمتخصصين ورواد الأعمال والطلاب والشركاء، عبر لقاءات تقنية وأنشطة مشتركة وفرص للتعلم التطبيقي والتعاون.
            </p>
          </Reveal>

          <div className={styles.programs}>
            {PROGRAMS.map((program) => (
              <article key={program.key} className={styles.card}>
                <div className={styles.tile} aria-hidden="true">
                  <Image src={program.icon} alt="" width={26} height={26} />
                </div>
                <h3 className={styles.cardTitle}>{program.title}</h3>
                <ClampText text={program.text} />
                <a href={program.href} className={styles.link}>
                  {program.cta}
                  <Image className={styles.arrow} src="/icons/home/arrow-forward.svg" alt="" width={20} height={20} aria-hidden />
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.photo}>
          <Image
            src="/images/home/community-professionals.png"
            alt="مجموعة من المتخصصين يتبادلون الخبرات في لقاء تقني"
            fill
            sizes="(max-width: 1024px) 90vw, 500px"
          />
        </div>
      </div>
    </section>
  );
}
