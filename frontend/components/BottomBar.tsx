'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Twitter, Facebook, Linkedin, Youtube, Mail } from 'lucide-react'

interface SocialLink {
  platform: string
  url: string
}

interface BottomBarProps {
  socialLinks: SocialLink[]
  barColor?: string
}

const socialIcons: Record<string, any> = {
  instagram: Instagram,
  twitter: Twitter,
  facebook: Facebook,
  linkedin: Linkedin,
  youtube: Youtube,
  email: Mail,
}

export default function BottomBar({ socialLinks, barColor = '#000000' }: BottomBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed bottom-0 left-0 right-0 z-50 h-16 flex items-center justify-center"
      style={{ backgroundColor: barColor }}
    >
      {/* Social Media Icons - Center */}
      <div className="flex items-center gap-6">
        {socialLinks?.map((link, index) => {
          const Icon = socialIcons[link.platform.toLowerCase()]

          if (!Icon) return null

          return (
            <motion.div
              key={link.platform}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors duration-300"
                aria-label={link.platform}
              >
                <Icon size={20} />
              </Link>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
