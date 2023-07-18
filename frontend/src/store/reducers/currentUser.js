import { createSlice } from '@reduxjs/toolkit';
import { updateUserProfile, getCurrentUserById } from '../thunks';
import API from '../../api';

const PROFILE_PIC_BASE_URL = `https:randomuser.me/portraits`;



export const currentUser = createSlice({
  name: 'currentUser',
  initialState: {
    status: 'idle',
    editable: false,
    likes: null,
    user: {
      id: 3, 
      first_name: 'Rachel',
      birthday: '2000-03-23',
      user_sex: 'female',
      sex_preference: 'male',
      photos: {},
      prompts: {},
      hates: []
    }
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setEditPermissions: (state, action) => {
      state.editable = action.payload;
    },
    setLikes: (state, action) => {
      state.likes = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(getCurrentUserById.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(getCurrentUserById.fulfilled, (state, action) => {
      state.status = 'success';
      state.user = action.payload;
    })
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      const { hates, bio, prompts } = action.payload;
      state.user = {...state.user, hates, bio, prompts};
    });
  }
});

export default currentUser.reducer;
export const { setStatus, setEditPermissions, setLikes } = currentUser.actions;