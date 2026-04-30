import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { instructors } from "@/lib/data";

const audiences = [
  "Civilians seeking practical emergency or defensive training",
  "Businesses needing workplace preparedness training",
  "Clubs and private groups requesting custom instruction",
  "Armed professionals and public safety personnel",
  "Medical personnel seeking refreshers or continuing education",
];

const philosophy = [
  "Practical curriculum",
  "Calm instruction",
  "Safety-first environment",
  "Clear prerequisites and expectations",
];

export default function AboutPage() {
  return (
    <>
      <Section className="bg-white" tone="light">
        <div className="max-w-3xl">
          <Badge tone="olive">About</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
            A professional training organization built around practical
            readiness.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-charcoal/62">
            NorCal MedTac provides hands-on medical, defensive, workplace, and
            group training for students who need clear instruction before real
            situations happen.
          </p>
        </div>
      </Section>

      <Section className="bg-neutral-50" tone="light">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Badge tone="red">Mission</Badge>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
              Training that is serious, practical, and easy to understand.
            </h2>
          </div>
          <p className="leading-relaxed text-charcoal/62">
            The site presents NorCal MedTac as a professional training provider
            that accepts registrations, not as a store that sells classes.
            Course details, instructor credibility, safety expectations, and
            registration clarity come first.
          </p>
        </div>
      </Section>

      <Section className="bg-white" tone="light">
        <div className="mb-12 max-w-3xl">
          <Badge tone="olive">Who The Training Serves</Badge>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
            Practical training for individuals, professionals, and groups.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {audiences.map((audience) => (
            <Card className="p-6" key={audience}>
              <p className="text-sm leading-relaxed text-charcoal/68">{audience}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-neutral-50" tone="light">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {philosophy.map((item) => (
            <Card className="p-6" key={item}>
              <h3 className="font-semibold text-neutral-900">{item}</h3>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-white" tone="light">
        <div className="mb-12 max-w-3xl">
          <Badge tone="gold">Instructor Credibility</Badge>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
            Instructors with relevant credentials and specialties.
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
          <Badge tone="gold">Why Choose NorCal MedTac</Badge>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Clear information, capable instruction, and safety-first training
            environments.
          </h2>
          <p className="mt-4 leading-relaxed text-neutral-300">
            Students can review prerequisites, what to bring, class expectations,
            and registration details before reserving a seat.
          </p>
        </div>
      </Section>
    </>
  );
}
