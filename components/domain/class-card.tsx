import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  classCtaLabels,
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
    <Card className="flex h-full flex-col overflow-hidden bg-[#fbfaf7]">
      <div className="flex aspect-[16/9] items-end bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-5 text-white md:p-6">
        <span className="text-sm font-semibold">
          {category?.name ?? "Training Class"}
        </span>
      </div>
      <div className="flex flex-1 flex-col space-y-3 p-5 md:p-6">
        <div className="flex flex-wrap gap-2">
          <Badge tone={category?.accent === "red" ? "red" : "olive"}>
            {category?.name ?? "Training"}
          </Badge>
          <Badge tone={statusTone[trainingClass.status]}>
            {classStatusLabels[trainingClass.status]}
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
