import { ProductCard } from "@/components/domain/product-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { merchandise } from "@/lib/data";

const categories = ["Apparel", "Patches", "Gear", "Gift Certificates", "Accessories"];

export default function MerchPage() {
  return (
    <>
      <Section className="bg-white" tone="light">
        <div className="max-w-3xl">
          <Badge tone="neutral">Merch</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
            Merch
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-charcoal/62">
            Browse NorCal MedTac merchandise separately from training
            registration. Product filters and cart content are front-end
            placeholders for this prototype.
          </p>
        </div>
      </Section>

      <Section className="bg-neutral-50" tone="light">
        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              className="min-h-10 rounded-xl border border-neutral-300 bg-white px-4 text-sm font-medium text-charcoal transition-all duration-200 hover:bg-neutral-100 active:scale-[0.98]"
              key={category}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {merchandise.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Section>

      <Section className="bg-white" tone="light">
        <Card className="p-6 md:p-8">
          <Badge tone="neutral">Cart Placeholder</Badge>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900">
            Front-end cart preview
          </h2>
          <p className="mt-3 leading-relaxed text-charcoal/62">
            Merchandise cart, shipping, checkout, and order confirmation screens
            are placeholders only in this front-end prototype. No payment
            processing or inventory management is active.
          </p>
        </Card>
      </Section>
    </>
  );
}
