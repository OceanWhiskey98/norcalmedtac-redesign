import { groq } from "next-sanity";
import {
  merchandise as fallbackMerchandise,
  type Merchandise,
} from "@/lib/data";
import { sanityClient } from "@/lib/sanity/client";

type MerchCategory = Merchandise["category"];
type InventoryStatus = Merchandise["inventoryStatus"];

type SanityMerchProductDocument = {
  id?: string | null;
  title?: string | null;
  slug?: string | null;
  category?: string | null;
  description?: string | null;
  price?: number | null;
  currency?: string | null;
  images?: string[] | null;
  imageAlt?: string | null;
  variants?: Array<{
    label?: string | null;
    values?: string[] | null;
  }> | null;
  inventoryStatus?: string | null;
  shoppingUrl?: string | null;
  featured?: boolean | null;
  sortOrder?: number | null;
};

const merchCategories: MerchCategory[] = [
  "Apparel",
  "Patches",
  "Gear",
  "Gift Certificates",
  "Accessories",
];

const inventoryStatuses: InventoryStatus[] = [
  "inStock",
  "lowStock",
  "outOfStock",
];

const merchProductsQuery = groq`
  *[_type == "merchProduct" && defined(slug.current)] | order(featured desc, sortOrder asc, title asc) {
    "id": _id,
    title,
    "slug": slug.current,
    category,
    description,
    price,
    currency,
    "images": images[].asset->url,
    imageAlt,
    variants[] {
      label,
      values
    },
    inventoryStatus,
    shoppingUrl,
    featured,
    sortOrder
  }
`;

function isMerchCategory(value: string | null | undefined): value is MerchCategory {
  return merchCategories.includes(value as MerchCategory);
}

function isInventoryStatus(
  value: string | null | undefined,
): value is InventoryStatus {
  return inventoryStatuses.includes(value as InventoryStatus);
}

function getFallbackBySlug(slug: string | null | undefined) {
  return fallbackMerchandise.find((product) => product.slug === slug);
}

function normalizeVariants(
  variants: SanityMerchProductDocument["variants"],
  fallback: Merchandise | undefined,
): Merchandise["variants"] {
  if (!Array.isArray(variants) || variants.length === 0) {
    return fallback?.variants ?? [];
  }

  return variants
    .map((variant, index) => {
      const fallbackVariant = fallback?.variants[index];
      const label = variant.label ?? fallbackVariant?.label;

      if (!label) {
        return null;
      }

      const values =
        Array.isArray(variant.values) && variant.values.length > 0
          ? variant.values
          : fallbackVariant?.values ?? [];

      return { label, values };
    })
    .filter((variant): variant is Merchandise["variants"][number] =>
      Boolean(variant),
    );
}

function normalizeMerchProduct(
  document: SanityMerchProductDocument,
): Merchandise | null {
  const fallback = getFallbackBySlug(document.slug);
  const title = document.title ?? fallback?.title;
  const slug = document.slug ?? fallback?.slug;

  if (!title || !slug) {
    return null;
  }

  return {
    id: document.id ?? fallback?.id ?? `product-${slug}`,
    title,
    slug,
    category: isMerchCategory(document.category)
      ? document.category
      : fallback?.category ?? "Gear",
    description: document.description ?? fallback?.description ?? "",
    price: document.price ?? fallback?.price ?? 0,
    currency: "USD",
    images: Array.isArray(document.images)
      ? document.images.filter(Boolean)
      : fallback?.images ?? [],
    imageAlt: document.imageAlt ?? fallback?.imageAlt ?? "",
    variants: normalizeVariants(document.variants, fallback),
    inventoryStatus: isInventoryStatus(document.inventoryStatus)
      ? document.inventoryStatus
      : fallback?.inventoryStatus ?? "inStock",
    shoppingUrl: document.shoppingUrl ?? fallback?.shoppingUrl ?? `/merch/${slug}`,
    featured: document.featured ?? fallback?.featured ?? false,
    sortOrder: document.sortOrder ?? fallback?.sortOrder ?? 100,
  };
}

function sortMerchProducts(products: Merchandise[]): Merchandise[] {
  return [...products].sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }

    if (a.sortOrder !== b.sortOrder) {
      return a.sortOrder - b.sortOrder;
    }

    return a.title.localeCompare(b.title);
  });
}

export async function getMerchProducts(): Promise<Merchandise[]> {
  if (!sanityClient) {
    return sortMerchProducts(fallbackMerchandise);
  }

  try {
    const documents = await sanityClient.fetch<SanityMerchProductDocument[]>(
      merchProductsQuery,
      {},
      { next: { revalidate: 60 } },
    );

    const products = documents
      .map(normalizeMerchProduct)
      .filter((product): product is Merchandise => product !== null);

    return products.length > 0
      ? sortMerchProducts(products)
      : sortMerchProducts(fallbackMerchandise);
  } catch (error) {
    console.warn(
      "Sanity merch product fetch failed; falling back to local data.",
      error,
    );
    return sortMerchProducts(fallbackMerchandise);
  }
}
