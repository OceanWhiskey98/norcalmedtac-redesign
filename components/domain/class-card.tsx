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
    <Card className="flex h-full flex-col overflow-hidden bg-[#fbfaf7] shadow-[0_10px_28px_rgba(24,26,27,0.08)]">
      <div className="flex aspect-[16/9] items-end bg-graphite p-5 text-white">
        <span className="text-sm font-semibold">
          {category?.name ?? "Training Class"}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-5 p-6">
        <div className="flex flex-wrap gap-2">
          <Badge tone={category?.accent === "red" ? "red" : "olive"}>
            {category?.name ?? "Training"}
          </Badge>
          <Badge tone={statusTone[trainingClass.status]}>
            {classStatusLabels[trainingClass.status]}
          </Badge>
        </div>
        <div>
          <h3 className="text-2xl font-bold leading-tight text-charcoal">
            {trainingClass.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-charcoal/72">
            {trainingClass.summary}
          </p>
        </div>
        <dl className="grid gap-2 text-sm text-charcoal/58">
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
        </dl>
        {trainingClass.certification !== "none" ? (
          <Badge tone="neutral">{trainingClass.certification}</Badge>
        ) : null}
        <div className="mt-auto grid gap-3 sm:grid-cols-2">
          <Button
            className="shadow-[0_8px_18px_rgba(178,51,47,0.18)]"
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
