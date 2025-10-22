'use client'

import { motion } from 'framer-motion'

export default function ContactHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-5xl md:text-6xl font-light mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent"
      >
        تواصل معنا
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-xl text-gray-300"
      >
        نحن هنا للإجابة على جميع استفساراتك
      </motion.p>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-6"
      ></motion.div>
    </motion.div>
  )
}

