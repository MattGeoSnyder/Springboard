import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api.js';
import { loadUserAssets, addNewMessage } from '../thunks.js';


const fetchConversation = createAsyncThunk('/matches/fetchConversation', async (matchId) => {
    const conversation = await API.getConversation(matchId);
    return conversation;
});

const queryMoreMessages = createAsyncThunk('/matches/queryMoreMessages', async ({ matchId, offset }) => {
    const messages = await API.getConversation(matchId, offset);
    return messages;
});

const addLike = createAsyncThunk('/matches/addLike', async (payload, { getState }) => {
    const token = getState().user.user.token;
    const { userId, currentUserId } = payload;
    const res = await API.like(userId, currentUserId, token);
    return res;
});
  
const addDislike = createAsyncThunk('matches/addDislike', async (payload, { getState }) => {
    const token = getState().user.user.token;
    const { userId, currentUserId } = payload;
    const dislike = await API.dislike(userId, currentUserId, token);
    return dislike;
});

export const matches = createSlice({
    name: 'matches',
    initialState: {
        status: 'idle',
        active: false,
        matches: {}
    },
    reducers: {
        
    },
    extraReducers(builder) {
        builder.addCase(fetchConversation.fulfilled, (state, action) => {
            const { matchId, messages } = action.payload;
            state.matches[matchId].messages = messages;
        });
        builder.addCase(queryMoreMessages.fulfilled, (state, action) => {
            const { matchId, messages } = action.payload;
            state.matches[matchId].messages = state.matches[matchId].messages.concat(messages);
        });
        builder.addCase(addLike.fulfilled, (state, action) => {
            const { match } = action.payload;
            if (!match) return;
            
            const { id, user } = match;
            state.matches[id] = user;
        });
        builder.addCase(loadUserAssets.fulfilled, (state, action) => {
            state.matches = action.payload.matches;
        });
        builder.addCase(addNewMessage.fulfilled, (state, action) => {
            const { match_id } = action.payload;
            state.matches[match_id].last_interaction = JSON.stringify(new Date());
        });
    }
});

export { fetchConversation, queryMoreMessages, addLike, addDislike }
export const { setActive } = matches.actions;
export default matches.reducer;