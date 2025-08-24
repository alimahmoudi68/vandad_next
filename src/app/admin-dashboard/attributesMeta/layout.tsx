export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children} {/* محتوای اصلی (لیست دسته بندی ها) */}
    </div>
  );
}
