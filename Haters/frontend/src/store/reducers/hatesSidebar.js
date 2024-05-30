import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api.js';

const fetchHates = createAsyncThunk('/hates/getAllHates', async () => {
  const hates = await API.getHates();
  return hates;
});

//Not used right now. Will keep for later maybe
const fetchMatches = createAsyncThunk('/matches/fetchMatches', async (userId, getState ) => {
  const matches = await API.getMatches(userId);
  return matches;
});

const queryMoreMessages = createAsyncThunk('/matches/queryMoreMessages', async ({ matchId, offset }, { getState }) => {
  const token = getState().user.user.token;
  const messages = await API.getConversation(matchId, offset, token);
  return messages;
});

export const hatesSidebar = createSlice({
  name: 'hatesSidebar',
  initialState: {
    active: false,
    status: 'idle',
    content: '',
    hates: {}
  },
  reducers: {
    setActive: (state, action) => {
      const active = action.payload;
      state.active = active;
      return state;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchHates.fulfilled, (state, action) => {
      state.hates = action.payload;
    })
  }
});

export default hatesSidebar.reducer;
export const { setActive, setContent, addNewMessage } = hatesSidebar.actions;
export { fetchHates, fetchMatches, queryMoreMessages };
