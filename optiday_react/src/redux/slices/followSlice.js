import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { retrieveFollowApi } from "../../api/FollowApi";

export const fetchFollow = createAsyncThunk("retrieveFollow", async () =>{
    const res = await retrieveFollowApi();
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
            const follow = action.payload;
            const followIndex = state.follows.findIndex(f => f.id === follow.id);
            if(followIndex === -1) {
                state.follows.push(follow);
                return;
            }
            state.follows[followIndex] = { ...state.follows[followIndex], ...follow, };
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
            }else {
                console.log("Follow ID not found:", followId);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFollow.fulfilled, (state, action) => {
                state.follows = action.payload;
            })
    },
});


export const { addFollow, unFollow, updateFollow } = followSlice.actions;
export default followSlice.reducer;