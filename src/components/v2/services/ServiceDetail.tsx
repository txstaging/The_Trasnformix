import type { ReactNode } from "react";
import { PageBody } from "@/components/v2/layout/PageBody";
import { V2, contactHref } from "@/components/v2/routes";
import { CardSection, OUTCOMES_FOOTNOTE } from "@/components/v2/sections/CardSection";
import { ContextNote } from "@/components/v2/sections/ContextNote";
import { CtaBanner } from "@/components/v2/sections/CtaBanner";
import { FaqList } from "@/components/v2/sections/FaqList";
import { PageIntro } from "@/components/v2/sections/PageIntro";
import { ProcessSteps } from "@/components/v2/sections/ProcessSteps";
import { ReadinessNote } from "@/components/v2/sections/ReadinessNote";
import { Button } from "@/components/v2/ui/Button";
import { Media } from "@/components/v2/ui/Media";
import motion from "@/components/v2/ui/Motion.module.css";
import type { ServiceContent } from "./content";
import styles from "./ServiceDetail.module.css";

type ServiceDetailProps = {
  content: ServiceContent;
  /** Replaces the supplied screen under the introduction. */
  visual?: ReactNode;
  /** A section of the page's own, set after the context card. */
  afterContext?: ReactNode;
};

/** Figma "Service narrative" (3693:65240): the layout the four service
    artboards share. The whole narrative fades in together. */
export function ServiceDetail({ content, visual, afterContext }: ServiceDetailProps) {
  const { screen } = content;

  return (
    <PageBody className={motion.fadeIn}>
      <PageIntro
        animate={false}
        crumbs={[{ label: "الخدمات", href: V2.services }, { label: content.crumb }]}
        title={content.title}
        lead={content.lead}
        width={1040}
        action={<Button href={contactHref(content.key)}>اطلب استشارة مجانية</Button>}
      >
        {visual ??
          (screen && (
            <figure className={styles.screen}>
              <Media src={screen.src} alt={screen.alt} width={1040} height={686} fit="contain" priority />
              {screen.caption && <figcaption className={styles.caption}>{screen.caption}</figcaption>}
            </figure>
          ))}
      </PageIntro>

      <ContextNote text={content.context} textFirst={content.contextTextFirst} />

      {afterContext}

      <CardSection
        eyebrow="ماذا نقدم؟"
        title={content.scope.title}
        lead="يُحدد نطاق العمل النهائي وفق الاحتياج والجاهزية، وقد يشمل المسارات التالية."
        tone={content.scope.tone}
        items={content.scope.items}
      />

      <CardSection
        eyebrow="القيمة المستهدفة"
        title="مخرجات ترتبط بما يحتاجه العمل."
        tone={content.outcomes.tone}
        items={content.outcomes.items}
        footnote={content.outcomes.footnote ? OUTCOMES_FOOTNOTE : undefined}
      />

      <ProcessSteps variant={content.process.variant} steps={content.process.steps} />

      <ReadinessNote text={content.readiness} />

      <FaqList items={content.faqs} />

      <CtaBanner title={content.cta.title} text={content.cta.text} service={content.key} />
    </PageBody>
  );
}
