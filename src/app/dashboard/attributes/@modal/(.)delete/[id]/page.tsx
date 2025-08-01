import DeleteAttributeModal from "@/components/pages/dashboard/products/attributes/deleteAttribute/DeleteAttribute";

export default async function DeleteModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <DeleteAttributeModal id={id} />;
}
