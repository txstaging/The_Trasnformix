import Image from "next/image";
import { ClampText } from "@/english/components/academies/ClampText";
import { Reveal } from "@/english/components/ui/Reveal";
import { communityHref } from "@/english/lib/communityNav";
import styles from "@/english/components/sections/TxCommunity.module.css";

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
    title: "TX Talks & Meetups",
    text: "Focused sessions and conversations with experts and practitioners on technology, digital products and market needs, offering practical experience and useful professional connections.",
    cta: "Explore TX Talks & Meetups",
    href: communityHref("talks"),
    icon: "/icons/home/community-talks.svg",
  },
  {
    key: "talent",
    title: "Talent & Community Partnerships",
    text: "Collaboration with universities, tech clubs and professional communities, and participation in existing activities and competitions, with opportunities for hands-on training, mentoring and discovering promising talent and teams.",
    cta: "Join TX Community",
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
            <h2 id="community-title" className={styles.title}>{"TX Community"}</h2>
            <p className={styles.lead}>{"A space for professional networking and knowledge exchange among developers, specialists, entrepreneurs, students and partners, through technical meetups, shared activities and opportunities for applied learning and collaboration."}</p>
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
            alt="A group of professionals sharing expertise at a technical meetup"
            fill
            sizes="(max-width: 1024px) 90vw, 500px"
          />
        </div>
      </div>
    </section>
  );
}
