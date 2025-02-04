import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';  // 나중에 만들 Slice
import categoryReducer from './slices/categorySlice';
import todoReducer from './slices/todoSlice';
import messageReducer from './slices/messageSlice';
import followReducer from './slices/followSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,  // 여러 개의 reducer를 여기에 추가할 수 있음
        categories: categoryReducer,
        todos: todoReducer,
        message: messageReducer,
        follow: followReducer
    }
});