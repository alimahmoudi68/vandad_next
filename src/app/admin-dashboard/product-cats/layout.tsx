export default function ProductsLayout({
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
