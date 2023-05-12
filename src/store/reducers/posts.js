import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from '../../api';

const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const posts = await API.getPosts();
    return posts;
});

const fetchPostById = createAsyncThunk('posts/fetchPostById', async (id) => {
    const post = await API.getPostById(id)
    return post;
});

const postComment = createAsyncThunk('posts/postComment', async (comment) => {
    const post = await API.newComment(comment);
    return comment;
})

export const posts = createSlice({
    name: 'posts',
    initialState: {},
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            return action.payload;
        })
        builder.addCase(fetchPostById.fulfilled, (state, action) => {
            const {id, body, comments} = action.payload;
            if(!state[id].body) {
                state[id].body = body;
            }
            if(!state[id].comments) {
                state[id].comments = comments;
            }
            return state;
        })
        builder.addCase(postComment.fulfilled, (state, action) => {
            console.log(action);
            const {id, text} = action.payload;
            if(state[id].comments) {
                state[id].comments.push(action.payload);
            } else {
                state[id].comments = [action.payload];
            }
            return state;
        })
    }
})

export { fetchPosts, fetchPostById, postComment };
export const {loadPosts} = posts.actions;
export default posts.reducer;