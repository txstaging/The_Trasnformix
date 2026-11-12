"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { FormFields } from "@/english/components/careers/FormFields";
import { validate, visibleFields, type Errors, type Values } from "@/english/components/careers/forms";
import fieldStyles from "@/english/components/careers/ApplicationForm.module.css";
import {
  PARTNERSHIP_COPY,
  PARTNERSHIP_FORMS,
  type PartnershipFormId,
  type PartnershipPathId,
} from "@/english/lib/partnerships";
import styles from "@/english/components/services/ServiceRequestForm.module.css";

/** Fired by a PrefillLink; the form takes up the answers it carries. */
const PREFILL_EVENT = "transformix:service-request";

/** A call further up a service page that drops to its request form with an
    answer or two already chosen (the activity, the solution area). */
export function PrefillLink({ href, values, className, children }: {
  /** The form's id, as a fragment. */
  href: string;
  values: Values;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: values }))}
    >
      {children}
    </a>
  );
}

/** A service page's own request (Figma 4473:9612): the card, its title, the
    fields of `form` on the two-column grid and a centred send. It posts to
    /api/partnerships, which checks it against the same spec and emails it. */
export function ServiceRequestForm({ id, title, form, path }: {
  id: string;
  title: string;
  form: PartnershipFormId;
  /** The partnership path the request reaches the team on. */
  path: PartnershipPathId;
}) {
  const spec = PARTNERSHIP_FORMS[form];
  const uid = useId();
  const titleId = `${uid}-title`;
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Errors>({});
  /* A field people never see; only bots fill it in. */
  const [trap, setTrap] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onPrefill = (event: Event) => {
      const answers = (event as CustomEvent<Values>).detail;
      setValues((current) => ({ ...current, ...answers }));
      setErrors((current) => {
        const next = { ...current };
        for (const name of Object.keys(answers)) delete next[name];
        return next;
      });
      setSent(false);
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  const update = (name: string, value: string | string[]) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => (current[name] ? { ...current, [name]: "" } : current));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    const found = validate(spec, values, true);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`)?.focus();
      return;
    }

    const payload: Values = {};
    for (const field of visibleFields(spec, values)) payload[field.name] = values[field.name] ?? "";

    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/partnerships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path,
          form: spec.id,
          values: payload,
          fax: trap,
          lang: document.documentElement.lang,
        }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setSent(true);
      setValues({});
      setTrap("");
    } catch {
      setSubmitError(PARTNERSHIP_COPY.error);
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div id={id} className={`${styles.card} ${styles.done}`} role="status">
        <h3 className={styles.doneTitle}>{spec.doneTitle}</h3>
        <p className={styles.doneText}>{spec.doneText}</p>
        <button type="button" className={styles.again} onClick={() => setSent(false)}>
          {spec.again}
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      id={id}
      className={styles.card}
      onSubmit={onSubmit}
      aria-labelledby={titleId}
      noValidate
    >
      <h3 id={titleId} className={styles.title}>
        {title}
      </h3>

      <div className={`${fieldStyles.soft} ${styles.fields}`}>
        <FormFields spec={spec} values={values} errors={errors} uid={uid} onChange={update} />
      </div>

      <div className={styles.trap} aria-hidden="true">
        <label>
          Fax
          <input
            type="text"
            name="fax"
            tabIndex={-1}
            autoComplete="off"
            value={trap}
            onChange={(event) => setTrap(event.target.value)}
          />
        </label>
      </div>

      {submitError && (
        <p role="alert" className={styles.submitError}>
          {submitError}
        </p>
      )}

      <div className={styles.actions}>
        <button type="submit" className={styles.submit} disabled={submitting}>
          {submitting ? PARTNERSHIP_COPY.review.sending : spec.submit}
        </button>
      </div>
    </form>
  );
}
