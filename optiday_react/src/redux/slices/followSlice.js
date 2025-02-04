// import { createSlice } from '@reduxjs/toolkit';


// const followSlice = createSlice({
//     name: 'follow',
//     initialState: {
//         follows: [],
//     },
//     reducers: {
//         setFollow: (state, action) => {
//             state.follows = action.payload;
//         },
//         addFollow: (state, action) => {
//             state.follows.push(action.payload);
//         },
//         deleteFollow: (state, action) => {
//             state.follows = state.follows.filter(follow => follow.id !== action.payload);
//         },
//         addFollows: (state, action) => {
//             state.follows = [...state.follows, ...action.payload]; // 여러 개 추가
//         },
//         updateFollow: (state, action) => {
//             const updatedData = action.payload;
//             const followIndex = state.follows.findIndex(follow => follow.id === updatedData.id);
//             if(followIndex !== -1) {
//                 state.follows[followIndex] = { ...state.follows[followIndex], ...updatedData };
//             }
//         }
//     }
// });

// export const { setFollow, addFollow,addFollows, deleteFollow,updateFollow } = followSlice.actions;
// export default followSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { retrieveFollowersApi, retrieveFollowingsApi } from "../../api/FollowApiService";

export const fetchFollowers = createAsyncThunk("retrieveFollowersApi", async () => {
    const res = await retrieveFollowersApi();
    return res.data;
});

export const fetchFollowings = createAsyncThunk("retrieveFollowingsApi", async () => {
    const res = await retrieveFollowingsApi();
    return res.data;
});

const followSlice = createSlice({
    name: "follow",
    initialState: { followers: [], followings: [] },
    reducers: {
        addFollow: (state, action) => {
            state.followers.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFollowers.fulfilled, (state, action) => {
                state.followers = action.payload;
            })
            .addCase(fetchFollowings.fulfilled, (state, action) => {
                state.followings = action.payload;
            });
    },
});

export default followSlice.reducer;