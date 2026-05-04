import { PHONE, PHONE_HREF, EMAIL, ADDRESS } from "@/lib/constants"
import SectionHeader from "@/components/ui/SectionHeader"

interface ContactSectionProps {
  mapsEmbed: string
}

export default function ContactSection({ mapsEmbed }: ContactSectionProps) {
  const contactItems = [
    {
      icon: "phone",
      label: "Telefon",
      value: PHONE,
      href: PHONE_HREF,
      hint: "Pon.–Sob. 8:00–18:00",
    },
    {
      icon: "mail",
      label: "Email",
      value: EMAIL,
      href: `mailto:${EMAIL}`,
      hint: "Odpowiadamy w ciągu 24h",
    },
    {
      icon: "pin",
      label: "Adres",
      value: ADDRESS,
      href: undefined,
      hint: "Wolne przejazdy możliwe",
    },
  ]

  return (
    <section className="bg-[var(--color-dark-bg)] py-24 md:py-32 relative overflow-hidden" id="kontakt">
      {/* Blur orb */}
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-15 pointer-events-none translate-x-1/3 translate-y-1/3"
        style={{
          background: "radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <SectionHeader
          label="Kontakt"
          title="Skontaktuj się z nami"
          description="Zadzwoń lub napisz – chętnie pomożemy dobrać idealne rozwiązanie szklane dla Twojego projektu."
          light
          center
        />

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {contactItems.map(({ icon, label, value, href, hint }) => (
            <div key={label} className="glass rounded-2xl p-6 flex flex-col gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(227,0,121,0.15)", border: "1px solid rgba(227,0,121,0.3)" }}
              >
                {icon === "phone" && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                )}
                {icon === "mail" && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                )}
                {icon === "pin" && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                )}
              </div>
              <div>
                <p className="font-heading font-semibold text-white/40 text-xs uppercase tracking-widest mb-1">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    className="font-heading font-bold text-white text-base hover:text-[var(--color-primary)] transition-colors block"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="font-heading font-bold text-white text-base">{value}</p>
                )}
                <p className="text-white/40 text-xs mt-1 font-body">{hint}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="rounded-2xl overflow-hidden" style={{ height: "380px" }}>
          <iframe
            src={mapsEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokalizacja Różycki Glass"
          />
        </div>
      </div>
    </section>
  )
}
