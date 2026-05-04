import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import HeroSection from "@/components/home/HeroSection"
import ServicesGrid from "@/components/home/ServicesGrid"
import GallerySection from "@/components/home/GallerySection"
import ContactSection from "@/components/home/ContactSection"
import { getAllServices, getGalleryData, getSettings } from "@/lib/content"

export default function HomePage() {
  const services = getAllServices()
  const { images } = getGalleryData()
  const settings = getSettings()

  return (
    <>
      <Navbar />
      <main>
        <HeroSection
          title={settings.hero_title}
          subtitle={settings.hero_subtitle}
          heroImage={settings.hero_image}
        />
        <ServicesGrid services={services} />
        <GallerySection images={images} />
        <ContactSection mapsEmbed={settings.maps_embed} />
      </main>
      <Footer />
    </>
  )
}
