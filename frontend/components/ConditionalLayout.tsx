'use client'

import { usePathname } from 'next/navigation'
import TopBar from './TopBar'
import BottomBar from './BottomBar'
import { SiteSettings } from '@/lib/types'

interface ConditionalLayoutProps {
  settings: SiteSettings
  children: React.ReactNode
}

export default function ConditionalLayout({ settings, children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')

  if (isStudio) {
    return <>{children}</>
  }

  return (
    <>
      {/* Top Bar - Fixed */}
      <TopBar
        logo={settings.logo}
        projectName={settings.projectName}
        contactButton={settings.contactButton}
        bookingButton={settings.bookingButton}
        barColor={settings.barColor}
      />

      {/* Main Content Area - Between Bars */}
      <main
        className="relative w-full"
        style={{
          paddingTop: '80px', // Top bar height
        }}
      >
        {children}
      </main>

      {/* Bottom Bar - Fixed */}
      <BottomBar
        socialLinks={settings.socialLinks || []}
        barColor={settings.barColor}
      />
    </>
  )
}

