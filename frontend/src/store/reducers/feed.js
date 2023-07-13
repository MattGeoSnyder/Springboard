import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';

const loadFeed = createAsyncThunk('/feed/loadFeed', async (payload) => {
  const userIds = await API.getUserIds(payload);
  return userIds;
})

export const feed = createSlice({
  name: 'feed',
  initialState: {
    status: 'idle',
    userIds: []
  },
  reducers: {},
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