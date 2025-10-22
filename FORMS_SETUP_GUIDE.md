# 📧 دليل إعداد نظام الحجز والتواصل

## ✅ تم التطبيق بنجاح!

تم تطبيق **الطريقة 1: Sanity + Resend** بالكامل. إليك ما تم إنجازه:

---

## 📦 ما تم تنفيذه

### 1️⃣ Sanity Schemas
- ✅ إنشاء `bookingForm.ts` - لحفظ طلبات الحجز
- ✅ إنشاء `contactForm.ts` - لحفظ رسائل التواصل
- ✅ إضافة الـ Schemas إلى Sanity Studio
- ✅ تنظيم الـ Sidebar مع أيقونات مميزة

### 2️⃣ API Routes
- ✅ إنشاء `/api/booking` - معالجة طلبات الحجز
- ✅ إنشاء `/api/contact` - معالجة رسائل التواصل
- ✅ حفظ البيانات في Sanity تلقائياً
- ✅ إرسال إيميل للمسؤول عند كل طلب
- ✅ إرسال إيميل تأكيد للعميل

### 3️⃣ صفحات Forms
- ✅ تعديل `/booking` - إرسال البيانات عبر API
- ✅ تعديل `/contact` - إرسال البيانات عبر API
- ✅ إضافة Loading States
- ✅ إضافة Success/Error Handling
- ✅ تنظيف الـ Form بعد الإرسال

### 4️⃣ Email Templates
- ✅ تصميم إيميل احترافي للمسؤول
- ✅ تصميم إيميل تأكيد للعميل
- ✅ دعم RTL للغة العربية
- ✅ تصميم responsive

---

## 🚀 خطوات التفعيل

### الخطوة 1: إعداد Sanity Write Token

1. افتح Sanity Studio: https://www.sanity.io/manage
2. اختر المشروع الخاص بك
3. من القائمة الجانبية، اختر **API** → **Tokens**
4. اضغط على **Add API token**
5. سمّه `Write Token` واختر **Editor** permissions
6. انسخ الـ Token (احفظه في مكان آمن!)

### الخطوة 2: إعداد Resend Account

1. افتح موقع Resend: https://resend.com/signup
2. أنشئ حساب مجاني (3000 email/شهر مجاناً!)
3. بعد التسجيل، اذهب لـ **API Keys**
4. اضغط على **Create API Key**
5. سمّه `Production` واختر **Full Access**
6. انسخ الـ API Key (احفظه!)

### الخطوة 3: إضافة Domain في Resend (مهم!)

**الطريقة السهلة (للتجربة):**
- استخدم البريد الافتراضي: `onboarding@resend.dev`
- ⚠️ ملاحظة: سيعمل فقط للإرسال لبريدك الخاص!

**الطريقة الاحترافية (للإنتاج):**
1. في Resend، اذهب لـ **Domains**
2. اضغط على **Add Domain**
3. أدخل الدومين الخاص بك (مثل: `example.com`)
4. اتبع التعليمات لإضافة DNS Records
5. بعد التفعيل، استخدم بريد مثل: `noreply@yourdomain.com`

### الخطوة 4: تحديث Environment Variables

1. افتح ملف `.env.local` في مجلد `frontend`:
   ```bash
   cd /Users/hassanalqattan/WR/frontend
   nano .env.local
   ```

2. أضف المتغيرات التالية:
   ```bash
   # Sanity Configuration (موجودة بالفعل)
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=skXXXXXXXXXXXXXXXXXX  # الـ Write Token من الخطوة 1
   
   # Resend Email Configuration (جديدة)
   RESEND_API_KEY=re_XXXXXXXXXXXXXXXXXXXX  # من الخطوة 2
   RESEND_FROM_EMAIL=onboarding@resend.dev  # أو بريدك المخصص
   ADMIN_EMAIL=your-email@example.com       # بريدك لاستقبال الإشعارات
   ```

3. احفظ الملف:
   - اضغط `Ctrl + O` ثم `Enter`
   - اضغط `Ctrl + X` للخروج

### الخطوة 5: إعادة تشغيل Sanity Studio

```bash
cd /Users/hassanalqattan/WR/wr
npm run dev
```

- افتح http://localhost:3333
- ستجد في الـ Sidebar:
  - 📅 **طلبات الحجز**
  - ✉️ **رسائل التواصل**

### الخطوة 6: إعادة تشغيل Frontend

```bash
cd /Users/hassanalqattan/WR/frontend
npm run dev:clean
```

---

## 🧪 اختبار النظام

### اختبار صفحة الحجز:
1. افتح http://localhost:3000/booking
2. املأ النموذج بالكامل
3. اضغط **تأكيد الحجز**
4. ✅ يجب أن تصلك 3 أشياء:
   - رسالة نجاح في المتصفح
   - إيميل إشعار لك كمسؤول
   - إيميل تأكيد للعميل
   - ظهور الطلب في Sanity Studio (📅 طلبات الحجز)

### اختبار صفحة التواصل:
1. افتح http://localhost:3000/contact
2. املأ النموذج
3. اضغط **إرسال الرسالة**
4. ✅ يجب أن تصلك 3 أشياء:
   - رسالة نجاح في المتصفح
   - إيميل إشعار لك كمسؤول
   - إيميل تأكيد للعميل
   - ظهور الرسالة في Sanity Studio (✉️ رسائل التواصل)

