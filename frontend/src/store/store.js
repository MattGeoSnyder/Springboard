import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import matchesReducer from './reducers/matches';

const store = configureStore({
    reducer: {
        user: userReducer,
        matches: matchesReducer
    }
});

export default store;