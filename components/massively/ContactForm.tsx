"use client";

import { FormEvent, useState } from "react";

import { siteConfig } from "@/lib/site";

type Status = { message: string; tone: "info" | "error" } | null;

/**
 * The Milestones site posted this form to Web3Forms. That still works when
 * NEXT_PUBLIC_WEB3FORMS_KEY is set; without a key we hand off to the visitor's
 * mail client so the form is never a dead end.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const accessKey = siteConfig.contactFormKey;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    if (!accessKey) {
      const subject = encodeURIComponent(`${siteConfig.name} - message from ${name || email}`);
      const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
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
          name,
          email,
          message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ message: result.message ?? "Thanks - message sent.", tone: "info" });
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
        <div className="field">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div className="field">
          <label htmlFor="message">Message</label>
          <textarea name="message" id="message" rows={3} />
        </div>
      </div>
      <ul className="actions">
        <li>
          <input
            type="submit"
            value={isSubmitting ? "Sending..." : "Send Message"}
            disabled={isSubmitting}
          />
        </li>
      </ul>
      {status && (
        <div id="result" role="status">
          {status.message}
        </div>
      )}
    </form>
  );
}
