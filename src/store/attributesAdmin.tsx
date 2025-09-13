import { createSlice } from '@reduxjs/toolkit';

import { IAttribute } from "@/types/products";


interface AttributesAdminState {
    attributes: IAttribute[];
    loading: boolean; 
}

const initialState: AttributesAdminState = {
    attributes: [],
    loading: true, 
};

export const attributesAdminSlice = createSlice({
    name: 'attributesAdmin',
    initialState,
    reducers: {
        updateAttributesAdmin: (state, action) => {
            state.attributes = action.payload;
            state.loading = false; // پس از بارگذاری داده‌ها، loading را false می‌کنیم
        },
        setLoading: (state) => {
            state.loading = true; // در زمان بارگذاری داده‌ها، loading را true می‌کنیم
        },
        removeAttribute: (state, action) => {
            state.attributes = state.attributes.filter(item => item.id !== action.payload);
        },
    },
});

export const { updateAttributesAdmin, setLoading, removeAttribute } = attributesAdminSlice.actions;

export default attributesAdminSlice.reducer;
