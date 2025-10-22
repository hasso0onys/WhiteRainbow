# 📂 هيكل المشروع الكامل

## Frontend Structure

```
frontend/
│
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # Layout رئيسي مع TopBar و BottomBar
│   ├── page.tsx                   # الصفحة الرئيسية - عرض المشاريع
│   └── globals.css                # Styles عامة + Tailwind
│
├── components/                    # React Components
│   ├── TopBar.tsx                 # البار العلوي (اسم المشروع + زر التواصل)
│   ├── BottomBar.tsx              # البار السفلي (أيقونات سوشيال ميديا)
│   ├── MediaGrid.tsx              # Grid لعرض جميع المشاريع
│   ├── FullscreenItem.tsx         # عرض مشروع بتخطيط 1x1
│   ├── SplitItem.tsx              # عرض مشروع بتخطيط 2x1
│   └── ContentBlock.tsx           # عرض المحتوى (صورة/فيديو/نص)
│
├── lib/                           # Utilities & Configuration
│   ├── sanity.ts                  # Sanity client configuration
│   ├── queries.ts                 # GROQ queries للبيانات
│   └── types.ts                   # TypeScript types
│
├── .env.local                     # Environment variables (غير موجود في Git)
├── next.config.js                 # Next.js configuration
├── tailwind.config.ts             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
├── postcss.config.js              # PostCSS configuration
└── package.json                   # Dependencies & scripts
```

## Studio Structure

```
studio/
│
├── schemas/                       # Sanity Schemas
│   ├── project.ts                 # Schema للمشاريع
│   ├── settings.ts                # Schema للإعدادات
│   └── index.ts                   # Export جميع الـ schemas
│
├── .env.local                     # Environment variables (غير موجود في Git)
├── sanity.config.ts               # Sanity Studio configuration
├── sanity.cli.ts                  # Sanity CLI configuration
└── package.json                   # Dependencies & scripts
```

## Components تفصيلي

### TopBar.tsx
**المهمة**: عرض البار العلوي الثابت
**المحتوى**:
- اسم المشروع (يسار - RTL)
- زر تواصل وحجز (يمين - RTL)
- ارتفاع: 80px

**Props**:
```typescript
{
  projectName: string
  contactButton: { text: string, link: string }
  barColor?: string
}
```

### BottomBar.tsx
**المهمة**: عرض البار السفلي الثابت
**المحتوى**:
- أيقونات وسائل التواصل الاجتماعي (وسط)
- ارتفاع: 60px

**Props**:
```typescript
{
  socialLinks: Array<{ platform: string, url: string }>
  barColor?: string
}
```

### MediaGrid.tsx
**المهمة**: Loop على جميع المشاريع وعرضها
**الوظيفة**:
- يستقبل array من المشاريع
- يحدد نوع التخطيط لكل مشروع
- يعرض FullscreenItem أو SplitItem حسب النوع

**Props**:
```typescript
{
  projects: Project[]
}
```

### FullscreenItem.tsx
**المهمة**: عرض مشروع بتخطيط شاشة كاملة (1x1)
**المحتوى**:
- محتوى واحد يملأ الشاشة
- ارتفاع: calc(100vh - 140px)

### SplitItem.tsx
**المهمة**: عرض مشروع بتخطيط مقسم (2x1)
**المحتوى**:
- محتويين جنب بعض
- كل واحد 50% من العرض
- ارتفاع: calc(100vh - 140px)

### ContentBlock.tsx
**المهمة**: عرض المحتوى الفعلي
**الأنواع المدعومة**:
1. **صورة**: باستخدام next/image مع optimization
2. **فيديو**: autoplay مع Intersection Observer
3. **نص**: مع تنسيق وأنيميشن

## Sanity Schemas تفصيلي

