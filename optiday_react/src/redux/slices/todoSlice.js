import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { retrieveTodosApi } from '../../api/TodoApi';


    export const fetchTodos = createAsyncThunk("retrieveTodosApi", async () => {
        const response = await retrieveTodosApi();
        return response.data;
    });
    
const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: [],
    },
    reducers: {
        setTodos: (state, action) => {
            state.todos = action.payload;
        },
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        addTodos: (state, action) => {
            state.todos = [...state.todos, ...action.payload]; // 여러 개 추가
        },
        updateTodo: (state, action) => {
            const updatedData = action.payload;
            const todoIndex = state.todos.findIndex(todo => todo.id === updatedData.id);
            if(todoIndex !== -1) {
                state.todos[todoIndex] = { ...state.todos[todoIndex], ...updatedData };
            }
        }
    },
    extraReducers: (builder) => {
            builder
                .addCase(fetchTodos.fulfilled, (state, action) => {
                    state.todos = action.payload;
                })
    },
});

export const { setTodos, addTodo,addTodos, deleteTodo,updateTodo } = todoSlice.actions;
export default todoSlice.reducer;