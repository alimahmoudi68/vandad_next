import DeleteAttributeModal from "@/components/pages/adminDashboard/products/productAttributes/deleteAttribute/DeleteAttribute";

export default async function DeleteModal({
  params,
}: {
  params: Promise<{ id: number }>;
}){

  const id = (await params).id;
    
  return (
    <DeleteAttributeModal id={id}/>
  );
}
