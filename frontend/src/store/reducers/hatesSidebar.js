import { createSlice } from '@reduxjs/toolkit';

export const hatesSidebar = createSlice({
  name: 'hatesSidebar',
  initialState: {
    active: false
  },
  reducers: {
    setActive: (state, action) => {
      const active = action.payload;
      state.active = active;
      return state;
    }
  }
});

export default hatesSidebar.reducer;
export const { setActive } = hatesSidebar.actions;
