import { IProduct, IProductAttr } from "@/types/products";

// Returns the selected attributeMeta ids for a given attribute slug from product.attributes
const extractAttrFromAttributes = (product: IProduct, attributeSlug: string): number[] => {
	const attributesArray: IProductAttr[] = product.attributes
		? ((Array.isArray(product.attributes)
			? product.attributes
			: [product.attributes]) as unknown as IProductAttr[])
		: [];

	return attributesArray
		.filter((productAttribute: IProductAttr) => productAttribute.attribute.slug === attributeSlug)
		.map((productAttribute: IProductAttr) => productAttribute.attributeMeta.id as number)
		.filter((id): id is number => typeof id === "number");
};

export default extractAttrFromAttributes;