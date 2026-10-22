"use client";

import { FormEvent, useState } from "react";

import { siteConfig } from "@/lib/site";

type Status = { message: string; tone: "info" | "error" } | null;

/**
 * Same delivery as ContactForm: Web3Forms when NEXT_PUBLIC_WEB3FORMS_KEY is
 * set, otherwise a mailto hand-off so a submission is never lost.
 */
export default function PromoIntakeForm({ songTitle }: { songTitle: string }) {
  const [status, setStatus] = useState<Status>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const accessKey = siteConfig.contactFormKey;
  const subject = `${siteConfig.name} - ${songTitle} promo intake`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const city = String(data.get("city") ?? "");
    const message = String(data.get("message") ?? "");

    if (!accessKey) {
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nCity: ${city}\n\n${message}`,
      );
      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
      setStatus({ message: "Opening your email app...", tone: "info" });
      return;
    }

    setIsSubmitting(true);
    setStatus({ message: "Please wait...", tone: "info" });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject,
          name,
          email,
          city,
          message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ message: "Thanks - you're on the list.", tone: "info" });
        form.reset();
      } else {
        setStatus({ message: result.message ?? "Something went wrong!", tone: "error" });
      }
    } catch {
      setStatus({ message: "Something went wrong!", tone: "error" });
    } finally {
      setIsSubmitting(false);
      window.setTimeout(() => setStatus(null), 5000);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="fields">
        <div className="field half">
          <label htmlFor="promo-name">Name</label>
          <input type="text" name="name" id="promo-name" required />
        </div>
        <div className="field half">
          <label htmlFor="promo-email">Email</label>
          <input type="email" name="email" id="promo-email" required />
        </div>
        <div className="field">
          <label htmlFor="promo-city">City</label>
          <input type="text" name="city" id="promo-city" />
        </div>
        <div className="field">
          <label htmlFor="promo-message">Anything else?</label>
          <textarea name="message" id="promo-message" rows={3} />
        </div>
      </div>
      <ul className="actions special">
        <li>
          <input
            type="submit"
            className="primary"
            value={isSubmitting ? "Sending..." : "Sign Me Up"}
            disabled={isSubmitting}
          />
        </li>
      </ul>
      {status && (
        <div role="status" style={{ textAlign: "center" }}>
          {status.message}
        </div>
      )}
    </form>
  );
}
