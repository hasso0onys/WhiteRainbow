# ✅ قائمة التحقق من الإعداد

## قبل البدء

- [ ] Node.js مثبت (v18 أو أحدث)
- [ ] npm مثبت
- [ ] حساب Sanity (مجاني)
- [ ] حساب Cloudinary (مجاني - اختياري)

---

## خطوة 1: إعداد Sanity Studio

### 1.1 تسجيل الدخول
```bash
cd studio
npx sanity login
```

### 1.2 إنشاء مشروع
```bash
npx sanity init
```

**الاختيارات:**
- ✅ Create new project
- ✅ Use default dataset (production)
- ✅ Yes to reconfigure

### 1.3 حفظ Project ID
بعد `sanity init`، ستحصل على Project ID - **احفظه!**

---

## خطوة 2: تحديث Environment Variables

### 2.1 Frontend (.env.local)
```bash
cd frontend
nano .env.local
```

**استبدل:**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
```

- [ ] Project ID محدث
- [ ] Dataset محدث
- [ ] Cloudinary name محدث (أو احذفه إذا لم تستخدمه بعد)

### 2.2 Studio (.env.local)
```bash
cd studio
nano .env.local
```

**استبدل:**
```env
SANITY_STUDIO_PROJECT_ID=your_actual_project_id_here
SANITY_STUDIO_DATASET=production
```

- [ ] Project ID محدث (نفس الـ Frontend)
- [ ] Dataset محدث

---

## خطوة 3: تشغيل Studio

```bash
cd studio
npm run dev
```

**تحقق:**
- [ ] Studio يفتح على `http://localhost:3333`
- [ ] تستطيع تسجيل الدخول
- [ ] ترى القوائم العربية

---

## خطوة 4: إضافة المحتوى الأولي

### 4.1 إعدادات الموقع
في Studio → **إعدادات الموقع**:

```
اسم المشروع: Portfolio
نص زر التواصل: تواصل معنا
رابط الزر: mailto:your@email.com

روابط السوشيال ميديا:
- Instagram: https://instagram.com/yourhandle
- Twitter: https://twitter.com/yourhandle
```

- [ ] إعدادات الموقع مضافة
- [ ] تم الضغط على **Publish**

### 4.2 مشروع تجريبي
في Studio → **المشاريع** → **إنشاء**:

```
العنوان: مشروع تجريبي
الترتيب: 0
نوع التخطيط: شاشة كاملة (1x1)
المحتوى الأيسر:
  - النوع: نص
  - النص: "مرحباً بك في portfolio الخاص بي"
```

- [ ] مشروع تجريبي مضاف
- [ ] تم الضغط على **Publish**

---

## خطوة 5: تشغيل Frontend

```bash
cd frontend
npm run dev
```

**تحقق:**
- [ ] الموقع يفتح على `http://localhost:3000`
- [ ] البار العلوي يظهر
- [ ] البار السفلي يظهر
- [ ] المحتوى التجريبي يظهر

---

## خطوة 6: اختبار الوظائف

### 6.1 البارات
- [ ] البار العلوي ثابت
- [ ] اسم المشروع يظهر
- [ ] زر التواصل يعمل
- [ ] البار السفلي ثابت
- [ ] أيقونات السوشيال ميديا تظهر
- [ ] روابط السوشيال تعمل

### 6.2 المحتوى
- [ ] النص التجريبي يظهر
- [ ] Smooth scrolling يعمل
- [ ] Animations ناعمة

---

## خطوة 7: إضافة محتوى حقيقي

### 7.1 إضافة صورة
1. في Studio → المشاريع → إنشاء
2. اختر نوع المحتوى: **صورة**
3. ارفع صورة
4. Publish

- [ ] صورة مضافة وتظهر

### 7.2 إضافة فيديو (اختياري)
1. ارفع فيديو على Cloudinary
2. انسخ الرابط
3. في Studio → المشاريع → إنشاء
4. اختر نوع المحتوى: **فيديو**
5. الصق الرابط
6. Publish

- [ ] فيديو مضاف ويعمل

### 7.3 إضافة تخطيط مقسم (2x1)
1. في Studio → المشاريع → إنشاء
2. اختر نوع التخطيط: **مقسم (2x1)**
3. أضف محتوى يسار
4. أضف محتوى يمين
5. Publish

- [ ] التخطيط المقسم يعمل

---

## خطوة 8: التحقق النهائي

### 8.1 Desktop
- [ ] البارات ثابتة
- [ ] المحتوى بين البارات
- [ ] Fullscreen يملأ الشاشة
- [ ] Split 50/50
- [ ] Scrolling smooth

### 8.2 Mobile
- [ ] البارات ثابتة
- [ ] المحتوى responsive
- [ ] Split يتحول إلى Stack
- [ ] Scrolling smooth

### 8.3 Performance
- [ ] الصفحة تحمّل بسرعة
- [ ] الصور محسّنة
- [ ] الفيديوهات تعمل بسلاسة
- [ ] Animations ناعمة (60fps)

---

## خطوة 9: النشر (اختياري)

### 9.1 Sanity Studio
```bash
cd studio
npx sanity deploy
```

- [ ] Studio منشور
- [ ] الرابط يعمل

### 9.2 Frontend (Vercel)
```bash
cd frontend
vercel
```

أو:
1. Push إلى GitHub
2. استورد في Vercel
3. أضف Environment Variables
4. Deploy

- [ ] Frontend منشور
- [ ] الموقع يعمل
- [ ] Environment Variables صحيحة

---

## المشاكل الشائعة وحلولها

### ❌ "Project not found"
**الحل:**
- تأكد من Project ID صحيح في `.env.local`
- تأكد من نفس الـ ID في Frontend و Studio

### ❌ "No projects found"
**الحل:**
- تأكد من إضافة مشاريع في Studio
- تأكد من الضغط على **Publish**
- أعد تحميل Frontend

### ❌ الصور لا تظهر
**الحل:**
- تأكد من رفع الصور في Sanity
- تأكد من Publish
- تحقق من console للأخطاء

### ❌ الفيديوهات لا تعمل
**الحل:**
- تأكد من الرابط صحيح من Cloudinary
- يجب أن ينتهي بـ `.mp4`
- تحقق من CORS في Cloudinary

### ❌ Styling غريب
**الحل:**
```bash
cd frontend
rm -rf .next
npm run dev
```

---

## ✨ جاهز!

إذا كانت جميع الصناديق محددة ✅، فأنت جاهز!

**الخطوات التالية:**
1. أضف مشاريعك الحقيقية
2. خصص الألوان والتصميم
3. انشر الموقع
4. شارك مع العالم! 🎉

---

**تحتاج مساعدة؟**
- راجع `README.md` للتفاصيل الكاملة
- راجع `QUICK_START.md` للبدء السريع
- راجع `PROJECT_STRUCTURE.md` لفهم البنية
