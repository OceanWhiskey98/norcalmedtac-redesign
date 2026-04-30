import { GroupInquiryForm } from "@/components/forms/group-inquiry-form";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

const useCases = [
  "Workplace CPR/first aid",
  "Business emergency preparedness",
  "Club or private group training",
  "Security or armed professional training",
  "Public safety or medical team refreshers",
];

const trainingOptions = [
  "Medical & certification training",
  "Tactical medicine",
  "Defensive skills",
  "Custom emergency preparedness",
];

const steps = [
  "Submit inquiry",
  "Define group needs",
  "Schedule training",
  "Train on-site or at an agreed location",
];

export default function GroupTrainingPage() {
  return (
    <>
      <Section className="bg-white" tone="light">
        <div className="max-w-3xl">
          <Badge tone="olive">Group Training</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
            Custom training for teams, workplaces, clubs, and organizations.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-charcoal/62">
            NorCal MedTac provides mobile and custom training for groups that
            need practical medical, preparedness, tactical medicine, or
            defensive skills instruction.
          </p>
        </div>
      </Section>

      <Section className="bg-neutral-50" tone="light">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {useCases.map((item) => (
            <Card className="p-6" key={item}>
              <h2 className="font-semibold text-neutral-900">{item}</h2>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-white" tone="light">
        <div className="mb-12 max-w-3xl">
          <Badge tone="red">Training Options</Badge>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
            Build a class around your group needs.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {trainingOptions.map((item) => (
            <Card className="p-6" key={item}>
              <h3 className="font-semibold text-neutral-900">{item}</h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/62">
                Structured front-end placeholder content for a future custom
                training inquiry workflow.
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-neutral-50" tone="light">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <Badge tone="olive">How It Works</Badge>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
              A simple path from inquiry to training.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {steps.map((step, index) => (
              <Card className="p-6" key={step}>
                <p className="text-sm font-medium text-red-600">Step {index + 1}</p>
                <h3 className="mt-2 font-semibold text-neutral-900">{step}</h3>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-neutral-900" tone="dark">
        <div className="max-w-3xl">
          <Badge tone="gold">Credentials</Badge>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Instruction aligned with recognized standards and real field
            experience.
          </h2>
          <p className="mt-4 leading-relaxed text-neutral-300">
            Group training can reference AHA, ASHI, ITLS, EMT skills, instructor
            credentials, and class-specific safety expectations where applicable.
          </p>
        </div>
      </Section>

      <Section className="bg-white" tone="light">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <Badge tone="red">Inquiry Form</Badge>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
              Request Group Training
            </h2>
            <p className="mt-3 leading-relaxed text-charcoal/62">
              This form is front-end only for the prototype and does not send
              email or store submissions.
            </p>
          </div>
          <GroupInquiryForm />
        </div>
      </Section>
    </>
  );
}
