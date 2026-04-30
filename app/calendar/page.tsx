import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import {
  classCtaLabels,
  classStatusLabels,
  formatCurrency,
  getCategory,
} from "@/lib/data";
import { getCalendarPage } from "@/lib/sanity/calendar-page";
import { getUpcomingClasses } from "@/lib/sanity/classes";

const filters = ["Category", "Month", "Location", "Certification", "Availability"];
const monthNames = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });

function monthKey(date: string) {
  return monthNames.format(new Date(`${date}T12:00:00`));
}

export default async function CalendarPage() {
  const [content, classes] = await Promise.all([
    getCalendarPage(),
    getUpcomingClasses(),
  ]);
  const sortedClasses = [...classes].sort((a, b) => a.date.localeCompare(b.date));
  const grouped = sortedClasses.reduce<Record<string, typeof sortedClasses>>((acc, item) => {
    const key = monthKey(item.date);
    acc[key] = [...(acc[key] ?? []), item];
    return acc;
  }, {});
  const months = Object.keys(grouped);

  return (
    <>
      <Section className="bg-white" tone="light">
        <div className="max-w-3xl">
          <Badge tone="red">{content.heroLabel}</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
            {content.heroHeadline}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-charcoal/62">
            {content.heroBody}
          </p>
        </div>
      </Section>

      <Section className="bg-neutral-50" tone="light">
        <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
          <aside className="space-y-6">
            <Card className="p-6">
              <h2 className="font-semibold text-neutral-900">Month</h2>
              <div className="mt-4 grid gap-2">
                {months.map((month) => (
                  <a
                    className="rounded-xl border border-neutral-200 px-3 py-2 text-sm transition-all duration-200 hover:border-neutral-400 hover:bg-neutral-100"
                    href={`#${month.replaceAll(" ", "-")}`}
                    key={month}
                  >
                    {month}
                  </a>
                ))}
              </div>
            </Card>
            <Card className="p-6">
              <h2 className="font-semibold text-neutral-900">Filters</h2>
              {content.filterIntroCopy ? (
                <p className="mt-3 text-sm leading-relaxed text-charcoal/62">
                  {content.filterIntroCopy}
                </p>
              ) : null}
              <div className="mt-4 grid gap-3">
                {filters.map((filter) => (
                  <select
                    className="min-h-11 rounded-xl border border-neutral-300 bg-white px-3 text-sm text-charcoal/62"
                    key={filter}
                  >
                    <option>{filter}</option>
                  </select>
                ))}
              </div>
            </Card>
          </aside>

          <div className="space-y-12">
            {months.length > 0 ? (
              months.map((month) => (
                <section id={month.replaceAll(" ", "-")} key={month}>
                  <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                    {month}
                  </h2>
                  <div className="mt-6 grid gap-4">
                    {grouped[month].map((trainingClass) => {
                      const category = getCategory(trainingClass.categoryId);
                      const disabled =
                        trainingClass.status === "soldOut" ||
                        trainingClass.status === "closed";

                    return (
                      <Card className="p-5 md:p-6" key={trainingClass.id}>
                        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
                          <div>
                            <div className="flex flex-wrap gap-2">
                              <Badge tone="neutral">{category?.name}</Badge>
                              <Badge tone="red">
                                {classStatusLabels[trainingClass.status]}
                              </Badge>
                            </div>
                            <h3 className="mt-4 text-xl font-semibold text-neutral-900">
                              {trainingClass.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-charcoal/62">
                              {trainingClass.date} • {trainingClass.startTime} •{" "}
                              {trainingClass.locationCity},{" "}
                              {trainingClass.locationState} •{" "}
                              {formatCurrency(trainingClass.price)}
                            </p>
                          </div>
                          <div className="flex flex-col gap-3 sm:flex-row">
                            <Button
                              disabled={disabled}
                              href={disabled ? "#" : `/register/${trainingClass.slug}`}
                            >
                              {classCtaLabels[trainingClass.status]}
                            </Button>
                            <Button href={`/classes/${trainingClass.slug}`} variant="outline">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                  </div>
                </section>
              ))
            ) : (
              <Card className="p-6 md:p-8">
                <h2 className="font-semibold text-neutral-900">
                  {content.emptyStateHeadline}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/62">
                  {content.emptyStateBody}
                </p>
              </Card>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
