import { defineType, defineField } from 'sanity'
import { CloudinaryVideoInput } from '../components/CloudinaryVideoInput'

export default defineType({
  name: 'project',
  title: 'المشاريع',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'عنوان المشروع',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'الرابط',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'الترتيب',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
      description: 'ترتيب عرض المشروع في الصفحة',
    }),
    defineField({
      name: 'layoutType',
      title: 'نوع التخطيط',
      type: 'string',
      options: {
        list: [
          { title: 'شاشة كاملة (1x1)', value: 'fullscreen' },
          { title: 'مقسم (2x1)', value: 'split' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'leftContent',
      title: 'المحتوى الأيسر',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'نوع المحتوى',
          type: 'string',
          options: {
            list: [
              { title: 'صورة', value: 'image' },
              { title: 'فيديو', value: 'video' },
              { title: 'نص', value: 'text' },
            ],
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'image',
          title: 'الصورة',
          type: 'image',
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
          hidden: ({ parent }) => parent?.type !== 'image',
        },
        {
          name: 'cloudinaryVideo',
          title: 'فيديو Cloudinary',
          type: 'string',
          description: 'ارفع الفيديو مباشرة إلى Cloudinary',
          components: {
            input: CloudinaryVideoInput,
          },
          hidden: ({ parent }) => parent?.type !== 'video',
        },
        {
          name: 'text',
          title: 'النص',
          type: 'text',
          rows: 5,
          hidden: ({ parent }) => parent?.type !== 'text',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rightContent',
      title: 'المحتوى الأيمن',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'نوع المحتوى',
          type: 'string',
          options: {
            list: [
              { title: 'صورة', value: 'image' },
              { title: 'فيديو', value: 'video' },
              { title: 'نص', value: 'text' },
            ],
          },
        },
        {
          name: 'image',
          title: 'الصورة',
          type: 'image',
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
          hidden: ({ parent }) => parent?.type !== 'image',
        },
        {
          name: 'cloudinaryVideo',
          title: 'فيديو Cloudinary',
          type: 'string',
          description: 'ارفع الفيديو مباشرة إلى Cloudinary',
          components: {
            input: CloudinaryVideoInput,
          },
          hidden: ({ parent }) => parent?.type !== 'video',
        },
        {
          name: 'text',
          title: 'النص',
          type: 'text',
          rows: 5,
          hidden: ({ parent }) => parent?.type !== 'text',
        },
      ],
      hidden: ({ document }) => document?.layoutType !== 'split',
      description: 'يظهر فقط في التخطيط المقسم (2x1)',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'لون الخلفية',
      type: 'string',
      description: 'مثال: #000000 أو #1a1a1a',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
      layoutType: 'layoutType',
    },
    prepare(selection) {
      const { title, order, layoutType } = selection
      return {
        title: title,
        subtitle: `الترتيب: ${order} - ${layoutType === 'fullscreen' ? 'شاشة كاملة' : 'مقسم'}`,
      }
    },
  },
  orderings: [
    {
      title: 'الترتيب، تصاعدي',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
