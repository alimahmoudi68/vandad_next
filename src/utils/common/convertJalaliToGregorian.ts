import moment from 'moment-jalaali';

// فعال‌سازی پشتیبانی از تقویم جلالی
moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: false });

/**
 * تبدیل تاریخ شمسی (با اعداد فارسی یا انگلیسی) به تاریخ میلادی
 * @param jalaliDate - تاریخ شمسی مثل "۱۴۰۴/۰۵/۰۶" یا "1404/05/06"
 * @returns تاریخ میلادی با فرمت YYYY-MM-DD یا null اگر نامعتبر باشد
 */
export function convertJalaliToGregorian(jalaliDate: string): string | null {
  if (!jalaliDate) return null;

  // تبدیل اعداد فارسی به انگلیسی
  const fixedDate = jalaliDate.replace(/[۰-۹]/g, (w) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(w)));

  // ساخت moment با فرمت شمسی
  const m = moment(fixedDate, 'jYYYY/jMM/jDD');

  // بررسی اعتبار
  if (!m.isValid()) return null;

  return m.format('YYYY-MM-DD');
}
