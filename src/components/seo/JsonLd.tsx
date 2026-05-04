import type { Service } from "@/lib/types"
import { SITE_URL } from "@/lib/constants"

export function ServiceJsonLd({ service }: { service: Service }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.full_description,
    provider: {
      "@type": "LocalBusiness",
      name: "RÓŻYCKI GLASS",
      url: SITE_URL,
    },
    image: `${SITE_URL}${service.image}`,
    url: `${SITE_URL}/uslugi/${service.slug}/`,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Podkarpacie",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
