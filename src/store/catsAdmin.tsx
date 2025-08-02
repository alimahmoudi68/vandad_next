import { createSlice } from "@reduxjs/toolkit";

interface ICategory {
  id: number;
  title: string;
  slug: string;
}

interface CatsAdminState {
  categories: ICategory[];
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
      console.log("action.payload", action.payload);
      console.log("state.categories", state.categories);
      state.categories = state.categories.filter(
        (cat) => cat.id !== action.payload
      );
    },
  },
});

export const { updateCatsAdmin, setLoading, removeCat } =
  catsAdminSlice.actions;

export default catsAdminSlice.reducer;
