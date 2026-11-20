import type { Metadata } from "next";
import { AcademyAction } from "@/components/academies/AcademyAction";
import { AcademyFaq } from "@/components/academies/AcademyFaq";
import { SectionIntro } from "@/components/academies/AcademiesKit";
import { BrandDeliverables } from "@/components/creative/brand/BrandDeliverables";
import { brand, Touchpoints } from "@/components/creative/brand/BrandParts";
import { ProcessFlow } from "@/components/creative/brand/ProcessFlow";
import {
  CreativeIntro,
  CreativeNav,
  creativePage,
  SectorBanner,
  WorkGrid,
} from "@/components/creative/CreativeKit";
import {
  Connected,
  InfoCards,
  RequestClosing,
  SocialSection,
  social,
  type Info,
  type Linked,
} from "@/components/creative/social-media/SocialMedia";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { Reveal } from "@/components/ui/Reveal";
import flow from "@/components/ui/SectionFlow.module.css";
import { creativeHref } from "@/lib/creativeNav";
import { tajawal } from "@/lib/fonts";
import { ServiceCards } from "./ServiceCards";

export const metadata: Metadata = {
  title: "استراتيجية العلامة التجارية والهوية | Transformix",
  description:
    "نساعد الشركات على بناء علامات تجارية تعبر عن هويتها وقيمتها، وتعزز قدرتها على التواصل مع عملائها والتميز في الأسواق التي تعمل بها. تجمع خدمات ترانسفورمكس بين أبحاث السوق والجمهور، واستراتيجية العلامة التجارية، والتصميم الإبداعي، لتطوير هويات متكاملة.",
};

const image = (name: string) => `/images/creative/brand/${name}.jpg`;
const icon = (name: string) => `/icons/creative/brand-${name}.svg`;

/* Figma 5246:22396: six service cards, each with its own photo and a short
   note; every call to action opens the contact form. */
const SERVICES = [
  {
    title: "استشارات العلامة التجارية",
    text: "نقدم استشارات متخصصة تساعد المؤسسات على تقييم علاماتها التجارية وتحديد فرص تطويرها، بالاستناد إلى طبيعة النشاط والسوق والجمهور المستهدف.",
  },
  {
    title: "استراتيجية العلامة التجارية",
    text: "نطور استراتيجيات تحدد موقع العلامة التجارية في السوق، والقيمة التي تقدمها، والجمهور الذي تخاطبه، والطريقة التي تعبر بها عن شخصيتها.",
  },
  {
    title: "تسمية العلامات التجارية",
    text: "نطور أسماء وعناصر هوية لفظية للعلامات التجارية والمنتجات والخدمات، تعكس طبيعة النشاط وتناسب الجمهور والأسواق المستهدفة.",
  },
  {
    title: "تصميم الهوية البصرية",
    text: "نصمم هويات بصرية تعكس شخصية العلامة التجارية، وتوفر لغة تصميم واضحة يمكن استخدامها في مختلف تطبيقاتها.",
  },
  {
    title: "تطوير العلامات وإعادة بناء الهوية",
    text: "نساعد المؤسسات على تطوير علاماتها التجارية الحالية بما يتناسب مع التغيرات في نشاطها أو جمهورها أو موقعها في السوق.",
  },
  {
    title: "أدلة الهوية وتطبيقاتها",
    text: "نعد أدلة تساعد المؤسسات وفرق التسويق والتصميم والشركاء على استخدام الهوية التجارية بصورة صحيحة في مختلف المواد والقنوات.",
  },
].map((item, index) => ({
  ...item,
  image: `/images/creative/brand/service-${index + 1}.jpg`,
  actionLabel: "اخبرنا عن مشروعك",
}));

