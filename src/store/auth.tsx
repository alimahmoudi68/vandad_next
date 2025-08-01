import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user : undefined ,
}

export const authSlice = createSlice({
    name : 'auth' ,
    initialState ,
    reducers : {
        updateUser : (state , action )=>{ 
            state.user = action.payload ;
        },
    }
})

export const { updateUser  } = authSlice.actions ;

export default authSlice.reducer;