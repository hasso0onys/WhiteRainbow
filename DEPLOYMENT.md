# 🚀 دليل النشر

## نشر Sanity Studio

### الطريقة 1: Sanity Cloud (موصى بها)

```bash
cd studio
npx sanity deploy
```

**الخطوات:**
1. سيسألك عن اسم hostname (مثلاً: `my-portfolio`)
2. سيصبح Studio متاحاً على: `https://my-portfolio.sanity.studio`
3. يمكنك تعديل الـ hostname لاحقاً من لوحة تحكم Sanity

**المميزات:**
- ✅ مجاني
- ✅ سريع
- ✅ HTTPS تلقائي
- ✅ Updates تلقائية

### الطريقة 2: Vercel

```bash
cd studio
vercel
```

أو من لوحة Vercel:
1. New Project
2. Import من Git
3. Root Directory: `studio`
4. Framework: Other
5. Environment Variables:
   ```
   SANITY_STUDIO_PROJECT_ID=your_project_id
   SANITY_STUDIO_DATASET=production
   ```
6. Deploy

---

## نشر Frontend

### الطريقة 1: Vercel (موصى بها)

#### من Terminal:

```bash
cd frontend
vercel
```

#### من لوحة Vercel:

1. **اذهب إلى** [vercel.com](https://vercel.com)
2. **New Project**
3. **Import Git Repository**
4. **Root Directory**: `frontend`
5. **Framework**: Next.js
6. **Environment Variables**:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_token (optional)
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   ```
7. **Deploy**

**المميزات:**
- ✅ مجاني للمشاريع الصغيرة
- ✅ Auto-deploy عند Push
- ✅ HTTPS تلقائي
- ✅ CDN عالمي
- ✅ Analytics

### الطريقة 2: Netlify

```bash
cd frontend
npm run build
```

ثم:
1. اذهب إلى [netlify.com](https://netlify.com)
2. New site from Git
3. اختر الريبو
4. Build command: `npm run build`
5. Publish directory: `.next`
6. أضف Environment Variables
7. Deploy

---

## إعداد Sanity API Token

**لماذا تحتاجه؟**
- للكتابة من Frontend (اختياري)
- لإعادة التحقق من البيانات (ISR)

**الخطوات:**

1. **اذهب إلى** [sanity.io/manage](https://sanity.io/manage)
2. **اختر مشروعك**
3. **API** → **Tokens**
4. **Add API token**
5. **الاسم**: "Production Token"
6. **Permissions**: "Editor" (للقراءة والكتابة)
7. **انسخ الـ Token** (لن تراه مرة أخرى!)
8. **أضفه في Vercel**:
   - Settings → Environment Variables
   - `SANITY_API_TOKEN=your_token_here`

---

## إعداد CORS في Sanity

**مهم للأمان!**

1. **اذهب إلى** [sanity.io/manage](https://sanity.io/manage)
2. **اختر مشروعك**
3. **API** → **CORS Origins**
4. **Add CORS origin**
5. **Origin**: `https://your-domain.vercel.app`
6. **Allow credentials**: ✅
7. **Save**

**أضف أيضاً:**
- `http://localhost:3000` (للتطوير)
- `https://your-custom-domain.com` (إذا كان لديك)

---

## ربط Domain مخصص

### في Vercel:

1. **اذهب إلى مشروعك**
2. **Settings** → **Domains**
3. **Add Domain**
4. **أدخل domain الخاص بك** (مثلاً: `myportfolio.com`)
5. **اتبع التعليمات** لتحديث DNS

### تحديث DNS:

في مزود الـ domain الخاص بك (GoDaddy, Namecheap, إلخ):

**A Record:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**CNAME Record (للـ www):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**انتظر 24-48 ساعة** للـ propagation.

---

## Revalidation للمحتوى

**المشكلة**: المحتوى لا يتحديث فوراً بعد التعديل في Sanity.

**الحل**: إعداد Webhook.

### 1. إنشاء Revalidation Endpoint

**أنشئ**: `frontend/app/api/revalidate/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  // تحقق من السر
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    // أعد التحقق من الصفحة الرئيسية
    revalidatePath('/')

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
```

### 2. إضافة Secret في Vercel

Settings → Environment Variables:
```
REVALIDATION_SECRET=your_random_secret_here
```

### 3. إعداد Webhook في Sanity

1. [sanity.io/manage](https://sanity.io/manage)
2. اختر مشروعك
3. **API** → **Webhooks**
4. **Create webhook**
5. **Name**: "Revalidate Frontend"
6. **URL**: `https://your-domain.vercel.app/api/revalidate?secret=your_secret`
7. **Dataset**: production
8. **Trigger on**: Create, Update, Delete
9. **Filter**: `_type == "project" || _type == "siteSettings"`
10. **Save**

**الآن**: كل تعديل في Sanity سيحدّث الموقع تلقائياً! 🎉

---

## Monitoring & Analytics

### Vercel Analytics

```bash
cd frontend
npm install @vercel/analytics
```

**في** `app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Google Analytics (اختياري)

1. أنشئ حساب في [analytics.google.com](https://analytics.google.com)
2. احصل على Measurement ID
3. أضف في `app/layout.tsx`:

```typescript
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

---

## Security Best Practices

### 1. Environment Variables

❌ **لا تضع أبداً:**
- API tokens في الكود
- Secrets في Git
- Production keys في التطوير

✅ **استخدم:**
- `.env.local` للتطوير
- Vercel Environment Variables للـ production

### 2. CORS

✅ أضف فقط domains محددة في Sanity CORS

### 3. API Tokens

✅ استخدم أقل صلاحيات ممكنة:
- "Viewer" للقراءة فقط
- "Editor" إذا كنت تحتاج الكتابة

### 4. Rate Limiting

الق نظرة على:
- Vercel Edge Functions
- Sanity rate limits

---

## Checklist النشر النهائي

### قبل النشر:
- [ ] جميع Environment Variables صحيحة
- [ ] المحتوى منشور في Sanity
- [ ] الصور محسّنة
- [ ] Build يعمل محلياً (`npm run build`)
- [ ] لا أخطاء في Console

### بعد النشر:
- [ ] الموقع يعمل
- [ ] الصور تظهر
- [ ] الفيديوهات تعمل
- [ ] الروابط تعمل
- [ ] Responsive على Mobile
- [ ] Performance جيد (Lighthouse)

### للأمان:
- [ ] CORS مضبوط
- [ ] API Tokens آمنة
- [ ] Environment Variables في Vercel فقط
- [ ] `.env.local` في `.gitignore`

### اختياري:
- [ ] Domain مخصص مربوط
- [ ] Webhook للـ revalidation
- [ ] Analytics مفعّل
- [ ] SEO optimization

---

## 🎉 تهانينا!

موقعك الآن live ويعمل! 🚀

**الخطوات التالية:**
- شارك الرابط مع العالم
- راقب Analytics
- حدّث المحتوى باستمرار
- اجمع Feedback من المستخدمين

---

**مشاكل في النشر؟**
- تحقق من Vercel logs
- راجع Sanity CORS settings
- تأكد من Environment Variables
