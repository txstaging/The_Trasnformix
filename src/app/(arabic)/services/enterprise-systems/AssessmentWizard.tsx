"use client";

import { useState } from "react";
import { PHONE_COUNTRIES } from "./phoneCountries";
import styles from "./page.module.css";

const countries = ["السعودية", "الإمارات", "مصر", "عُمان", "الكويت", "ليبيا", "دولة أخرى"];
const sectors = ["التصنيع", "التجارة", "الخدمات", "الإنشاءات", "السياحة", "الخدمات اللوجستية", "قطاع آخر"];
const employeeRanges = ["أقل من 50 موظفًا", "من 50 إلى 250 موظفًا", "من 251 إلى 1000 موظف", "أكثر من 1000 موظف"];
const goals = ["دقة المخزون", "سرعة الإقفال المالي", "تحسين التقارير", "توحيد البيانات", "الرقابة على الموافقات", "هدف آخر"];
const functions = ["الحسابات", "المبيعات", "المشتريات", "المخزون", "الموارد البشرية", "إدارة علاقات العملاء", "المشروعات", "التصنيع", "أخرى"];
const integrations = ["البنوك", "منصات التجارة الإلكترونية", "الجهات الحكومية", "الأجهزة", "أخرى"];
const countryNames = new Intl.DisplayNames(["ar"], { type: "region" });
const preferredPhoneCountryCodes = ["SA", "AE", "EG"];
const phoneCountries = [...PHONE_COUNTRIES].sort((a, b) => {
  const aPreferred = preferredPhoneCountryCodes.indexOf(a.code);
  const bPreferred = preferredPhoneCountryCodes.indexOf(b.code);
  if (aPreferred !== -1 || bPreferred !== -1) {
    if (aPreferred === -1) return 1;
    if (bPreferred === -1) return -1;
    if (aPreferred !== bPreferred) return aPreferred - bPreferred;
  }
  return (countryNames.of(a.code) ?? a.code).localeCompare(countryNames.of(b.code) ?? b.code, "ar");
});

const digitsOnly = (input: string) =>
  input
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 0x06f0))
    .replace(/[^0-9]/g, "")
    .slice(0, 15);

type Values = {
  countries: string[];
  sector: string;
  users: string;
  size: string;
  goals: string[];
  functions: string[];
  existingSystems: string;
  manualProcesses: string;
  hasIntegrations: string;
  integrations: string[];
  reportNeeds: string;
  dataSensitivity: string[];
  hosting: string;
  dataLocationTerms: string;
  backupOwner: string;
  projectTiming: string;
  budgetRange: string;
  decisionOwner: string;
  migrateData: string;
  dataReviewer: string;
  contactName: string;
  jobTitle: string;
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  phoneCountry: string;
  consent: boolean;
};

const initialValues: Values = {
  countries: [], sector: "", users: "", size: "", goals: [], functions: [],
  existingSystems: "", manualProcesses: "", hasIntegrations: "", integrations: [], reportNeeds: "",
  dataSensitivity: [], hosting: "", dataLocationTerms: "", backupOwner: "",
  projectTiming: "", budgetRange: "", decisionOwner: "", migrateData: "", dataReviewer: "",
  contactName: "", jobTitle: "", companyName: "", contactEmail: "", contactPhone: "", phoneCountry: "SA:966", consent: false,
};

function ChoiceGroup({
  label, items, value, onChange, type = "checkbox", hint, fieldKey,
}: {
  label: string;
  items: string[];
  value: string[];
  onChange: (value: string[]) => void;
  type?: "checkbox" | "radio";
  hint?: string;
  fieldKey?: string;
}) {
  const selected = Array.isArray(value) ? value : [];
  const toggle = (item: string) => {
    if (type === "radio") {
      onChange(selected.includes(item) ? [] : [item]);
    } else if (selected.includes(item)) {
      onChange(selected.filter((current) => current !== item));
    } else if (label.includes("الثلاثة") && selected.length < 3) {
      onChange([...selected, item]);
    } else if (!label.includes("الثلاثة")) {
      onChange([...selected, item]);
    }
  };
  return (
    <fieldset className={styles.fullField} data-assessment-field={fieldKey} tabIndex={fieldKey ? -1 : undefined}>
      <legend>{label} <span>*</span></legend>
      {hint && <small>{hint}</small>}
      <div className={styles.choiceList}>
        {items.map((item) => {
          const checked = selected.includes(item);
          const limitReached = label.includes("الثلاثة") && selected.length >= 3 && !checked;
          return <label className={styles.choice} key={item}>
            <input type={type} name={label} value={item} checked={checked} disabled={limitReached} onChange={() => toggle(item)} />
            <span>{item}</span>
          </label>;
        })}
      </div>
    </fieldset>
  );
}

