import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice';
import { baseApi } from "./api/baseApi";
import storage from "redux-persist/lib/storage"; // ⭐ Local Storage এর জন্য
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
// ⭐ Redux Persist Configuration
const persistConfig = {
    key: "auth",
    storage, // Local Storage use করবে
};
// ⭐ Persist Reducer তৈরি করুন
const persistedReducer = persistReducer(persistConfig, authReducer);
export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: persistedReducer,
    },
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares(
        {

            serializableCheck:{
                ignoredActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
            }
        }
    ).concat(baseApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// ⭐ Persistor তৈরি করুন
export const persistor = persistStore(store);