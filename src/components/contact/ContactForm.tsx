"use client"

import { useState, useRef } from "react"

type FormStatus = "idle" | "sending" | "success" | "error"

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          ...formData,
        }),
      })

      if (response.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const resetForm = () => {
    setStatus("idle")
  }

  const inputBase =
    "w-full bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-3.5 text-white text-sm font-body placeholder:text-white/30 focus:outline-none focus:border-[var(--color-primary)]/50 focus:bg-white/[0.08] focus:ring-1 focus:ring-[var(--color-primary)]/20 transition-all duration-300"

  /* ── Success state ── */
  if (status === "success") {
    return (
      <div className="glass rounded-2xl p-8 md:p-12 flex flex-col items-center text-center">
        {/* Animated check */}
        <div className="relative w-20 h-20 mb-6">
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
          <div className="relative w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
        </div>
        <h3 className="font-heading font-black text-white text-2xl mb-2">
          Wiadomość wysłana!
        </h3>
        <p className="text-white/50 text-sm font-body max-w-sm mb-6">
          Dziękujemy za kontakt. Odpowiemy najszybciej jak to możliwe — zwykle
          w ciągu 24 godzin.
        </p>
        <button
          onClick={resetForm}
          className="inline-flex items-center gap-2 font-heading font-semibold text-sm text-[var(--color-primary)] hover:text-white transition-colors"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          Wyślij kolejną wiadomość
        </button>
      </div>
    )
  }

  /* ── Error state ── */
  if (status === "error") {
    return (
      <div className="glass rounded-2xl p-8 md:p-12 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center mb-6">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M15 9l-6 6M9 9l6 6" />
          </svg>
        </div>
        <h3 className="font-heading font-black text-white text-2xl mb-2">
          Coś poszło nie tak
        </h3>
        <p className="text-white/50 text-sm font-body max-w-sm mb-6">
          Nie udało się wysłać wiadomości. Spróbuj ponownie lub skontaktuj się
          telefonicznie.
        </p>
        <button
          onClick={resetForm}
          className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-heading font-semibold rounded-full px-6 py-3 text-sm transition-all duration-200"
        >
          Spróbuj ponownie
        </button>
      </div>
    )
  }

  /* ── Form ── */
  return (
    <form
      ref={formRef}
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="glass rounded-2xl p-6 md:p-10"
    >
      {/* Netlify hidden fields */}
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Nie wypełniaj: <input name="bot-field" />
        </label>
      </p>

      {/* Header */}
      <div className="mb-8">
        <h3 className="font-heading font-black text-white text-xl md:text-2xl mb-2">
          Napisz do nas
        </h3>
        <p className="text-white/40 text-sm font-body">
          Opisz swój projekt — odpowiemy z wyceną i szczegółami.
        </p>
      </div>

      <div className="space-y-4">
        {/* Name + Email row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="contact-name"
              className="block font-heading font-semibold text-white/50 text-[11px] uppercase tracking-[0.15em] mb-2"
            >
              Imię i nazwisko *
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Jan Kowalski"
              className={inputBase}
            />
          </div>
          <div>
            <label
              htmlFor="contact-email"
              className="block font-heading font-semibold text-white/50 text-[11px] uppercase tracking-[0.15em] mb-2"
            >
              Email *
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="jan@example.com"
              className={inputBase}
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="contact-phone"
            className="block font-heading font-semibold text-white/50 text-[11px] uppercase tracking-[0.15em] mb-2"
          >
            Telefon{" "}
            <span className="text-white/25 normal-case tracking-normal">
              (opcjonalnie)
            </span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="600 000 000"
            className={inputBase}
          />
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="contact-message"
            className="block font-heading font-semibold text-white/50 text-[11px] uppercase tracking-[0.15em] mb-2"
          >
            Wiadomość *
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Opisz czego potrzebujesz — rodzaj szkła, wymiary, termin..."
            className={`${inputBase} resize-none`}
          />
        </div>
      </div>

      {/* Submit */}
      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group relative inline-flex items-center gap-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-60 disabled:cursor-not-allowed text-white font-heading font-bold rounded-full px-8 py-3.5 text-sm uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(227,0,121,0.35)]"
        >
          {status === "sending" ? (
            <>
              <svg
                className="animate-spin w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="60"
                  strokeDashoffset="20"
                  strokeLinecap="round"
                />
              </svg>
              <span>Wysyłanie...</span>
            </>
          ) : (
            <>
              <span>Wyślij wiadomość</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-1 transition-transform duration-300"
                aria-hidden="true"
              >
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
              </svg>
            </>
          )}
        </button>
        <p className="text-white/20 text-xs font-body">
          * Pola wymagane. Odpowiadamy w ciągu 24h.
        </p>
      </div>
    </form>
  )
}
