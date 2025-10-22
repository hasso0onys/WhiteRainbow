import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Projection Portfolio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '37ji4wok',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

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
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
