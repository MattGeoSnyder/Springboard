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

const addNewPost = createAsyncThunk('/posts/new', async (post) => {
    const postRes = await API.addNewPost(post)
    return postRes;
})

const editPost = createAsyncThunk('/posts/edit', async (post) => {
    const postRes = await API.editPost(post);
    return postRes;
})

const deletePost = createAsyncThunk('/posts/delete', async (postId) => {
    await API.deletePost(postId);
    return { postId };
})

const postComment = createAsyncThunk('posts/comments/post', async (comment) => {
    const {id, text} = await API.newComment(comment);
    return {post_id: id, text};
})

const deleteComment = createAsyncThunk('/posts/comments/delete', async ({postId, commentId}) => {
    await API.deleteComment(postId, commentId);
    return {postId, commentId}
})

const vote = createAsyncThunk('/posts/vote', async ({id, direction}) => {
    const { votes } = await API.vote(id,direction);
    return {id, votes};
})

export const posts = createSlice({
    name: 'posts',
    initialState: {},
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(fetchPostById.fulfilled, (state, action) => {
            const {id, body, comments} = action.payload;
            if(!state[id].body) {
                state[id].body = body;
            }
            if(!state[id].comments) {
                state[id].comments = comments;
            }
            return state;
        });
        builder.addCase(postComment.fulfilled, (state, action) => {
            const {id, text} = action.payload;
            if(state[id].comments) {
                state[id].comments.push(action.payload);
            } else {
                state[id].comments = [action.payload];
            }
            return state;
        });
        builder.addCase(deleteComment.fulfilled, (state, action) => {
            const { postId, commentId } = action.payload;
            const commentIndex = state[postId].comments.findIndex((comment) => comment.id === commentId);
            console.log(commentIndex);
            state[postId].comments.splice(commentIndex,1);
        })
        builder.addCase(addNewPost.fulfilled, (state, action) => {
            const { id, title, description, body, votes } = action.payload;
            state[id] = {title, description, body, votes };
        });
        builder.addCase(editPost.fulfilled, (state, action) => {
            const { id, title, description, body, votes } = action.payload;
            state[id] = { title, description, body, votes}
        });
        builder.addCase(deletePost.fulfilled, (state, action) => {
            const { postId } = action.payload;
            delete state[postId];
            return state;
        })
        builder.addCase(vote.fulfilled, (state, action) => {
            const { id, votes } = action.payload;
            state[id].votes = votes;
        })
    }
})

export { fetchPosts, fetchPostById, postComment, deleteComment, addNewPost, editPost, deletePost, vote };
export const {loadPosts} = posts.actions;
export default posts.reducer;