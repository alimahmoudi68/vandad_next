import { createSlice } from '@reduxjs/toolkit';

interface IAttributeMeta {
    _id: string;
    title: string;
    slug: string;
    [key: string]: any;
}

interface AttributesMetaAdminState {
    attributesMeta: IAttributeMeta[];
    loading: boolean; 
}

const initialState: AttributesMetaAdminState = {
    attributesMeta: [],
    loading: true, 
};

export const attributesMetaAdminSlice = createSlice({
    name: 'attributesMetaAdmin',
    initialState,
    reducers: {
        updateAttributesMetaAdmin: (state, action) => {
            state.attributesMeta = action.payload;
            state.loading = false; 
        },
        setLoading: (state) => {
            state.loading = true; 
        },
        removeAttributeMeta: (state, action) => {
            state.attributesMeta = state.attributesMeta.filter(item => item._id !== action.payload);
        },
    },
});

export const { updateAttributesMetaAdmin, setLoading, removeAttributeMeta } = attributesMetaAdminSlice.actions;

export default attributesMetaAdminSlice.reducer;
