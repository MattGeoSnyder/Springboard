import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';

const loadFeed = createAsyncThunk('/feed/loadFeed', async (payload, { getState }) => {
  const token = getState().user.user.token;
  const userIds = await API.getUserIds(payload, token);
  return userIds;
})

export const feed = createSlice({
  name: 'feed',
  initialState: {
    status: 'idle',
    userIds: []
  },
  reducers: {
    getNextUser: (state, action) =>{
      state.userIds.shift();
    }
  },
  extraReducers(builder) {
    builder.addCase(loadFeed.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(loadFeed.fulfilled, (state, action) => {
      state.userIds = action.payload;
      state.status = 'success';
    });
  } 
});

export default feed.reducer;
export { loadFeed }
export const { getNextUser } = feed.actions;