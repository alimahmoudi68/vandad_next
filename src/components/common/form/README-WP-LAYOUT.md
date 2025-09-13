## فرم با چیدمان شبیه وردپرس/ووکامرس (Tabs + Sidebar Metaboxes)

این راهنما توضیح می‌دهد چطور با همان `Form` فعلی، فرم‌هایی شبیه صفحه ایجاد محصول وردپرس/ووکامرس بسازید؛ شامل تب‌ها در بخش اصلی و کارت‌های سایدبار.

### 1) فعال‌سازی چیدمان
- به `Form` prop زیر را بدهید:

```tsx
<Form
  initForm={initForm}
  submitTitle="ایجاد محصول"
  loading={loading}
  submit={handleSubmit}
  config={{ forComment: false, layout: "wp", activeTabId: "general" }}
/>
```

کلید `layout: "wp"` مسیر رندر جدید را فعال می‌کند. نبود این کلید یعنی رندر قدیمی (عمودی) بدون تغییر.

### 2) متادیتای اختیاری برای هر فیلد
داخل `config` هر فیلد می‌توانید این کلیدها را اضافه کنید (اختیاری هستند):

- `area`: "main" | "sidebar" (محل نمایش؛ پیش‌فرض: main)
- `tabId`, `tabTitle`: گروه‌بندی در تب‌ها (برای main)
- `sectionId`, `sectionTitle`: سکشن داخل تب (برای main)
- `cardId`, `cardTitle`, `collapsible`, `defaultOpen`: کارت‌های سایدبار (برای sidebar)
- `colSpan`: عدد 1..12 برای گرید
- `order`: ترتیب نمایش داخل کانتینر

اگر چیزی تعیین نشود، فرم مثل قبل عمودی زیر هم می‌آید (سازگاری عقب‌رو).

### 3) نمونه‌ی `initForm`

```ts
const initForm = {
  formItems: [
    // بخش اصلی - تب عمومی
    { inputType: 'simple-input-with-label', value: '', valid: true, used: false, validation: { required: true }, config: { name: 'title', label: 'عنوان', area: 'main', tabId: 'general', tabTitle: 'عمومی', sectionId: 'basic', sectionTitle: 'اطلاعات پایه', cardId: 'basicCard', cardTitle: 'مشخصات', colSpan: 12, order: 1, classes: 'w-full' } },
    { inputType: 'simple-input-number-with-label', value: '', valid: true, used: false, validation: {}, config: { name: 'price', label: 'قیمت', area: 'main', tabId: 'general', sectionId: 'basic', cardId: 'basicCard', colSpan: 6, order: 2, classes: 'w-full' } },
    { inputType: 'simple-input-number-with-label', value: '', valid: true, used: false, validation: {}, config: { name: 'salePrice', label: 'قیمت حراج', area: 'main', tabId: 'general', sectionId: 'basic', cardId: 'basicCard', colSpan: 6, order: 3, classes: 'w-full' } },

    // سایدبار - متاباکس‌ها
    { inputType: 'select-multi', value: [], valid: true, used: false, validation: {}, config: { name: 'categories', label: 'دسته‌بندی‌ها', area: 'sidebar', cardId: 'catsBox', cardTitle: 'دسته‌بندی‌ها', order: 1, classes: 'w-full' } },
    { inputType: 'file', value: [], valid: true, used: false, validation: {}, config: { name: 'featuredImage', label: 'عکس شاخص', area: 'sidebar', cardId: 'thumbBox', cardTitle: 'عکس شاخص', isSingle: true, order: 2, classes: 'w-full' } },
    { inputType: 'file', value: [], valid: true, used: false, validation: {}, config: { name: 'gallery', label: 'گالری تصاویر', area: 'sidebar', cardId: 'galleryBox', cardTitle: 'گالری', isSingle: false, order: 3, classes: 'w-full' } },
  ],
};
```

### 4) نکات
- `activeTabId` تب اولیه را مشخص می‌کند. تب‌ها در همان کامپوننت، با state داخلی قابل تغییرند.
- از `colSpan` برای چینش چندستونه در سکشن‌ها استفاده کنید (Tailwind grid 12 ستونی).
- اگر `area/tab/section/card` را مشخص نکنید، فرم مثل قبل به‌صورت عمودی رندر می‌شود.

### 5) مهاجرت بدون شکست
- هیچ فیلدی اجباری نیست. فرم‌های قدیمی بدون تغییر کار می‌کنند.
- برای فعال‌سازی چیدمان جدید، فقط `config.layout = "wp"` و متادیتای دلخواه را اضافه کنید.


