interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  center?: boolean
  light?: boolean
}

export function SectionHeading({ eyebrow, title, subtitle, center = false, light = false }: SectionHeadingProps) {
  return (
    <div className={`mb-12 lg:mb-16 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <p className={`section-eyebrow ${center ? 'justify-center' : ''}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`section-title font-display text-3xl sm:text-4xl md:text-[2.75rem] ${
        light ? 'text-white' : 'text-text-primary'
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`section-subtitle ${center ? 'mx-auto text-center' : ''} ${
          light ? 'text-white/70' : 'text-text-secondary'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
