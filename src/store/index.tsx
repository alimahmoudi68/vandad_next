import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'; 
import productsAdminReducer from './productsAdmin'; 
import catsAdminReducer from './catsAdmin'; 
import attributesAdminReducer from './attributesAdmin'; 
import attributesMetaAdminReducer from './attributesMetaAdmin'; 
import catAttributesAdminReducer from './catAttributesAdmin'; 

export const store = configureStore({
  reducer: {
    auth : authReducer ,
    productsAdmin : productsAdminReducer,  
    catsAdmin : catsAdminReducer,  
    attributesAdmin : attributesAdminReducer,
    attributesMetaAdmin : attributesMetaAdminReducer,
    catAttributesAdmin : catAttributesAdminReducer,
  } 
 
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;