import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api.js';

const fetchMatches = createAsyncThunk('/matches/fetchMatches', async (userId) => {
    const matches = await API.getMatches(userId);
    return matches;
});

const fetchConversation = createAsyncThunk('/matches/fetchConversation', async (matchId) => {
    const conversation = await API.getConversation(matchId);
    return conversation;
});

const queryMoreMessages = createAsyncThunk('/matches/queryMoreMessages', async ({ matchId, offset }) => {
    const messages = await API.getConversation(matchId, offset);
    return messages;
});

const addLike = createAsyncThunk('/matches/addLike', async (payload) => {
    const { userId, currentUserId } = payload;
    const res = await API.like(userId, currentUserId);
    return res;
});
  
const addDislike = createAsyncThunk('matches/addDislike', async (payload) => {
    const { userId, currentUserId } = payload;
    const dislike = await API.dislike(userId, currentUserId);
    return dislike;
})

export const matches = createSlice({
    name: 'matches',
    initialState: {
        status: 'idle',
        active: false,
        matches: {}
    },
    reducers: {
        addNewMessage: (state, action) => {
            const { matchId, message } = action.payload;
            const messages = [...state[matchId].messages];
            messages.unshift(message);
            state.matches[matchId].messages = messages;
            return state;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchMatches.fulfilled, (state, action) => {
            const { matches } = action.payload;
            state.matches = matches;
            return state;
        });
        builder.addCase(fetchConversation.fulfilled, (state, action) => {
            const { matchId, messages } = action.payload;
            state.matches[matchId].messages = messages;
        });
        builder.addCase(queryMoreMessages.fulfilled, (state, action) => {
            const { matchId, messages } = action.payload;
            state.matches[matchId].messages = state[matchId].messages.concat(messages);
        });
        builder.addCase(addLike.fulfilled, (state, action) => {
            const { match } = action.payload;
            if (!match) return;
            
            const { id, user } = match;
            state.matches[id] = user;
        });
    }
});

export { fetchMatches, fetchConversation, queryMoreMessages, addLike, addDislike }
export const { addNewMessage, setActive } = matches.actions;
export default matches.reducer;