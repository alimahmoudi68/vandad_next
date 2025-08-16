'use client';

import React, { useEffect, useRef, useState } from 'react';

type Props = {
  // یکی از اینا داده بشه:
  directUrl?: string;            // اگر لینک مستقیم داری
  presignedApi?: string;         // مثلاً "/api/get-presigned" (POST یا GET)
  videoKey?: string;             // کلید فایل در MinIO (وقتی presignedApi داری)
  poster?: string;               // تصویر بندانگشتی
  className?: string;
  // optional: expires یا پارامترهای بیشتری که API ممکنه بخواد
};

export default function LazyVideoPlayer({
  directUrl,
  presignedApi,
  videoKey,
  poster,
  className = '',
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(directUrl ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // IntersectionObserver to lazy-load
  useEffect(() => {
    if (!containerRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px' } // شروع زودتر وقتی نزدیک شد
    );
    io.observe(containerRef.current);
    return () => io.disconnect();
  }, []);

  // when visible, if need presigned, fetch it
  useEffect(() => {
    if (!isVisible) return;
    if (videoUrl) return; // already have direct url

    if (!presignedApi || !videoKey) {
      setError('آدرس ویدیو موجود نیست.');
      return;
    }

    let aborted = false;
    const fetchUrl = async () => {
      try {
        setLoading(true);
        setError(null);

        // مثال: POST با body { key: 'videos/xxx.mp4' }
        const res = await fetch(presignedApi, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: videoKey }),
        });

        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`خطا از سرور: ${res.status} ${txt}`);
        }

        const json = await res.json();
        // انتظار داریم { url: "https://..." }
        if (!json?.url) throw new Error('پاسخ سرور شامل url نیست.');

        if (!aborted) setVideoUrl(String(json.url));
      } catch (err: any) {
        setError(err?.message ?? 'خطای نامشخص');
      } finally {
        if (!aborted) setLoading(false);
      }
    };

    fetchUrl();
    return () => {
      aborted = true;
    };
  }, [isVisible, presignedApi, videoKey, videoUrl]);

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      {!isVisible ? (
        // Placeholder قبل از اینکه عنصر دیده بشه
        <div className="w-full aspect-[16/9] bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">در حال آماده‌سازی ویدیو…</span>
        </div>
      ) : loading ? (
        <div className="w-full aspect-[16/9] bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="animate-pulse text-gray-500">در حال بارگذاری لینک…</div>
        </div>
      ) : error ? (
        <div className="w-full aspect-[16/9] bg-red-50 rounded-lg p-4">
          <p className="text-red-600">خطا: {error}</p>
          <button
            className="mt-3 px-3 py-2 bg-red-600 text-white rounded"
            onClick={() => {
              setError(null);
              setVideoUrl(null);
              setLoading(false);
              setIsVisible(true); // trigger fetch again
            }}
          >
            تلاش دوباره
          </button>
        </div>
      ) : videoUrl ? (
        <div className="w-full">
          <video
            ref={videoRef}
            controls
            preload="metadata"
            poster={poster}
            style={{ width: '100%', borderRadius: 12 }}
            // پیشنهاد: اگر می‌خوای autoplay با muted باشه، این props رو اضافه کن
            // muted playsInline
          >
            <source src={videoUrl} type="video/mp4" />
            مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
          </video>
        </div>
      ) : (
        <div className="w-full aspect-[16/9] bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">آماده‌سازی…</span>
        </div>
      )}
    </div>
  );
}
