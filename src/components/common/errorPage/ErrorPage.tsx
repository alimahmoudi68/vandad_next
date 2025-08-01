"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type ErrorPagePros = {
    message?: string;
    statusCode?: number;
    retryable?: boolean;
    redirectable?: boolean;
    redirectUrl?: string;
    redirectText?: string;
    retryText?: string;
    errorInfo?: any;
}

const ErrorPage = ({
  message = "خطایی رخ داده است",
  statusCode = 500,
  retryable = true,
  redirectable = true,
  redirectUrl = "/dashboard",
  redirectText = "بازگشت به داشبورد",
  retryText = "تلاش مجدد",
  errorInfo,
}: ErrorPagePros) => {
  const router = useRouter();

  useEffect(() => {
    if (statusCode >= 500) {
      console.error("Server Error:", message);
    }
  }, [message, statusCode]);

  const handleRetry = () => {
    window.location.reload();
  };

  const handleRedirect = () => {
    router.push(redirectUrl);
  };

  const renderStatusCode = () => {
    if (!statusCode) return null;

    let statusMessage = "";
    switch (statusCode) {
      case 400:
        statusMessage = "درخواست نامعتبر";
        break;
      case 401:
        statusMessage = "عدم دسترسی";
        break;
      case 403:
        statusMessage = "ممنوع";
        break;
      case 404:
        statusMessage = "صفحه مورد نظر یافت نشد";
        break;
      case 500:
        statusMessage = "خطای سرور";
        break;
      default:
        statusMessage = `خطای ${statusCode}`;
    }

    return (
      <div className="mb-6 text-lg text-gray-600">
        <span className="ml-2">{statusCode}</span>
        <span>{statusMessage}</span>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] p-8">
      <div className="max-w-md w-full text-center">
        {renderStatusCode()}

        <p className="text-lg text-gray-600 mb-8 leading-relaxed">{message}</p>
        {/* نمایش اطلاعات خطا در صورت وجود */}
        {errorInfo && (
          <div
            className="bg-gray-100 text-left text-xs p-4 rounded mb-4 overflow-x-auto"
            style={{ direction: "ltr" }}
          >
            <strong>Error Details:</strong>
            <pre>{JSON.stringify(errorInfo, null, 2)}</pre>
          </div>
        )}
        <div className="flex gap-4 justify-center">
          {retryable && (
            <button
              onClick={handleRetry}
              className="px-6 py-2 bg-gray-100 text-white-100 border border-primary-100 bg-primary-100 rounded-lg hover:text-primary-100 hover:bg-transparent transition-colors"
            >
              {retryText}
            </button>
          )}

          {redirectable && (
            <button
              onClick={handleRedirect}
              className="px-6 py-2 bg-gray-100 text-white-100 border border-primary-100 bg-primary-100 rounded-lg hover:text-primary-100 hover:bg-transparent transition-colors"
            >
              {redirectText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
