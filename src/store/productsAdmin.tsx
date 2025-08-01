import { createSlice } from '@reduxjs/toolkit';

interface IProduct {
    _id: string;
    title: string;
    slug: string;
    [key: string]: any;
}

interface ProductsAdminState {
    products: IProduct[];
    loading: boolean; // اضافه کردن وضعیت loading
}

const initialState: ProductsAdminState = {
    products: [],
    loading: true, // مقدار اولیه false
};

export const productsAdminSlice = createSlice({
    name: 'productsAdmin',
    initialState,
    reducers: {
        update: (state, action) => {
            state.products = action.payload;
            state.loading = false; // پس از بارگذاری داده‌ها، loading را false می‌کنیم
        },
        setLoading: (state) => {
            state.loading = true; // در زمان بارگذاری داده‌ها، loading را true می‌کنیم
        },
        remove: (state, action) => {
            state.products = state.products.filter(item => item._id !== action.payload);
        },
    },
});

export const { update, setLoading, remove } = productsAdminSlice.actions;

export default productsAdminSlice.reducer;
