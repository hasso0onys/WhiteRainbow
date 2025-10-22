'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import BackButton from '@/components/BackButton'

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    projectType: '',
    budget: '',
    details: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const response = await fetch('/api/booking', {
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
          date: '',
          time: '',
          projectType: '',
          budget: '',
          details: ''
        })
        alert('✅ شكراً! تم استلام طلب الحجز بنجاح. تحقق من بريدك الإلكتروني وسنتواصل معك قريباً!')
      } else {
        setSubmitStatus('error')
        alert('❌ حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.')
      }
    } catch (error) {
      console.error('Submit error:', error)
      setSubmitStatus('error')
      alert('❌ حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        <div className="max-w-4xl mx-auto">
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
              احجز موعد
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-300"
            >
              دعنا نحول رؤيتك إلى واقع مبهر
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-6"
            ></motion.div>
          </motion.div>

          {/* Process Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-16"
          >
            {[
              { icon: Calendar, title: 'اختر الموعد', desc: 'حدد التاريخ والوقت المناسب' },
              { icon: MessageSquare, title: 'شارك التفاصيل', desc: 'أخبرنا عن مشروعك' },
              { icon: CheckCircle, title: 'تأكيد الحجز', desc: 'سنتواصل معك للتأكيد' }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="group relative text-center p-8 border border-gray-700/50 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-medium mb-3 text-white">{step.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{step.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>
            ))}
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative border border-gray-700/50 bg-gradient-to-br from-gray-900/30 to-black/50 backdrop-blur-sm p-10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-gradient-to-b from-white to-transparent"></div>
                    <h2 className="text-3xl font-light text-white">معلومات التواصل</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label htmlFor="name" className="block text-sm font-medium mb-3 flex items-center gap-2 text-gray-300 group-focus-within:text-white transition-colors">
                        <User className="w-4 h-4" />
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
                      <label htmlFor="email" className="block text-sm font-medium mb-3 flex items-center gap-2 text-gray-300 group-focus-within:text-white transition-colors">
                        <Mail className="w-4 h-4" />
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
                  </div>

                  <div className="group">
                    <label htmlFor="phone" className="block text-sm font-medium mb-3 flex items-center gap-2 text-gray-300 group-focus-within:text-white transition-colors">
                      <Phone className="w-4 h-4" />
                      رقم الهاتف *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-black/50 border border-gray-700/50 focus:border-white/50 outline-none transition-all duration-300 text-white placeholder-gray-500 backdrop-blur-sm hover:bg-black/70"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Booking Details */}
                <div className="space-y-6 pt-8 border-t border-gray-700/30">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-gradient-to-b from-white to-transparent"></div>
                    <h2 className="text-3xl font-light text-white">تفاصيل الحجز</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label htmlFor="date" className="block text-sm font-medium mb-3 flex items-center gap-2 text-gray-300 group-focus-within:text-white transition-colors">
                        <Calendar className="w-4 h-4" />
                        التاريخ المفضل *
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-black/50 border border-gray-700/50 focus:border-white/50 outline-none transition-all duration-300 text-white placeholder-gray-500 backdrop-blur-sm hover:bg-black/70"
                        dir="ltr"
                      />
                    </div>

                    <div className="group">
                      <label htmlFor="time" className="block text-sm font-medium mb-3 flex items-center gap-2 text-gray-300 group-focus-within:text-white transition-colors">
                        <Clock className="w-4 h-4" />
                        الوقت المفضل *
                      </label>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        required
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-black/50 border border-gray-700/50 focus:border-white/50 outline-none transition-all duration-300 text-white placeholder-gray-500 backdrop-blur-sm hover:bg-black/70"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label htmlFor="projectType" className="block text-sm font-medium mb-3 text-gray-300 group-focus-within:text-white transition-colors">
                        نوع المشروع *
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        required
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-black/50 border border-gray-700/50 focus:border-white/50 outline-none transition-all duration-300 text-white backdrop-blur-sm hover:bg-black/70"
                      >
                        <option value="">اختر نوع المشروع</option>
                        <option value="event">حدث / فعالية</option>
                        <option value="wedding">حفل زفاف</option>
                        <option value="corporate">شركات</option>
                        <option value="building">مبنى / عقار</option>
                        <option value="other">أخرى</option>
                      </select>
                    </div>

                    <div className="group">
                      <label htmlFor="budget" className="block text-sm font-medium mb-3 text-gray-300 group-focus-within:text-white transition-colors">
                        الميزانية التقريبية
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-black/50 border border-gray-700/50 focus:border-white/50 outline-none transition-all duration-300 text-white backdrop-blur-sm hover:bg-black/70"
                      >
                        <option value="">اختر الميزانية</option>
                        <option value="under-50k">أقل من 50,000 ريال</option>
                        <option value="50k-100k">50,000 - 100,000 ريال</option>
                        <option value="100k-200k">100,000 - 200,000 ريال</option>
                        <option value="over-200k">أكثر من 200,000 ريال</option>
                      </select>
                    </div>
                  </div>

                  <div className="group">
                    <label htmlFor="details" className="block text-sm font-medium mb-3 text-gray-300 group-focus-within:text-white transition-colors">
                      تفاصيل المشروع *
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      required
                      rows={5}
                      value={formData.details}
                      onChange={handleChange}
                      placeholder="أخبرنا عن رؤيتك للمشروع، الموقع، عدد الحضور، أي تفاصيل أخرى..."
                      className="w-full px-5 py-4 bg-black/50 border border-gray-700/50 focus:border-white/50 outline-none transition-all duration-300 text-white placeholder-gray-500 backdrop-blur-sm hover:bg-black/70 resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={!isSubmitting ? { scale: 1.01, y: -2 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.99 } : {}}
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full px-8 py-5 bg-white text-black font-bold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden mt-10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></span>
                  {isSubmitting ? (
                    <>
                      <div className="relative z-10 w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span className="relative z-10 tracking-wide">جاري الإرسال...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                      <span className="relative z-10 tracking-wide">تأكيد الحجز</span>
                    </>
                  )}
                  <span className="absolute inset-0 border-2 border-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </motion.button>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-sm text-gray-400 text-center flex items-center justify-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  <span>سنتواصل معك خلال 24 ساعة لتأكيد الموعد ومناقشة التفاصيل</span>
                </motion.p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
