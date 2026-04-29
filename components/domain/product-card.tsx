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

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="flex aspect-[4/3] items-end bg-warm-gray p-4">
        <span className="text-sm font-semibold text-charcoal">
          {product.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <Badge tone="neutral">{product.category}</Badge>
        <div>
          <h3 className="text-lg font-semibold leading-tight">{product.title}</h3>
          <p className="mt-2 text-sm leading-6 text-charcoal/72">
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
            disabled={product.inventoryStatus === "outOfStock"}
            href={product.shoppingUrl}
            variant="secondary"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
}
