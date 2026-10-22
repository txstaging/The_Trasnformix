import { ClientMarquee } from "@/components/v2/home/ClientMarquee";
import { HomeHero } from "@/components/v2/home/HomeHero";
import { PartnerLogos } from "@/components/v2/home/PartnerLogos";
import { SectorStories } from "@/components/v2/home/SectorStories";
import { ServicesShowcase } from "@/components/v2/home/ServicesShowcase";
import { TrustPanel } from "@/components/v2/home/TrustPanel";
import { WorkExamples } from "@/components/v2/home/WorkExamples";
import { PageBody } from "@/components/v2/layout/PageBody";
import { contactHref } from "@/components/v2/routes";
import { CardSection } from "@/components/v2/sections/CardSection";
import { CtaBanner } from "@/components/v2/sections/CtaBanner";
import { FaqList } from "@/components/v2/sections/FaqList";
import { ProcessSteps } from "@/components/v2/sections/ProcessSteps";
import { SplitFeature } from "@/components/v2/sections/SplitFeature";
import { Button } from "@/components/v2/ui/Button";
import { Media } from "@/components/v2/ui/Media";

/** Figma "الرئيسية" (3693:64469) — الرئيسية 2. */
export default function HomeV2() {
  return (
    <>
      <HomeHero />
      <PageBody gap="lg" top="section">
        <CardSection
          eyebrow="نبدأ بالسؤال الصحيح"
          title="ما الذي تحتاجه أعمالك لتتحرك بثقة؟"
          lead="قد يكون التحدي في تشتت البيانات، أو تجربة رقمية غير واضحة، أو إجراءات تستنزف وقت الفريق. نبدأ بفهم الصورة الكاملة قبل اقتراح الأدوات."
          tone="blue"
          items={[
            {
              icon: "/v2/icons/home-scan-search.svg",
              title: "فهم قبل الحل",
              text: "نستمع إلى أصحاب المصلحة ونفهم الأولويات والقيود الفعلية.",
            },
            {
              icon: "/v2/icons/home-network.svg",
              title: "ترابط بدل التجزئة",
              text: "ننظر إلى البيانات والتجربة والعمليات باعتبارها منظومة واحدة.",
            },
            {
              icon: "/v2/icons/home-list-checks.svg",
              title: "تطبيق قابل للمتابعة",
              text: "نحدد المخرجات والمسؤوليات ونقاط المراجعة منذ البداية.",
            },
          ]}
        />

        <ServicesShowcase />
        <WorkExamples />
        <PartnerLogos />

        <SplitFeature
          eyebrow="حين تصبح البيانات مفهومة"
          title="ليست لوحة مؤشرات أخرى؛ بل سؤالٌ أوضح وقرارٌ أفضل."
          lead="نربط المؤشر بهدفه، ونراجع مصدره، ونضعه في سياق العمل. هكذا يصبح التحليل أداة للحوار بين الإدارة والفرق، لا مجرد أرقام على الشاشة."
          note="نطاق التحليل وتواتر التحديث يعتمدان على جاهزية البيانات وطبيعة الأنظمة القائمة."
          action={
            <Button href={contactHref("data")} variant="primary-soft">
              اطلب الخدمة
            </Button>
          }
          copyWidth={632}
          media={
            <Media
              src="/v2/screens/mcr-dashboard.png"
              alt="لوحة MCR Systems لمراقبة التشغيل"
              width={576}
              height={394}
              crop={{ left: -4.27, top: -2.77, width: 108.54, height: 105.54 }}
            />
          }
        />

        <ProcessSteps
          badge="large"
          steps={[
            { title: "نفهم الواقع", text: "نستكشف التحدي وأصحاب المصلحة والأنظمة الحالية." },
            { title: "نحدد الاتجاه", text: "نرتب الأولويات ونحدد نطاقًا ومخرجات قابلة للمراجعة." },
            { title: "نبني ونختبر", text: "نطور الحل تدريجيًا ونراجع التجربة مع فريقك." },
            { title: "نسلّم ونمكّن", text: "نوثق العمل وندعم انتقال المعرفة إلى المستخدمين." },
          ]}
        />

        <ClientMarquee />
        <SectorStories />

        <SplitFeature
          eyebrow="أكاديمية ترانسفورمكس"
          title="نبني المعرفة التي تتحول إلى ممارسة."
          lead="مسارات معرفية وتطبيقية في التدريب والتأهيل المهني، والصناعة، والتعاونيات السعودية؛ تربط الاحتياج التعلمي بواقع العمل."
          note="تبدأ كل رحلة بتحديد الفئة المستهدفة، ثم اختيار المحتوى وأسلوب التعلّم والمخرجات المناسبة."
          action={
            <Button href={contactHref("academy")} size="compact" width={170}>
              اطلب الخدمة
            </Button>
          }
          copyWidth={548}
          media={
            <Media
              src="/v2/images/home-academy.png"
              alt="جلسة تدريبية لفريق عمل حول طاولة اجتماعات"
              width={654}
              height={470}
              radius={24}
            />
          }
        />

        <TrustPanel />

        <FaqList
          inset
          items={[
            {
              question: "كيف أحدد الخدمة المناسبة لمنشأتي؟",
              answer:
                "ابدأ بوصف التحدي والنتيجة التي تريد الوصول إليها. نناقش معك الوضع الحالي ونساعدك على تحديد المسار ونطاقه قبل البدء.",
            },
            {
              question: "هل يمكن تنفيذ أكثر من خدمة ضمن مشروع واحد؟",
              answer:
                "نعم، يمكن دراسة ترابط الخدمات، مثل ربط الموقع بمحتواه التسويقي أو ربط بيانات التشغيل بأنظمة ERP، وفق نطاق متفق عليه.",
            },
            {
              question: "هل الحلول جاهزة أم تُصمم بحسب الاحتياج؟",
              answer:
                "تُدرس الخيارات بحسب واقع المنشأة. قد يكون الأنسب تهيئة أدوات قائمة، أو تطوير حل مخصص، أو الجمع بينهما.",
            },
          ]}
        />

        <CtaBanner
          title="لنبدأ من التحدي الذي يشغلك."
          text="شاركنا سياق منشأتك وأولوياتك، لنحدد معًا الخطوة المناسبة ونطاق العمل."
          longArrow
        />
      </PageBody>
    </>
  );
}
