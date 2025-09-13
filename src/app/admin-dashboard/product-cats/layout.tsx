export default function ProductsLayout({
    children,
    modal,
  }: {
    children: React.ReactNode;
    modal: React.ReactNode;
  }) {
    return (
      <div>
        {children}   {/* محتوای اصلی (لیست دسته بندی ها) */}
        {modal}      {/* Slot مخصوص برای مودال */}
      </div>
    );
  }
  