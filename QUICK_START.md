# 🚀 دليل البدء السريع

## خطوات التشغيل السريعة

### 1️⃣ إعداد Sanity

```bash
cd studio

# تسجيل الدخول
npx sanity login

# إنشاء مشروع (اتبع التعليمات)
npx sanity init
```

**ملاحظة**: احفظ الـ Project ID الذي يظهر لك!

### 2️⃣ تحديث المتغيرات

**في `studio/.env.local`:**
```env
SANITY_STUDIO_PROJECT_ID=ضع_project_id_هنا
SANITY_STUDIO_DATASET=production
```

**في `frontend/.env.local`:**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=نفس_الـ_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=سيتم_إضافته_لاحقاً
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=اسم_حسابك_في_cloudinary
```

### 3️⃣ تشغيل Sanity Studio

```bash
cd studio
npm run dev
```

افتح: `http://localhost:3333`

### 4️⃣ إضافة المحتوى الأولي

في Sanity Studio:

1. **إعدادات الموقع**:
   - اسم المشروع: "Portfolio"
   - نص الزر: "تواصل معنا"
   - رابط الزر: "mailto:your@email.com"
   - أضف روابط السوشيال ميديا

2. **إنشاء مشروع تجريبي**:
   - العنوان: "مشروع تجريبي"
   - الترتيب: 0
   - نوع التخطيط: شاشة كاملة
   - المحتوى: اختر "نص"
   - النص: "مرحباً بك في portfolio الخاص بي"

اضغط **Publish**!

### 5️⃣ تشغيل Frontend

```bash
cd frontend
npm run dev
```

افتح: `http://localhost:3000`

## ✅ اختبار سريع

يجب أن ترى:
- ✅ بار علوي أسود مع اسم المشروع وزر التواصل
- ✅ المحتوى في المنتصف
- ✅ بار سفلي أسود مع أيقونات السوشيال ميديا
- ✅ النص الذي أضفته

## 🎬 إضافة فيديو من Cloudinary

### 1. إنشاء حساب Cloudinary (مجاني)
- اذهب إلى: https://cloudinary.com/users/register_free
- سجل حساب جديد
- احفظ الـ **Cloud Name**

### 2. رفع فيديو
- اذهب إلى Media Library
- اضغط Upload
- ارفع الفيديو
- انسخ الـ URL

### 3. إضافة في Sanity
- أنشئ مشروع جديد
- نوع المحتوى: **فيديو**
- الصق الـ URL من Cloudinary
- احفظ

## 🎨 التخطيطات

### Fullscreen (1x1)
للمحتوى الكبير - صورة واحدة أو فيديو واحد كامل الشاشة

### Split (2x1)
لعرض محتويين جنباً إلى جنب - مثلاً صورة ونص، أو فيديو وصورة

## 🔧 حل المشاكل

### المشروع لا يعمل؟

1. **تأكد من Environment Variables**:
   ```bash
   # في frontend
   cat .env.local

   # في studio
   cat .env.local
   ```

2. **أعد تشغيل الخوادم**:
   ```bash
   # أوقف بـ Ctrl+C ثم
   npm run dev
   ```

3. **تأكد من النشر في Sanity**:
   - يجب الضغط على **Publish** بعد إضافة المحتوى

### الصور لا تظهر؟

- تأكد من رفعها في Sanity
- تأكد من نشر المشروع (Publish)

### الفيديوهات لا تعمل؟

- تأكد من الرابط صحيح من Cloudinary
- يجب أن ينتهي بـ `.mp4`
- مثال: `https://res.cloudinary.com/XXX/video/upload/vXXX/file.mp4`

## 📝 أمثلة روابط صحيحة

### فيديو Cloudinary:
```
https://res.cloudinary.com/demo/video/upload/v1234567890/sample.mp4
```

### رابط تواصل:
```
mailto:info@example.com
https://wa.me/966501234567
https://t.me/username
```

### روابط سوشيال ميديا:
```
https://instagram.com/username
https://twitter.com/username
https://youtube.com/@channel
```

## 🎯 خطوة بخطوة للمبتدئين

1. افتح Terminal
2. انتقل للمجلد:
   ```bash
   cd /Users/hassanalqattan/WR
   ```
3. افتح نافذتين من Terminal
4. في النافذة الأولى:
   ```bash
   cd studio
   npm run dev
   ```
5. في النافذة الثانية:
   ```bash
   cd frontend
   npm run dev
   ```
6. افتح المتصفح على `localhost:3000`

---

**تحتاج مساعدة؟** راجع `README.md` للتفاصيل الكاملة!
