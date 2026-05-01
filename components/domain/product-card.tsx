import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency, type Merchandise } from "@/lib/data";

type ProductCardProps = {
  product: Merchandise;
};

const inventoryLabels: Record<Merchandise["inventoryStatus"], string> = {
  inStock: "In Stock",
  lowStock: "Low Stock",
  outOfStock: "Out of Stock",
};

function getExternalShoppingUrl(value: string): string | undefined {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.toString()
      : undefined;
  } catch {
    return undefined;
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images[0];
  const shoppingUrl = getExternalShoppingUrl(product.shoppingUrl);
  const isUnavailable =
    product.inventoryStatus === "outOfStock" || !shoppingUrl;
  const buttonLabel = !shoppingUrl
    ? "Coming Soon"
    : product.inventoryStatus === "outOfStock"
      ? "Not Available Yet"
      : "Add to Cart";

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      {primaryImage ? (
        <img
          alt={product.imageAlt || product.title}
          className="h-56 w-full object-cover"
          src={primaryImage}
        />
      ) : (
        <div className="flex min-h-56 items-end bg-warm-gray p-5 transition-transform duration-200 group-hover:scale-[1.02]">
          <span className="text-sm font-semibold text-charcoal">
            {product.category}
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-5 p-5 md:p-6">
        <Badge tone="neutral">{product.category}</Badge>
        <div>
          <h3 className="text-xl font-semibold leading-tight text-charcoal">
            {product.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-charcoal/62">
            {product.description}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold">{formatCurrency(product.price)}</p>
            <p className="text-sm text-charcoal/64">
              {inventoryLabels[product.inventoryStatus]}
            </p>
          </div>
          <Button
            disabled={isUnavailable}
            href={isUnavailable ? undefined : shoppingUrl}
            variant="primary"
          >
            {buttonLabel}
          </Button>
        </div>
      </div>
    </Card>
  );
}
