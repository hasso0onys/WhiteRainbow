# 🎬 Projection Mapping Portfolio

موقع portfolio احترافي سينمائي لعرض مشاريع الـ projection mapping مع تصميم cinematic بـ black bars ثابتة.

## ✨ المميزات

- **تصميم سينمائي**: بارات سوداء ثابتة علوية وسفلية
- **تخطيطات متعددة**: Fullscreen (1x1) و Split (2x1)
- **محتوى متنوع**: صور، فيديوهات، ونصوص
- **أنيميشن ناعم**: باستخدام Framer Motion
- **دعم العربية**: RTL support كامل
- **أداء عالي**: SSR مع Next.js 14
- **إدارة سهلة**: Sanity CMS
- **Responsive**: يعمل على جميع الأجهزة

## 📁 هيكل المشروع

```
WR/
├── frontend/          # Next.js Application
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── TopBar.tsx
│   │   ├── BottomBar.tsx
│   │   ├── MediaGrid.tsx
│   │   ├── FullscreenItem.tsx
│   │   ├── SplitItem.tsx
│   │   └── ContentBlock.tsx
│   └── lib/
│       ├── sanity.ts
│       ├── queries.ts
│       └── types.ts
│
└── studio/            # Sanity CMS
    ├── schemas/
    │   ├── project.ts
    │   ├── settings.ts
    │   └── index.ts
    └── sanity.config.ts
```

## 🚀 البدء

### 1. إنشاء مشروع Sanity

```bash
# انتقل إلى مجلد studio
cd studio

# قم بتسجيل الدخول إلى Sanity
npx sanity login

# قم بإنشاء مشروع جديد
npx sanity init --project-id YOUR_PROJECT_ID --dataset production

# أو استخدم مشروع موجود
# قم بتحديث ملف .env.local بمعلومات مشروعك
```

### 2. تحديث Environment Variables

#### Frontend (.env.local):
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
```

#### Studio (.env.local):
```env
SANITY_STUDIO_PROJECT_ID=your_actual_project_id
SANITY_STUDIO_DATASET=production
```

### 3. تشغيل Sanity Studio

```bash
cd studio
npm run dev
```

سيفتح Studio على `http://localhost:3333`

### 4. إعداد المحتوى الأولي

1. افتح Sanity Studio
2. اذهب إلى **إعدادات الموقع**
3. املأ المعلومات:
   - اسم المشروع
   - نص وزر التواصل
   - روابط السوشيال ميديا

### 5. تشغيل Frontend

```bash
cd frontend
npm run dev
```

سيفتح الموقع على `http://localhost:3000`

## 📝 إضافة مشاريع

### في Sanity Studio:

1. اذهب إلى **المشاريع**
2. اضغط **إنشاء مشروع جديد**
3. املأ البيانات:
   - **العنوان**: اسم المشروع
   - **الترتيب**: رقم الترتيب (0, 1, 2, ...)
   - **نوع التخطيط**:
     - **شاشة كاملة (1x1)**: للمحتوى الكبير
     - **مقسم (2x1)**: لعرض محتويين جنباً إلى جنب
   - **المحتوى الأيسر**: اختر النوع (صورة/فيديو/نص)
   - **المحتوى الأيمن**: فقط للتخطيط المقسم

### لإضافة فيديو من Cloudinary:

1. ارفع الفيديو إلى Cloudinary
2. انسخ الرابط المباشر للفيديو
3. الصقه في حقل "رابط فيديو Cloudinary"

مثال:
```
https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1234567890/video.mp4
```

## 🎨 التخصيص

### تغيير ألوان البارات:

في Sanity Studio → إعدادات الموقع → لون البارات

مثال: `#000000` (أسود), `#1a1a1a` (رمادي غامق)

### تغيير ارتفاع البارات:

في `components/TopBar.tsx` و `components/BottomBar.tsx`:
```tsx
className="h-20" // البار العلوي - غير الرقم
className="h-16" // البار السفلي - غير الرقم
```

وفي `app/layout.tsx`:
```tsx
paddingTop: '80px'     // يجب أن يطابق ارتفاع TopBar
paddingBottom: '60px'  // يجب أن يطابق ارتفاع BottomBar
```

### تخصيص الأنيميشن:

في `components/FullscreenItem.tsx` و `components/SplitItem.tsx`:
```tsx
transition={{ duration: 0.8 }} // سرعة الأنيميشن
```

## 🌐 النشر (Deployment)

### نشر Frontend على Vercel:

```bash
cd frontend
vercel
```

أو:
1. اذهب إلى [vercel.com](https://vercel.com)
2. استورد المشروع من GitHub
3. اختر مجلد `frontend`
4. أضف Environment Variables
5. اضغط Deploy

### نشر Sanity Studio:

```bash
cd studio
npx sanity deploy
```

أو يمكنك نشره على Vercel بنفس الطريقة.

## 📱 التخطيطات

### Fullscreen Layout (1x1):
```
┌─────────────────────┐
│     Top Bar         │ 80px
├─────────────────────┤
│                     │
│    Full Content     │
│   (Image/Video/Text)│
│                     │
├─────────────────────┤
│    Bottom Bar       │ 60px
└─────────────────────┘
```

### Split Layout (2x1):
```
┌─────────────────────┐
│     Top Bar         │ 80px
├──────────┬──────────┤
│          │          │
│   Left   │  Right   │
│ Content  │ Content  │
│          │          │
├──────────┴──────────┤
│    Bottom Bar       │ 60px
└─────────────────────┘
```

## 🎯 التقنيات المستخدمة

- **Next.js 15** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Sanity CMS** - Content Management
- **Framer Motion** - Animations
- **Cloudinary** - Video Hosting
- **Lucide React** - Icons

## 🔧 الأوامر المفيدة

```bash
# Frontend
cd frontend
npm run dev      # Development
npm run build    # Build للنشر
npm run start    # Production server

# Studio
cd studio
npm run dev      # Development
npm run build    # Build للنشر
```

## 📊 الأداء والـ SEO

- ✅ Server-Side Rendering (SSR)
- ✅ Image Optimization مع next/image
- ✅ Lazy Loading للفيديوهات
- ✅ Semantic HTML
- ✅ Meta Tags
- ✅ Open Graph Support
- ✅ Mobile Responsive

## 🎨 أفكار للتطوير المستقبلي

- [ ] إضافة صفحة تفاصيل لكل مشروع
- [ ] نظام تصفية المشاريع
- [ ] Dark/Light mode toggle
- [ ] Multi-language support
- [ ] Gallery carousel للمشاريع
- [ ] Contact form integration
- [ ] Analytics integration
- [ ] Loading animations
- [ ] PWA support

## 📄 الترخيص

هذا المشروع مفتوح المصدر ويمكن استخدامه بحرية.

## 🤝 المساهمة

إذا وجدت أي مشكلة أو لديك اقتراح، لا تتردد في فتح Issue أو Pull Request.

---

**صُنع بـ ❤️ للمبدعين في عالم الـ Projection Mapping**