---

## 📊 إدارة الطلبات من Sanity Studio

### إدارة طلبات الحجز:
1. افتح Sanity Studio
2. اختر **📅 طلبات الحجز**
3. ستجد كل الطلبات مع:
   - 🆕 جديد
   - 📞 تم التواصل
   - ✅ مؤكد
   - ❌ ملغي
4. اضغط على أي طلب لعرض التفاصيل
5. غيّر الحالة حسب التقدم

### إدارة رسائل التواصل:
1. افتح Sanity Studio
2. اختر **✉️ رسائل التواصل**
3. ستجد كل الرسائل مع:
   - 🆕 جديدة
   - 👀 تمت القراءة
   - ✅ تم الرد
   - 🗑️ محذوفة

---

## 🎨 تخصيص Email Templates

إذا أردت تخصيص تصميم الإيميلات:

### لتغيير إيميل الحجز:
```bash
/Users/hassanalqattan/WR/frontend/app/api/booking/route.ts
```

### لتغيير إيميل التواصل:
```bash
/Users/hassanalqattan/WR/frontend/app/api/contact/route.ts
```

ابحث عن جزء `html:` وعدّل الـ HTML/CSS حسب رغبتك.

---

## 🔧 استكشاف الأخطاء

### لا تصل الإيميلات؟
1. تحقق من `RESEND_API_KEY` في `.env.local`
2. تحقق من `ADMIN_EMAIL` صحيح
3. تحقق من الـ Console للأخطاء
4. في Resend Dashboard، تحقق من **Logs**

### لا تُحفظ البيانات في Sanity؟
1. تحقق من `SANITY_API_TOKEN` في `.env.local`
2. تأكد من الـ Token له **Editor** permissions
3. تحقق من الـ Console للأخطاء

### خطأ في الإرسال؟
1. افتح Console في المتصفح (F12)
2. جرّب الإرسال مرة أخرى
3. ابحث عن الأخطاء الحمراء
4. أرسل لي الخطأ وسأساعدك!

---

## 💡 نصائح مهمة

### 1. حماية الـ API Keys
- ⚠️ **لا تشارك** ملف `.env.local` أبداً
- ⚠️ **لا ترفع** الـ API Keys على GitHub
- ✅ الملف `.env.local` مستثنى من Git تلقائياً

### 2. حدود Resend المجانية
- 3000 email/شهر مجاناً
- 100 email/يوم كحد أقصى
- إذا احتجت أكثر، ترقية الخطة بسيطة

### 3. Spam Protection
- استخدم Resend Domain Verification للإنتاج
- الإيميلات من `onboarding@resend.dev` قد تذهب للـ Spam
- Domain مخصص = توصيل أفضل

### 4. Backup
- كل البيانات محفوظة في Sanity
- يمكنك تصدير البيانات من Sanity Studio
- راجع Sanity Backups بانتظام

---

## 📝 ملفات تم تعديلها

```
wr/
  schemaTypes/
    ├── bookingForm.ts      [جديد] ✨
    ├── contactForm.ts      [جديد] ✨
    └── index.ts            [معدّل]
  sanity.config.ts          [معدّل]

frontend/
  app/
    api/
      booking/
        └── route.ts        [جديد] ✨
      contact/
        └── route.ts        [جديد] ✨
    booking/
      └── page.tsx          [معدّل]
    contact/
      └── page.tsx          [معدّل]
  .env.example              [جديد] ✨
  package.json              [معدّل]
```

---

## ✨ الميزات

✅ **حفظ تلقائي** - كل طلب يُحفظ في Sanity  
✅ **إشعارات فورية** - إيميل لك عند كل طلب  
✅ **تأكيد للعميل** - إيميل احترافي للعميل  
✅ **إدارة سهلة** - تحديث الحالات من Sanity Studio  
✅ **مجاني 100%** - حتى 3000 email/شهر  
✅ **احترافي** - تصميم إيميلات جميل  
✅ **عربي كامل** - دعم RTL  

---

## 🎯 الخطوات التالية (اختيارية)

### 1. إضافة إشعارات SMS
- دمج مع **Twilio** لإرسال SMS
- إشعار فوري عند الطلبات العاجلة

### 2. Dashboard للإحصائيات
- عدد الطلبات الشهرية
- أكثر أنواع المشاريع طلباً
- معدل الاستجابة

### 3. تصدير البيانات
- تصدير إلى Excel
- تقارير شهرية تلقائية

### 4. Webhook Automation
- إشعار Slack عند طلب جديد
- ربط مع Google Calendar
- ربط مع CRM

---

## 🆘 المساعدة

إذا واجهت أي مشكلة:
1. راجع قسم **استكشاف الأخطاء** أعلاه
2. تحقق من الـ Console في المتصفح
3. تحقق من Resend Logs في Dashboard
4. اسألني مباشرة!

---

**🎉 مبروك! نظام الحجز والتواصل جاهز!**

فقط أضف الـ Environment Variables وابدأ الاختبار! 🚀

