"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  classStatusLabels,
  formatCurrency,
  type TrainingClass,
} from "@/lib/data";

type ClassRegistrationFormProps = {
  trainingClass: TrainingClass;
};

export function ClassRegistrationForm({
  trainingClass,
}: ClassRegistrationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [seats, setSeats] = useState(1);
  const total = useMemo(() => trainingClass.price * seats, [
    seats,
    trainingClass.price,
  ]);
  const disabled =
    trainingClass.status === "soldOut" || trainingClass.status === "closed";
  const trustBullets = [
    "Confirmation details shown after submission",
    "Certification information stays tied to this class",
    "What to bring and prerequisites are included before class day",
  ];

  if (submitted) {
    return (
      <Card className="p-6 md:p-8">
        <Badge tone="olive">Registration request received</Badge>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900">
          Registration request received
        </h2>
        <p className="mt-3 leading-relaxed text-charcoal/62">
          This front-end prototype does not send messages, reserve seats, or
          process payment. Confirmation details are shown here as a placeholder.
        </p>
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
              {[...trainingClass.prerequisites, ...trainingClass.legalRequirements].map(
                (item) => (
                  <li key={item}>{item}</li>
                ),
              )}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900">Arrival / Location</h3>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/68">
              {trainingClass.locationName}, {trainingClass.locationCity},{" "}
              {trainingClass.locationState}. Arrival notes are placeholder
              front-end content for this prototype.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_24rem] lg:items-start">
      <Card className="p-6 shadow-lg md:p-8">
        <Badge tone="red">Attendee Information</Badge>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900">
          Attendee Information
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-charcoal/62">
          Enter the attendee details for this training registration request.
          Required fields are kept focused so you can reserve a seat quickly.
        </p>
        <form
          className="mt-8 grid gap-5"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {["First name", "Last name", "Email", "Phone"].map((label) => (
              <label
                className="grid gap-2 text-sm font-medium text-neutral-900"
                key={label}
              >
                {label}
                <input
                  className="min-h-11 rounded-xl border border-neutral-300 bg-white px-3 text-sm outline-none transition-all duration-200 focus:border-red-600 focus:ring-2 focus:ring-red-600/10"
                  placeholder={label}
                  required
                />
              </label>
            ))}
          </div>
          <label className="grid gap-2 text-sm font-medium text-neutral-900">
            Number of seats
            <input
              className="min-h-11 rounded-xl border border-neutral-300 bg-white px-3 text-sm outline-none transition-all duration-200 focus:border-red-600 focus:ring-2 focus:ring-red-600/10"
              max={Math.max(trainingClass.seatsAvailable, 1)}
              min={1}
              onChange={(event) => setSeats(Number(event.target.value))}
              type="number"
              value={seats}
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-neutral-900">
            Notes/questions
            <textarea
              className="min-h-32 rounded-xl border border-neutral-300 bg-white p-3 text-sm outline-none transition-all duration-200 focus:border-red-600 focus:ring-2 focus:ring-red-600/10"
              placeholder="Share any questions before registration."
            />
          </label>
          <Button className="mt-3 w-full sm:w-fit" disabled={disabled} type="submit">
            Reserve Seat - {formatCurrency(total)}
          </Button>
          <p className="text-sm leading-relaxed text-charcoal/58">
            After submission, this prototype shows a registration request
            confirmation with preparation details. No payment is collected.
          </p>
          {disabled ? (
            <p className="text-sm font-medium text-medical-red">
              {classStatusLabels[trainingClass.status]}
            </p>
          ) : null}
        </form>
      </Card>

      <Card className="order-first border-medical-red/20 bg-white p-6 shadow-lg lg:order-none lg:sticky lg:top-28">
        <Badge tone="neutral">Registration Summary</Badge>
        <h2 className="mt-4 text-xl font-semibold text-neutral-900">
          Registration Summary
        </h2>
        <dl className="mt-5 grid gap-4 text-sm leading-relaxed text-charcoal/62">
          <div className="border-b border-neutral-200 pb-3">
            <dt className="font-medium text-neutral-900">Class</dt>
            <dd>{trainingClass.title}</dd>
          </div>
          <div className="border-b border-neutral-200 pb-3">
            <dt className="font-medium text-neutral-900">Seats</dt>
            <dd>{seats}</dd>
          </div>
          <div>
            <dt className="font-medium text-neutral-900">Total price</dt>
            <dd className="text-lg font-semibold text-neutral-900">
              {formatCurrency(total)}
            </dd>
          </div>
        </dl>
        <div className="mt-6 border-t border-neutral-200 pt-5">
          <h3 className="text-sm font-semibold text-neutral-900">
            Registration support
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
