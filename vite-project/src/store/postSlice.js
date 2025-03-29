import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import databaseService from "../appwrite/post.config.js";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await databaseService.getPosts();
        console.log("Returned response from getPosts: ", response);
        return response?.documents;
    } catch (error) {
        console.log(error.message);
    }
});

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (slug) => {
    try {
        const response = await databaseService.getPost(slug);
        console.log("Returned response from getPost: ", response);
        return response;
    } catch (error) {
        console.log(error.message);
    }
})

const postSlice = createSlice({

    name: "posts",

    initialState: {
        posts: [],
        post: {},
        error: null,
        status: 'idle'
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

        builder
            .addCase(fetchPostById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPostById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.post = action.payload;
            })
            .addCase(fetchPostById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
})

export default postSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import databaseService from "../appwrite/appwriteconfig";

// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
//     try {
//         const response = await databaseService.getPosts();
//         return response.documents || [];
//     } catch (error) {
//         console.log(error.message);
//     }
// })

// export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (slug) => {
//     try {
//         const response = await databaseService.getPost(slug);
//         return response || {};
//     } catch (error) {
//         console.log(error.message);
//     }
// });

// const postSlice = createSlice({
//     name: 'posts',

//     initialState: {
//         status: 'idle',
//         posts: [],
//         post: {},
//         error: null
//     },

//     reducers: {},

//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchPosts.pending, (state) => {
//                 state.status = "Loading";
//             })
//             .addCase(fetchPosts.fulfilled, (state, action) => {
//                 state.status = "succeeded";
//                 state.posts = action.payload;
//             })
//             .addCase(fetchPosts.rejected, (state, action) => {
//                 state.status = "failed";
//                 state.error = action.error.message;
//             })

//         builder
//             .addCase(fetchPostById.pending, (state) => {
//                 state.status = "Loading";
//             })
//             .addCase(fetchPostById.fulfilled, (state, action) => {
//                 state.status = "succeeded";
//                 state.post = action.payload;
//             })
//             .addCase(fetchPostById.rejected, (state, action) => {
//                 state.status = "succeeded";
//                 state.error = action.error.message;
//             })
//     }
// })

// export const { savePost } = postSlice.actions
// export default postSlice.reducer;
