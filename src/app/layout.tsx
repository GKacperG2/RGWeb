import type { Metadata } from "next"
import { DM_Sans, Overpass } from "next/font/google"
import "./globals.css"
import { SITE_URL, SITE_NAME } from "@/lib/constants"

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
})

const overpass = Overpass({
  variable: "--font-overpass",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "600"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} – Szklarz Leżajsk | Kabiny, Balustrady, Drzwi szklane`,
    template: `%s | ${SITE_NAME} Leżajsk`,
  },
  description:
    "Zakład szklarski w Leżajsku od 1980 roku. Kabiny prysznicowe na wymiar, drzwi szklane, balustrady, panele Lacobel, fototapety w szkle. Tel: 604 595 378.",
  keywords: [
    "szklarz Leżajsk",
    "kabiny prysznicowe Leżajsk",
    "balustrady szklane Podkarpacie",
    "drzwi szklane",
    "Różycki Glass",
    "szklarz Podkarpacie",
    "szkło na wymiar",
  ],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: SITE_NAME,
    images: [{ url: "/images/hero.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
  verification: {},
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "RÓŻYCKI GLASS",
  telephone: "+48604595378",
  email: "rozyckiglass@gmail.com",
  foundingDate: "1980",
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Stare Miasto 515",
    addressLocality: "Leżajsk",
    postalCode: "37-300",
    addressCountry: "PL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.2795661,
    longitude: 22.4230491,
  },
  sameAs: ["https://www.facebook.com/SzklarzLezajsk"],
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Podkarpacie",
  },
  priceRange: "$$",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pl"
      className={`${dmSans.variable} ${overpass.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  )
}
