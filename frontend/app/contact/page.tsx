import BackButton from '@/components/BackButton'
import { client } from '@/lib/sanity'
import { SiteSettings } from '@/lib/types'
import ContactForm from './ContactForm'
import ContactInfo from './ContactInfo'
import ContactHeader from './ContactHeader'

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  contactInfo
}`

async function getSettings(): Promise<SiteSettings> {
  try {
    const settings = await client.fetch(
      SITE_SETTINGS_QUERY, 
      {}, 
      {
        next: { revalidate: 60 }
      }
    )
    return settings || { _id: 'default', socialLinks: [] }
  } catch (error) {
    console.error('Error fetching settings:', error)
    return { _id: 'default', socialLinks: [] }
  }
}

export default async function ContactPage() {
  const settings = await getSettings()
  const contactInfo = settings.contactInfo || {}

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-24 px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none"></div>

      <div className="relative z-10">
        <BackButton />
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <ContactHeader />

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <ContactInfo contactInfo={contactInfo} />

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
