interface SectionHeaderProps {
  label: string
  title: string
  description?: string
  light?: boolean
  center?: boolean
}

export default function SectionHeader({
  label,
  title,
  description,
  light = false,
  center = true,
}: SectionHeaderProps) {
  return (
    <div className={`mb-14 ${center ? "text-center" : ""}`}>
      <span className="section-label">{label}</span>
      <h2
        className={`font-heading font-black text-4xl md:text-5xl leading-tight tracking-tight mb-4 ${
          light ? "text-white" : "text-[var(--color-dark)]"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-lg max-w-2xl ${center ? "mx-auto" : ""} ${
            light ? "text-white/65" : "text-[var(--color-dark-muted)]"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
