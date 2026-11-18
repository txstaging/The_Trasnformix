import styles from "./GuideSection.module.css";

const chapters = [
  { title: "مراحل تنفيذ ERP", detail: "الفصلان 05 و06", icon: "arrows" },
  { title: "خصوصية البيانات وأمنها", detail: "الفصلان 08 و09", icon: "shield" },
  { title: "الاستضافة ونماذج التشغيل", detail: "الفصل 10", icon: "layers" },
  { title: "تكاليف التنفيذ", detail: "الفصل 11", icon: "chart" },
  { title: "مسؤوليات العميل والمورد", detail: "الفصل 12", icon: "people" },
  { title: "جاهزية المشروع", detail: "الفصل 13", icon: "calendar" },
] as const;

function ChapterIcon({ name }: { name: (typeof chapters)[number]["icon"] }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "arrows") return <svg viewBox="0 0 24 24" {...common}><path d="M7 7h13l-3-3M17 17H4l3 3" /><path d="M20 7v5M4 17v-5" /></svg>;
  if (name === "shield") return <svg viewBox="0 0 24 24" {...common}><path d="M12 3 19 6v5c0 4.5-2.8 7.8-7 10-4.2-2.2-7-5.5-7-10V6l7-3Z" /><path d="m9 12 2 2 4-4" /></svg>;
  if (name === "layers") return <svg viewBox="0 0 24 24" {...common}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></svg>;
  if (name === "chart") return <svg viewBox="0 0 24 24" {...common}><path d="M4 19V5M4 19h16M8 15v-3m4 3V8m4 7V5m4 10v-6" /></svg>;
  if (name === "people") return <svg viewBox="0 0 24 24" {...common}><circle cx="9" cy="8" r="3" /><path d="M3 20v-1a6 6 0 0 1 12 0v1M16 5a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 5v1" /></svg>;
  return <svg viewBox="0 0 24 24" {...common}><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M8 3v4m8-4v4M4 10h16m-11 5 2 2 4-4" /></svg>;
}

export function GuideSection() {
  return (
    <section className={styles.section} aria-labelledby="guide-title">
      <div className={styles.copy}>
        <span className={styles.badge}>يصلك بعد إكمال التقييم</span>
        <h2 id="guide-title">الدليل المرجعي لتنفيذ أنظمة تخطيط موارد المؤسسة</h2>
        <p className={styles.description}>
          دليل معرفي واستشاري تصدره ترانسفورمكس للمؤسسات وأصحاب القرار وفرق التنفيذ، يجمع بين المفاهيم الأساسية ومراحل العمل ومعايير القرار والمسؤوليات المتبادلة، مع أمثلة توضيحية على الأنظمة الجاهزة والحلول المستقلة.
        </p>
        <div className={styles.tags}>
          <span>22 صفحة</span><span>15 فصلًا وملحق</span><span>إصدار نوفمبر 2026</span>
        </div>
        <div className={styles.chapters}>
          {chapters.map((chapter) => (
            <article className={styles.chapter} key={chapter.title}>
              <span className={styles.chapterIcon}><ChapterIcon name={chapter.icon} /></span>
              <span className={styles.chapterCopy}><b>{chapter.title}</b><small>{chapter.detail}</small></span>
            </article>
          ))}
        </div>
        <p className={styles.note}>الدليل مرجع معرفي عام، ولا يُعد عرضًا فنيًا أو شهادة امتثال أو بديلًا عن العقود والتقييمات النظامية المتخصصة.</p>
        <a className={styles.cta} href="#form-title">أكمل التقييم واحصل على الدليل <span aria-hidden="true">←</span></a>
      </div>
      <div className={styles.bookStage} aria-label="غلاف الدليل المرجعي بصيغة PDF، 22 صفحة">
        <div className={styles.bookBack} aria-hidden="true" />
        <div className={styles.book}>
          <div className={styles.bookCover}>
            <span className={styles.issue}>إصدار مرجعي إقليمي — نوفمبر 2026</span>
            <h3>الدليل المرجعي لتنفيذ أنظمة تخطيط موارد المؤسسة</h3>
            <p>فهم الأنظمة، والاستعداد للمشروع، وحوكمة البيانات، وأمن المعلومات، والمسؤوليات التعاقدية.</p>
          </div>
          <div className={styles.bookFooter}><b>إعداد وإصدار: ترانسفورمكس</b><span>22 صفحة</span></div>
        </div>
        <span className={styles.pdfBadge}>PDF</span>
      </div>
    </section>
  );
}
