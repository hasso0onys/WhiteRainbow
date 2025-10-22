import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {customTheme} from './theme'
import './styles/studio.css'

export default defineConfig({
  name: 'default',
  title: 'Projection Portfolio',

  projectId: '37ji4wok',
  dataset: 'production',

  theme: customTheme,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('المحتوى')
          .items([
            // Settings - Singleton
            S.listItem()
              .title('إعدادات الموقع')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            // Projects
            S.listItem()
              .title('المشاريع')
              .child(
                S.documentTypeList('project')
                  .title('جميع المشاريع')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),
            S.divider(),
            // Booking Forms
            S.listItem()
              .title('📅 طلبات الحجز')
              .child(
                S.documentTypeList('bookingForm')
                  .title('جميع طلبات الحجز')
                  .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
              ),
            // Contact Forms
            S.listItem()
              .title('✉️ رسائل التواصل')
              .child(
                S.documentTypeList('contactForm')
                  .title('جميع رسائل التواصل')
                  .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
