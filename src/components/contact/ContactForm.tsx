"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { PillButton } from "@/components/ui/PillButton";
import styles from "./ContactForm.module.css";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  consent: boolean;
};

type Field = keyof FormState;
type Errors = Partial<Record<Field, string>>;

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
  consent: false,
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validate = (form: FormState): Errors => {
  const errors: Errors = {};
  if (form.name.trim().length < 2) errors.name = "من فضلك أدخل اسمك الكامل.";
  if (!EMAIL.test(form.email.trim())) errors.email = "من فضلك أدخل بريدًا إلكترونيًا صحيحًا.";
  const phone = form.phone.trim();
  if (phone && (!/^[+\d\s()-]+$/.test(phone) || phone.replace(/\D/g, "").length < 7)) {
    errors.phone = "من فضلك أدخل رقم هاتف صحيح أو اترك الحقل فارغًا.";
  }
  if (!form.message.trim()) errors.message = "من فضلك اكتب رسالتك.";
  if (!form.consent) errors.consent = "يلزم الموافقة على سياسة الخصوصية لإرسال رسالتك.";
  return errors;
};

const cx = (...names: (string | false | undefined)[]) =>
  names.filter(Boolean).join(" ");

/** The /contact page form: name and email, phone and company (optional), the
    message and the privacy consent. It posts to /api/contact. */
export function ContactForm() {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, form: "page" }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setSent(true);
      setForm(EMPTY);
    } catch {
      setSubmitError(
        "تعذّر إرسال رسالتك الآن. حاول مرة أخرى، أو راسلنا على Info@thetransformix.com",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const id = (field: Field) => `${uid}-${field}`;
  const errorId = (field: Field) => `${uid}-${field}-error`;
  const fieldProps = (field: Field) => ({
    id: id(field),
    "data-field": field,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? errorId(field) : undefined,
  });
  const fieldError = (field: Field) =>
    errors[field] ? (
      <p id={errorId(field)} className={styles.error}>
        {errors[field]}
      </p>
    ) : null;

  if (sent) {
    return (
      <div className={cx(styles.card, styles.done)} role="status">
        <h2 className={styles.title}>شكرًا لتواصلك معنا</h2>
        <p className={styles.doneText}>
          وصلتنا رسالتك، وسيتواصل معك فريق Transformix قريبًا لفهم احتياجك وتحديد
          الخطوة التالية.
        </p>
        <button type="button" className={styles.again} onClick={() => setSent(false)}>
          إرسال رسالة أخرى
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} className={styles.card} onSubmit={onSubmit} noValidate>
      <h2 className={styles.title}>كيف يمكننا مساعدتك؟</h2>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={id("name")}>
            الاسم الكامل *
          </label>
          <input
            {...fieldProps("name")}
            className={cx(styles.input, errors.name && styles.inputError)}
            type="text"
            autoComplete="name"
            placeholder="اكتب اسمك الكامل"
            required
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
          />
          {fieldError("name")}
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={id("email")}>
            البريد الإلكتروني *
          </label>
          <input
            {...fieldProps("email")}
            className={cx(styles.input, styles.ltr, errors.email && styles.inputError)}
            type="email"
            dir="ltr"
            autoComplete="email"
            placeholder="name@example.com"
            required
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
          />
          {fieldError("email")}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={id("company")}>
            اسم الشركة (اختياري)
          </label>
          <input
            {...fieldProps("company")}
            className={styles.input}
            type="text"
            autoComplete="organization"
            placeholder="اكتب اسم شركتك"
            value={form.company}
            onChange={(event) => update("company", event.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={id("phone")}>
            رقم الهاتف (اختياري)
          </label>
          <input
            {...fieldProps("phone")}
            className={cx(styles.input, errors.phone && styles.inputError)}
            type="tel"
            dir="ltr"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+966 5X XXX XXXX"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
          />
          {fieldError("phone")}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={id("message")}>
          رسالتك *
        </label>
        <textarea
          {...fieldProps("message")}
          className={cx(styles.input, styles.textarea, errors.message && styles.inputError)}
          placeholder="أخبرنا عن فكرتك أو احتياجك، وكيف يمكننا مساعدتك…"
          required
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
        />
        {fieldError("message")}
      </div>

      <div className={styles.field}>
        <label className={styles.consent}>
          <input
            {...fieldProps("consent")}
            className={cx(styles.checkbox, errors.consent && styles.inputError)}
            type="checkbox"
            checked={form.consent}
            onChange={(event) => update("consent", event.target.checked)}
          />
          <span>
            أوافق على <span className={styles.policy}>سياسة الخصوصية</span> واستخدام
            بياناتي للرد على رسالتي.
          </span>
        </label>
        {fieldError("consent")}
      </div>

      {submitError && (
        <p role="alert" className={styles.submitError}>
          {submitError}
        </p>
      )}

      <div className={styles.actions}>
        <PillButton type="submit" className={styles.submit} disabled={submitting}>
          {submitting ? "جارٍ الإرسال…" : "ارسال"}
        </PillButton>
      </div>
    </form>
  );
}
