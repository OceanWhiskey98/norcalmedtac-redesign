import { ClassCard } from "@/components/domain/class-card";
import { ProductCard } from "@/components/domain/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { categories, classes, merchandise } from "@/lib/data";

const pathwayIds = [
  "medical-certification",
  "tactical-medicine",
  "defensive-firearms",
  "concealed-carry",
  "group-workplace",
];

const valuePoints = [
  "Practical curriculum",
  "Mobile instruction",
  "Medical and defensive expertise",
  "Calm instruction",
  "Safety-first environment",
];

const expectations = [
  "Preparation details are shown before registration.",
  "Class environment and safety expectations are stated clearly.",
  "Prerequisites are listed before students reserve a seat.",
  "Registration details stay separate from merchandise shopping.",
];

export default function Home() {
  const pathways = pathwayIds
    .map((id) => categories.find((category) => category.id === id))
    .filter(Boolean);
  const featuredProducts = merchandise.filter((product) => product.featured);

  return (
    <>
      <Section tone="dark" className="border-b border-white/10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Badge tone="gold">Northern California Training Provider</Badge>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Professional medical, defensive, workplace, and group training.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">
              NorCal MedTac provides practical hands-on preparedness training for
              individuals, businesses, clubs, armed professionals, public safety
              personnel, medical personnel, and organizations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/classes" size="lg" variant="primary">
                View Upcoming Classes
              </Button>
              <Button href="/group-training" size="lg" variant="secondary">
                Request Group Training
              </Button>
            </div>
            <p className="mt-5 text-sm font-medium text-white/68">
              AHA, ASHI, ITLS, EMT skills, and instructor credential references
              appear throughout class information.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-graphite p-5">
            <div className="aspect-[4/3] rounded-md border border-white/10 bg-charcoal p-5">
              <div className="flex h-full flex-col justify-end">
                <p className="max-w-sm text-2xl font-semibold leading-tight">
                  Preparedness training for classrooms, workplaces, and range
                  environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="upcoming-classes" tone="light">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge tone="red">Upcoming Classes</Badge>
            <h2 className="mt-4 text-3xl font-semibold">Upcoming Classes</h2>
            <p className="mt-3 max-w-2xl leading-7 text-charcoal/72">
              Browse scheduled training events with clear dates, locations,
              availability, and registration actions.
            </p>
          </div>
          <Button href="/classes" variant="outline">
            View Upcoming Classes
          </Button>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {classes.map((trainingClass) => (
            <ClassCard key={trainingClass.id} trainingClass={trainingClass} />
          ))}
        </div>
      </Section>

      <Section tone="warm">
        <div className="mb-8">
          <Badge tone="olive">Training Pathways</Badge>
          <h2 className="mt-4 text-3xl font-semibold">Training Pathways</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {pathways.map((category) =>
            category ? (
              <Card key={category.id} className="p-5">
                <Badge tone={category.accent === "red" ? "red" : "olive"}>
                  {category.name}
                </Badge>
                <p className="mt-4 text-sm leading-6 text-charcoal/72">
                  {category.summary}
                </p>
              </Card>
            ) : null,
          )}
        </div>
      </Section>

      <Section tone="light">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <Badge tone="gold">Why Train With NorCal MedTac</Badge>
            <h2 className="mt-4 text-3xl font-semibold">
              Practical, calm, and safety-first instruction.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {valuePoints.map((point) => (
              <Card key={point} className="p-5">
                <p className="font-semibold">{point}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="dark">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Badge tone="gold">Credentials</Badge>
            <h2 className="mt-4 text-3xl font-semibold">
              Training credibility is visible before registration.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["AHA", "ASHI", "ITLS", "EMT skills", "Instructor credentials"].map(
              (credential) => (
                <div
                  className="rounded-lg border border-white/10 bg-white/5 p-5"
                  key={credential}
                >
                  <p className="font-semibold">{credential}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </Section>

      <Section tone="warm">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <Badge tone="olive">Group Training</Badge>
            <h2 className="mt-4 text-3xl font-semibold">
              Custom training for businesses, clubs, and organizations.
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-charcoal/72">
              Workplace CPR and first aid, emergency preparedness, tactical
              medicine, defensive skills, and team refreshers can be structured
              around group needs.
            </p>
          </div>
          <Button href="/group-training" size="lg" variant="secondary">
            Request Group Training
          </Button>
        </div>
      </Section>

      <Section tone="light">
        <div className="mb-8">
          <Badge tone="gold">What To Expect</Badge>
          <h2 className="mt-4 text-3xl font-semibold">
            Clear preparation before class day.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {expectations.map((item) => (
            <Card key={item} className="p-5">
              <p className="text-sm leading-6 text-charcoal/76">{item}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="warm">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge tone="neutral">Merch Preview</Badge>
            <h2 className="mt-4 text-3xl font-semibold">Merch</h2>
            <p className="mt-3 max-w-2xl leading-7 text-charcoal/72">
              Merchandise is shown separately from training registration.
            </p>
          </div>
          <Button href="/merch" variant="outline">
            Shop Merch
          </Button>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold">Ready to plan training?</h2>
            <p className="mt-3 max-w-2xl leading-7 text-white/72">
              View the calendar for scheduled classes or contact NorCal MedTac
              with questions before registering.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/calendar" size="lg" variant="primary">
              View Calendar
            </Button>
            <Button href="/contact" size="lg" variant="secondary">
              Contact Us
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
