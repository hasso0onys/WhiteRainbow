import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'إعدادات الموقع',
  type: 'document',
  fields: [
    defineField({
      name: 'projectName',
      title: 'اسم المشروع',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'يظهر في البار العلوي',
    }),
    defineField({
      name: 'contactButton',
      title: 'زر التواصل',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'نص الزر',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'link',
          title: 'الرابط',
          type: 'url',
          validation: (Rule) => Rule.required().uri({
            scheme: ['http', 'https', 'mailto', 'tel'],
          }),
        },
      ],
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
              type: 'url',
              validation: (Rule) => Rule.required().uri({
                scheme: ['http', 'https', 'mailto'],
              }),
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
    defineField({
      name: 'logo',
      title: 'الشعار',
      type: 'object',
      fields: [
        {
          name: 'image',
          title: 'صورة الشعار',
          type: 'image',
          options: {
            hotspot: true,
          },
          description: 'قم برفع صورة الشعار هنا',
        },
        {
          name: 'width',
          title: 'عرض الشعار',
          type: 'number',
          description: 'عرض الشعار بالبكسل (مثال: 150)',
          initialValue: 150,
          validation: (Rule) => Rule.min(20).max(500),
        },
        {
          name: 'height',
          title: 'ارتفاع الشعار',
          type: 'number',
          description: 'ارتفاع الشعار بالبكسل (مثال: 50)',
          initialValue: 50,
          validation: (Rule) => Rule.min(20).max(500),
        },
        {
          name: 'position',
          title: 'موضع الشعار',
          type: 'string',
          options: {
            list: [
              { title: 'أعلى اليسار', value: 'top-left' },
              { title: 'أعلى الوسط', value: 'top-center' },
              { title: 'أعلى اليمين', value: 'top-right' },
              { title: 'وسط اليسار', value: 'middle-left' },
              { title: 'في الوسط', value: 'middle-center' },
              { title: 'وسط اليمين', value: 'middle-right' },
              { title: 'أسفل اليسار', value: 'bottom-left' },
              { title: 'أسفل الوسط', value: 'bottom-center' },
              { title: 'أسفل اليمين', value: 'bottom-right' },
            ],
            layout: 'dropdown',
          },
          initialValue: 'top-left',
          description: 'اختر موضع ظهور الشعار في الصفحة',
        },
        {
          name: 'offsetX',
          title: 'الإزاحة الأفقية',
          type: 'number',
          description: 'إزاحة الشعار أفقياً بالبكسل (يمكن أن تكون سالبة)',
          initialValue: 20,
        },
        {
          name: 'offsetY',
          title: 'الإزاحة العمودية',
          type: 'number',
          description: 'إزاحة الشعار عمودياً بالبكسل (يمكن أن تكون سالبة)',
          initialValue: 20,
        },
        {
          name: 'opacity',
          title: 'الشفافية',
          type: 'number',
          description: 'شفافية الشعار (0 = شفاف تماماً، 1 = غير شفاف)',
          initialValue: 1,
          validation: (Rule) => Rule.min(0).max(1),
        },
        {
          name: 'zIndex',
          title: 'ترتيب الطبقة',
          type: 'number',
          description: 'ترتيب طبقة الشعار (رقم أكبر = يظهر فوق العناصر الأخرى)',
          initialValue: 1000,
          validation: (Rule) => Rule.min(0).max(9999),
        },
      ],
      description: 'إعدادات الشعار ومكان ظهوره',
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
