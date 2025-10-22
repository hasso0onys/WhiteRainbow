# دليل استخدام المتغيرات (Template Variables)

## نظرة عامة

يمكنك الآن استخدام متغيرات خاصة في النصوص و HTML لعرض محتوى ديناميكي من إعدادات الموقع.

## المتغيرات المتاحة

### 1. `{{logo}}` - الشعار

يعرض شعار الموقع المحدد في إعدادات الموقع.

**الاستخدام:**

```text
مرحباً بك في {{logo}} موقعنا
```

```html
<div style="text-align: center;">
  <h1>شركة {{logo}}</h1>
  <p>نحن نقدم أفضل الخدمات</p>
</div>
```

```html
<div style="display: flex; align-items: center; justify-content: center; height: 100%; flex-direction: column; gap: 20px;">
  {{logo}}
  <h1 style="color: white; font-size: 48px; font-weight: 300;">مرحباً بكم</h1>
  <p style="color: #ccc; font-size: 24px;">نحن متخصصون في Projection Mapping</p>
</div>
```

---

## أمثلة عملية

### مثال 1: نص بسيط مع الشعار

في حقل النص أو HTML:

```html
<div style="width: 200px; height: 100px; margin: 0 auto;">
  {{logo}}
</div>

<p style="color: white; text-align: center; margin-top: 20px;">مرحباً بكم في موقعنا</p>
```

**النتيجة:**
- سيظهر الشعار بحجم 200x100 بكسل
- ثم النص تحته

**مهم**: يجب وضع `{{logo}}` داخل `<div>` وتحديد `width` و `height` للتحكم بالحجم!

---

### مثال 2: HTML مع الشعار في المنتصف

```html
<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 30px; text-align: center;">
  <div style="width: 180px; height: 80px;">
    {{logo}}
  </div>
  <h1 style="color: white; font-size: 56px; font-weight: 200; margin: 0;">تصميم احترافي</h1>
  <p style="color: rgba(255,255,255,0.8); font-size: 24px; margin: 0;">لخدمات Projection Mapping</p>
</div>
```

**النتيجة:**
- الشعار في الأعلى (بحجم 180x80 بكسل)
- عنوان كبير
- وصف تحتهم

---

### مثال 3: الشعار بجانب النص (أفقي)

```html
<div style="display: flex; align-items: center; justify-content: center; height: 100%; gap: 20px;">
  <div style="width: 120px; height: 60px;">
    {{logo}}
  </div>
  <div style="border-left: 2px solid white; padding-left: 20px;">
    <h2 style="color: white; font-size: 42px; margin: 0; font-weight: 300;">خدماتنا المميزة</h2>
    <p style="color: #aaa; font-size: 20px; margin: 5px 0 0 0;">نحن الأفضل في المجال</p>
  </div>
</div>
```

**النتيجة:**
- الشعار على اليسار (بحجم 120x60 بكسل)
- خط فاصل عمودي
- النص على اليمين

---

### مثال 4: الشعار في زاوية مع نص

```html
<div style="position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
  <!-- الشعار في الزاوية -->
  <div style="position: absolute; top: 30px; left: 30px; width: 100px; height: 50px;">
    {{logo}}
  </div>

  <!-- النص في الوسط -->
  <div style="text-align: center;">
    <h1 style="color: white; font-size: 64px; font-weight: 100; margin: 0;">عنوان المشروع</h1>
    <p style="color: rgba(255,255,255,0.7); font-size: 28px; margin: 20px 0 0 0;">وصف قصير للمشروع</p>
  </div>
</div>
```

**النتيجة:**
- الشعار في الزاوية العلوية اليسرى (بحجم 100x50 بكسل)
- النص في منتصف الشاشة

---

### مثال 5: بطاقة مع الشعار

