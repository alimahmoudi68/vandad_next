import DeleteAttributeModal from "@/components/pages/adminDashboard/products/productAttributesMeta/deleteAttributeMeta/DeleteAttribute";

export default async function DeleteModal({
  params,
}: {
  params: Promise<{ id: string }>;
}){

  const id = (await params).id;
    
  return (
    <DeleteAttributeModal id={+id}/>
  );
}
