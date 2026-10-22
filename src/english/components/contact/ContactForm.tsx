"use client";

import { englishContactFetch as fetch } from "@/english/lib/contact";

import { useId, useRef, useState, type FormEvent } from "react";
import { PillButton } from "@/english/components/ui/PillButton";
import styles from "@/english/components/contact/ContactForm.module.css";

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
  if (form.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!EMAIL.test(form.email.trim())) errors.email = "Please enter a valid email address.";
  const phone = form.phone.trim();
  if (phone && (!/^[+\d\s()-]+$/.test(phone) || phone.replace(/\D/g, "").length < 7)) {
    errors.phone = "Please enter a valid phone number or leave the field blank.";
  }
  if (!form.message.trim()) errors.message = "Please write your message.";
  if (!form.consent) errors.consent = "Please agree to the privacy policy to send your message.";
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
        "We could not send your message. Please try again or email Info@thetransformix.com.",
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
        <h2 className={styles.title}>{"Thank you for contacting us"}</h2>
        <p className={styles.doneText}>
          {" We have received your message. The Transformix team will contact you soon to understand your needs and discuss the next step. "}</p>
        <button type="button" className={styles.again} onClick={() => setSent(false)}>
          {" Send another message "}</button>
      </div>
    );
  }

  return (
    <form ref={formRef} className={styles.card} onSubmit={onSubmit} noValidate>
      <h2 className={styles.title}>{"How can we help you?"}</h2>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={id("name")}>
            {" Full name * "}</label>
          <input
            {...fieldProps("name")}
            className={cx(styles.input, errors.name && styles.inputError)}
            type="text"
            autoComplete="name"
            placeholder={"Enter your full name"}
            required
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
          />
          {fieldError("name")}
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={id("email")}>
            {" Email address * "}</label>
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
            {" Company name (optional) "}</label>
          <input
            {...fieldProps("company")}
            className={styles.input}
            type="text"
            autoComplete="organization"
            placeholder={"Enter your company name"}
            value={form.company}
            onChange={(event) => update("company", event.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={id("phone")}>
            {" Phone number (optional) "}</label>
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
          {" Your message * "}</label>
        <textarea
          {...fieldProps("message")}
          className={cx(styles.input, styles.textarea, errors.message && styles.inputError)}
          placeholder={"Tell us about your idea or needs and how we can help…"}
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
            {" I agree to the "}<span className={styles.policy}>{"privacy policy"}</span> {" and to the use of my information to respond to my message. "}</span>
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
          {submitting ? "Sending…" : "Send"}
        </PillButton>
      </div>
    </form>
  );
}