```html
<div style="display: flex; align-items: center; justify-content: center; height: 100%;">
  <div style="background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); padding: 50px; border-radius: 20px; text-align: center; max-width: 600px;">
    <div style="width: 150px; height: 70px; margin: 0 auto;">
      {{logo}}
    </div>
    <h2 style="color: white; font-size: 36px; margin: 30px 0 20px 0; font-weight: 300;">من نحن</h2>
    <p style="color: rgba(255,255,255,0.8); font-size: 18px; line-height: 1.8; margin: 0;">
      نحن شركة متخصصة في تقديم خدمات Projection Mapping الاحترافية
      مع أكثر من 10 سنوات من الخبرة في هذا المجال
    </p>
  </div>
</div>
```

**النتيجة:**
- بطاقة شفافة مع ضبابية في الخلفية
- الشعار في الأعلى (بحجم 150x70 بكسل)
- عنوان ونص تحته

---

## ملاحظات مهمة

### 1. إعدادات الشعار

قبل استخدام `{{logo}}`، تأكد من:
- رفع صورة الشعار في **إعدادات الموقع > الشعار**

### 2. التحكم في حجم الشعار ⚠️ **مهم جداً**

**يجب** وضع `{{logo}}` داخل `<div>` مع تحديد `width` و `height`:

```html
<!-- ✅ صحيح -->
<div style="width: 200px; height: 100px;">
  {{logo}}
</div>

<!-- ❌ خطأ - الشعار قد لا يظهر بالحجم المطلوب -->
{{logo}}
```

الشعار سيملأ الـ container بالكامل مع الحفاظ على نسبة العرض إلى الارتفاع (`object-fit: contain`).

### 3. أمثلة للتحكم بالحجم

```html
<!-- شعار صغير -->
<div style="width: 80px; height: 40px;">
  {{logo}}
</div>

<!-- شعار متوسط -->
<div style="width: 150px; height: 70px;">
  {{logo}}
</div>

<!-- شعار كبير -->
<div style="width: 300px; height: 150px;">
  {{logo}}
</div>
```

### 4. التنسيق المتقدم باستخدام CSS

يمكنك إضافة تأثيرات على الـ container:

```html
<!-- شعار مع ظل -->
<div style="width: 150px; height: 70px; filter: drop-shadow(2px 4px 8px rgba(0,0,0,0.3));">
  {{logo}}
</div>

<!-- شعار مع حدود -->
<div style="width: 150px; height: 70px; border: 2px solid white; padding: 10px; border-radius: 10px;">
  {{logo}}
</div>
```

### 5. الشعار لن يظهر إذا:

- لم يتم رفع صورة الشعار في الإعدادات
- الشعار المرفوع تالف أو غير صالح

في هذه الحالة، سيتم حذف `{{logo}}` من النص تلقائياً.

---

## أين يمكن استخدام المتغيرات؟

يمكنك استخدام `{{logo}}` في:

1. **حقل النص** (Text) في المشاريع
2. **محرر HTML** في المشاريع
3. **Overlay Text** - النص المتراكب على الصور والفيديوهات

---

## البنية التقنية

### الملفات المعنية:

1. `frontend/lib/templateVars.ts` - وظيفة استبدال المتغيرات
2. `frontend/components/ContentBlock.tsx` - تطبيق الاستبدال
3. `frontend/lib/types.ts` - تعريف LogoSettings
4. `studio/schemas/settings.ts` - إعدادات الشعار في Sanity

### كيف يعمل؟

1. عندما تكتب `{{logo}}` في النص أو HTML
2. يتم استبداله تلقائياً بـ:
   ```html
   <img src="[رابط الصورة]" alt="Logo" style="width: 150px; height: 50px; opacity: 1; object-fit: contain;" />
   ```
3. الرابط والأبعاد تأتي من إعدادات الموقع

---

## إضافة متغيرات جديدة (للمطورين)

يمكنك إضافة متغيرات جديدة في `frontend/lib/templateVars.ts`:

```typescript
// مثال: إضافة متغير {{siteName}}
result = result.replace(/\{\{siteName\}\}/g, settings.projectName || '')
```

---

تم التطوير بواسطة Claude Code 🤖
