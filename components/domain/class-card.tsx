import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  formatCurrency,
  getClassCtaLabel,
  getClassStatusLabel,
  getCategory,
  isClassClosedToRequests,
  type TrainingClass,
} from "@/lib/data";
import { getClassPlaceholderImage } from "@/lib/placeholder-images";

type ClassCardProps = {
  trainingClass: TrainingClass;
};

const statusTone = {
  open: "olive",
  limited: "gold",
  waitlist: "gold",
  full: "red",
  closed: "neutral",
} as const;

export function ClassCard({ trainingClass }: ClassCardProps) {
  const category = getCategory(trainingClass.categoryId);
  const ctaLabel = getClassCtaLabel(trainingClass.status);
  const disabled = isClassClosedToRequests(trainingClass.status);
  const fallbackImage = getClassPlaceholderImage(category?.slug, category?.name);
  const classImage = trainingClass.image || fallbackImage;
  const classImageAlt = trainingClass.image
    ? trainingClass.imageAlt || trainingClass.title
    : `${category?.name ?? "Training class"} placeholder image`;

  return (
    <Card className="flex h-full flex-col overflow-hidden bg-[#fbfaf7]">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          alt={classImageAlt}
          className="h-full w-full object-cover"
          src={classImage}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/18 via-black/5 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col space-y-3 p-5 md:p-6">
        <div className="flex flex-wrap gap-2">
          <Badge tone={category?.accent === "red" ? "red" : "olive"}>
            {category?.name ?? "Training"}
          </Badge>
          <Badge tone={statusTone[trainingClass.status]}>
            {getClassStatusLabel(trainingClass.status)}
          </Badge>
        </div>
        <div>
          <h3 className="text-xl font-semibold leading-tight text-charcoal md:text-2xl">
            {trainingClass.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-charcoal/62">
            {trainingClass.summary}
          </p>
        </div>
        <div className="h-px bg-neutral-200" />
        <dl className="grid gap-2.5 text-sm leading-relaxed text-charcoal/56">
          <div className="flex justify-between gap-4">
            <dt>Date</dt>
            <dd className="font-medium text-charcoal/82">{trainingClass.date}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>Time</dt>
            <dd className="font-medium text-charcoal/82">
              {trainingClass.startTime}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>Location</dt>
            <dd className="font-medium text-charcoal/82">
              {trainingClass.locationCity}, {trainingClass.locationState}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>Price</dt>
            <dd className="font-semibold text-charcoal">
              {formatCurrency(trainingClass.price)}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>Status</dt>
            <dd className="font-medium text-charcoal/82">
              {getClassStatusLabel(trainingClass.status)}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>Capacity</dt>
            <dd className="font-medium text-charcoal/82">
              {trainingClass.capacity}
            </dd>
          </div>
        </dl>
        {trainingClass.certification !== "none" ? (
          <Badge tone="neutral">{trainingClass.certification}</Badge>
        ) : null}
        <div className="mt-auto grid gap-3 pt-3 sm:grid-cols-2">
          <Button
            className="min-h-12 font-medium shadow-[0_8px_18px_rgba(220,38,38,0.18)]"
            disabled={disabled}
            href={disabled ? "#" : `/register/${trainingClass.slug}`}
            variant="primary"
          >
            {ctaLabel}
          </Button>
          <Button href={`/classes/${trainingClass.slug}`} variant="outline">
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
