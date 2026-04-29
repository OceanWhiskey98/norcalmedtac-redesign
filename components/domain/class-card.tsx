import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  classCtaLabels,
  classes,
  classStatusLabels,
  formatCurrency,
  getCategory,
  type TrainingClass,
} from "@/lib/data";

type ClassCardProps = {
  trainingClass: TrainingClass;
};

const statusTone = {
  open: "olive",
  limited: "gold",
  waitlist: "gold",
  soldOut: "red",
  closed: "neutral",
} as const;

export function ClassCard({ trainingClass }: ClassCardProps) {
  const category = getCategory(trainingClass.categoryId);
  const ctaLabel = classCtaLabels[trainingClass.status];
  const disabled =
    trainingClass.status === "soldOut" || trainingClass.status === "closed";

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="flex aspect-[16/9] items-end bg-graphite p-4 text-white">
        <span className="text-sm font-semibold">
          {category?.name ?? "Training Class"}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-5 p-5">
        <div className="flex flex-wrap gap-2">
          <Badge tone={category?.accent === "red" ? "red" : "olive"}>
            {category?.name ?? "Training"}
          </Badge>
          <Badge tone={statusTone[trainingClass.status]}>
            {classStatusLabels[trainingClass.status]}
          </Badge>
        </div>
        <div>
          <h3 className="text-xl font-semibold leading-tight">
            {trainingClass.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-charcoal/72">
            {trainingClass.summary}
          </p>
        </div>
        <dl className="grid gap-2 text-sm text-charcoal/78">
          <div className="flex justify-between gap-4">
            <dt>Date</dt>
            <dd className="font-semibold text-charcoal">{trainingClass.date}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>Time</dt>
            <dd className="font-semibold text-charcoal">
              {trainingClass.startTime}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>Location</dt>
            <dd className="font-semibold text-charcoal">
              {trainingClass.locationCity}, {trainingClass.locationState}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>Price</dt>
            <dd className="font-semibold text-charcoal">
              {formatCurrency(trainingClass.price)}
            </dd>
          </div>
        </dl>
        {trainingClass.certification !== "none" ? (
          <Badge tone="neutral">{trainingClass.certification}</Badge>
        ) : null}
        <div className="mt-auto grid gap-3 sm:grid-cols-2">
          <Button
            disabled={disabled}
            href={disabled ? "#" : trainingClass.registrationUrl}
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

export function FeaturedClassCard() {
  return <ClassCard trainingClass={classes[0]} />;
}
