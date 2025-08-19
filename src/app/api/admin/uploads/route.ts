import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { status: "error", msg: "فایل یافت نشد" },
        { status: 400 }
      );
    }

    // بررسی نوع فایل
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { status: "error", msg: "نوع فایل مجاز نیست" },
        { status: 400 }
      );
    }

    // بررسی اندازه فایل (50 مگابایت)
    const maxSize = 50 * 1024 * 1024; // 50MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json(
        { status: "error", msg: "اندازه فایل بیش از حد مجاز است" },
        { status: 400 }
      );
    }

    // در اینجا باید کد آپلود به S3 یا سرور فایل قرار گیرد
    // فعلاً یک پاسخ موقت برمی‌گردانیم
    const uploadId = Date.now().toString();
    const fileName = `${uploadId}_${file.name}`;
    const bucketName = "uploads";

    return NextResponse.json({
      status: "success",
      upload: {
        id: uploadId,
        title: file.name,
        location: fileName,
        thumb: fileName,
        bucket: bucketName,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { status: "error", msg: "خطا در آپلود فایل" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { status: "error", msg: "شناسه فایل یافت نشد" },
        { status: 400 }
      );
    }

    // در اینجا باید کد حذف فایل از S3 یا سرور فایل قرار گیرد
    // فعلاً یک پاسخ موقت برمی‌گردانیم

    return NextResponse.json({
      status: "success",
      msg: "فایل با موفقیت حذف شد",
    });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { status: "error", msg: "خطا در حذف فایل" },
      { status: 500 }
    );
  }
}

