"use client";

import { englishContactFetch as fetch } from "@/english/lib/contact";

import Image from "next/image";
import { useId, useRef, useState, type FormEvent, type ReactNode, type ButtonHTMLAttributes } from "react";
import type { RequestKey } from "@/english/components/v2/routes";
import {
  EMAIL_PATTERN,
  LIMITS,
  REQUEST_TYPES,
  SECTOR_OPTIONS,
  isValidPhone,
} from "@/english/components/v2/contact/options";
import { Arrow } from "@/english/components/v3/Motion";
import styles from "@/english/components/v3/ContactForm.module.css";

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
  if (form.fullName.trim().length < 2) errors.fullName = "Please enter your full name.";
  if (!form.company.trim()) errors.company = "Please enter your organization name.";
  if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = "Please enter a valid email address.";
  if (!isValidPhone(form.phone.trim())) {
    errors.phone = "Please enter a valid mobile number or leave the field blank.";
  }
  if (!form.sector) errors.sector = "Please select your organization's industry.";
  if (!form.requestType) errors.requestType = "Please select a request type.";
  if (!form.message.trim()) errors.message = "Please describe what you need.";
  if (!form.consent) errors.consent = "Please give your consent so we can review and respond to your request.";
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
  /** Preselected from /v3/contact?service=… */
  defaultRequest?: RequestKey;
};

/** Version 3 presentation using the existing validated submission contract. */
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
      setSubmitError("We could not send your request. Please try again or email Info@thetransformix.com.");
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
          eyebrow={"Request received"}
          title={"Thank you for contacting us"}
          lead={"We will review the details and contact you by email or phone to discuss the next step."}
        />
      </div>
    );
  }

  return (
    <form ref={formRef} className={styles.card} onSubmit={onSubmit} noValidate>
      <SectionIntro
        eyebrow={"Contact request"}
        title={"Tell us what you need"}
        lead={"Fields marked with an asterisk (*) are required."}
      />

      <div className={styles.row}>
        {textField("fullName", "Full name *", "Enter your full name", { autoComplete: "name" })}
        {textField("company", "Organization name *", "Enter your organization name", {
          autoComplete: "organization",
        })}
      </div>

      <div className={styles.row}>
        {textField("email", "Email address *", "Enter your work email", {
          type: "email",
          autoComplete: "email",
        })}
        {textField("phone", "Mobile number (optional)", "Enter your mobile number", {
          type: "tel",
          autoComplete: "tel",
        })}
      </div>

      <div className={styles.row}>
        {textField("jobTitle", "Job title (optional)", "Enter your job title", {
          autoComplete: "organization-title",
        })}
        <div className={styles.field}>
          <label htmlFor={id("sector")} className={styles.label}>
            {" Industry * "}</label>
          <div className={styles.selectWrap}>
            <select
              {...a11y("sector")}
              className={cx(styles.input, styles.select, !form.sector && styles.placeholder)}
              value={form.sector}
              onChange={(event) => update("sector", event.target.value)}
            >
              <option value="" disabled>
                {" Select your organization's industry "}</option>
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
        <legend className={styles.legend}>{"Request type *"}</legend>
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
          {" Description of your needs * "}</label>
        <textarea
          {...a11y("message")}
          className={cx(styles.input, styles.textarea)}
          placeholder={"Describe your current challenge, desired outcome, and any details that help us understand your request."}
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
            {" I agree to the use of my contact details to review and respond to this request. * "}</span>
        </label>
        {errorFor("consent")}
      </div>

      <div className={styles.submit}>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Sending…" : "Get a free consultation"}
        </Button>
        {submitError && (
          <p className={styles.error} role="alert">
            {submitError}
          </p>
        )}
      </div>

      <p className={styles.privacy}>{"We do not share your information with other parties and use it only to respond to your request."}</p>
    </form>
  );
}
