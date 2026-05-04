import { PHONE, PHONE_HREF } from "@/lib/constants"

interface PhoneButtonProps {
  label?: string
  size?: "sm" | "md" | "lg"
  variant?: "primary" | "outline" | "ghost"
  className?: string
}

export default function PhoneButton({
  label = `Zadzwoń: ${PHONE}`,
  size = "md",
  variant = "primary",
  className = "",
}: PhoneButtonProps) {
  const sizeClasses = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-base",
    lg: "px-9 py-4 text-lg",
  }

  const variantClasses = {
    primary:
      "bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white",
    outline:
      "border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white",
    ghost:
      "bg-white/10 hover:bg-white/20 text-white border border-white/20",
  }

  return (
    <a
      href={PHONE_HREF}
      className={`inline-flex items-center gap-2.5 font-heading font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
      {label}
    </a>
  )
}
