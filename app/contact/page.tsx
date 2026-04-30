import { ContactForm } from "@/components/forms/contact-form";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { getContactPage } from "@/lib/sanity/contact";

export default async function ContactPage() {
  const content = await getContactPage();

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
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <Badge tone="olive">{content.formLabel}</Badge>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
              {content.formHeadline}
            </h2>
            <p className="mt-3 leading-relaxed text-charcoal/62">
              {content.formBody}
            </p>
          </div>
          <ContactForm />
        </div>
      </Section>

      <Section className="bg-white" tone="light">
        <div className="grid gap-6 md:grid-cols-3">
          {content.contactCards.map((card) => (
            <Card className="p-6" key={card.label}>
              <Badge tone={card.tone}>{card.label}</Badge>
              <h2 className="mt-4 font-semibold text-neutral-900">
                {card.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/62">
                {card.body}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-neutral-50" tone="light">
        <div className="mb-12 max-w-3xl">
          <Badge tone="neutral">{content.faqLabel}</Badge>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
            {content.faqHeadline}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {content.faqs.map((faq) => (
            <Card className="p-6" key={faq.question}>
              <h3 className="font-semibold text-neutral-900">{faq.question}</h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/62">
                {faq.answer}
              </p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
