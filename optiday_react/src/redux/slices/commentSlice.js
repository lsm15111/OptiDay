/* import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { retrieveCommentApi } from '../../api/CommentApi';


    export const fetchComments = createAsyncThunk("retrieveCommentsApi", async () => {
        const response = await retrieveCommentApi();
        return response.data;
    });
    
const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        comments: [],
    },
    reducers: {
        setComments: (state, action) => {
            state.comments = action.payload;
        },
        addComment: (state, action) => {
            state.comments.push(action.payload);
        },
        deleteComment: (state, action) => {
            state.comments = state.comments.filter(comment => comment.id !== action.payload);
        },
        // addComments: (state, action) => {
        //     state.comments = action.payload; // 여러 개 추가
        // },
        updateComment: (state, action) => {
            const updatedData = action.payload;
            const commentIndex = state.comments.findIndex(comment => comment.id === updatedData.id);
            if(commentIndex !== -1) {
                state.comments[commentIndex] = { ...state.comments[commentIndex], ...updatedData };
            }
        }
    },
    extraReducers: (builder) => {
            builder
                .addCase(fetchComments.fulfilled, (state, action) => {
                    state.comments = action.payload;
                })
    },
});

export const { setComments, addComment,addComments, deleteComment,updateComment } = commentSlice.actions;
export default commentSlice.reducer; */