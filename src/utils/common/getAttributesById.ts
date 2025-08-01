import {IAttributeItem , IVariantItem} from "@/types/dashboard/products/editProduct";

const getAttributesById = (attrId : string , attributeArr : IAttributeItem[] , variantArr : IVariantItem[])=>{

    const result: string[] = [];


    if(variantArr.length == 0 ){

        attributeArr.forEach(attr => {
            if(attr.attribute._id == attrId){
                const metaId = attr.attributeMeta?._id;
                if (metaId && !result.includes(metaId)) {
                    result.push(metaId);
                }
            }
        });

    }else{


        variantArr.forEach(variant => {
            variant.attributes?.forEach((attr: any) => {
            if (attr.attribute?._id === attrId) {
                const metaId = attr.attributeMeta?._id;
                if (metaId && !result.includes(metaId)) {
                result.push(metaId);
                }
            }
            });
        });

    }


    return result;

}

export default getAttributesById;