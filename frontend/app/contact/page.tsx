'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { useState } from 'react'
import BackButton from '@/components/BackButton'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
        alert('✅ شكراً لتواصلك معنا! تم إرسال رسالتك بنجاح. تحقق من بريدك الإلكتروني وسنرد عليك قريباً!')
      } else {
        setSubmitStatus('error')
        alert('❌ حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.')
      }
    } catch (error) {
      console.error('Submit error:', error)
      setSubmitStatus('error')
      alert('❌ حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-24 px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none"></div>

      <div className="relative z-10">
        <BackButton />
        <div className="max-w-6xl mx-auto">
          {/* Header */}
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

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
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
                    <a href="mailto:info@example.com" className="text-gray-300 hover:text-white transition-colors">
                      info@example.com
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
                    <a href="tel:+966501234567" className="text-gray-300 hover:text-white transition-colors" dir="ltr">
                      +966 50 123 4567
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
                      الرياض، المملكة العربية السعودية
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative border border-gray-700/50 bg-gradient-to-br from-gray-900/30 to-black/50 backdrop-blur-sm p-10 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>

              <div className="relative z-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-medium mb-3 text-gray-300 group-focus-within:text-white transition-colors">
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-black/50 border border-gray-700/50 focus:border-white/50 outline-none transition-all duration-300 text-white placeholder-gray-500 backdrop-blur-sm hover:bg-black/70"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-medium mb-3 text-gray-300 group-focus-within:text-white transition-colors">
                      البريد الإلكتروني *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-black/50 border border-gray-700/50 focus:border-white/50 outline-none transition-all duration-300 text-white placeholder-gray-500 backdrop-blur-sm hover:bg-black/70"
                      dir="ltr"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="phone" className="block text-sm font-medium mb-3 text-gray-300 group-focus-within:text-white transition-colors">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-black/50 border border-gray-700/50 focus:border-white/50 outline-none transition-all duration-300 text-white placeholder-gray-500 backdrop-blur-sm hover:bg-black/70"
                      dir="ltr"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="subject" className="block text-sm font-medium mb-3 text-gray-300 group-focus-within:text-white transition-colors">
                      الموضوع *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-black/50 border border-gray-700/50 focus:border-white/50 outline-none transition-all duration-300 text-white placeholder-gray-500 backdrop-blur-sm hover:bg-black/70"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="message" className="block text-sm font-medium mb-3 text-gray-300 group-focus-within:text-white transition-colors">
                      الرسالة *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-black/50 border border-gray-700/50 focus:border-white/50 outline-none transition-all duration-300 text-white placeholder-gray-500 backdrop-blur-sm hover:bg-black/70 resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={!isSubmitting ? { scale: 1.01, y: -2 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.99 } : {}}
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full px-8 py-5 bg-white text-black font-bold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></span>
                    {isSubmitting ? (
                      <>
                        <div className="relative z-10 w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span className="relative z-10 tracking-wide">جاري الإرسال...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                        <span className="relative z-10 tracking-wide">إرسال الرسالة</span>
                      </>
                    )}
                    <span className="absolute inset-0 border-2 border-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
