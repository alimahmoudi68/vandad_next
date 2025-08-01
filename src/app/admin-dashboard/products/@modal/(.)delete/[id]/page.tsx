import DeleteProductModal from "@/components/pages/dashboard/products/products/deleteProduct/DeleteProduct";

export default async function DeleteModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <DeleteProductModal id={id} />;
}
