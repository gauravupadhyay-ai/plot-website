import { PageHero } from '@/components/layout/PageHero'

/** Same hero as /services and other marketing pages. */
export function PropertiesPageHero() {
  return (
    <PageHero
      title="Residential Plots"
      subtitle="Choose from our premium plots and build the home you've always dreamed of."
      image="/images/hero/hero-plots.jpg"
      breadcrumb={[{ label: 'Plots' }]}
      imageClassName="object-cover object-[center_80%] md:object-[center_85%]"
    />
  )
}
