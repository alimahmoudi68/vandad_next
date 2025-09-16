import DeleteCategoryModal from "@/components/pages/adminDashboard/products/categories/deleteCategory/DeleteCategory";

export default async function DeleteModal({
  params,
}: {
  params: Promise<{ id: string }>;
}){
  const id = (await params).id;
  return <DeleteCategoryModal id={+id} />;
}