/* Figma 5041:9985, in reading order (row by row from the right). */
const INDUSTRIES: readonly Info[] = [
  {
    icon: icon("ind-business"),
    title: "الشركات والمؤسسات",
    text: "تطوير الهويات المؤسسية، والعروض التجارية، والملفات التعريفية، وأدلة الهوية وتطبيقاتها في التواصل الداخلي والخارجي.",
  },
  {
    icon: icon("ind-startup"),
    title: "الشركات الناشئة والمنتجات الجديدة",
    text: "تطوير أسماء العلامات، وتحديد التموضع، وتصميم الهوية، وتجهيز المواد الأساسية لإطلاق المنتجات والخدمات.",
  },
  {
    icon: icon("ind-ecommerce"),
    title: "التجارة الإلكترونية والتجزئة",
    text: "تطوير العلامات التجارية للمتاجر والمنتجات، وتصميم العبوات والمواد التسويقية، وتطبيق الهوية على المتاجر والقنوات الرقمية.",
  },
  {
    icon: icon("ind-education"),
    title: "التعليم والتدريب",
    text: "بناء هويات المؤسسات والأكاديميات والبرامج التعليمية، وتطوير المواد التعريفية والترويجية والتصميمات المرتبطة بالتجربة التعليمية.",
  },
  {
    icon: icon("ind-industry"),
    title: "الصناعة والأعمال بين الشركات",
    text: "تطوير الهوية المؤسسية والكتالوجات والعروض التجارية والمواد التقنية، بما يدعم التعريف بالقدرات والمنتجات لدى العملاء والشركاء.",
  },
  {
    icon: icon("ind-tourism"),
    title: "السياحة والضيافة",
    text: "تطوير هويات الوجهات والمنشآت والخدمات السياحية، وتصميم المواد البصرية والتعريفية التي تعكس طبيعة التجربة والجمهور المستهدف.",
  },
];

/* Figma 5036:9939, 01 to 04 from the right. */
const STOPS = [
  { icon: icon("tp-megaphone"), title: "التعرف عليها" },
  { icon: icon("tp-globe"), title: "البحث عن خدماتها" },
  { icon: icon("tp-grid"), title: "استخدام منتجاتها" },
  { icon: icon("tp-message"), title: "التواصل مع فرقها" },
] as const;

/* Figma 5036:9975, the right card first. */
const NOTES = [
  {
    icon: icon("tp-link"),
    text: "ولهذا يمكن ربط خدمات بناء الهوية بتصميم المواقع والتطبيقات، وإنتاج المواد الإعلامية، وإدارة المحتوى والحملات التسويقية، بحيث تعكس هذه التطبيقات شخصية العلامة ورسائلها.",
  },
  {
    icon: icon("tp-users"),
    text: "ونقدم خدمات الاستراتيجية والتصميم بصورة مستقلة، أو ضمن مشروعات متكاملة تتطلب التعاون مع فرق التسويق والإنتاج الإبداعي وتجربة المستخدم.",
  },
] as const;

/* Figma 5036:9597, steps 01 to 05 from the right. */
const STEPS = [
  {
    icon: { src: icon("step-users"), size: 26 },
    title: "البحث وفهم العلامة",
    text: "نبدأ بالتعرف على المؤسسة ونشاطها وجمهورها وأهدافها، ومراجعة العلامة الحالية إن وجدت، ودراسة العناصر التي تؤثر في موقعها التنافسي.",
  },
  {
    icon: { src: icon("step-chart"), size: 26 },
    title: "بناء التوجه الاستراتيجي",
    text: "نحدد موقع العلامة ورسائلها وشخصيتها وأولويات تطويرها، ونناقش الخيارات مع أصحاب القرار قبل الانتقال إلى التصميم.",
  },
  {
    icon: { src: icon("step-sparkles"), size: 26 },
    title: "التطوير الإبداعي",
    text: "نطور الاتجاهات البصرية واللفظية المناسبة، ونقدم نماذج توضح كيفية تطبيق العلامة عبر الاستخدامات المستهدفة.",
  },
  {
    icon: { src: icon("step-calendar"), size: 26 },
    title: "الاعتماد والتسليم",
    text: "نراجع المخرجات مع العميل، ونعتمد الهوية النهائية، ونجهز الملفات والأدلة والتطبيقات المتفق عليها ضمن نطاق المشروع.",
  },
  {
    icon: { src: icon("step-repeat"), size: 26 },
    title: "دعم التطبيق والتطوير",
    text: "يمكننا تقديم الدعم لتطبيق الهوية على القنوات الرقمية والمواد التسويقية، أو التعاون مع فرق المؤسسة وشركائها لتنفيذها.",
  },
] as const;

