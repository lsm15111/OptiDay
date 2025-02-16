import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { retrieveCategoriesApi } from '../../api/CategoryApi';

// 예시: Categories 데이터를 비동기적으로 가져오는 Thunk


export const fetchCategories = createAsyncThunk("retrieveCategoriesApi", async () => {
    const response = await retrieveCategoriesApi();
    return response.data;
});

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],  // 초기값은 빈 배열
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        addCategory: (state, action) => {
            state.categories.push(action.payload);
        },
        deleteCategory: (state, action) => {
            state.categories = state.categories.filter(category => category.id !== action.payload);
        },
        addCategories: (state, action) => {
            state.categories = [...state.categories, ...action.payload]; // 여러 개 추가
        },
        updateCategoryColor: (state, action) => {
            const { id, color } = action.payload;
            const category = state.categories.find((cat) => cat.id === id);
            if (category) {
                category.color = color;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
    },
});

export const { setCategories, addCategory,addCategories, deleteCategory, updateCategoryColor } = categorySlice.actions;
export default categorySlice.reducer;

