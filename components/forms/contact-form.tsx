"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [inquiryId, setInquiryId] = useState<string | null>(null);
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now());

  return (
    <form
      className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8"
      onSubmit={async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitted(false);
        setInquiryId(null);
        setErrorMessage(null);
        setSuccessMessage(null);

        const formElement = event.currentTarget;
        const formData = new FormData(formElement);
        const payload = {
          fullName: String(formData.get("fullName") ?? ""),
          email: String(formData.get("email") ?? ""),
          phone: String(formData.get("phone") ?? ""),
          trainingInterest: String(formData.get("trainingInterest") ?? ""),
          message: String(formData.get("message") ?? ""),
          honeypot: String(formData.get("honeypot") ?? ""),
          elapsedMs: Date.now() - formStartedAt,
        };

        try {
          const response = await fetch("/api/contact-inquiries", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          const result = (await response.json()) as {
            message?: string;
            inquiryId?: string;
          };

          if (!response.ok) {
            throw new Error(result.message ?? "Inquiry could not be sent.");
          }

          setSubmitted(true);
          setInquiryId(result.inquiryId ?? null);
          setSuccessMessage(result.message ?? "Inquiry received.");
          formElement.reset();
          setFormStartedAt(Date.now());
        } catch (error) {
          setErrorMessage(
            error instanceof Error ? error.message : "Inquiry could not be sent.",
          );
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { label: "Name", name: "fullName", type: "text", required: true },
          { label: "Email", name: "email", type: "email", required: true },
          { label: "Phone", name: "phone", type: "tel", required: false },
          {
            label: "Training interest",
            name: "trainingInterest",
            type: "text",
            required: false,
          },
        ].map((field) => (
          <label
            className="grid gap-2 text-sm font-medium text-neutral-900"
            key={field.name}
          >
            {field.label}
            <input
              className="min-h-11 rounded-xl border border-neutral-300 bg-white px-3 text-sm outline-none transition-all duration-200 focus:border-red-600 focus:ring-2 focus:ring-red-600/10"
              name={field.name}
              placeholder={field.label}
              required={field.required}
              type={field.type}
            />
          </label>
        ))}
      </div>
      <div aria-hidden="true" className="hidden">
        <label htmlFor="contact-honeypot">Company</label>
        <input
          autoComplete="off"
          id="contact-honeypot"
          name="honeypot"
          tabIndex={-1}
          type="text"
        />
      </div>
      <label className="mt-4 grid gap-2 text-sm font-medium text-neutral-900">
        Message
        <textarea
          className="min-h-32 rounded-xl border border-neutral-300 bg-white p-3 text-sm outline-none transition-all duration-200 focus:border-red-600 focus:ring-2 focus:ring-red-600/10"
          name="message"
          placeholder="How can NorCal MedTac help?"
          required
        />
      </label>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Sending..." : "Contact Us"}
        </Button>
        {submitted ? (
          <p className="text-sm font-medium text-field-olive">
            {successMessage ?? "Inquiry received."}
            {inquiryId ? ` Reference: ${inquiryId}` : ""}
          </p>
        ) : null}
        {errorMessage ? (
          <p className="text-sm font-medium text-medical-red">{errorMessage}</p>
        ) : null}
      </div>
    </form>
  );
}
