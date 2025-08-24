"use client";
import React from "react";

const TopTitr: React.FC = () => {
  return (
    <>
    <div className="w-full mb-10 flex flex-col items-center py-[60px] md:py-[200px]">
      <h1 className="w-full text-3xl md:text-4xl xl:text-5xl font-bold text-center xs:w-[95%] xs:max-w-[471px] xl:max-w-[714px] mb-4 md:mb-8">
        قدرتمند، امن و به سادگی چند کلیک
      </h1>
      <p className="w-full text-[#202020] dark:text-[#aaaaaa] text-center xs:w-[90%] xl:w-[50%] mb-4">
        ما استفاده از زیرساخت ابری قدرتمند را برای همه آسان کرده‌ایم. از یک وب‌سایت شخصی تا اپلیکیشن‌های بزرگ، هر آنچه برای حضور آنلاین نیاز دارید، از سرور و هاست گرفته تا دامنه و فضای ذخیره‌سازی، با چند کلیک ساده در اختیار شماست تا با خیال راحت بر رشد کسب و کار خود تمرکز کنید
        چه یک توسعه‌دهنده حرفه‌ای باشید که به دنبال مقیاس‌پذیری نامحدود و ابزارهای پیشرفته است، و چه صاحب کسب‌وکاری که به یک زیرساخت پایدار و بی‌دردسر نیاز دارد؛ چابکان به شما قدرت می‌دهد تا روی خلق ایده‌های بزرگ تمرکز کنید، نه مدیریت پیچیدگی‌های سرور.
      </p>
      <div className="flex items-center gap-x-3">
        <div className="px-4 py-2 cursor-pointer rounded-md border border-primary-100 text-primary-100">درخواست مشاوره</div>
        <div className="px-4 py-2 cursor-pointer rounded-md border border-primary-100 bg-primary-100 text-white-100">مشاهده دوره‌ها</div>
      </div>
    </div>
    </>
  );
};

export default TopTitr;
