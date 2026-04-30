import { groq } from "next-sanity";
import {
  siteSettings as fallbackSiteSettings,
  type SiteSettings,
} from "@/lib/data";
import { sanityClient } from "@/lib/sanity/client";

type SanitySiteSettingsDocument = Partial<SiteSettings>;

const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    businessName,
    tagline,
    serviceArea,
    contactEmail,
    phone,
    "logo": logo.asset->url,
    logoAlt,
    socialLinks
  }
`;

function normalizeSiteSettings(
  document: SanitySiteSettingsDocument | null,
): SiteSettings {
  return {
    businessName:
      document?.businessName ?? fallbackSiteSettings.businessName,
    tagline: document?.tagline ?? fallbackSiteSettings.tagline,
    serviceArea: document?.serviceArea ?? fallbackSiteSettings.serviceArea,
    contactEmail:
      document?.contactEmail ?? fallbackSiteSettings.contactEmail,
    phone: document?.phone ?? fallbackSiteSettings.phone,
    logo: document?.logo ?? fallbackSiteSettings.logo,
    logoAlt: document?.logoAlt ?? fallbackSiteSettings.logoAlt,
    socialLinks: Array.isArray(document?.socialLinks)
      ? document.socialLinks
      : fallbackSiteSettings.socialLinks,
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!sanityClient) {
    return fallbackSiteSettings;
  }

  try {
    const document =
      await sanityClient.fetch<SanitySiteSettingsDocument | null>(
        siteSettingsQuery,
        {},
        { next: { revalidate: 60 } },
      );

    return normalizeSiteSettings(document);
  } catch (error) {
    console.warn(
      "Sanity site settings fetch failed; falling back to local data.",
      error,
    );
    return fallbackSiteSettings;
  }
}
