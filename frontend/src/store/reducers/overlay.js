import { createSlice } from '@reduxjs/toolkit';
import { addLike } from './matches';

export const overlay = createSlice({
  name: 'overlay',
  initialState: {
    active: false,
    mode: '',
    matchId: 0,
    image: ''
  },
  reducers: {
    setOverlayActive: (state, action) => {
      const { active, mode ='' } = action.payload;
      state.active = active;
      state.mode = mode;
    },
    setOverlayImage: (state, action) => {
      state.image = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(addLike.fulfilled, (state, action) => {
      const { match } = action.payload;

      if (!match) return;

      state.active = true;
      state.mode = 'match';
      state.image = match.user?.photos?.photo1;
      state.matchId = match.id;
    });
  }
});

export const { setOverlayActive, setOverlayImage } = overlay.actions;
export default overlay.reducer;