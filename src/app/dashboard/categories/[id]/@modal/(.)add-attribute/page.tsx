import AddAttributeModal from "@/components/pages/dashboard/products/categories/addAttribute/AddAttribute";

export default async function DeleteModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <AddAttributeModal id={id} />;
}
