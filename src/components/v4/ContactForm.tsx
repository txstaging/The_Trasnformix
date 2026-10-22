"use client";

import Image from "next/image";
import { useId, useRef, useState, type FormEvent, type ReactNode, type ButtonHTMLAttributes } from "react";
import type { RequestKey } from "@/components/v2/routes";
import {
  EMAIL_PATTERN,
  LIMITS,
  REQUEST_TYPES,
  SECTOR_OPTIONS,
  isValidPhone,
} from "@/components/v2/contact/options";
import { Arrow } from "./Motion";
import styles from "./ContactForm.module.css";

type FormState = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  jobTitle: string;
  sector: string;
  requestType: RequestKey | "";
  message: string;
  consent: boolean;
};

type Field = keyof FormState;
type Errors = Partial<Record<Field, string>>;

const validate = (form: FormState): Errors => {
  const errors: Errors = {};
  if (form.fullName.trim().length < 2) errors.fullName = "من فضلك اكتب اسمك الكامل.";
  if (!form.company.trim()) errors.company = "من فضلك اكتب اسم المنشأة.";
  if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = "من فضلك أدخل بريدًا إلكترونيًا صحيحًا.";
  if (!isValidPhone(form.phone.trim())) {
    errors.phone = "من فضلك أدخل رقم جوال صحيحًا أو اترك الحقل فارغًا.";
  }
  if (!form.sector) errors.sector = "من فضلك اختر قطاع المنشأة.";
  if (!form.requestType) errors.requestType = "من فضلك اختر نوع الطلب.";
  if (!form.message.trim()) errors.message = "من فضلك صف احتياجك.";
  if (!form.consent) errors.consent = "يلزم الموافقة لنتمكن من دراسة طلبك والرد عليه.";
  return errors;
};

const cx = (...names: (string | false | undefined)[]) =>
  names.filter(Boolean).join(" ");

