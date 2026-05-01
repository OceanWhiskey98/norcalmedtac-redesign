import { notFound } from "next/navigation";
import { ClassRegistrationForm } from "@/components/forms/class-registration-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import {
  formatCurrency,
  getCategory,
  getClassStatusLabel,
  isClassClosedToRequests,
  isClassRegistrationOpen,
  isClassWaitlist,
  shouldShowLiveSeatCount,
} from "@/lib/data";
import { getClassBySlug, getClassStaticParams } from "@/lib/sanity/classes";
import { getRegistrationPage } from "@/lib/sanity/registration-page";
import { getRemainingSeatsForClass } from "@/lib/supabase/registrations";

export const dynamic = "force-dynamic";

type RegisterPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getClassStaticParams();
}

function formatRemainingSeats(remainingSeats: number): string {
  if (remainingSeats === 1) {
    return "1 seat remaining";
  }

  if (remainingSeats > 1 && remainingSeats <= 3) {
    return `Only ${remainingSeats} seats remaining`;
  }

  return `${remainingSeats} seats remaining`;
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { slug } = await params;
  const [content, trainingClass] = await Promise.all([
    getRegistrationPage(),
    getClassBySlug(slug),
  ]);

  if (!trainingClass) {
    notFound();
  }

  const category = getCategory(trainingClass.categoryId);
  const showLiveSeatCount = shouldShowLiveSeatCount(trainingClass.status);
  const isWaitlist = isClassWaitlist(trainingClass.status);
  const isUnavailable = isClassClosedToRequests(trainingClass.status);
  const remainingSeatCount = showLiveSeatCount
    ? await getRemainingSeatsForClass(trainingClass.slug, trainingClass.capacity)
    : { remainingSeats: null, error: null };

  if (remainingSeatCount.error) {
    console.error(
      "Supabase registration seat lookup failed.",
      remainingSeatCount.error,
    );
  }

  const remainingSeats = remainingSeatCount.remainingSeats;
  const heroLabel = isWaitlist ? "Waitlist" : content.heroLabel;
  const heroHeadline = isWaitlist ? "Join Waitlist" : content.heroHeadline;
  const heroBody = isWaitlist
    ? "Submit a waitlist request for this class. No payment is collected, and the team will follow up if space becomes available or details change."
    : content.heroBody;
  const unavailableTitle =
    trainingClass.status === "full" ? "Sold Out" : "Registration Closed";
  const unavailableMessage =
    trainingClass.status === "full"
      ? "This class is currently sold out. Please contact us with questions or check upcoming classes."
      : "Registration for this class is closed. Please contact us with questions or check upcoming classes.";

  return (
    <>
      <Section className="bg-white" tone="light">
        <div className="max-w-3xl">
          <Badge tone="red">{heroLabel}</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
            {heroHeadline}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-charcoal/62">
            {heroBody}
          </p>
        </div>
      </Section>

      <Section className="bg-neutral-50" tone="light">
        <Card className="mb-8 p-6 md:p-8">
          <div className="flex flex-wrap gap-2">
            <Badge tone={category?.accent === "red" ? "red" : "olive"}>
              {category?.name ?? "Training"}
            </Badge>
            <Badge tone="neutral">
              {getClassStatusLabel(trainingClass.status)}
            </Badge>
          </div>
          <h2 className="mt-5 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
            {trainingClass.title}
          </h2>
          {showLiveSeatCount && remainingSeats !== null ? (
            <p className="mt-3 text-sm font-semibold text-medical-red">
              {formatRemainingSeats(remainingSeats)}
            </p>
          ) : showLiveSeatCount ? (
            <p className="mt-3 text-sm font-semibold text-medical-red">
              {content.seatAvailabilityFallbackMessage}
            </p>
          ) : isWaitlist ? (
            <p className="mt-3 text-sm font-semibold text-medical-red">
              Waitlist requests are reviewed by the team before follow-up.
            </p>
          ) : null}
          {isUnavailable ? (
            <p className="mt-3 text-sm font-semibold text-medical-red">
              {unavailableMessage}
            </p>
          ) : (
            <p className="mt-3 text-sm font-medium text-charcoal/62">
              {content.noPaymentNote}
            </p>
          )}
          <dl className="mt-6 grid gap-4 text-sm leading-relaxed text-charcoal/62 md:grid-cols-3">
            <div>
              <dt className="font-medium text-neutral-900">Date</dt>
              <dd>{trainingClass.date}</dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900">Time</dt>
              <dd>
                {trainingClass.startTime} - {trainingClass.endTime}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900">Location</dt>
              <dd>
                {trainingClass.locationCity}, {trainingClass.locationState}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900">Price</dt>
              <dd>{formatCurrency(trainingClass.price)}</dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900">Status</dt>
              <dd>{getClassStatusLabel(trainingClass.status)}</dd>
            </div>
          </dl>
        </Card>

        {isClassRegistrationOpen(trainingClass.status) || isWaitlist ? (
          <ClassRegistrationForm
            content={content}
            remainingSeats={remainingSeats}
            trainingClass={trainingClass}
          />
        ) : (
          <Card className="p-6 md:p-8">
            <Badge tone="red">{unavailableTitle}</Badge>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900">
              {unavailableTitle}
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-charcoal/62">
              {unavailableMessage}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/classes">View Upcoming Classes</Button>
              <Button href="/contact" variant="outline">
                Contact Us
              </Button>
            </div>
          </Card>
        )}
      </Section>
    </>
  );
}
