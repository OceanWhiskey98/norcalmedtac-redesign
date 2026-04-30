import { ClassCard } from "@/components/domain/class-card";
import { ProductCard } from "@/components/domain/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { categories, merchandise } from "@/lib/data";
import { getClasses } from "@/lib/sanity/classes";

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
  "Clear student expectations",
];

const expectations = [
  "Preparation details are shown before registration.",
  "Class environment and safety expectations are stated clearly.",
  "Prerequisites are listed before students reserve a seat.",
  "Registration details stay separate from merchandise shopping.",
];

const learningPoints = [
  "Bleeding control & trauma response",
  "Situational awareness & decision-making",
  "Real-world scenario training",
  "Certification-ready skills",
];

const trustStats = [
  "500+ students trained",
  "AHA & ASHI certified instruction",
  "10+ years field experience",
  "Used by EMS, security, and civilians",
];

export default async function Home() {
  const classes = await getClasses();
  const pathways = pathwayIds
    .map((id) => categories.find((category) => category.id === id))
    .filter(Boolean);
  const featuredProducts = merchandise.filter((product) => product.featured);

  return (
    <>
      <Section
        tone="light"
        className="border-b border-neutral-200 bg-white"
      >
        <div className="grid min-h-[70vh] gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div className="max-w-3xl">
            <Badge tone="olive">Northern California Training Provider</Badge>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.04] tracking-tight text-charcoal md:text-5xl lg:text-6xl">
              Medical and defensive training built for real-world situations.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-charcoal/62">
              Practical, safety-first, real-world readiness training for
              individuals, professionals, and groups.
            </p>
            <p className="mt-4 max-w-2xl text-sm font-medium text-charcoal/58">
              Trusted training aligned with AHA, ASHI, and real-world field
              experience.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href="/classes" size="lg" variant="primary">
                View Upcoming Classes
              </Button>
              <Button href="/group-training" size="lg" variant="ghost">
                Request Group Training
              </Button>
            </div>
          </div>
          <div className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl md:p-8">
            <Badge tone="neutral">What you'll learn</Badge>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
              Practical skills for high-pressure moments.
            </h2>
            <ul className="space-y-3 text-sm leading-relaxed text-charcoal/68">
              {learningPoints.map((point) => (
                <li className="flex gap-3" key={point}>
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="light" className="bg-neutral-50">
        <div className="mb-12 max-w-3xl">
          <Badge tone="red">Trusted Training</Badge>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
            Trusted by professionals and first responders
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {trustStats.map((stat) => (
            <Card key={stat} className="rounded-xl p-6">
              <p className="text-lg font-semibold leading-tight text-neutral-900">
                {stat}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="upcoming-classes" tone="light" className="bg-white">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge tone="red">Upcoming Classes</Badge>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">Upcoming Classes</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-charcoal/62">
              Browse scheduled training events with clear dates, locations,
              availability, and registration actions.
            </p>
          </div>
          <Button href="/classes" variant="outline">
            View Upcoming Classes
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {classes.map((trainingClass) => (
            <ClassCard key={trainingClass.id} trainingClass={trainingClass} />
          ))}
        </div>
      </Section>

      <Section tone="warm" className="bg-neutral-50">
        <div className="mb-12 max-w-3xl">
          <Badge tone="olive">Training Pathways</Badge>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
            Choose the training path that fits your mission.
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-charcoal/62">
            Browse by medical, defensive, certification, or group training needs
            and move quickly toward the right class or inquiry path.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {pathways.map((category, index) =>
            category ? (
              <Card
                key={category.id}
                className="flex min-h-80 cursor-pointer flex-col overflow-hidden bg-white p-0 hover:border-neutral-400 hover:shadow-xl"
              >
                <div
                  className={`h-1.5 ${
                    index === 0 ? "bg-medical-red" : "bg-field-olive"
                  } opacity-85 transition-opacity group-hover:opacity-100`}
                />
                <div className="flex flex-1 flex-col p-6">
                  <Badge tone={index === 0 ? "red" : "olive"}>
                    {category.name}
                  </Badge>
                  <h3 className="mt-5 text-xl font-semibold leading-tight text-charcoal">
                    {category.name}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-charcoal/62">
                    {category.summary}
                  </p>
                  <p className="mt-5 text-xs font-medium text-charcoal/52">
                    Classes, private instruction, or group options
                  </p>
                  <a
                    className="mt-auto inline-flex min-h-11 items-center pt-6 text-sm font-semibold text-medical-red transition-all duration-200 hover:text-[#982c28]"
                    href={`/classes?category=${category.slug}`}
                  >
                    Explore pathway →
                  </a>
                </div>
              </Card>
            ) : null,
          )}
        </div>
      </Section>

      <Section tone="light" className="bg-white">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <Badge tone="gold">Why Train With NorCal MedTac</Badge>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
              Practical, calm, and safety-first instruction.
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {valuePoints.map((point) => (
              <Card key={point} className="rounded-xl p-4">
                <p className="font-semibold leading-tight">{point}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="dark" className="bg-neutral-900">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Badge tone="gold">Credentials</Badge>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Recognized certifications and real-world experience you can trust.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-neutral-300">
              Our instruction aligns with nationally recognized standards and
              real field experience.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {["AHA", "ASHI", "ITLS", "EMT skills", "Instructor credentials"].map(
              (credential) => (
                <div
                  className="cursor-pointer rounded-xl border border-white/10 bg-white/5 p-5 text-neutral-300 transition-all duration-200 hover:bg-neutral-800"
                  key={credential}
                >
                  <p className="font-semibold text-white">{credential}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </Section>

      <Section tone="warm" className="bg-neutral-50">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <Badge tone="olive">Group Training</Badge>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
              Custom training for businesses, clubs, and organizations.
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-charcoal/62">
              Workplace CPR and first aid, emergency preparedness, tactical
              medicine, defensive skills, and team refreshers can be structured
              around group needs.
            </p>
          </div>
          <Button href="/group-training" size="lg" variant="outline">
            Request Group Training
          </Button>
        </div>
      </Section>

      <Section tone="light" className="bg-white">
        <div className="mb-12">
          <Badge tone="gold">What To Expect</Badge>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
            Clear preparation before class day.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {expectations.map((item) => (
            <Card key={item} className="p-6">
              <p className="text-sm leading-6 text-charcoal/68">{item}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="warm" className="bg-neutral-50">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge tone="neutral">Merch Preview</Badge>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">Merch</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-charcoal/62">
              Merchandise is shown separately from training registration.
            </p>
          </div>
          <Button href="/merch" variant="outline">
            Shop Merch
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Section>

      <Section tone="dark" className="bg-neutral-900">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">Ready to train with confidence?</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-neutral-300">
              View upcoming classes or contact NorCal MedTac to find the right
              training for you.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
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
