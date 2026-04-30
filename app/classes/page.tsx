import { ClassCard } from "@/components/domain/class-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { getCategory } from "@/lib/data";
import { getUpcomingClasses } from "@/lib/sanity/classes";

const filters = [
  "Category",
  "Date range",
  "Location",
  "Certification",
  "Skill level",
  "Availability",
];

export default async function ClassesPage() {
  const classes = await getUpcomingClasses();
  const featuredClass = classes[0];
  const featuredCategory = featuredClass
    ? getCategory(featuredClass.categoryId)
    : undefined;

  return (
    <>
      <Section className="bg-white" tone="light">
        <div className="max-w-3xl">
          <Badge tone="red">Classes</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
            Upcoming Classes
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-charcoal/62">
            Browse scheduled medical, defensive, certification, and preparedness
            training. Filters are included as front-end placeholders for this
            prototype.
          </p>
        </div>
      </Section>

      <Section className="bg-neutral-50" tone="light">
        <div className="mb-10 grid gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:grid-cols-3 xl:grid-cols-6">
          {filters.map((filter) => (
            <label
              className="grid gap-2 text-sm font-medium text-neutral-900"
              key={filter}
            >
              {filter}
              <select className="min-h-11 rounded-xl border border-neutral-300 bg-white px-3 text-sm text-charcoal/62">
                <option>{filter}</option>
              </select>
            </label>
          ))}
        </div>

        {featuredClass ? (
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <div>
              <Badge tone="olive">Featured Next Class</Badge>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
                {featuredClass.title}
              </h2>
              <p className="mt-3 leading-relaxed text-charcoal/62">
                {featuredClass.summary}
              </p>
              <dl className="mt-6 grid gap-3 text-sm text-charcoal/62 sm:grid-cols-2">
                <div>
                  <dt className="font-medium text-neutral-900">Date</dt>
                  <dd>{featuredClass.date}</dd>
                </div>
                <div>
                  <dt className="font-medium text-neutral-900">Location</dt>
                  <dd>
                    {featuredClass.locationCity}, {featuredClass.locationState}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-neutral-900">Category</dt>
                  <dd>{featuredCategory?.name}</dd>
                </div>
                <div>
                  <dt className="font-medium text-neutral-900">Seats</dt>
                  <dd>{featuredClass.seatsAvailable} available</dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={`/register/${featuredClass.slug}`}>
                  Register
                </Button>
                <Button
                  href={`/classes/${featuredClass.slug}`}
                  variant="outline"
                >
                  View Details
                </Button>
              </div>
            </div>
            <ClassCard trainingClass={featuredClass} />
          </div>
        ) : (
          <Card className="mb-12 p-6">
            <h2 className="font-semibold text-neutral-900">
              No scheduled classes are published.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/62">
              Published classes from Sanity Studio will appear here.
            </p>
          </Card>
        )}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {classes.map((trainingClass) => (
            <div id={trainingClass.slug} key={trainingClass.id}>
              <ClassCard trainingClass={trainingClass} />
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-white" tone="light">
        <div className="grid gap-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 md:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <Badge tone="olive">Group Training</Badge>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900">
              Need a private, workplace, or club class?
            </h2>
            <p className="mt-3 leading-relaxed text-charcoal/62">
              Request training for your team, organization, or private group.
            </p>
          </div>
          <Button href="/group-training" variant="outline">
            Request Group Training
          </Button>
        </div>
      </Section>

      <Section className="bg-neutral-50" tone="light">
        <div className="grid gap-6 md:grid-cols-3">
          {["FAQs", "Policies", "Refund & Cancellation Policy"].map((item) => (
            <Card className="p-6" key={item}>
              <h3 className="font-semibold text-neutral-900">{item}</h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/62">
                Review class expectations, waivers, transfers, cancellation
                timing, and other registration details before attending.
              </p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
