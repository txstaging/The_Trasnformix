import type { Metadata } from "next";
import { PageBody } from "@/components/v2/layout/PageBody";
import { CardSection } from "@/components/v2/sections/CardSection";
import { CtaBanner } from "@/components/v2/sections/CtaBanner";
import { PageIntro } from "@/components/v2/sections/PageIntro";
import { ProcessSteps } from "@/components/v2/sections/ProcessSteps";
import { SplitFeature } from "@/components/v2/sections/SplitFeature";
import { CardGrid } from "@/components/v2/ui/FeatureCard";
import { Media } from "@/components/v2/ui/Media";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "ترانسفورمكس جهة استشارية وخدمية تجمع بين فهم نماذج الأعمال وتصميم الحلول الرقمية. نبدأ من واقع المنشأة لنحدد ما يحتاج إلى تطوير، وكيف يمكن تنفيذه بوضوح.",
};

/** Figma "من نحن" (3693:64812). */
export default function AboutV2() {
  return (
    <PageBody>
      <PageIntro
        title="نقرّب المسافة بين طموح الأعمال وإمكانات التقنية."
        lead="ترانسفورمكس جهة استشارية وخدمية تجمع بين فهم نماذج الأعمال وتصميم الحلول الرقمية. نبدأ من واقع المنشأة لنحدد ما يحتاج إلى تطوير، وكيف يمكن تنفيذه بوضوح."
        titleWidth={734}
        leadWidth={786}
        minHeight={372}
      />

      <SplitFeature
        eyebrow="منطلقنا"
        title="التقنية وسيلة. وقيمة الأعمال هي الأساس."
        lead="لا يبدأ التطوير باختيار منصة أو أداة؛ بل بفهم من يستخدمها، وما الذي تعالجه، وكيف تتكامل مع العمل اليومي."
        note="لذلك نربط بين التحليل والاستشارة والتصميم والتنفيذ. ونحرص على أن يكون لكل مخرج هدف معروف، ولكل مرحلة نقطة مراجعة تساعد على اتخاذ القرار التالي."
        copyWidth={610}
        media={
          <Media
            src="/v2/images/about-collaboration.png"
            alt="زميلان يراجعان العمل على حاسوب في مكتب"
            width={600}
            height={460}
            radius={24}
          />
        }
      />

      <CardGrid
        tone="gradient"
        items={[
          {
            icon: "/v2/icons/about-telescope.svg",
            title: "رؤيتنا",
            text: "أن تصبح الحلول الرقمية أكثر ارتباطًا باحتياجات المنشآت، وأكثر وضوحًا وقابلية للاستخدام.",
          },
          {
            icon: "/v2/icons/about-compass.svg",
            title: "رسالتنا",
            text: "مساعدة المنشآت على تحويل تحديات الأعمال إلى مسارات تطوير عملية تجمع البيانات والتجربة والعمليات.",
          },
          {
            icon: "/v2/icons/about-route.svg",
            title: "نهجنا",
            text: "إنصات للسياق، وتحديد للأولويات، وتنفيذ تدريجي مع نقل المعرفة إلى الفريق.",
          },
        ]}
      />

      <CardSection
        eyebrow="قيم تقود العمل"
        title="مبادئ تظهر في طريقة التعاون، لا في الشعارات فقط."
        items={[
          {
            icon: "/v2/icons/about-scan-line.svg",
            title: "الوضوح",
            text: "لغة مفهومة، وتوقعات محددة، ومخرجات يمكن مراجعتها.",
          },
          {
            icon: "/v2/icons/about-shield-check.svg",
            title: "المسؤولية",
            text: "قرارات واعية بحدود النطاق والمعلومات المتاحة.",
          },
          {
            icon: "/v2/icons/about-handshake.svg",
            title: "الشراكة",
            text: "عمل مع فريق المنشأة وبناء على معرفته بالسياق.",
          },
          {
            icon: "/v2/icons/refresh-cw.svg",
            title: "التحسين",
            text: "مراجعة ما نتعلمه وتطوير الحل بناءً على الملاحظات.",
          },
        ]}
      />

      <ProcessSteps
        bordered
        steps={[
          { title: "نستمع", text: "نجمع وجهات النظر ونفهم احتياجات المستخدمين." },
          { title: "نحلل", text: "نراجع الوضع الحالي ونحدد التحدي الفعلي." },
          { title: "نتشارك", text: "نصوغ الحل ونراجع الأولويات مع فريقك." },
          { title: "نمكّن", text: "نسلّم المعرفة والأدوات اللازمة لاستمرار العمل." },
        ]}
      />

      <CtaBanner
        title="لنتعرّف على واقع منشأتك."
        text="حوار أولي لفهم الأولويات وتحديد ما إذا كانت خدماتنا مناسبة لاحتياجك."
      />
    </PageBody>
  );
}
