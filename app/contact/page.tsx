import { ContactForm } from "@/components/forms/contact-form";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

const faqs = [
  "How do I choose the right class?",
  "What should I bring to training?",
  "Can NorCal MedTac train my workplace or group?",
];

export default function ContactPage() {
  return (
    <>
      <Section className="bg-white" tone="light">
        <div className="max-w-3xl">
          <Badge tone="red">Contact</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
            Contact NorCal MedTac
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-charcoal/62">
            Ask a question before registering, request training guidance, or
            start a conversation about group instruction.
          </p>
        </div>
      </Section>

      <Section className="bg-neutral-50" tone="light">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <Badge tone="olive">Contact Form</Badge>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
              Send a training question.
            </h2>
            <p className="mt-3 leading-relaxed text-charcoal/62">
              This form is front-end only for the prototype and does not send
              email or store submissions.
            </p>
          </div>
          <ContactForm />
        </div>
      </Section>

      <Section className="bg-white" tone="light">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6">
            <Badge tone="red">Training Inquiry</Badge>
            <h2 className="mt-4 font-semibold text-neutral-900">
              Individual class questions
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/62">
              Ask about prerequisites, class expectations, what to bring, or
              registration details.
            </p>
          </Card>
          <Card className="p-6">
            <Badge tone="olive">Service Area</Badge>
            <h2 className="mt-4 font-semibold text-neutral-900">
              Northern California
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/62">
              Training is centered on Northern California with scheduled,
              partner-location, and group training options.
            </p>
          </Card>
          <Card className="p-6">
            <Badge tone="gold">Group Training</Badge>
            <h2 className="mt-4 font-semibold text-neutral-900">
              Workplace and private groups
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/62">
              Use the group training page for custom class inquiries and mobile
              training requests.
            </p>
          </Card>
        </div>
      </Section>

      <Section className="bg-neutral-50" tone="light">
        <div className="mb-12 max-w-3xl">
          <Badge tone="neutral">FAQ Summary</Badge>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
            Common questions before registering.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {faqs.map((faq) => (
            <Card className="p-6" key={faq}>
              <h3 className="font-semibold text-neutral-900">{faq}</h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/62">
                Placeholder FAQ summary content for the front-end prototype.
              </p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
