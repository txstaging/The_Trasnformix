import type { Metadata } from "next";
import { LearningTracks } from "@/english/components/v2/academy/LearningTracks";
import { PageBody } from "@/english/components/v2/layout/PageBody";
import { CardSection } from "@/english/components/v2/sections/CardSection";
import { CtaBanner } from "@/english/components/v2/sections/CtaBanner";
import { FaqList } from "@/english/components/v2/sections/FaqList";
import { PageIntro } from "@/english/components/v2/sections/PageIntro";
import { ProcessSteps } from "@/english/components/v2/sections/ProcessSteps";
import { Media } from "@/english/components/v2/ui/Media";

export const metadata: Metadata = {
  title: "Academy",
  description:
    "Learning paths in vocational training, manufacturing, and Saudi cooperatives. We identify the learning need, then design an experience that connects concepts with practice.",
};

/** Figma "الأكاديمية" (3693:66391). */
export default function AcademyV2() {
  return (
    <PageBody>
      <PageIntro
        crumbs={[{ label: "Academy" }]}
        title={"Knowledge connected to work. Skills developed through practice."}
        lead={"Learning paths in vocational training, manufacturing, and Saudi cooperatives. We identify the learning need, then design an experience that connects concepts with practice."}
        layout="split"
      >
        <Media
          src="/v2/images/academy-hero.png"
          alt={"A trainer explaining a topic on a whiteboard to a team in a training room"}
          width={570}
          height={540}
          radius={24}
          sizes="(max-width: 768px) 100vw, (max-width: 1440px) 45vw, 570px"
          priority
        />
      </PageIntro>

      <LearningTracks />

      <CardSection
        eyebrow={"A flexible learning experience"}
        title={"We choose the format that best supports the learning outcomes."}
        items={[
          {
            icon: "/v2/icons/pencil-ruler.svg",
            title: "Practical workshops",
            text: "Sessions with exercises and discussions based on real workplace challenges.",
          },
          {
            icon: "/v2/icons/users-round.svg",
            title: "Team learning paths",
            text: "Progressive content that combines shared knowledge with role-specific practice.",
          },
          {
            icon: "/v2/icons/sliders-horizontal.svg",
            title: "Tailored learning",
            text: "Content, level, and delivery designed around the audience and its needs.",
          },
        ]}
      />

      <ProcessSteps
        variant="ruled"
        steps={[
          { title: "Identify the need", text: "We understand the audience, its current level, and the challenges it faces." },
          { title: "Design the learning path", text: "We define suitable outcomes, content, and practical activities." },
          { title: "Learn and apply", text: "We combine concepts with exercises and practical discussions." },
          { title: "Review learning", text: "We review outcomes, feedback, and opportunities for further learning." },
        ]}
      />

      <FaqList
        items={[
          {
            question: "Are programs currently open for individual enrollment?",
            answer:
              "Availability and dates are discussed after we understand the request. This page presents learning areas and sample content; it does not currently include an enrollment schedule.",
          },
          {
            question: "Does the academy offer accredited certificates?",
            answer:
              "This overview does not imply professional accreditation or accredited certification. Any certification requirements or documented outcomes will be explicitly agreed upon.",
          },
          {
            question: "Can a learning path be tailored to our team?",
            answer:
              "Yes. We can assess your team's needs and tailor topics, level, and practical activities to its work.",
          },
        ]}
      />

      <CtaBanner
        title={"Which skill does your team need now?"}
        text={"Tell us about the subject, audience, and desired learning outcomes so we can discuss the right learning path."}
        service="academy"
      />
    </PageBody>
  );
}
