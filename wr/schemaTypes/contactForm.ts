import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactForm',
  title: 'رسائل التواصل',
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
    }),
    defineField({
      name: 'subject',
      title: 'الموضوع',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'الرسالة',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'الحالة',
      type: 'string',
      options: {
        list: [
          { title: '🆕 جديدة', value: 'new' },
          { title: '👀 تمت القراءة', value: 'read' },
          { title: '✅ تم الرد', value: 'replied' },
          { title: '🗑️ محذوفة', value: 'archived' },
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
      subject: 'subject',
      status: 'status',
    },
    prepare(selection) {
      const { name, subject, status } = selection
      const statusEmoji = {
        new: '🆕',
        read: '👀',
        replied: '✅',
        archived: '🗑️',
      }
      return {
        title: `${statusEmoji[status as keyof typeof statusEmoji] || ''} ${name}`,
        subtitle: subject,
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

