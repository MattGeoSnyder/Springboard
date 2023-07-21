import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import currentUserReducer from './reducers/currentUser';
import feedReducer from './reducers/feed';
import matchesReducer from './reducers/matches';
import messagesReducer from './reducers/messages';
import profileFormReducer from './reducers/profileForm';
import hatesSidebarReducer from './reducers/hatesSidebar';
import overlayReducer from './reducers/overlay';

const store = configureStore({
    reducer: {
        user: userReducer,
        currentUser: currentUserReducer,
        feed: feedReducer,
        matches: matchesReducer,
        messages: messagesReducer,
        hatesSidebar: hatesSidebarReducer,
        profileForm: profileFormReducer,
        overlay: overlayReducer
    }
});

export default store;