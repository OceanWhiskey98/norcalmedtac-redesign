import { notFound } from "next/navigation";
import { ClassCard } from "@/components/domain/class-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import {
  formatCurrency,
  getClassCtaLabel,
  getClassStatusLabel,
  getCategory,
  isClassClosedToRequests,
  isClassWaitlist,
  type TrainingClass,
} from "@/lib/data";
import {
  getClassBySlug,
  getClasses,
  getClassStaticParams,
} from "@/lib/sanity/classes";
import { getInstructors } from "@/lib/sanity/instructors";
import { getClassPlaceholderImage } from "@/lib/placeholder-images";

type ClassDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const statusTone = {
  open: "olive",
  limited: "gold",
  waitlist: "gold",
  full: "red",
  closed: "neutral",
} as const;

const skillLevelLabels: Record<TrainingClass["skillLevel"], string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  allLevels: "All Levels",
};

export function generateStaticParams() {
  return getClassStaticParams();
}

function DetailList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return (
      <p className="text-sm leading-relaxed text-charcoal/62">
        No class-specific requirements listed.
      </p>
    );
  }

  return (
    <ul className="grid gap-3 text-sm leading-relaxed text-charcoal/68">
      {items.map((item) => (
        <li className="flex gap-3" key={item}>
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </Card>
  );
}

export default async function ClassDetailPage({
  params,
}: ClassDetailPageProps) {
  const { slug } = await params;
  const trainingClass = await getClassBySlug(slug);

  if (!trainingClass) {
    notFound();
  }

  const category = getCategory(trainingClass.categoryId);
  const classDetailImage =
    trainingClass.image ||
    getClassPlaceholderImage(category?.slug, category?.name);
  const classDetailImageAlt = trainingClass.image
    ? trainingClass.imageAlt || trainingClass.title
    : `${category?.name ?? "Training class"} placeholder image`;
  const instructorDirectory = await getInstructors();
  const instructor = instructorDirectory.find((item) =>
    trainingClass.instructorIds.includes(item.id),
  );
  const allClasses = await getClasses();
  const relatedClasses = allClasses.filter((item) =>
    trainingClass.relatedClassIds.includes(item.id),
  );
  const disabled = isClassClosedToRequests(trainingClass.status);
  const ctaLabel = getClassCtaLabel(trainingClass.status);
  const policies = isClassWaitlist(trainingClass.status)
    ? [
        "Waitlist requests are saved for team follow-up if space becomes available or details change.",
        "Weather, waiver, late arrival, and class-specific safety expectations may apply.",
        "No payment is collected online for waitlist requests.",
      ]
    : [
        "Cancellation, transfer, and refund expectations are presented before registration completion.",
        "Weather, waiver, late arrival, and class-specific safety expectations may apply.",
        "Registration requests are saved for team follow-up. No payment is collected online.",
      ];

  return (
    <>
      <Section className="bg-white pb-28 md:pb-28" tone="light">
        <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-start">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2">
              <Badge tone={category?.accent === "red" ? "red" : "olive"}>
                {category?.name ?? "Training"}
              </Badge>
              <Badge tone={statusTone[trainingClass.status]}>
                {getClassStatusLabel(trainingClass.status)}
              </Badge>
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
              {trainingClass.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-charcoal/62">
              {trainingClass.summary}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                disabled={disabled}
                href={disabled ? "#" : `/register/${trainingClass.slug}`}
                size="lg"
              >
                {ctaLabel}
              </Button>
              <Button href="/contact" size="lg" variant="outline">
                Ask a Question
              </Button>
            </div>
          </div>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-neutral-900">
              Class Snapshot
            </h2>
            <dl className="mt-5 grid gap-4 text-sm leading-relaxed text-charcoal/62">
              {[
                ["Date", trainingClass.date],
                [
                  "Time",
                  `${trainingClass.startTime} - ${trainingClass.endTime}`,
                ],
                ["Duration", trainingClass.duration],
                [
                  "Location",
                  `${trainingClass.locationName}, ${trainingClass.locationCity}, ${trainingClass.locationState}`,
                ],
                ["Price", formatCurrency(trainingClass.price)],
                [
                  "Registration status",
                  getClassStatusLabel(trainingClass.status),
                ],
                [
                  "Capacity",
                  trainingClass.capacity.toString(),
                ],
                ["Skill level", skillLevelLabels[trainingClass.skillLevel]],
                [
                  "Certification",
                  trainingClass.certification === "none"
                    ? "None"
                    : `${trainingClass.certification} (${trainingClass.certificationBody})`,
                ],
              ].map(([label, value]) => (
                <div
                  className="border-b border-neutral-200 pb-3 last:border-b-0 last:pb-0"
                  key={label}
                >
                  <dt className="font-medium text-neutral-900">{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
        <Card className="relative mt-8 overflow-hidden p-0">
          <img
            alt={classDetailImageAlt}
            className="h-full max-h-[28rem] w-full object-cover"
            src={classDetailImage}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-black/6 to-transparent" />
        </Card>
      </Section>

      <Section className="bg-neutral-50" tone="light">
        <div className="grid gap-6 lg:grid-cols-2">
          <DetailSection title="Overview">
            <p className="leading-relaxed text-charcoal/68">
              {trainingClass.description}
            </p>
            <p className="mt-4 leading-relaxed text-charcoal/68">
              Students leave with a clearer understanding of class expectations,
              core skills, safety requirements, and practical next steps.
            </p>
          </DetailSection>
          <DetailSection title="What You'll Learn">
            <DetailList items={trainingClass.whatYouWillLearn} />
          </DetailSection>
          <DetailSection title="Who This Class Is For">
            <DetailList items={trainingClass.audience} />
          </DetailSection>
          <DetailSection title="Prerequisites">
            <DetailList
              items={[
                ...trainingClass.prerequisites,
                ...trainingClass.legalRequirements,
              ]}
            />
          </DetailSection>
          <DetailSection title="What To Bring">
            <DetailList items={trainingClass.whatToBring} />
          </DetailSection>
          <DetailSection title="Safety Requirements">
            <DetailList items={trainingClass.safetyRequirements} />
          </DetailSection>
        </div>
      </Section>

      <Section className="bg-white" tone="light">
        <div className="grid gap-6 lg:grid-cols-3">
          <DetailSection title="Instructor">
            {instructor ? (
              <div>
                <h3 className="text-xl font-semibold text-neutral-900">
                  {instructor.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-charcoal/58">
                  {instructor.role}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-charcoal/68">
                  {instructor.bio}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {instructor.credentials.map((credential) => (
                    <Badge key={credential} tone="neutral">
                      {credential}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-charcoal/62">
                Instructor details will be confirmed before registration
                completion.
              </p>
            )}
          </DetailSection>

          <DetailSection title="Location">
            <dl className="grid gap-3 text-sm leading-relaxed text-charcoal/68">
              <div>
                <dt className="font-medium text-neutral-900">Venue</dt>
                <dd>{trainingClass.locationName}</dd>
              </div>
              <div>
                <dt className="font-medium text-neutral-900">City</dt>
                <dd>
                  {trainingClass.locationCity}, {trainingClass.locationState}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-neutral-900">Address</dt>
                <dd>{trainingClass.locationAddress}</dd>
              </div>
              <div>
                <dt className="font-medium text-neutral-900">Arrival</dt>
                <dd>
                  Parking and arrival notes are confirmed before class day when
                  applicable.
                </dd>
              </div>
            </dl>
          </DetailSection>

          <DetailSection title="Policies">
            <DetailList items={policies} />
          </DetailSection>
        </div>
      </Section>

      <Section className="bg-neutral-50" tone="light">
        <div className="mb-12 max-w-3xl">
          <Badge tone="olive">Related Classes</Badge>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
            Next steps and similar training.
          </h2>
        </div>
        {relatedClasses.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedClasses.map((relatedClass) => (
              <ClassCard key={relatedClass.id} trainingClass={relatedClass} />
            ))}
          </div>
        ) : (
          <Card className="p-6">
            <p className="leading-relaxed text-charcoal/62">
              Related classes will appear here as more scheduled training is
              added.
            </p>
          </Card>
        )}
      </Section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 bg-white/95 p-4 shadow-[0_-12px_30px_rgba(24,26,27,0.12)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-neutral-900">
              {trainingClass.date} - {formatCurrency(trainingClass.price)}
            </p>
            <p className="text-xs text-charcoal/58">
              {getClassStatusLabel(trainingClass.status)}
            </p>
          </div>
          <Button
            disabled={disabled}
            href={disabled ? "#" : `/register/${trainingClass.slug}`}
            size="sm"
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </>
  );
}
