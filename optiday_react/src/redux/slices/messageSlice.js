import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { retrieveMessageApi } from '../../api/MemberApi';

export const fetchMessage = createAsyncThunk("retrieveMessageApi", async () => {
    const response = await retrieveMessageApi();
    return response.data;
});

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        message: [],
    },
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        updateMessage: (state, action) => {
            state.message = action.payload;
        }
    },
    extraReducers: (builder) => {
            builder
                .addCase(fetchMessage.fulfilled, (state, action) => {
                    state.message = action.payload;
                })
    },
});

export const { setMessage,updateMessage } = messageSlice.actions;
export default messageSlice.reducer;