import { createSlice } from '@reduxjs/toolkit';

interface IAttribute {
    _id : string
    slug: string;
    isDynamic: boolean;
    title: string;
}

interface CatAttribitesAdminState {
    attributes: IAttribute[];
    loading: boolean; 
}

const initialState: CatAttribitesAdminState = {
    attributes: [],
    loading: true, 
};

export const catAttributesAdminSlice = createSlice({
    name: 'catAttributeAdmin',
    initialState,
    reducers: {
        updateCatAttributesAdmin: (state, action) => {
            state.attributes = action.payload;
            state.loading = false; 
        },
        addCatAttributesAdmin: (state, action) => {
            state.attributes.push(action.payload);
            state.loading = false; 
        },
        setLoading: (state) => {
            state.loading = true;
        }
    },
});

export const { updateCatAttributesAdmin, addCatAttributesAdmin , setLoading } = catAttributesAdminSlice.actions;

export default catAttributesAdminSlice.reducer;
