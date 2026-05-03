import Image from "next/image";
import { GroupInquiryForm } from "@/components/forms/group-inquiry-form";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { PLACEHOLDER_IMAGES } from "@/lib/placeholder-images";
import { getGroupTrainingPage } from "@/lib/sanity/group-training";

export default async function GroupTrainingPage() {
  const content = await getGroupTrainingPage();

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
        <Card className="relative mt-10 aspect-[16/9] max-w-5xl overflow-hidden p-0">
          <Image
            fill
            alt="Workplace group training placeholder"
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 960px"
            src={PLACEHOLDER_IMAGES.groupTraining.workplace}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/28 via-black/9 to-transparent" />
        </Card>
      </Section>

      <Section className="bg-neutral-50" tone="light">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {content.useCases.map((item) => (
            <Card className="p-6" key={item.title}>
              <h2 className="font-semibold text-neutral-900">{item.title}</h2>
              {item.summary ? (
                <p className="mt-3 text-sm leading-relaxed text-charcoal/62">
                  {item.summary}
                </p>
              ) : null}
            </Card>
          ))}
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="relative aspect-[16/9] overflow-hidden p-0">
            <Image
              fill
              alt="Private class group training placeholder"
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              src={PLACEHOLDER_IMAGES.groupTraining.privateClass}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/18 via-black/4 to-transparent" />
          </Card>
          <Card className="relative aspect-[16/9] overflow-hidden p-0">
            <Image
              fill
              alt="Team medical training placeholder"
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              src={PLACEHOLDER_IMAGES.groupTraining.teamTraining}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/18 via-black/4 to-transparent" />
          </Card>
        </div>
      </Section>

      <Section className="bg-white" tone="light">
        <div className="mb-12 max-w-3xl">
          <Badge tone="red">{content.trainingOptionsLabel}</Badge>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
            {content.trainingOptionsHeadline}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {content.trainingOptions.map((item) => (
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

      <Section className="bg-neutral-50" tone="light">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <Badge tone="olive">{content.stepsLabel}</Badge>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
              {content.stepsHeadline}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {content.steps.map((step, index) => (
              <Card className="p-6" key={step.title}>
                <p className="text-sm font-medium text-red-600">Step {index + 1}</p>
                <h3 className="mt-2 font-semibold text-neutral-900">
                  {step.title}
                </h3>
                {step.summary ? (
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/62">
                    {step.summary}
                  </p>
                ) : null}
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-neutral-900" tone="dark">
        <div className="max-w-3xl">
          <Badge tone="gold">{content.credentialsLabel}</Badge>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {content.credentialsHeadline}
          </h2>
          <p className="mt-4 leading-relaxed text-neutral-300">
            {content.credentialsBody}
          </p>
        </div>
      </Section>

      <Section className="bg-white" tone="light">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <Badge tone="red">{content.formLabel}</Badge>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
              {content.formHeadline}
            </h2>
            <p className="mt-3 leading-relaxed text-charcoal/62">
              {content.formBody}
            </p>
          </div>
          <GroupInquiryForm />
        </div>
      </Section>
    </>
  );
}
