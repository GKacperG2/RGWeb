import Link from "next/link"
import Image from "next/image"
import { getAllServices } from "@/lib/content"
import { PHONE, PHONE_HREF, EMAIL, ADDRESS, FACEBOOK } from "@/lib/constants"

export default function Footer() {
  const services = getAllServices()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[var(--color-dark-bg)] text-white/70 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/images/logo.png"
                alt="Różycki Glass"
                width={44}
                height={44}
                className="w-11 h-11 object-contain opacity-90"
                unoptimized
              />
              <span className="font-heading font-black text-white text-sm uppercase tracking-widest">
                Różycki Glass
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Profesjonalny zakład szklarski z Leżajska. Ponad 40 lat doświadczenia.
              Realizujemy zamówienia na terenie całego Podkarpacia.
            </p>
            <div className="flex gap-3">
              <a
                href={FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                  <path d="M31.997 15.999c0-8.836-7.163-15.999-15.999-15.999s-15.999 7.163-15.999 15.999c0 7.985 5.851 14.604 13.499 15.804v-11.18h-4.062v-4.625h4.062v-3.525c0-4.010 2.389-6.225 6.043-6.225 1.75 0 3.581 0.313 3.581 0.313v3.937h-2.017c-1.987 0-2.607 1.233-2.607 2.498v3.001h4.437l-0.709 4.625h-3.728v11.18c7.649-1.2 13.499-7.819 13.499-15.804z" />
                </svg>
              </a>
              <a
                href={`mailto:${EMAIL}`}
                aria-label="Email"
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-widest mb-5">
              Usługi
            </h4>
            <ul className="space-y-2.5">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/uslugi/${s.slug}/`}
                    className="text-sm hover:text-white hover:text-[var(--color-primary)] transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-widest mb-5">
              Kontakt
            </h4>
            <div className="space-y-3">
              {[
                { icon: "phone", label: PHONE, href: PHONE_HREF },
                { icon: "mail", label: EMAIL, href: `mailto:${EMAIL}` },
                { icon: "pin", label: ADDRESS, href: undefined },
              ].map(({ icon, label, href }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg glass flex items-center justify-center shrink-0 mt-0.5">
                    {icon === "phone" && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                      </svg>
                    )}
                    {icon === "mail" && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    )}
                    {icon === "pin" && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    )}
                  </div>
                  {href ? (
                    <a href={href} className="text-sm leading-relaxed hover:text-white transition-colors">
                      {label}
                    </a>
                  ) : (
                    <span className="text-sm leading-relaxed">{label}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <span>© {year} RÓŻYCKI GLASS Grzegorz Różycki | NIP: 8161437723</span>
          <div className="flex gap-4 text-white/40">
            <Link href="/" className="hover:text-white/70 transition-colors">Strona główna</Link>
            <Link href="/uslugi/" className="hover:text-white/70 transition-colors">Usługi</Link>
            <Link href="/kontakt/" className="hover:text-white/70 transition-colors">Kontakt</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
