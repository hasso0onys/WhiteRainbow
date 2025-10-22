import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'bookingForm',
  title: 'طلبات الحجز',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'الاسم',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'البريد الإلكتروني',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'رقم الهاتف',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'التاريخ المفضل',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'الوقت المفضل',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'projectType',
      title: 'نوع المشروع',
      type: 'string',
      options: {
        list: [
          { title: 'حدث / فعالية', value: 'event' },
          { title: 'حفل زفاف', value: 'wedding' },
          { title: 'شركات', value: 'corporate' },
          { title: 'مبنى / عقار', value: 'building' },
          { title: 'أخرى', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'budget',
      title: 'الميزانية التقريبية',
      type: 'string',
      options: {
        list: [
          { title: 'أقل من 50,000 ريال', value: 'under-50k' },
          { title: '50,000 - 100,000 ريال', value: '50k-100k' },
          { title: '100,000 - 200,000 ريال', value: '100k-200k' },
          { title: 'أكثر من 200,000 ريال', value: 'over-200k' },
        ],
      },
    }),
    defineField({
      name: 'details',
      title: 'تفاصيل المشروع',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'الحالة',
      type: 'string',
      options: {
        list: [
          { title: '🆕 جديد', value: 'new' },
          { title: '📞 تم التواصل', value: 'contacted' },
          { title: '✅ مؤكد', value: 'confirmed' },
          { title: '❌ ملغي', value: 'cancelled' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'submittedAt',
      title: 'تاريخ الإرسال',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      email: 'email',
      date: 'date',
      status: 'status',
    },
    prepare(selection) {
      const { name, email, date, status } = selection
      const statusEmoji = {
        new: '🆕',
        contacted: '📞',
        confirmed: '✅',
        cancelled: '❌',
      }
      return {
        title: name,
        subtitle: `${email} - ${date} ${statusEmoji[status as keyof typeof statusEmoji] || ''}`,
      }
    },
  },
  orderings: [
    {
      title: 'الأحدث أولاً',
      name: 'newestFirst',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
})

