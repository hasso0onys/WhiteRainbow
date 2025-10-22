import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'إعدادات الموقع',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'الشعار',
      type: 'image',
      description: 'شعار المشروع - يظهر في البار العلوي (اختياري)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'النص البديل',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'projectName',
      title: 'اسم المشروع',
      type: 'string',
      description: 'يظهر في البار العلوي (إذا لم يكن هناك شعار)',
    }),
    defineField({
      name: 'contactButton',
      title: 'نص زر التواصل',
      type: 'string',
      description: 'النص الذي يظهر في زر التواصل (مثال: تواصل معنا)',
      initialValue: 'تواصل معنا',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bookingButton',
      title: 'نص زر الحجز',
      type: 'string',
      description: 'النص الذي يظهر في زر الحجز (مثال: احجز الآن)',
      initialValue: 'احجز الآن',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'روابط وسائل التواصل',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'المنصة',
              type: 'string',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Email', value: 'email' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'الرابط',
              type: 'string',
              description: 'مثال: https://instagram.com/username',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              platform: 'platform',
              url: 'url',
            },
            prepare({ platform, url }) {
              return {
                title: platform,
                subtitle: url,
              }
            },
          },
        },
      ],
      description: 'تظهر في البار السفلي',
    }),
    defineField({
      name: 'barColor',
      title: 'لون البارات',
      type: 'string',
      description: 'لون البارات العلوية والسفلية (مثال: #000000)',
      initialValue: '#000000',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'إعدادات الموقع',
      }
    },
  },
})
