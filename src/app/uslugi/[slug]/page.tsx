import type { Metadata } from "next"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ServiceDetail from "@/components/services/ServiceDetail"
import { getAllServices, getService } from "@/lib/content"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const services = getAllServices()
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  return {
    title: service.seo_title,
    description: service.seo_description,
    openGraph: {
      images: [{ url: service.image }],
    },
    alternates: {
      canonical: `https://rozyckiglass.pl/uslugi/${slug}/`,
    },
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getService(slug)
  const allServices = getAllServices()
  const related = allServices.filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <>
      <Navbar />
      <main>
        <ServiceDetail service={service} related={related} />
      </main>
      <Footer />
    </>
  )
}
