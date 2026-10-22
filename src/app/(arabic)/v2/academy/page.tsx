import type { Metadata } from "next";
import { LearningTracks } from "@/components/v2/academy/LearningTracks";
import { PageBody } from "@/components/v2/layout/PageBody";
import { CardSection } from "@/components/v2/sections/CardSection";
import { CtaBanner } from "@/components/v2/sections/CtaBanner";
import { FaqList } from "@/components/v2/sections/FaqList";
import { PageIntro } from "@/components/v2/sections/PageIntro";
import { ProcessSteps } from "@/components/v2/sections/ProcessSteps";
import { Media } from "@/components/v2/ui/Media";

export const metadata: Metadata = {
  title: "الأكاديمية",
  description:
    "مسارات في التدريب والتأهيل المهني، والصناعة، والتعاونيات السعودية. نبدأ بتحديد الاحتياج التعلمي، ثم نصمم تجربة تربط المفهوم بالتطبيق.",
};

/** Figma "الأكاديمية" (3693:66391). */
export default function AcademyV2() {
  return (
    <PageBody>
      <PageIntro
        crumbs={[{ label: "الأكاديمية" }]}
        title="معرفة تتصل بالعمل. ومهارات تتطور بالممارسة."
        lead="مسارات في التدريب والتأهيل المهني، والصناعة، والتعاونيات السعودية. نبدأ بتحديد الاحتياج التعلمي، ثم نصمم تجربة تربط المفهوم بالتطبيق."
        layout="split"
      >
        <Media
          src="/v2/images/academy-hero.png"
          alt="مدرب يشرح على لوح أبيض لفريق في قاعة تدريب"
          width={570}
          height={540}
          radius={24}
          sizes="(max-width: 768px) 100vw, (max-width: 1440px) 45vw, 570px"
          priority
        />
      </PageIntro>

      <LearningTracks />

      <CardSection
        eyebrow="تجربة تعلم مرنة"
        title="نختار الصيغة التي تخدم المخرجات."
        items={[
          {
            icon: "/v2/icons/pencil-ruler.svg",
            title: "ورش تطبيقية",
            text: "جلسات تتضمن تمارين ونقاشًا حول تحديات واقعية من بيئة العمل.",
          },
          {
            icon: "/v2/icons/users-round.svg",
            title: "مسارات للفرق",
            text: "محتوى متدرج يجمع معرفة مشتركة وتطبيقًا مرتبطًا بالأدوار.",
          },
          {
            icon: "/v2/icons/sliders-horizontal.svg",
            title: "تعلم مخصص",
            text: "تصميم المحتوى والمستوى وأسلوب التقديم بحسب الفئة والاحتياج.",
          },
        ]}
      />

      <ProcessSteps
        variant="ruled"
        steps={[
          { title: "تحديد الاحتياج", text: "نفهم الفئة ومستواها والتحديات التي تواجهها." },
          { title: "تصميم المسار", text: "نحدد المخرجات والمحتوى والتطبيقات المناسبة." },
          { title: "تقديم وتطبيق", text: "نجمع المفاهيم بالتمارين والنقاش العملي." },
          { title: "مراجعة التعلم", text: "نراجع المخرجات والتغذية الراجعة وفرص المتابعة." },
        ]}
      />

      <FaqList
        items={[
          {
            question: "هل البرامج متاحة للتسجيل الفردي الآن؟",
            answer:
              "تُناقش إتاحة كل مسار ومواعيده بعد تحديد الطلب. هذه الصفحة تعرض المجالات وأمثلة المحتوى، ولا تتضمن جدول تسجيل حاليًا.",
          },
          {
            question: "هل تقدم الأكاديمية شهادات معتمدة؟",
            answer:
              "لا يُفترض أي اعتماد مهني أو شهادة معتمدة من هذا العرض. تُوضح أي متطلبات أو مخرجات توثيقية بشكل صريح عند الاتفاق.",
          },
          {
            question: "هل يمكن تخصيص مسار لفريقنا؟",
            answer:
              "نعم، يمكن دراسة احتياج الفريق وتخصيص الموضوعات والمستوى والتطبيقات بما يناسب طبيعة العمل.",
          },
        ]}
      />

      <CtaBanner
        title="ما المهارة التي يحتاجها فريقك الآن؟"
        text="أخبرنا عن المجال والفئة المستهدفة ومخرجات التعلم المرغوبة، لنناقش المسار المناسب."
        service="academy"
      />
    </PageBody>
  );
}