/* Figma 5046:10031, 01 to 08 from the top. */
const DELIVERABLES = [
  "تقرير مراجعة العلامة وتحليل السوق والمنافسين والجمهور.",
  "وثيقة استراتيجية العلامة والتموضع والرسائل الرئيسية.",
  "مقترحات التسمية والهوية اللفظية.",
  "الشعار والهوية البصرية وعناصر التصميم.",
  "دليل استخدام الهوية التجارية.",
  "قوالب العروض التقديمية والمراسلات والمواد التسويقية.",
  "تطبيقات الهوية الرقمية والمطبوعة.",
  "الملفات النهائية وملفات المصدر وفق اتفاق المشروع.",
] as const;

/* Figma 5036:9655. */
const RELATED: readonly Linked[] = [
  {
    icon: icon("rel-sparkles"),
    title: "التصميم والإنتاج الإعلامي",
    text: "تطوير المواد الإعلانية والفيديو والرسوم والمحتوى البصري.",
  },
  {
    icon: icon("rel-users"),
    title: "إدارة منصات التواصل الاجتماعي",
    text: "تطبيق الهوية والرسائل عبر المحتوى والقنوات الاجتماعية.",
  },
  {
    icon: icon("rel-book"),
    title: "التسويق بالمحتوى والعلاقات العامة الرقمية",
    text: "تطوير المحتوى المؤسسي والرسائل التسويقية والتواصل الإعلامي.",
  },
  {
    icon: icon("rel-grid"),
    title: "تصميم التجارب والواجهات الرقمية",
    text: "تطبيق الهوية على تجربة المستخدم وواجهات المواقع والتطبيقات.",
  },
  {
    icon: icon("rel-trending"),
    title: "إدارة الحملات الإعلانية والتسويق بالأداء",
    text: "توظيف العلامة التجارية ورسائلها في حملات تستهدف جماهير وأهدافًا محددة.",
  },
];

/* Figma 5036:9792: only the first answer is drawn open, so the rest have none
   in the artboard; these follow the page's own copy. */
const FAQ = [
  {
    question: "ما الفرق بين تصميم الشعار وبناء الهوية التجارية؟",
    answer:
      "الشعار عنصر من عناصر الهوية البصرية، بينما تشمل الهوية الألوان والخطوط والعناصر والتطبيقات التي تشكل المظهر العام للعلامة. أما استراتيجية العلامة التجارية فتحدد موقعها ورسائلها والقيمة التي تقدمها لجمهورها.",
  },
  {
    question: "هل يمكن تطوير الهوية الحالية دون تغيير العلامة بالكامل؟",
    answer:
      "نعم، يبدأ العمل بمراجعة عناصر العلامة الحالية وتحديد ما يمكن الاحتفاظ به وما يحتاج إلى تطوير، ثم تحديث الهوية أو الرسائل وفق الأهداف المعتمدة دون الحاجة إلى إعادة بناء العلامة كاملة.",
  },
  {
    question: "هل تشمل خدمات بناء العلامة تصميم الموقع الإلكتروني؟",
    answer:
      "يمكن ربط خدمات بناء الهوية بتصميم المواقع والتطبيقات، وتقديمها كمشروع متكامل أو كخدمات مستقلة، بحسب نطاق العمل المتفق عليه مع فريقنا.",
  },
  {
    question: "هل تقدمون خدمات العلامات التجارية للشركات الناشئة والمؤسسات القائمة؟",
    answer:
      "نعم، نعمل مع العلامات الجديدة والقائمة، سواء كان الهدف تأسيس هوية من البداية، أو تطوير علامة حالية، أو إعادة تقديمها بما يتناسب مع توجهات المؤسسة وفرص نموها.",
  },
  {
    question: "ما المدة اللازمة لتطوير هوية تجارية؟",
    answer:
      "تختلف المدة باختلاف نطاق المشروع وعدد المخرجات ومراحل المراجعة والاعتماد، ويحددها عرض العمل بعد التعرف على احتياجاتك وأهدافك.",
  },
  {
    question: "هل نحصل على ملفات التصميم الأصلية؟",
    answer:
      "نسلّم الملفات النهائية وملفات المصدر وفق اتفاق المشروع، مع تحديد المخرجات المشمولة في عرض العمل.",
  },
] as const;

