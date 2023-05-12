import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./reducers/posts";
import commentReducer from './reducers/comments';

const store = configureStore({
    reducer: {
        posts: postReducer,
        comments: commentReducer
    }
})

export default store;