"use client";

import React, { useId, useMemo, useState } from "react";
import DOMPurify from "isomorphic-dompurify";

export type ExpandableTextProps = {
  /** متن کامل (می‌تواند شامل HTML باشد) */
  text: string;
  /** تعداد کاراکترهای پیش‌نمایشِ متن ساده (بدون تگ) */
  previewChars?: number;
  /** متن دکمه برای باز کردن */
  moreLabel?: string;
  /** متن دکمه برای بستن (اختیاری؛ اگر نخواهید دکمه «کمتر» نباشد، آن را null کنید) */
  lessLabel?: string | null;
  /** کلاس‌های اضافی برای روت */
  className?: string;
  /** گزینه‌های دلخواه DOMPurify */
  sanitizeOptions?: Parameters<typeof DOMPurify.sanitize>[1];
};

/**
 * نسخه بدون خطای Hydration:
 * - متن ورودی ابتدا sanitize می‌شود.
 * - در حالت «پیش‌نمایش»، فقط متن خالص (بدون تگ) نمایش داده می‌شود و سپس «…» اضافه می‌گردد.
 *   این کار از برش وسطِ تگ‌های HTML جلوگیری می‌کند و خروجی SSR/CSR را یکسان نگه می‌دارد.
 * - در حالت باز، محتوای HTML امن با `dangerouslySetInnerHTML` رندر می‌شود.
 */
export default function ExpandableText({
  text,
  previewChars = 120,
  moreLabel = "بیشتر",
  lessLabel = "کمتر",
  className = "",
  sanitizeOptions,
}: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();

  // 1) پاکسازی HTML ورودی (هم SSR هم CSR یکسان است)
  const safeHtml = useMemo(
    () => DOMPurify.sanitize(text ?? "", sanitizeOptions),
    [text, sanitizeOptions]
  );

  // 2) تولید متن ساده برای پیش‌نمایش (بدون هیچ تگی)
  const plainText = useMemo(
    () => DOMPurify.sanitize(safeHtml, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }),
    [safeHtml]
  );

  const shouldTruncate = plainText.length > previewChars;
  const previewText = shouldTruncate
    ? plainText.slice(0, Math.max(0, previewChars))
    : plainText;

  return (
    <div className={`inline leading-[2rem] text-justify ${className}`}>
      <span id={contentId}>
        {expanded || !shouldTruncate ? (
          // حالت باز: HTML امن
          <span dangerouslySetInnerHTML={{ __html: safeHtml }} />
        ) : (
          // حالت بسته: فقط متن ساده + … (بدون HTML تا برشِ وسطِ تگ رخ ندهد)
          <span>
            {previewText}
            {shouldTruncate && "…"}
          </span>
        )}
      </span>

      {shouldTruncate && (
        <button
          type="button"
          className={`${expanded ? "block" : "mr-2"} align-baseline text-primary-100 cursor-pointer hover:underline`}
          aria-expanded={expanded}
          aria-controls={contentId}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? (lessLabel ?? moreLabel) : moreLabel}
        </button>
      )}
    </div>
  );
}

/*
نمونه استفاده:

<ExpandableText
  text={'<p><span style="color:#212529">سلام <b>دنیا</b> ✨</span></p>'}
  previewChars={40}
  moreLabel="نمایش بیشتر"
  lessLabel="کمتر" // اگر نخواهید «کمتر» داشته باشید => null
/>

توضیح مشکل Hydration قبلی:
- وقتی رشته HTML را کاراکتری می‌برید (slice) ممکن است وسط تگ بریده شود و SSR و CSR خروجی متفاوت بسازند.
- در این نسخه، پیش‌نمایش فقط متنِ خالص را نشان می‌دهد، و در حالت باز کل HTML امن رندر می‌شود؛ بنابراین SSR/CSR با هم منطبق می‌مانند.
*/
