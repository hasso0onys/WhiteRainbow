'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'
import { ContactInfo as ContactInfoType } from '@/lib/types'

interface ContactInfoProps {
  contactInfo: ContactInfoType
}

export default function ContactInfo({ contactInfo }: ContactInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-8"
    >
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-white to-transparent"></div>
          <h2 className="text-3xl font-light text-white">معلومات التواصل</h2>
        </div>
        <p className="text-gray-300 mb-8 leading-relaxed">
          تواصل معنا مباشرة عبر أي من الطرق التالية، أو املأ النموذج وسنرد عليك في أقرب وقت.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="space-y-6">
        <motion.div
          whileHover={{ x: 5, transition: { duration: 0.2 } }}
          className="group relative flex items-start gap-4 p-6 border border-gray-700/50 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm hover:border-white/30 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex-shrink-0">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div className="relative z-10">
            <h3 className="text-lg font-medium mb-2 text-white">البريد الإلكتروني</h3>
            <a href={`mailto:${contactInfo.email || 'info@example.com'}`} className="text-gray-300 hover:text-white transition-colors">
              {contactInfo.email || 'info@example.com'}
            </a>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ x: 5, transition: { duration: 0.2 } }}
          className="group relative flex items-start gap-4 p-6 border border-gray-700/50 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm hover:border-white/30 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex-shrink-0">
            <Phone className="w-6 h-6 text-white" />
          </div>
          <div className="relative z-10">
            <h3 className="text-lg font-medium mb-2 text-white">الهاتف</h3>
            <a href={`tel:${contactInfo.phone || '+966501234567'}`} className="text-gray-300 hover:text-white transition-colors" dir="ltr">
              {contactInfo.phone || '+966 50 123 4567'}
            </a>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ x: 5, transition: { duration: 0.2 } }}
          className="group relative flex items-start gap-4 p-6 border border-gray-700/50 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm hover:border-white/30 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex-shrink-0">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div className="relative z-10">
            <h3 className="text-lg font-medium mb-2 text-white">الموقع</h3>
            <p className="text-gray-300">
              {contactInfo.location || 'الرياض، المملكة العربية السعودية'}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

