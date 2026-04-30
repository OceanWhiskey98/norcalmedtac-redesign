"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function GroupInquiryForm() {
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
        setErrorMessage(null);
        setSuccessMessage(null);

        const formElement = event.currentTarget;
        const formData = new FormData(formElement);
        const payload = {
          fullName: String(formData.get("fullName") ?? ""),
          organization: String(formData.get("organization") ?? ""),
          email: String(formData.get("email") ?? ""),
          phone: String(formData.get("phone") ?? ""),
          groupSize: String(formData.get("groupSize") ?? ""),
          trainingType: String(formData.get("trainingType") ?? ""),
          preferredDateRange: String(formData.get("preferredDateRange") ?? ""),
          location: String(formData.get("location") ?? ""),
          message: String(formData.get("message") ?? ""),
          honeypot: String(formData.get("honeypot") ?? ""),
          elapsedMs: Date.now() - formStartedAt,
        };

        try {
          const response = await fetch("/api/group-training-inquiries", {
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
          {
            label: "Organization",
            name: "organization",
            type: "text",
            required: false,
          },
          { label: "Email", name: "email", type: "email", required: true },
          { label: "Phone", name: "phone", type: "tel", required: false },
          {
            label: "Group size",
            name: "groupSize",
            type: "number",
            required: false,
            min: 1,
            max: 5000,
          },
          {
            label: "Training type",
            name: "trainingType",
            type: "text",
            required: false,
          },
          {
            label: "Preferred date range",
            name: "preferredDateRange",
            type: "text",
            required: false,
          },
          {
            label: "Location",
            name: "location",
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
              max={field.max}
              min={field.min}
              name={field.name}
              placeholder={field.label}
              required={field.required}
              type={field.type}
            />
          </label>
        ))}
      </div>
      <div aria-hidden="true" className="hidden">
        <label htmlFor="group-honeypot">Company</label>
        <input
          autoComplete="off"
          id="group-honeypot"
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
          placeholder="Tell us about your group training needs."
          required
        />
      </label>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Sending..." : "Request Group Training"}
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