export function AssessmentWizard() {
  const [page, setPage] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [values, setValues] = useState<Values>(initialValues);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const update = <K extends keyof Values>(key: K, value: Values[K]) =>
    setValues((current) => ({ ...current, [key]: value }));

  function missingFieldsFor(step: number) {
    const requiredByPage: Record<number, string[]> = {
      1: [
        ...(!values.countries?.length ? ["countries"] : []),
        ...(!values.sector ? ["sector"] : []),
        ...(!values.users ? ["users"] : []),
        ...(!values.size ? ["size"] : []),
        ...(!values.goals?.length ? ["goals"] : []),
      ],
      2: [
        ...(!values.functions?.length ? ["functions"] : []),
        ...(!values.hasIntegrations ? ["hasIntegrations"] : []),
        ...(values.hasIntegrations === "نعم" && !values.integrations?.length ? ["integrations"] : []),
      ],
      3: [
        ...(!values.dataSensitivity?.length ? ["dataSensitivity"] : []),
        ...(!values.hosting ? ["hosting"] : []),
        ...(!values.dataLocationTerms ? ["dataLocationTerms"] : []),
        ...(!values.backupOwner ? ["backupOwner"] : []),
      ],
      4: [
        ...(!values.projectTiming ? ["projectTiming"] : []),
        ...(!values.budgetRange ? ["budgetRange"] : []),
        ...(!(values.decisionOwner ?? "").trim() ? ["decisionOwner"] : []),
        ...(!values.migrateData ? ["migrateData"] : []),
      ],
    };
    return requiredByPage[step] ?? [];
  }

  function showMissingFields(missing: string[]) {
    if (missing.length) {
      setError("فيه حقول مهمة لسه ما اتجاوبش عليها. أكمل الحقول المحددة بعلامة * قبل المتابعة.");
      requestAnimationFrame(() => {
        const field = document.querySelector<HTMLElement>(`[data-assessment-field="${missing[0]}"]`);
        field?.focus({ preventScroll: true });
        field?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      return false;
    }
    return true;
  }

  function next() {
    if (!showMissingFields(missingFieldsFor(page))) return;
    setError("");
    if (page < 5) setPage((current) => (current + 1) as 1 | 2 | 3 | 4 | 5);
  }

  function goToStep(target: 1 | 2 | 3 | 4 | 5) {
    if (target <= page) {
      setPage(target);
      setError("");
      return;
    }
    for (let step = page; step < target; step += 1) {
      if (!showMissingFields(missingFieldsFor(step))) {
        setPage(step as 1 | 2 | 3 | 4);
        return;
      }
    }
    setPage(target);
    setError("");
  }

  async function submitAssessment() {
    const contactName = (values.contactName ?? "").trim();
    const jobTitle = (values.jobTitle ?? "").trim();
    const companyName = (values.companyName ?? "").trim();
    const contactEmail = (values.contactEmail ?? "").trim();
    const localPhone = digitsOnly(values.contactPhone ?? "");
    if (!contactName || !jobTitle || !companyName || !contactEmail || !localPhone || !values.consent) {
      setError("أكمل بيانات التواصل المطلوبة ووافق على استخدام بياناتك لإرسال التقييم.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contactEmail)) {
      setError("تحقق من كتابة بريد إلكتروني صحيح للعمل.");
      return;
    }
    if (localPhone.length < 7) {
      setError("أدخل رقم جوال صحيحًا.");
      return;
    }

    setSending(true);
    setError("");
    const answerLines = [
      "استبيان تقييم احتياجات ERP",
      `المسمى الوظيفي: ${values.jobTitle}`,
      `الدول: ${values.countries.join("، ")}`,
      `القطاع: ${values.sector}`,
      `عدد المستخدمين: ${values.users}`,
      `حجم المؤسسة: ${values.size}`,
      `أهداف المشروع: ${values.goals.join("، ")}`,
      `الوظائف المطلوبة: ${values.functions.join("، ")}`,
      `الأنظمة الحالية: ${values.existingSystems}`,
      `العمليات اليدوية: ${values.manualProcesses}`,
      `التكاملات: ${values.hasIntegrations}${values.integrations.length ? ` — ${values.integrations.join("، ")}` : ""}`,
      `متطلبات التقارير: ${values.reportNeeds}`,
      `حساسية البيانات: ${values.dataSensitivity.join("، ")}`,
      `الاستضافة: ${values.hosting}`,
      `اشتراطات موقع البيانات: ${values.dataLocationTerms}`,
      `مسؤول الخوادم والنسخ الاحتياطية: ${values.backupOwner}`,
      `موعد البدء: ${values.projectTiming}`,
      `نطاق الميزانية: ${values.budgetRange}`,
      `صاحب قرار الاختيار: ${values.decisionOwner}`,
      `ترحيل البيانات: ${values.migrateData}`,
      `مسؤول مراجعة البيانات: ${values.dataReviewer}`,
    ].join("\n").slice(0, 3900);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form: "page",
          name: contactName,
          email: contactEmail,
          phone: `+${PHONE_COUNTRIES.find(({ code, callingCode }) => `${code}:${callingCode}` === (values.phoneCountry ?? "SA:966"))?.callingCode ?? "966"}${localPhone.replace(/^0+/, "")}`,
          company: companyName,
          website: "",
          services: ["انظمة ERP"],
          message: answerLines,
          consent: values.consent,
        }),
      });
      if (!response.ok) throw new Error("submission_failed");
      setSent(true);
    } catch {
      setError("تعذر إرسال التقييم الآن. حاول مرة أخرى بعد قليل.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className={styles.formShell}>
      <div className={styles.formMain}>
        {page === 1 ? <>
          <div className={styles.formStepHeading}>
            <span className={styles.formStepBadge}>الخطوة 1 من 4</span>
            <h3>بيانات المؤسسة</h3>
            <p>أخبرنا عن مؤسستك ونطاق عملها والأهداف التي تتوقع تحقيقها من المشروع.</p>
          </div>
          <div className={styles.formProgress}>
            <div><span>تقدم التقييم</span><b>أكمل 0%</b></div><i><span style={{ width: "0%" }} /></i>
          </div>
          <div className={styles.formFields}>
            <ChoiceGroup fieldKey="countries" label="في أي دولة أو دول يستخدم النظام؟" hint="يمكنك اختيار أكثر من دولة، مع تحديد مواقع الكيانات والفروع لاحقًا." items={countries} value={values.countries} onChange={(value) => update("countries", value)} />
            <label data-assessment-field="sector" tabIndex={-1}>قطاع المؤسسة <span>*</span><select value={values.sector} onChange={(event) => update("sector", event.target.value)}><option value="">اختر القطاع</option>{sectors.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label data-assessment-field="users" tabIndex={-1}>عدد المستخدمين المتوقع <span>*</span><select value={values.users} onChange={(event) => update("users", event.target.value)}><option value="">اختر العدد التقريبي</option><option>أقل من 50 مستخدمًا</option><option>من 50 إلى 250 مستخدمًا</option><option>من 251 إلى 1000 مستخدم</option><option>أكثر من 1000 مستخدم</option></select></label>
            <ChoiceGroup fieldKey="size" label="ما حجم المؤسسة؟" type="radio" items={employeeRanges} value={values.size ? [values.size] : []} onChange={(value) => update("size", value[0] ?? "")} />
            <ChoiceGroup fieldKey="goals" label="ما أهداف المشروع الثلاثة الأكثر أهمية؟" hint={`اختر حتى ثلاثة أهداف (${values.goals.length} من 3).`} items={goals} value={values.goals} onChange={(value) => update("goals", value)} />
          </div>
        </> : page === 2 ? <>
          <div className={styles.formStepHeading}>
            <span className={styles.formStepBadge}>الخطوة 2 من 4</span>
            <h3>الأنظمة الحالية والمتطلبات</h3>
            <p>حدد الوظائف المطلوبة والأنظمة والتكاملات والمتطلبات الخاصة.</p>
          </div>
          <div className={styles.formProgress}>
            <div><span>تقدم التقييم</span><b>أكمل 25%</b></div><i><span style={{ width: "25%" }} /></i>
          </div>
          <div className={styles.formFields}>
            <ChoiceGroup fieldKey="functions" label="ما الوظائف المطلوبة؟" hint="اختر كل ما ينطبق." items={functions} value={values.functions} onChange={(value) => update("functions", value)} />
            <label className={styles.fullField}>ما الأنظمة الحالية والملفات اليدوية المستخدمة؟<textarea value={values.existingSystems} onChange={(event) => update("existingSystems", event.target.value)} placeholder="مثال: نظام محاسبي مستقل وجداول بيانات لإدارة المخزون والمشتريات." rows={3} /></label>
            <label className={styles.fullField}>ما العمليات اليدوية التي ترغبون في استبدالها؟<textarea value={values.manualProcesses} onChange={(event) => update("manualProcesses", event.target.value)} placeholder="مثال: إعداد التقارير الشهرية، متابعة الموافقات، جرد المخزون." rows={3} /></label>
            <ChoiceGroup fieldKey="hasIntegrations" label="هل توجد تكاملات مع منصات أو جهات خارجية؟" hint="مثل البنوك أو منصات التجارة أو الجهات الحكومية أو الأجهزة." type="radio" items={["نعم", "لا", "غير متأكد"]} value={values.hasIntegrations ? [values.hasIntegrations] : []} onChange={(value) => update("hasIntegrations", value[0] ?? "")} />
            {values.hasIntegrations === "نعم" && <ChoiceGroup fieldKey="integrations" label="حدد التكاملات المطلوبة" items={integrations} value={values.integrations} onChange={(value) => update("integrations", value)} />}
            <label className={styles.fullField}>هل توجد متطلبات خاصة للتقارير والموافقات واللغة؟ (اختياري)<textarea value={values.reportNeeds} onChange={(event) => update("reportNeeds", event.target.value)} placeholder="مثال: تقارير باللغتين العربية والإنجليزية، مسارات موافقة متعددة." rows={3} /></label>
          </div>
        </> : page === 3 ? <>
          <div className={styles.formStepHeading}>
            <span className={styles.formStepBadge}>الخطوة 3 من 4</span>
            <h3>البيانات والبنية التقنية</h3>
            <p>ساعدنا على فهم طبيعة البيانات واشتراطات الاستضافة والتشغيل.</p>
          </div>
          <div className={styles.formProgress}>
            <div><span>تقدم التقييم</span><b>أكمل 50%</b></div><i><span style={{ width: "50%" }} /></i>
          </div>
          <div className={styles.formFields}>
            <ChoiceGroup fieldKey="dataSensitivity" label="هل تتعاملون مع بيانات شخصية أو مالية أو صحية أو عالية الحساسية؟" hint="اختر كل ما ينطبق." items={["بيانات شخصية", "بيانات مالية", "بيانات صحية", "بيانات عالية الحساسية", "لا يوجد"]} value={values.dataSensitivity} onChange={(value) => update("dataSensitivity", value)} />
            <fieldset className={styles.fullField} data-assessment-field="hosting" tabIndex={-1}>
              <legend>ما نموذج الاستضافة الذي تفضلونه؟ <span>*</span></legend>
              <div className={styles.hostingOptions}>
                {["استضافة داخل الدولة", "داخل المنشأة", "سحابة", "نحتاج توصية"].map((option, index) => (
                  <label className={`${styles.hostingOption} ${values.hosting === option ? styles.hostingOptionSelected : ""}`} key={option}>
                    <input type="radio" name="hosting" value={option} checked={values.hosting === option} onChange={() => update("hosting", option)} />
                    <span className={styles.hostingIcon} aria-hidden="true">{["◎", "▦", "▰", "♧"][index]}</span>
                    <b>{option}</b>
                  </label>
                ))}
              </div>
            </fieldset>
            <ChoiceGroup fieldKey="dataLocationTerms" label="هل هناك اشتراطات قطاعية أو تعاقدية لموقع تخزين البيانات أو وصول فرق الدعم؟" type="radio" items={["نعم", "لا", "غير متأكد"]} value={values.dataLocationTerms ? [values.dataLocationTerms] : []} onChange={(value) => update("dataLocationTerms", value[0] ?? "")} />
            <ChoiceGroup fieldKey="backupOwner" label="من سيدير الخوادم والنسخ الاحتياطية والحسابات والمراقبة؟" type="radio" items={["فريقنا الداخلي", "ترانسفورمكس", "مزود خدمة متخصص", "لم يحدد بعد"]} value={values.backupOwner ? [values.backupOwner] : []} onChange={(value) => update("backupOwner", value[0] ?? "")} />
            <div className={`${styles.fullField} ${styles.privacyNote}`}>
              <b>تنبيه</b>
              <p>لا يُطلب في هذا الاستبيان رفع قواعد بيانات تشغيل حقيقية أو كشف موظفين أو كلمات مرور.</p>
            </div>
          </div>
        </> : page === 4 ? <>
          <div className={styles.formStepHeading}>
            <span className={styles.formStepBadge}>الخطوة 4 من 4</span>
            <h3>تفاصيل المشروع</h3>
            <p>حدد الموعد المستهدف، والنطاق المالي، وأصحاب القرار وترحيل البيانات.</p>
          </div>
          <div className={styles.formProgress}>
            <div><span>تقدم التقييم</span><b>أكمل 75%</b></div><i><span style={{ width: "75%" }} /></i>
          </div>
          <div className={styles.formFields}>
            <ChoiceGroup fieldKey="projectTiming" label="ما الموعد المستهدف للبدء؟" type="radio" items={["خلال 3 أشهر", "من 3 إلى 6 أشهر", "بعد 6 أشهر", "لم يحدد بعد"]} value={values.projectTiming ? [values.projectTiming] : []} onChange={(value) => update("projectTiming", value[0] ?? "")} />
            <label className={styles.fullField} data-assessment-field="budgetRange" tabIndex={-1}>هل توجد ميزانية أو نطاق مالي متوقع؟ <span>*</span><select value={values.budgetRange} onChange={(event) => update("budgetRange", event.target.value)}><option value="">اختر النطاق المتوقع</option><option>أقل من 100 ألف</option><option>من 100 إلى 500 ألف</option><option>من 500 ألف إلى مليون</option><option>أكثر من مليون</option><option>لم تحدد الميزانية بعد</option></select><small>استخدم عملة مؤسستك عند تقدير النطاق.</small></label>
            <label className={styles.fullField} data-assessment-field="decisionOwner" tabIndex={-1}>من يملك قرار اختيار النظام واعتماد المتطلبات والاختبارات؟ <span>*</span><input value={values.decisionOwner ?? ""} onChange={(event) => update("decisionOwner", event.target.value)} placeholder="مثال: المدير التنفيذي أو مدير المالية" /></label>
            <ChoiceGroup fieldKey="migrateData" label="هل يتطلب المشروع ترحيل بيانات حقيقية؟" type="radio" items={["نعم", "لا", "غير متأكد"]} value={values.migrateData ? [values.migrateData] : []} onChange={(value) => update("migrateData", value[0] ?? "")} />
            <label className={styles.fullField}>من المسؤول عن مراجعة البيانات؟<input value={values.dataReviewer ?? ""} onChange={(event) => update("dataReviewer", event.target.value)} placeholder="الاسم أو المسمى الوظيفي" /></label>
          </div>
        </> : sent ? <div className={styles.sentState} role="status">
          <span className={styles.sentCheck} aria-hidden="true">✓</span>
          <h3>تم استلام تقييمك بنجاح</h3>
          <p>شكرًا لك. سيُرسل الدليل المرجعي لتنفيذ أنظمة تخطيط موارد المؤسسة إلى بريدك الإلكتروني للعمل، ويمكنك تحميله الآن مباشرة.</p>
          <div className={styles.downloadCard}>
            <span className={styles.bookIcon} aria-hidden="true">◫</span>
            <span><b>الدليل المرجعي لتنفيذ أنظمة تخطيط موارد المؤسسة</b><small>PDF · 22 صفحة</small></span>
            <button type="button" disabled title="ملف الدليل غير متوفر في المشروع حاليًا">تحميل الدليل (PDF) <span aria-hidden="true">←</span></button>
          </div>
          <div className={styles.nextSteps}>
            <h4>ماذا يحدث بعد ذلك؟</h4>
            <ol>
              <li>راجع إجاباتك ووثق المتطلبات الإلزامية والفجوات والافتراضات.</li>
              <li>قارن البدائل المرشحة وفق القدرة الوظيفية والتكلفة والبيانات والمخاطر والجدول الزمني.</li>
              <li>نشارك ملخص الاحتياجات والنطاق الأولي والخطوات اللازمة لإعداد العرض الفني والمالي.</li>
            </ol>
          </div>
        </div> : <>
          <div className={styles.formStepHeading}>
            <span className={styles.formStepBadge}>الخطوة الأخيرة</span>
            <h3>المراجعة والإرسال</h3>
            <p>راجع إجاباتك وأضف بيانات التواصل لإرسال التقييم واستلام الدليل.</p>
          </div>
          <div className={styles.formProgress}>
            <div><span>تقدم التقييم</span><b>أكمل 100%</b></div><i><span style={{ width: "100%" }} /></i>
          </div>
          <div className={styles.reviewGrid}>
            {[
              { step: 1, title: "بيانات المؤسسة", text: `${values.countries.join("، ")} · ${values.sector} · ${values.size} · ${values.goals.join("، ")}` },
              { step: 2, title: "الأنظمة الحالية والمتطلبات", text: `${values.functions.join("، ")} · التكاملات: ${values.hasIntegrations || "لم تحدد"}` },
              { step: 3, title: "البيانات والبنية التقنية", text: `${values.dataSensitivity.join("، ")} · الاستضافة: ${values.hosting} · ${values.backupOwner}` },
              { step: 4, title: "تفاصيل المشروع", text: `موعد البدء: ${values.projectTiming} · ترحيل البيانات: ${values.migrateData}` },
            ].map((item) => (
              <article className={styles.reviewCard} key={item.step}>
                <div><b><span aria-hidden="true">✓</span>{item.title}</b><button type="button" onClick={() => { setSent(false); setPage(item.step as 1 | 2 | 3 | 4); }}>تعديل</button></div>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className={styles.contactFields}>
            <h4>بيانات التواصل</h4>
            <p>نستخدم هذه البيانات للتواصل معك بخصوص التقييم وإرسال الدليل المرجعي إلى بريدك الإلكتروني للعمل.</p>
            <div className={styles.contactGrid}>
              <label>الاسم الكامل <span>*</span><input autoComplete="name" value={values.contactName ?? ""} onChange={(event) => update("contactName", event.target.value)} placeholder="اكتب اسمك" /></label>
              <label>المسمى الوظيفي <span>*</span><input autoComplete="organization-title" value={values.jobTitle ?? ""} onChange={(event) => update("jobTitle", event.target.value)} placeholder="مثال: مدير العمليات" /></label>
              <label>اسم الشركة <span>*</span><input autoComplete="organization" value={values.companyName ?? ""} onChange={(event) => update("companyName", event.target.value)} placeholder="اسم الشركة" /></label>
              <label>البريد الإلكتروني للعمل <span>*</span><input type="email" autoComplete="email" value={values.contactEmail ?? ""} onChange={(event) => update("contactEmail", event.target.value)} placeholder="name@company.com" /></label>
              <label className={`${styles.fullField} ${styles.phoneField}`}>رقم الجوال <span>*</span><span className={styles.phoneEntry}>
                <select aria-label="اختر الدولة ومفتاح الاتصال" value={values.phoneCountry ?? "SA:966"} onChange={(event) => update("phoneCountry", event.target.value)}>
                  {phoneCountries.map((country) => <option key={`${country.code}:${country.callingCode}`} value={`${country.code}:${country.callingCode}`}>{countryNames.of(country.code) ?? country.code} (+{country.callingCode})</option>)}
                </select>
                <input type="tel" inputMode="numeric" pattern="[0-9]*" maxLength={15} autoComplete="tel-national" value={values.contactPhone ?? ""} onChange={(event) => update("contactPhone", digitsOnly(event.target.value))} placeholder="5XXXXXXXX" dir="ltr" />
              </span></label>
            </div>
            <label className={styles.consent}><input type="checkbox" checked={values.consent ?? false} onChange={(event) => update("consent", event.target.checked)} /><span>أوافق على استخدام بياناتي للتواصل بخصوص هذا التقييم.</span></label>
          </div>
        </>}
        {error && <p className={styles.formError} role="alert">{error}</p>}
        {!sent && <div className={styles.formActions}>
          <span>الحقول المميزة بـ * مطلوبة.</span>
          <div>
            <button type="button" className={styles.previousButton} disabled={page === 1} onClick={() => { setPage((current) => Math.max(1, current - 1) as 1 | 2 | 3 | 4); setError(""); }}>السابق</button>
            {page === 5 && !sent
              ? <button type="button" onClick={submitAssessment} disabled={sending}>{sending ? "جارٍ الإرسال…" : <>أرسل التقييم <span aria-hidden="true">←</span></>}</button>
              : page < 5 && <button type="button" onClick={next}>متابعة <span aria-hidden="true">←</span></button>}
          </div>
        </div>}
      </div>
      <aside className={styles.formSidebar} aria-label="مراحل تقييم احتياجات ERP">
        <h3>تقييم احتياجات ERP</h3>
        <p className={styles.sidebarLead}>أربع خطوات، ثم المراجعة والإرسال.</p>
        <ol className={styles.sidebarSteps}>
          <li className={page === 1 ? styles.sidebarStepActive : styles.sidebarStepDone}>
            <button type="button" disabled={sent} onClick={() => goToStep(1)}><b><span>{page === 1 ? "1" : "✓"}</span> بيانات المؤسسة</b><small>الدول والقطاع والحجم والأهداف</small></button>
          </li>
          <li className={page === 2 ? styles.sidebarStepActive : page > 2 ? styles.sidebarStepDone : ""}>
            <button type="button" disabled={sent} onClick={() => goToStep(2)}><b><span>{page > 2 ? "✓" : "2"}</span> الأنظمة الحالية والمتطلبات</b><small>الوظائف والأنظمة والتكاملات</small></button>
          </li>
          <li className={page === 3 ? styles.sidebarStepActive : page > 3 ? styles.sidebarStepDone : ""}>
            <button type="button" disabled={sent} onClick={() => goToStep(3)}><b><span>{page > 3 ? "✓" : "3"}</span> البيانات والبنية التقنية</b><small>حساسية البيانات والاستضافة</small></button>
          </li>
          <li className={page === 4 ? styles.sidebarStepActive : page > 4 ? styles.sidebarStepDone : ""}>
            <button type="button" disabled={sent} onClick={() => { goToStep(4); setSent(false); }}><b><span>{page > 4 ? "✓" : "4"}</span> تفاصيل المشروع</b><small>الموعد والميزانية والقرار</small></button>
          </li>
          <li className={page === 5 && !sent ? styles.sidebarStepActive : sent ? styles.sidebarStepDone : ""}>
            <button type="button" disabled={sent} onClick={() => goToStep(5)}><b><span>{sent ? "✓" : "5"}</span> المراجعة والإرسال</b><small>بيانات التواصل والإرسال</small></button>
          </li>
        </ol>
        <div className={styles.guideNote}>
          <span className={styles.guideIcon} aria-hidden="true">▤</span>
          <span><b>يصلك الدليل المرجعي بعد الإرسال</b><small>عبر بريدك الإلكتروني للعمل</small></span>
        </div>
      </aside>
    </div>
  );
}
