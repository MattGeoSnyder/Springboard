import { createSlice } from '@reduxjs/toolkit';

export const overlay = createSlice({
  name: 'overlay',
  initialState: {
    active: false,
    image: ''
  },
  reducers: {
    setOverlayActive: (state, action) => {
      const active = action.payload;
      state.active = active;
    },
    setOverlayImage: (state, action) => {
      state.image = action.payload;
    }
  }
});

export const { setOverlayActive, setOverlayImage } = overlay.actions;
export default overlay.reducer;