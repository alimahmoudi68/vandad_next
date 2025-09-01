import myFetchServer from '@/services/myFetchServer'; 
import { IProduct } from '@/types/products';

import type {
  INewProductApi,
  NewProductResponse,
} from "@/types/products";


interface ProductsResponse {
  status: "success" | "error";
  products? :IProduct[];
  pagination?: {
    page: number,
    pages: number
  };
  msg?: string;
}

export const products = async (p: number , q: string): Promise<ProductsResponse> => {
  return await myFetchServer(`/admin/products?page=${p}&limit=20&&q=${q}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
};

export const newProduct = async (
  productData: INewProductApi
): Promise<NewProductResponse> => {
  return await myFetchServer("/admin/products", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
    method: "POST",
  });
};


export const editProduct = async (
  id: string,
  productData: INewProductApi
): Promise<NewProductResponse> => {
  return await myFetchServer(`/admin/products/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
    method: "PUT",
  });
};

export const singleProduct = async (id: string) => {
  return await myFetchServer(`/admin/products/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const removeProduct = async (id: number) => {
  return await myFetchServer(`/admin/products/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
};
