import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';

const loadFeed = createAsyncThunk('/feed/loadFeed', async (payload, { getState, rejectWithValue }) => {
  const token = getState().user.user.token;
  try {
    const userIds = await API.getUserIds(payload, token);
    return userIds;      
  } catch (error) {
    return rejectWithValue(error);
  }
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
    },
    setStatus: (state, action) => {
      state.status = action.payload;
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
    builder.addCase(loadFeed.rejected, (state, action) => {
      state.status = 'rejected';
    });
  } 
});

export default feed.reducer;
export { loadFeed }
export const { getNextUser, setStatus } = feed.actions;