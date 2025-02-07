import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { retrieveFollowApi } from "../../api/FollowApiService";

export const fetchFollow = createAsyncThunk("retrieveFollow", async () =>{
    const res = await retrieveFollowApi();
    console.log("fetchFollow",res.data);
    return res.data;

});

// 메모이제이션된 selector 정의
export const selectFollowers = createSelector(
    (state) => state.follow.follows,
    (follows) => follows.filter(follow => follow.status === 'FOLLOWER' || follow.status === 'MUTUAL')
);
export const selectFollowings = createSelector(
    (state) => state.follow.follows,
    (follows) => follows.filter(follow => follow.status === 'FOLLOWING' || follow.status === 'MUTUAL')
);

const followSlice = createSlice({
    name: "follow",
    initialState: { 
        follows:[]
    },
    reducers: {
        addFollow: (state, action) => {
            const followId = action.payload;
            const follow = state.follows.find(f => f.id === followId);
            follow.state = 'MUTUAL'; // 팔로우 상태 업데이트
        },
        unFollow: (state, action) => {
            const followId = action.payload;
            const followIndex = state.follows.findIndex(f => f.id === followId);

            if (followIndex !== -1) {
                const follow = state.follows[followIndex];
                if (follow.state === 'MUTUAL') {
                    follow.state = 'FOLLOWER'; // 상태를 FOLLOWER로 변경
                } else if (follow.state === 'FOLLOWING') {
                    state.follows = [
                        ...state.follows.slice(0, followIndex),
                        ...state.follows.slice(followIndex + 1),
                    ]; // 배열에서 삭제
                }
            }
        },
        updateFollow: (state, action) => {
            const updatedData = action.payload;
            console.log("updateFollow Action",updatedData);
            // console.log(action);
            // const todoIndex = state.todos.findIndex(todo => todo.id === updatedData.id);
            // if(todoIndex !== -1) {
            //     state.todos[todoIndex] = { ...state.todos[todoIndex], ...updatedData };
            // }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFollow.fulfilled, (state, action) => {
                console.log("Action PayLoad",action.payload);
                state.follows = action.payload;
            })
    },
});


export const { addFollow, unFollow, updateFollow } = followSlice.actions;
export default followSlice.reducer;