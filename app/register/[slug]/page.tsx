import { notFound } from "next/navigation";
import { ClassRegistrationForm } from "@/components/forms/class-registration-form";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { classStatusLabels, formatCurrency, getCategory } from "@/lib/data";
import { getClassBySlug, getClassStaticParams } from "@/lib/sanity/classes";

type RegisterPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getClassStaticParams();
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { slug } = await params;
  const trainingClass = await getClassBySlug(slug);

  if (!trainingClass) {
    notFound();
  }

  const category = getCategory(trainingClass.categoryId);

  return (
    <>
      <Section className="bg-white" tone="light">
        <div className="max-w-3xl">
          <Badge tone="red">Register</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
            Reserve Seat
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-charcoal/62">
            Complete the front-end Attendee Information form to preview the
            registration request flow. No backend, seat enforcement, or payment
            processing is active.
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
              {classStatusLabels[trainingClass.status]}
            </Badge>
          </div>
          <h2 className="mt-5 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
            {trainingClass.title}
          </h2>
          <p className="mt-3 text-sm font-semibold text-medical-red">
            Only {trainingClass.seatsAvailable} seats remaining
          </p>
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
              <dd>{classStatusLabels[trainingClass.status]}</dd>
            </div>
          </dl>
        </Card>

        <ClassRegistrationForm trainingClass={trainingClass} />
      </Section>
    </>
  );
}
