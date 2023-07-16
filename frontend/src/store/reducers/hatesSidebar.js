import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api.js';

const fetchHates = createAsyncThunk('/hates/getAllHates', async () => {
  const hates = await API.getHates();
  return hates;
});

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

export const hatesSidebar = createSlice({
  name: 'hatesSidebar',
  initialState: {
    active: false,
    status: 'idle',
    content: '',
    hates: {},
    conversations: {}
  },
  reducers: {
    setActive: (state, action) => {
      const active = action.payload;
      state.active = active;
      return state;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
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
    builder.addCase(fetchHates.fulfilled, (state, action) => {
      state.hates = action.payload;
    })
  }
});

export default hatesSidebar.reducer;
export const { setActive, setContent, addNewMessage } = hatesSidebar.actions;
export { fetchHates, fetchConversation, fetchMatches, queryMoreMessages };
