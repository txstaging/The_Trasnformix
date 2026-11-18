import Image from "next/image";
import { AcademyAction, type Action } from "@/components/academies/AcademyAction";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Brand.module.css";

/* استراتيجية العلامة التجارية والهوية (Figma 5036:9551): what only this page
   draws that the creative kit and the social-media parts do not — the
   touchpoints journey. The deliverables list is a client part of its own. */

export { styles as brand };

export type Touchpoint = { icon: string; title: string };

export type Note = { icon: string; text: string };

/** Figma "Touchpoints" 5036:9934: a card with the lead and the four-stop
    journey (a round icon, its number and its name, a line running from the
    first to the last), then two notes side by side and a call. Stops and notes
    are in reading order: the first sits on the right. */
export function Touchpoints({ lead, stops, notes, action }: {
  lead: string;
  stops: readonly Touchpoint[];
  notes: readonly Note[];
  action: Action;
}) {
  return (
    <>
      <Reveal className={styles.journeyCard}>
        <p className={styles.journeyLead}>{lead}</p>
        <ol className={styles.journey}>
          {stops.map((stop, index) => (
            <li key={stop.title} className={styles.stop}>
              <span className={styles.stopIcon} aria-hidden>
                <Image src={stop.icon} alt="" width={30} height={30} />
              </span>
              <span className={styles.stopNumber} aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.stopName}>{stop.title}</h3>
            </li>
          ))}
        </ol>
      </Reveal>

      <ul className={styles.notes}>
        {notes.map((note, index) => (
          <Reveal as="li" key={note.text} className={styles.note} delay={index * 80}>
            <span className={styles.noteIcon} aria-hidden>
              <Image src={note.icon} alt="" width={22} height={22} />
            </span>
            <p className={styles.noteText}>{note.text}</p>
          </Reveal>
        ))}
      </ul>

      <Reveal className={styles.journeyAction}>
        <AcademyAction action={action} />
      </Reveal>
    </>
  );
}
