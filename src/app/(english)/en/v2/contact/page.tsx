import type { Metadata } from "next";
import { ContactForm } from "@/english/components/v2/contact/ContactForm";
import { isRequestKey } from "@/english/components/v2/contact/options";
import { PageBody } from "@/english/components/v2/layout/PageBody";
import { FaqList } from "@/english/components/v2/sections/FaqList";
import { PageIntro } from "@/english/components/v2/sections/PageIntro";
import { ProcessSteps } from "@/english/components/v2/sections/ProcessSteps";
import styles from "@/app/(english)/en/v2/contact/page.module.css";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Tell us what you need and what you would like to improve. These initial details help us understand the context and guide the conversation toward the right service or learning path.",
};

/** Figma "تواصل معنا" (3693:66579). Service pages link here with
    ?service=… to preselect the request type. */
export default async function ContactV2({ searchParams }: PageProps<"/en/v2/contact">) {
  const { service } = await searchParams;

  return (
    <PageBody>
      <PageIntro
        crumbs={[{ label: "Contact us" }]}
        title={"Every well-defined project starts with a good conversation."}
        lead={"Tell us what you need and what you would like to improve. These initial details help us understand the context and guide the conversation toward the right service or learning path."}
      />

      <section id="request" className={styles.request} aria-label={"Contact request form"}>
        <ContactForm defaultRequest={isRequestKey(service) ? service : undefined} />
      </section>

      <ProcessSteps
        variant="ruled"
        steps={[
          { title: "Review the need", text: "Understand the request and the information available." },
          { title: "Clarify the context", text: "Discuss any additional details needed with the requester." },
          { title: "Identify the right path", text: "Suggest the appropriate service or learning path." },
          { title: "Agree on the next step", text: "Define how we will follow up and the scope of the next conversation." },
        ]}
      />

      <FaqList
        items={[
          {
            question: "I am not sure which service I need. What should I select?",
            answer:
              "Select \"I need help choosing\" and describe your challenge or the outcome you want to achieve.",
          },
          {
            question: "Should I include files or actual business data with my request?",
            answer:
              "There is no need at this stage. Once we understand the request and agree on access permissions, we can arrange a secure way to share anything required.",
          },
          {
            question: "Does submitting a request commit us to a project?",
            answer:
              "No. The request helps us get acquainted and understand your needs. Project delivery requires a separately agreed scope, proposal, and agreement.",
          },
        ]}
      />
    </PageBody>
  );
}
