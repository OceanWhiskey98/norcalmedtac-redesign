"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  formatCurrency,
  getClassStatusLabel,
  isClassRegistrationOpen,
  isClassWaitlist,
  type RegistrationPageContent,
  type TrainingClass,
} from "@/lib/data";

type ClassRegistrationFormProps = {
  content: Pick<
    RegistrationPageContent,
    | "formIntroHeadline"
    | "formIntroHelpText"
    | "successLabel"
    | "successHeadline"
    | "successBody"
  >;
  remainingSeats: number | null;
  trainingClass: TrainingClass;
};

function formatRemainingSeats(remainingSeats: number): string {
  return `${remainingSeats} ${remainingSeats === 1 ? "seat" : "seats"} remaining`;
}

function normalizeRegistrationErrorMessage(message: string): string {
  const remainingSeatsMatch = message.match(
    /^(?:Only )?(\d+) seat\(s\) remaining for this class\.$/,
  );

  if (!remainingSeatsMatch) {
    return message;
  }

  return `${formatRemainingSeats(Number(remainingSeatsMatch[1]))} for this class.`;
}

export function ClassRegistrationForm({
  content,
  remainingSeats,
  trainingClass,
}: ClassRegistrationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [seatsRemainingAfterRegistration, setSeatsRemainingAfterRegistration] =
    useState<number | null>(null);
  const [seats, setSeats] = useState(1);
  const total = useMemo(
    () => trainingClass.price * seats,
    [seats, trainingClass.price],
  );
  const isWaitlist = isClassWaitlist(trainingClass.status);
  const isRegistrationOpen = isClassRegistrationOpen(trainingClass.status);
  const disabled =
    (!isWaitlist && !isRegistrationOpen) ||
    (isRegistrationOpen && (remainingSeats === null || remainingSeats === 0));
  const availabilityLabel =
    remainingSeats === null
      ? "Live seat availability is temporarily unavailable."
      : formatRemainingSeats(remainingSeats);
  const formBadge = isWaitlist ? "Waitlist Request" : "Attendee Information";
  const formHeadline = isWaitlist ? "Join Waitlist" : content.formIntroHeadline;
  const formHelpText = isWaitlist
    ? "Submit attendee details for the waitlist. No payment is collected, and the team will follow up if space becomes available or details change."
    : content.formIntroHelpText;
  const successLabel = isWaitlist
    ? "Waitlist request received"
    : content.successLabel;
  const successHeadline = isWaitlist
    ? "Waitlist request received"
    : content.successHeadline;
  const successBody = isWaitlist
    ? "Your waitlist request has been saved. No payment was collected. The team will follow up if space becomes available or details change."
    : content.successBody;
  const submitLabel = isWaitlist ? "Submit Waitlist Request" : "Reserve Seat";
  const submittingLabel = isWaitlist
    ? "Submitting Waitlist..."
    : "Saving Registration...";
  const fallbackErrorMessage = isWaitlist
    ? "Waitlist request could not be saved."
    : "Registration could not be saved.";
  const seatsLabel = isWaitlist ? "Requested spots" : "Number of seats";
  const summaryLabel = isWaitlist
    ? "Waitlist Request Summary"
    : "Registration Summary";
  const totalLabel = isWaitlist ? "Class price" : "Total price";
  const supportHeading = isWaitlist ? "Waitlist support" : "Registration support";
  const trustBullets = isWaitlist
    ? [
        "Waitlist request details are saved after submission",
        "No payment is collected during the waitlist request",
        "The team will follow up if space becomes available or details change",
      ]
    : [
        "Confirmation details shown after submission",
        "Certification information stays tied to this class",
        "What to bring and prerequisites are included before class day",
      ];

  if (submitted) {
    return (
      <Card className="p-6 md:p-8">
        <Badge tone="olive">{successLabel}</Badge>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900">
          {successHeadline}
        </h2>
        <p className="mt-3 leading-relaxed text-charcoal/62">
          {successBody}
        </p>
        {!isWaitlist && seatsRemainingAfterRegistration !== null ? (
          <p className="mt-3 text-sm font-medium text-charcoal/62">
            {formatRemainingSeats(seatsRemainingAfterRegistration)} after this
            registration request.
          </p>
        ) : null}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-semibold text-neutral-900">What To Bring</h3>
            <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-charcoal/68">
              {trainingClass.whatToBring.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900">Prerequisites</h3>
            <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-charcoal/68">
              {[
                ...trainingClass.prerequisites,
                ...trainingClass.legalRequirements,
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900">
              Arrival / Location
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/68">
              {trainingClass.locationName}, {trainingClass.locationCity},{" "}
              {trainingClass.locationState}. Arrival notes are confirmed before
              class day when applicable.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_24rem] lg:items-start">
      <Card className="p-6 shadow-lg md:p-8">
        <Badge tone="red">{formBadge}</Badge>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900">
          {formHeadline}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-charcoal/62">
          {formHelpText}
        </p>
        <form
          className="mt-8 grid gap-5"
          onSubmit={async (event) => {
            event.preventDefault();
            setErrorMessage(null);
            setIsSubmitting(true);

            const formData = new FormData(event.currentTarget);
            const payload = {
              classSlug: trainingClass.slug,
              firstName: String(formData.get("firstName") ?? ""),
              lastName: String(formData.get("lastName") ?? ""),
              email: String(formData.get("email") ?? ""),
              phone: String(formData.get("phone") ?? ""),
              requestType: isWaitlist ? "waitlist" : "registration",
              seats,
              notes: String(formData.get("notes") ?? ""),
            };

            try {
              const response = await fetch("/api/registrations", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
              });

              const result = (await response.json()) as {
                message?: string;
                seatsRemaining?: number;
              };

              if (!response.ok) {
                throw new Error(
                  result.message ?? "Registration could not be saved.",
                );
              }

              setSeatsRemainingAfterRegistration(
                typeof result.seatsRemaining === "number"
                  ? result.seatsRemaining
                  : null,
              );
              setSubmitted(true);
            } catch (error) {
              setErrorMessage(
                error instanceof Error
                  ? normalizeRegistrationErrorMessage(error.message)
                  : fallbackErrorMessage,
              );
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["First name", "firstName"],
              ["Last name", "lastName"],
              ["Email", "email"],
              ["Phone", "phone"],
            ].map(([label, name]) => (
              <label
                className="grid gap-2 text-sm font-medium text-neutral-900"
                key={label}
              >
                {label}
                <input
                  className="min-h-11 rounded-xl border border-neutral-300 bg-white px-3 text-sm outline-none transition-all duration-200 focus:border-red-600 focus:ring-2 focus:ring-red-600/10"
                  name={name}
                  placeholder={label}
                  required
                  type={name === "email" ? "email" : "text"}
                />
              </label>
            ))}
          </div>
          <label className="grid gap-2 text-sm font-medium text-neutral-900">
            {seatsLabel}
            <input
              className="min-h-11 rounded-xl border border-neutral-300 bg-white px-3 text-sm outline-none transition-all duration-200 focus:border-red-600 focus:ring-2 focus:ring-red-600/10"
              disabled={disabled}
              max={Math.max(remainingSeats ?? 0, 1)}
              min={1}
              name="seats"
              onChange={(event) => {
                const requestedSeats = Number(event.target.value);
                const maxSeats = Math.max(remainingSeats ?? 0, 1);
                setSeats(Math.min(Math.max(requestedSeats, 1), maxSeats));
              }}
              type="number"
              value={seats}
            />
          </label>
          {isWaitlist ? (
            <p className="text-sm font-medium text-charcoal/62">
              This submits a waitlist request. The team will follow up if space
              becomes available or details change.
            </p>
          ) : (
            <p className="text-sm font-medium text-charcoal/62">
              Live availability: {availabilityLabel}
            </p>
          )}
          <label className="grid gap-2 text-sm font-medium text-neutral-900">
            Notes/questions
            <textarea
              className="min-h-32 rounded-xl border border-neutral-300 bg-white p-3 text-sm outline-none transition-all duration-200 focus:border-red-600 focus:ring-2 focus:ring-red-600/10"
              name="notes"
              placeholder="Share any questions before registration."
            />
          </label>
          <Button
            className="mt-3 w-full sm:w-fit"
            disabled={disabled || isSubmitting}
            type="submit"
          >
            {isSubmitting
              ? submittingLabel
              : isWaitlist
                ? submitLabel
                : `${submitLabel} - ${formatCurrency(total)}`}
          </Button>
          <p className="text-sm leading-relaxed text-charcoal/58">
            {isWaitlist
              ? "After submission, your waitlist request is saved. No payment is collected."
              : "After submission, your registration request is saved and this page shows preparation details. No payment is collected."}
          </p>
          {errorMessage ? (
            <p className="text-sm font-medium text-medical-red">
              {errorMessage}
            </p>
          ) : null}
          {disabled ? (
            <p className="text-sm font-medium text-medical-red">
              {remainingSeats === 0
                ? "Registration is unavailable because this class has no seats remaining."
                : remainingSeats === null
                  ? "Registration is temporarily unavailable while live seat availability is checked."
                  : getClassStatusLabel(trainingClass.status)}
            </p>
          ) : null}
        </form>
      </Card>

      <Card className="order-first border-medical-red/20 bg-white p-6 shadow-lg lg:order-none lg:sticky lg:top-28">
        <Badge tone="neutral">{summaryLabel}</Badge>
        <h2 className="mt-4 text-xl font-semibold text-neutral-900">
          {summaryLabel}
        </h2>
        <dl className="mt-5 grid gap-4 text-sm leading-relaxed text-charcoal/62">
          <div className="border-b border-neutral-200 pb-3">
            <dt className="font-medium text-neutral-900">Class</dt>
            <dd>{trainingClass.title}</dd>
          </div>
          <div className="border-b border-neutral-200 pb-3">
            <dt className="font-medium text-neutral-900">{seatsLabel}</dt>
            <dd>{seats}</dd>
          </div>
          {!isWaitlist ? (
            <div className="border-b border-neutral-200 pb-3">
              <dt className="font-medium text-neutral-900">Remaining Seats</dt>
              <dd>{availabilityLabel}</dd>
            </div>
          ) : null}
          <div>
            <dt className="font-medium text-neutral-900">{totalLabel}</dt>
            <dd className="text-lg font-semibold text-neutral-900">
              {formatCurrency(total)}
            </dd>
          </div>
        </dl>
        <div className="mt-6 border-t border-neutral-200 pt-5">
          <h3 className="text-sm font-semibold text-neutral-900">
            {supportHeading}
          </h3>
          <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-charcoal/62">
            {trustBullets.map((item) => (
              <li className="flex gap-2" key={item}>
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}
