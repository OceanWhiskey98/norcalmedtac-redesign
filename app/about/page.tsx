import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { getAboutPage } from "@/lib/sanity/about";
import { getInstructors } from "@/lib/sanity/instructors";

export default async function AboutPage() {
  const [content, instructors] = await Promise.all([
    getAboutPage(),
    getInstructors(),
  ]);

  return (
    <>
      <Section className="bg-white" tone="light">
        <div className="max-w-3xl">
          <Badge tone="olive">{content.heroLabel}</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
            {content.heroHeadline}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-charcoal/62">
            {content.heroBody}
          </p>
        </div>
      </Section>

      <Section className="bg-neutral-50" tone="light">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Badge tone="red">{content.missionLabel}</Badge>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
              {content.missionHeadline}
            </h2>
          </div>
          <p className="leading-relaxed text-charcoal/62">
            {content.missionBody}
          </p>
        </div>
      </Section>

      <Section className="bg-white" tone="light">
        <div className="mb-12 max-w-3xl">
          <Badge tone="olive">{content.audiencesLabel}</Badge>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
            {content.audiencesHeadline}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {content.audiences.map((audience) => (
            <Card className="p-6" key={audience.text}>
              <p className="text-sm leading-relaxed text-charcoal/68">
                {audience.text}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-neutral-50" tone="light">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {content.philosophyPoints.map((item) => (
            <Card className="p-6" key={item.title}>
              <h3 className="font-semibold text-neutral-900">{item.title}</h3>
              {item.summary ? (
                <p className="mt-3 text-sm leading-relaxed text-charcoal/62">
                  {item.summary}
                </p>
              ) : null}
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-white" tone="light">
        <div className="mb-12 max-w-3xl">
          <Badge tone="gold">{content.instructorLabel}</Badge>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
            {content.instructorHeadline}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {instructors.map((instructor) => (
            <Card className="p-6" key={instructor.id}>
              <h3 className="text-xl font-semibold text-neutral-900">
                {instructor.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-charcoal/58">
                {instructor.role}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-charcoal/62">
                {instructor.bio}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {instructor.credentials.map((credential) => (
                  <Badge key={credential} tone="neutral">
                    {credential}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-neutral-900" tone="dark">
        <div className="max-w-3xl">
          <Badge tone="gold">{content.finalCtaLabel}</Badge>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {content.finalCtaHeadline}
          </h2>
          <p className="mt-4 leading-relaxed text-neutral-300">
            {content.finalCtaBody}
          </p>
        </div>
      </Section>
    </>
  );
}
