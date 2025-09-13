import DeleteCategoryModal from "@/components/pages/adminDashboard/products/categories/deleteCategory/DeleteCategory";

export default function DeleteModal({
  params,
}: {
  params: { id: number };
}) {
  const { id } = params;
  return <DeleteCategoryModal id={id} />;
}