### project.ts
**الحقول**:
- `title` (string): عنوان المشروع
- `slug` (slug): للروابط
- `order` (number): ترتيب العرض
- `layoutType` (string): 'fullscreen' أو 'split'
- `leftContent` (object): المحتوى الأيسر
  - `type`: 'image' | 'video' | 'text'
  - `image`: صورة من Sanity
  - `cloudinaryVideo`: رابط فيديو
  - `text`: نص
- `rightContent` (object): المحتوى الأيمن (نفس leftContent)
- `backgroundColor` (string): لون الخلفية

### settings.ts
**الحقول**:
- `projectName` (string): اسم المشروع
- `contactButton` (object):
  - `text`: نص الزر
  - `link`: الرابط
- `socialLinks` (array):
  - `platform`: نوع المنصة
  - `url`: الرابط
- `barColor` (string): لون البارات

## Data Flow

```
1. User يزور الموقع
   ↓
2. layout.tsx يجلب Settings من Sanity
   ↓
3. page.tsx يجلب Projects من Sanity
   ↓
4. MediaGrid يستقبل المشاريع
   ↓
5. لكل مشروع:
   - إذا fullscreen → FullscreenItem
   - إذا split → SplitItem
   ↓
6. كل Item يعرض ContentBlock
   ↓
7. ContentBlock يعرض المحتوى حسب النوع
```

## Animation Flow

```
1. الصفحة تحمّل
   ↓
2. TopBar و BottomBar يظهران بـ fade in
   ↓
3. عند Scroll:
   - Project يدخل الشاشة → fade in
   - Video autoplay عند الظهور
   ↓
4. Hover على الأزرار → smooth transitions
```

## Performance Optimizations

✅ **SSR**:
- Settings و Projects يتم fetch من السيرفر
- Caching لمدة ساعة (revalidate: 3600)

✅ **Images**:
- استخدام next/image
- Automatic optimization
- Lazy loading

✅ **Videos**:
- Intersection Observer للـ autoplay
- Lazy loading
- Cloudinary optimization

✅ **Animations**:
- Framer Motion
- GPU acceleration
- Smooth 60fps

## الأحجام المستهدفة

### Desktop (1920px+):
- TopBar: كامل العرض × 80px
- BottomBar: كامل العرض × 60px
- Content: بين البارات
- Split: 50% / 50%

### Tablet (768px - 1919px):
- نفس Desktop
- Split: 50% / 50%

### Mobile (< 768px):
- TopBar: كامل العرض × 80px
- BottomBar: كامل العرض × 60px
- Split: تتحول إلى Stack (100% / 100%)

## Environment Variables

### Frontend:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID     # Project ID من Sanity
NEXT_PUBLIC_SANITY_DATASET         # عادة 'production'
SANITY_API_TOKEN                   # للكتابة (optional)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME  # اسم Cloudinary
```

### Studio:
```env
SANITY_STUDIO_PROJECT_ID           # نفس Project ID
SANITY_STUDIO_DATASET              # نفس Dataset
```

## الملفات المهمة للتعديل

### للتصميم:
- `app/globals.css` - الألوان والـ styling العام
- `components/*.tsx` - التصميم لكل component

### للمحتوى:
- استخدم Sanity Studio فقط!

### للوظائف:
- `lib/queries.ts` - إضافة queries جديدة
- `lib/types.ts` - إضافة types جديدة

### للإعدادات:
- `next.config.js` - إعدادات Next.js
- `tailwind.config.ts` - إعدادات Tailwind
- `sanity.config.ts` - إعدادات Sanity

## الأوامر اليومية

```bash
# Development
cd frontend && npm run dev      # تشغيل الموقع
cd studio && npm run dev        # تشغيل Studio

# Production
cd frontend && npm run build    # Build الموقع
cd studio && npm run build      # Build Studio

# Deployment
vercel                          # نشر على Vercel
npx sanity deploy              # نشر Studio
```

---

**📝 ملاحظة**: هذا المشروع جاهز للاستخدام فوراً!
