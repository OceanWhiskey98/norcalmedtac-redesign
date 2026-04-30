"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function GroupInquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {[
          "Name",
          "Organization",
          "Email",
          "Phone",
          "Group size",
          "Training type",
          "Preferred date range",
          "Location",
        ].map((label) => (
          <label className="grid gap-2 text-sm font-medium text-neutral-900" key={label}>
            {label}
            <input
              className="min-h-11 rounded-xl border border-neutral-300 bg-white px-3 text-sm outline-none transition-all duration-200 focus:border-red-600 focus:ring-2 focus:ring-red-600/10"
              placeholder={label}
            />
          </label>
        ))}
      </div>
      <label className="mt-4 grid gap-2 text-sm font-medium text-neutral-900">
        Message
        <textarea
          className="min-h-32 rounded-xl border border-neutral-300 bg-white p-3 text-sm outline-none transition-all duration-200 focus:border-red-600 focus:ring-2 focus:ring-red-600/10"
          placeholder="Tell us about your group training needs."
        />
      </label>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit">Request Group Training</Button>
        {submitted ? (
          <p className="text-sm font-medium text-field-olive">
            Inquiry received. This front-end prototype does not send messages yet.
          </p>
        ) : null}
      </div>
    </form>
  );
}
