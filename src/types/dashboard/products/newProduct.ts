export interface IProductVariant {
    attributes: {
        [key: string]: string;
    };
    price: number;
    stock: number;
    sku: string;
}

export interface INewProduct {
    title: string;
    slug: string;
    description: string;
    isVariant?: boolean;
    price: number;
    discount: boolean;
    discountPrice: number;
    thumbnail: string;
    images: string[];
    stock: number;
    sku: string;
    categories: string[];
    variants: IProductVariant[];
    [key: string]: any;
}

export interface INewProductApi{
    title: string;
    slug: string;
    description: string;
    isVariant?: boolean;
    price: number;
    discount: boolean;
    discountPrice: number;
    thumbnail: string | null;
    images: string[];
    stock: number;
    sku: string;
    categories: string[];
    attributes: {
        [key: string]: string;
    };
    variants: IProductVariant[];
}


export interface NewProductResponse {
    status: 'success' | 'error';
    msg?: string,
}