/** Figma 5036:9551 — استراتيجية العلامة التجارية والهوية (desktop 1440). */
export default function BrandPage() {
  return (
    <>
      <Navbar variant="slim" />
      <main className={`${flow.flow} ${creativePage} ${tajawal.variable}`}>
        <CreativeNav current="brand" />

        <SectorBanner
          id="brand-banner-heading"
          className={brand.banner}
          image={image("banner")}
          focus="50% 40%"
          title="استراتيجية العلامة التجارية والهوية"
          text="نساعد الشركات على بناء علامات تجارية تعبر عن هويتها وقيمتها، وتعزز قدرتها على التواصل مع عملائها والتميز في الأسواق التي تعمل بها. تجمع خدمات ترانسفورمكس بين أبحاث السوق والجمهور، واستراتيجية العلامة التجارية، والتصميم الإبداعي، لتطوير هويات متكاملة يمكن تطبيقها عبر القنوات الرقمية والمطبوعات والمنتجات ونقاط التواصل المختلفة. ونعمل مع العلامات الجديدة والقائمة، سواء كان الهدف تأسيس هوية من البداية، أو تطوير علامة حالية، أو إعادة تقديمها بما يتناسب مع توجهات المؤسسة وفرص نموها."
          actions={[
            { label: "استكشف قدراتنا", href: "#brand-capabilities", tone: "inverse" },
            { label: "ناقش مشروع علامتك التجارية", tone: "outlineInverse" },
          ]}
        />

        <SocialSection id="brand-capabilities" labelledBy="brand-capabilities-heading">
          <CreativeIntro id="brand-capabilities-heading" title="خدماتنا في العلامة التجارية" />
          <ServiceCards items={SERVICES} label="خدماتنا في العلامة التجارية" />
        </SocialSection>

        <SocialSection labelledBy="brand-industries-heading">
          <CreativeIntro id="brand-industries-heading" title="علامات تجارية تناسب طبيعة أعمالك" />
          <InfoCards items={INDUSTRIES} columns={3} />
          <div className={social.sectionAction}>
            <AcademyAction action={{ label: "استكشف القطاعات التي نخدمها", href: "/sectors", tone: "outline" }} />
          </div>
        </SocialSection>

        <SocialSection compact labelledBy="brand-touchpoints-heading">
          <CreativeIntro id="brand-touchpoints-heading" title="هوية واحدة عبر مختلف نقاط التواصل" dark />
          <Touchpoints
            lead="تمتد العلامة التجارية إلى جميع التجارب التي يتعامل من خلالها الجمهور مع المؤسسة، بدءًا من التعرف عليها والبحث عن خدماتها، وحتى استخدام منتجاتها والتواصل مع فرقها."
            stops={STOPS}
            notes={NOTES}
            action={{ label: "استكشف خدمات التصميم والإبداع", href: creativeHref("creative"), tone: "outline" }}
          />
        </SocialSection>

        <SocialSection labelledBy="brand-approach-heading">
          <CreativeIntro id="brand-approach-heading" title="كيف نطوّر علامتك التجارية؟" dark />
          <ProcessFlow steps={STEPS} label="مراحل تطوير العلامة التجارية" />
        </SocialSection>

        <SocialSection band="card" labelledBy="brand-deliverables-heading">
          <CreativeIntro
            id="brand-deliverables-heading"
            title="مخرجات واضحة لكل مشروع"
            text="تختلف المخرجات باختلاف نطاق الخدمة ومرحلة العلامة التجارية، وقد تشمل:"
          />
          <Reveal>
            <BrandDeliverables
              label="مخرجات مشروع العلامة التجارية"
              items={DELIVERABLES}
              image={image("deliverables")}
              alt="فريق يراجع تقريرًا للميزانية الشهرية على حاسوب محمول حول طاولة اجتماعات"
            />
          </Reveal>
        </SocialSection>

        <SocialSection id="brand-works" labelledBy="brand-works-heading">
          <CreativeIntro
            id="brand-works-heading"
            title="أعمالنا في بناء العلامات التجارية"
            text={
              <>
                تعرف على نماذج من مشروعات تطوير الهوية والعلامات التجارية التي شاركت فيها ترانسفورمكس، واستكشف نطاق الأعمال والمخرجات الإبداعية لكل مشروع.
                <br />
                نعرض الأعمال المتاحة للنشر وفق التصاريح المعتمدة، مع توضيح مساهمتنا الفعلية في الاستراتيجية أو التصميم أو التطبيق.
              </>
            }
            blue
          />
          <div className={social.sectionAction}>
            <div className={social.actions}>
              <AcademyAction action={{ label: "استكشف معرض أعمالنا", href: "/works" }} />
              <AcademyAction action={{ label: "اقرأ دراسات الحالة", href: "/works", tone: "outline" }} />
            </div>
          </div>
          <WorkGrid
            items={[
              {
                title: "CHE ACADEMY",
                href: "/works",
                image: "/images/creative/works/che-academy.jpg",
                alt: "موقع أكاديمية CHE معروضًا على جهاز لوحي",
                height: 415,
              },
              {
                title: "MY HORIZON",
                href: "/works",
                image: "/images/creative/works/my-horizon.jpg",
                alt: "هوية أكاديمية ماي هورايزن للتنس والبادل",
                height: 415,
              },
              {
                title: "انتاج و صناعة الفديوهات",
                href: "/works",
                alt: "",
                height: 394,
                video: true,
              },
              {
                title: "GUIDE",
                href: "/works",
                image: "/images/creative/works/guide.jpg",
                alt: "منصة دليل للجولات السياحية على الحاسوب والجوال",
                height: 394,
              },
            ]}
          />
        </SocialSection>

        <SocialSection labelledBy="brand-related-heading">
          <Connected
            id="brand-related-heading"
            title="خدمات متكاملة تدعم علامتك"
            lead="يمكن أن تمتد مشروعات تطوير العلامات التجارية إلى خدمات أخرى تقدمها ترانسفورمكس، وفق أهداف المؤسسة ونطاق التعاون."
            items={RELATED}
            image={image("related")}
            alt="مطوران يراجعان شيفرة برمجية على شاشة حاسوب محمول"
            action={{ label: "استكشف خدمات الإبداع والتسويق الرقمي", href: creativeHref("overview") }}
          />
        </SocialSection>

        <SocialSection labelledBy="brand-faq-heading">
          <SectionIntro id="brand-faq-heading" title="الأسئلة الشائعة" start />
          <AcademyFaq items={FAQ} />
        </SocialSection>

        <section id="brand-request" className={social.closingSection} aria-labelledby="brand-closing-heading">
          <RequestClosing
            id="brand-closing-heading"
            title="لنطوّر علامتك التجارية"
            paragraphs={[
              "سواء كنت تؤسس علامة جديدة، أو تطور هوية قائمة، أو تستعد لإطلاق منتج أو دخول سوق جديد، يمكننا مساعدتك في تحديد التوجه الاستراتيجي والإبداعي المناسب لأعمالك.",
              "شاركنا طبيعة مشروعك والمرحلة التي وصلت إليها، وسنناقش معك نطاق الخدمات والمخرجات المناسبة.",
            ]}
            actionLabel="تواصل مع فريقنا"
            actionTone="outline"
            formId="brand-request-form"
            formTitle="ناقش مشروع علامتك التجارية"
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