function SectionIntro({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return <div className={styles.formHeading}><p>{eyebrow}</p><h2>{title}</h2><p>{lead}</p></div>;
}

function Button({children, ...props}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={styles.submitButton} {...props}>{children}<Arrow /></button>;
}

type ContactFormProps = {
  /** Preselected from /v4/contact?service=… */
  defaultRequest?: RequestKey;
};

/** Version 4 presentation using the existing validated submission contract. */
export function ContactForm({ defaultRequest }: ContactFormProps) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<FormState>({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    jobTitle: "",
    sector: "",
    requestType: defaultRequest ?? "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const update = <K extends Field>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => (current[key] ? { ...current, [key]: undefined } : current));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    const found = validate(form);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`)?.focus();
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/v2/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error(String(response.status));
      setSent(true);
    } catch {
      setSubmitError("تعذّر إرسال الطلب الآن. حاول مرة أخرى، أو راسلنا على Info@thetransformix.com.");
    } finally {
      setSubmitting(false);
    }
  };

  const id = (field: Field) => `${uid}-${field}`;
  const errorFor = (field: Field) =>
    errors[field] && (
      <p id={`${id(field)}-error`} className={styles.error} role="alert">
        {errors[field]}
      </p>
    );
  const a11y = (field: Field) => ({
    id: id(field),
    "data-field": field,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${id(field)}-error` : undefined,
  });

  const textField = (
    field: "fullName" | "company" | "email" | "phone" | "jobTitle",
    label: ReactNode,
    placeholder: string,
    extra: { type?: string; autoComplete?: string; dir?: "ltr" } = {},
  ) => (
    <div className={styles.field}>
      <label htmlFor={id(field)} className={styles.label}>
        {label}
      </label>
      <input
        {...a11y(field)}
        className={styles.input}
        type={extra.type ?? "text"}
        autoComplete={extra.autoComplete}
        dir={extra.dir}
        placeholder={placeholder}
        maxLength={LIMITS[field]}
        value={form[field]}
        onChange={(event) => update(field, event.target.value)}
      />
      {errorFor(field)}
    </div>
  );

  if (sent) {
    return (
      <div className={cx(styles.card, styles.sent)} role="status">
        <SectionIntro
          eyebrow="تم استلام طلبك"
          title="شكرًا لتواصلك معنا"
          lead="سنراجع التفاصيل ونعود إليك عبر البريد الإلكتروني أو الجوال لتحديد الخطوة التالية."
        />
      </div>
    );
  }

  return (
    <form ref={formRef} className={styles.card} onSubmit={onSubmit} noValidate>
      <SectionIntro
        eyebrow="طلب تواصل"
        title="أخبرنا عن احتياجك"
        lead="الحقول المعلّمة بنجمة (*) مطلوبة."
      />

      <div className={styles.row}>
        {textField("fullName", "الاسم الكامل *", "اكتب اسمك الكامل", { autoComplete: "name" })}
        {textField("company", "اسم المنشأة *", "اكتب اسم المنشأة", {
          autoComplete: "organization",
        })}
      </div>

      <div className={styles.row}>
        {textField("email", "البريد الإلكتروني *", "أدخل بريد العمل", {
          type: "email",
          autoComplete: "email",
        })}
        {textField("phone", "رقم الجوال (اختياري)", "أدخل رقم الجوال", {
          type: "tel",
          autoComplete: "tel",
        })}
      </div>

      <div className={styles.row}>
        {textField("jobTitle", "المسمى الوظيفي (اختياري)", "اكتب المسمى الوظيفي", {
          autoComplete: "organization-title",
        })}
        <div className={styles.field}>
          <label htmlFor={id("sector")} className={styles.label}>
            القطاع *
          </label>
          <div className={styles.selectWrap}>
            <select
              {...a11y("sector")}
              className={cx(styles.input, styles.select, !form.sector && styles.placeholder)}
              value={form.sector}
              onChange={(event) => update("sector", event.target.value)}
            >
              <option value="" disabled>
                اختر قطاع المنشأة
              </option>
              {SECTOR_OPTIONS.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
            <span className={styles.selectChevron} aria-hidden>
              ⌄
            </span>
          </div>
          {errorFor("sector")}
        </div>
      </div>

      <fieldset
        className={styles.requestType}
        aria-describedby={errors.requestType ? `${id("requestType")}-error` : undefined}
      >
        <legend className={styles.legend}>نوع الطلب *</legend>
        <div className={styles.options}>
          {REQUEST_TYPES.map((type, index) => (
            <label key={type.value} className={styles.option}>
              <input
                className={styles.radio}
                type="radio"
                name={`${uid}-request`}
                value={type.value}
                checked={form.requestType === type.value}
                onChange={() => update("requestType", type.value)}
                data-field={index === 0 ? "requestType" : undefined}
              />
              <span className={styles.radioMark} aria-hidden>
                <Image src="/v2/icons/circle.svg" alt="" width={20} height={20} />
              </span>
              <span className={styles.optionLabel}>{type.label}</span>
            </label>
          ))}
        </div>
        {errorFor("requestType")}
      </fieldset>

      <div className={styles.field}>
        <label htmlFor={id("message")} className={styles.label}>
          وصف الاحتياج *
        </label>
        <textarea
          {...a11y("message")}
          className={cx(styles.input, styles.textarea)}
          placeholder="صف التحدي الحالي، والهدف الذي تريد الوصول إليه، وأي معلومات تساعدنا على فهم الطلب."
          maxLength={LIMITS.message}
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
        />
        {errorFor("message")}
      </div>

      <div className={styles.consentBlock}>
        <label className={styles.consent}>
          <input
            {...a11y("consent")}
            className={styles.checkbox}
            type="checkbox"
            checked={form.consent}
            onChange={(event) => update("consent", event.target.checked)}
          />
          <span className={styles.consentText}>
            أوافق على استخدام بيانات التواصل لغرض دراسة هذا الطلب والرد عليه. *
          </span>
        </label>
        {errorFor("consent")}
      </div>

      <div className={styles.submit}>
        <Button type="submit" disabled={submitting}>
          {submitting ? "جارٍ الإرسال…" : "اطلب استشارة مجانية"}
        </Button>
        {submitError && (
          <p className={styles.error} role="alert">
            {submitError}
          </p>
        )}
      </div>

      <p className={styles.privacy}>لن نشارك معلوماتك مع أي طرف آخر، ونستخدمها للرد على طلبك فقط.</p>
    </form>
  );
}
