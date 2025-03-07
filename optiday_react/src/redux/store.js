import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import todoReducer from './slices/todoSlice';
import messageReducer from './slices/messageSlice';
import followReducer from './slices/followSlice';
// import commentReducer from './slices/commentSlice';

export const store = configureStore({
    reducer: {
        categories: categoryReducer,
        todos: todoReducer,
        message: messageReducer,
        follow: followReducer,
        // comment: commentReducer
    }
});