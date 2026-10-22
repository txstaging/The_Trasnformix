import type { Metadata } from "next";
import { ContactForm } from "@/components/v2/contact/ContactForm";
import { isRequestKey } from "@/components/v2/contact/options";
import { PageBody } from "@/components/v2/layout/PageBody";
import { FaqList } from "@/components/v2/sections/FaqList";
import { PageIntro } from "@/components/v2/sections/PageIntro";
import { ProcessSteps } from "@/components/v2/sections/ProcessSteps";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description:
    "شاركنا احتياجك وما ترغب في تطويره. تساعدنا التفاصيل الأولية على فهم السياق وتوجيه النقاش إلى الخدمة أو المسار المناسب.",
};

/** Figma "تواصل معنا" (3693:66579). Service pages link here with
    ?service=… to preselect the request type. */
export default async function ContactV2({ searchParams }: PageProps<"/v2/contact">) {
  const { service } = await searchParams;

  return (
    <PageBody>
      <PageIntro
        crumbs={[{ label: "تواصل معنا" }]}
        title="كل مشروع واضح، يبدأ بحوار جيد."
        lead="شاركنا احتياجك وما ترغب في تطويره. تساعدنا التفاصيل الأولية على فهم السياق وتوجيه النقاش إلى الخدمة أو المسار المناسب."
      />

      <section id="request" className={styles.request} aria-label="نموذج طلب التواصل">
        <ContactForm defaultRequest={isRequestKey(service) ? service : undefined} />
      </section>

      <ProcessSteps
        variant="ruled"
        steps={[
          { title: "مراجعة الاحتياج", text: "فهم طبيعة الطلب والمعلومات المتاحة." },
          { title: "توضيح السياق", text: "مناقشة أي تفاصيل لازمة مع صاحب الطلب." },
          { title: "تحديد المسار", text: "اقتراح الخدمة أو مسار التعلم المناسب." },
          { title: "اتفاق على الخطوة", text: "تحديد آلية المتابعة ونطاق النقاش التالي." },
        ]}
      />

      <FaqList
        items={[
          {
            question: "لا أعرف الخدمة المناسبة؛ ماذا أختار؟",
            answer:
              "اختر «أحتاج مساعدة في الاختيار»، واكتب وصفًا للتحدي أو النتيجة التي تريد تحقيقها.",
          },
          {
            question: "هل أرسل ملفات أو بيانات فعلية مع الطلب؟",
            answer:
              "لا حاجة لذلك في البداية. يمكن تحديد آلية آمنة لمشاركة ما يلزم بعد فهم الطلب والاتفاق على الصلاحيات.",
          },
          {
            question: "هل إرسال الطلب يُعد اتفاقًا على تنفيذ المشروع؟",
            answer:
              "لا. الطلب خطوة للتعارف وفهم الاحتياج، وأي تنفيذ يتطلب نطاقًا وعرضًا واتفاقًا مستقلًا.",
          },
        ]}
      />
    </PageBody>
  );
}
