'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function BackButton() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-28 right-8 z-40"
    >
      <Link
        href="/"
        className="group relative flex items-center gap-2 px-6 py-3 border border-white/30 text-white hover:border-white/50 backdrop-blur-md bg-black/20 hover:bg-black/40 transition-all duration-300 text-sm overflow-hidden"
      >
        <span className="absolute inset-0 bg-gradient-to-l from-white/10 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
        <span className="relative font-medium">العودة للرئيسية</span>
        <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform duration-300" />
      </Link>
    </motion.div>
  )
}
