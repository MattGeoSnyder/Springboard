import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import matchesReducer from './reducers/matches';
import profileFormReducer from './reducers/profileForm';
import hatesSidebarReducer from './reducers/hatesSidebar';
import overlayReducer from './reducers/overlay';

const store = configureStore({
    reducer: {
        user: userReducer,
        matches: matchesReducer,
        hatesSidebar: hatesSidebarReducer,
        profileForm: profileFormReducer,
        overlay: overlayReducer
    }
});

export default store;