import { createSlice } from "@reduxjs/toolkit";

import { IProductCat } from "@/types/products";

interface CatsAdminState {
  categories: IProductCat[];
  loading: boolean; // اضافه کردن وضعیت loading
}

const initialState: CatsAdminState = {
  categories: [],
  loading: true, // مقدار اولیه false
};

export const catsAdminSlice = createSlice({
  name: "catsAdmin",
  initialState,
  reducers: {
    updateCatsAdmin: (state, action) => {
      state.categories = action.payload;
      state.loading = false; // پس از بارگذاری داده‌ها، loading را false می‌کنیم
    },
    setLoading: (state) => {
      state.loading = true; // در زمان بارگذاری داده‌ها، loading را true می‌کنیم
    },
    removeCat: (state, action) => {
      const idToRemove = action.payload as number;

      const removeFromTree = (nodes: IProductCat[]): IProductCat[] => {
        if (!nodes) return [];
        return nodes
          .filter((node) => node.id !== idToRemove)
          .map((node) => ({
            ...node,
            children: removeFromTree(node.children ?? []),
          }));
      };

      state.categories = removeFromTree(state.categories);
    },
  },
});

export const { updateCatsAdmin, setLoading, removeCat } =
  catsAdminSlice.actions;

export default catsAdminSlice.reducer;
