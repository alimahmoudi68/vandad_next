import { IProduct } from "@/types/products";

// Returns the selected attributeMeta ids for a given attribute slug from product.attributes
const extractAttrFromVariants = (product: IProduct, attributeSlug: string): number[] => {
	const variants: any[] = (product as any)?.variants ?? [];

	return variants
		.flatMap((variant: any) => {
			const attributes = Array.isArray(variant?.attributes)
				? variant.attributes
				: variant?.attributes
				? [variant.attributes]
				: [];

			return attributes
				.filter((attr: any) => attr?.attribute?.slug === attributeSlug)
				.map((attr: any) => attr?.attributeMeta?.id);
		})
		.filter((id: unknown): id is number => typeof id === "number");
};

export default extractAttrFromVariants;