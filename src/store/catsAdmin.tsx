import { createSlice } from '@reduxjs/toolkit';

interface ICategory {
    _id: string;
    title: string;
    slug: string;
    [key: string]: any;
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
    name: 'catsAdmin',
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
            state.categories = state.categories.filter(cat => cat._id !== action.payload);
        },
    },
});

export const { updateCatsAdmin, setLoading, removeCat } = catsAdminSlice.actions;

export default catsAdminSlice.reducer;
