import { createSlice } from '@reduxjs/toolkit';
import { updateUserProfile, getCurrentUserById, uploadPhoto } from '../thunks';
import { USER_PIC_BASE_URL } from '../../cloudinaryAPI'

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
    },
    setPhoto: (state, action) => {
      const { name, public_id, image_url, user_id } = action.payload;
      state.user.photos[name] = { public_id, image_url, user_id};
    }  
  },
  extraReducers(builder) {
    builder.addCase(getCurrentUserById.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(getCurrentUserById.fulfilled, (state, action) => {
      state.status = 'success';
      state.user = action.payload;
    });
  }
});

export default currentUser.reducer;
export const { setStatus, setEditPermissions, setLikes, setPhoto } = currentUser.actions;