import { defineType, defineField } from 'sanity'
import OverlayTextInput from '../components/OverlayTextInput'
import ContentBoxInput from '../components/ContentBoxInput'
import { CloudinaryVideoInput } from '../components/CloudinaryVideoInput'

export default defineType({
  name: 'project',
  title: 'المشاريع',
  type: 'document',
  fieldsets: [
    {
      name: 'basicInfo',
      title: '1️⃣ المعلومات الأساسية',
      options: { collapsible: false }
    },
    {
      name: 'layoutSection',
      title: '2️⃣ نوع التخطيط',
      options: { collapsible: false }
    },
    {
      name: 'contentSection',
      title: '3️⃣ المحتوى',
      options: { collapsible: false }
    },
    {
      name: 'styling',
      title: '4️⃣ التنسيق',
      options: { collapsible: false }
    }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'عنوان المشروع',
      type: 'string',
      fieldset: 'basicInfo',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'الرابط',
      type: 'slug',
      fieldset: 'basicInfo',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    // Hidden rank field used by @sanity/orderable-document-list
    defineField({
      name: 'orderRank',
      title: 'ترتيب داخلي',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'layoutType',
      title: 'اختر نوع التخطيط',
      type: 'string',
      fieldset: 'layoutSection',
      options: {
        list: [
          { title: '🖥️ شاشة كاملة (1×1)', value: 'fullscreen' },
          { title: '⬜️⬜️ مقسم (2×1)', value: 'split' },
        ],
        layout: 'radio',
        direction: 'horizontal'
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'leftContent',
      title: 'المحتوى',
      description: 'اضغط لاختيار نوع المحتوى',
      type: 'object',
      fieldset: 'contentSection',
      components: {
        input: ContentBoxInput
      },
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
          description: 'ارفع الفيديو مباشرة أو الصق الرابط',
          hidden: ({ parent }) => parent?.type !== 'video',
          components: {
            input: CloudinaryVideoInput,
          },
        },
        {
          name: 'text',
          title: 'النص',
          type: 'string',
          hidden: ({ parent }) => parent?.type !== 'text',
          components: {
            input: OverlayTextInput,
          },
        },
        {
          name: 'overlayText',
          title: 'نص فوق الميديا',
          type: 'string',
          hidden: ({ parent }) => parent?.type === 'text',
          components: {
            input: OverlayTextInput,
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rightContent',
      title: 'المحتوى الأيمن',
      description: 'يظهر فقط في التخطيط المقسم (2x1) - اضغط لاختيار نوع المحتوى',
      type: 'object',
      fieldset: 'contentSection',
      components: {
        input: ContentBoxInput
      },
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
          description: 'ارفع الفيديو مباشرة أو الصق الرابط',
          hidden: ({ parent }) => parent?.type !== 'video',
          components: {
            input: CloudinaryVideoInput,
          },
        },
        {
          name: 'text',
          title: 'النص',
          type: 'string',
          hidden: ({ parent }) => parent?.type !== 'text',
          components: {
            input: OverlayTextInput,
          },
        },
        {
          name: 'overlayText',
          title: 'نص فوق الميديا',
          type: 'string',
          hidden: ({ parent }) => parent?.type === 'text',
          components: {
            input: OverlayTextInput,
          },
        },
      ],
      hidden: ({ document }) => document?.layoutType !== 'split',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'لون الخلفية',
      type: 'string',
      fieldset: 'styling',
      description: 'مثال: #000000 أو #1a1a1a',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      orderRank: 'orderRank',
      layoutType: 'layoutType',
    },
    prepare(selection) {
      const { title, orderRank, layoutType } = selection as any
      return {
        title: title,
        subtitle: `${layoutType === 'fullscreen' ? 'شاشة كاملة' : 'مقسم'}`,
      }
    },
  },
  orderings: [],
})
