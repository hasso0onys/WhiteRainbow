'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '@/lib/sanity'
import { LogoSettings } from '@/lib/types'
import { normalizeLogo } from '@/lib/logoHelpers'
import { Mail, Calendar } from 'lucide-react'

interface TopBarProps {
  logo?: any // Can be old or new format
  projectName?: string
  contactButton?: string
  bookingButton?: string
  barColor?: string
}

export default function TopBar({
  logo,
  projectName,
  contactButton = 'تواصل معنا',
  bookingButton = 'احجز الآن',
  barColor = '#000000'
}: TopBarProps) {
  const normalizedLogo = normalizeLogo(logo)

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{
        background: `linear-gradient(to bottom, ${barColor}ee, ${barColor}dd)`,
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Buttons - Left for RTL */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Contact Button */}
            <Link
              href="/contact"
              className="group relative px-6 py-2.5 overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/10 to-white/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
              <span className="relative flex items-center gap-2 text-white font-medium text-sm tracking-wide">
                <Mail className="w-4 h-4" />
                {contactButton}
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>

            {/* Booking Button */}
            <Link
              href="/booking"
              className="group relative px-6 py-2.5 overflow-hidden bg-white rounded-sm"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-100 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              <span className="relative flex items-center gap-2 text-black font-bold text-sm tracking-wide">
                <Calendar className="w-4 h-4" />
                {bookingButton}
              </span>
              <span className="absolute inset-0 rounded-sm border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </motion.div>

          {/* Logo or Project Name - Right for RTL */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {normalizedLogo?.image?.asset ? (
              <Link href="/" className="relative h-16 w-auto group cursor-pointer">
                <div className="absolute inset-0 bg-white/5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-110"></div>
                <Image
                  src={urlFor(normalizedLogo.image).height(64).url()}
                  alt={normalizedLogo.image.alt || 'Logo'}
                  height={64}
                  width={180}
                  className="relative object-contain h-16 w-auto filter drop-shadow-lg"
                  priority
                />
              </Link>
            ) : projectName ? (
              <Link
                href="/"
                className="group cursor-pointer"
              >
                <h1 className="text-white text-2xl lg:text-3xl font-light tracking-widest relative">
                  {projectName}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-white to-transparent group-hover:w-full transition-all duration-500"></span>
                </h1>
              </Link>
            ) : null}
          </motion.div>
        </div>
      </div>

      {/* Subtle gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </motion.nav>
  )
}
