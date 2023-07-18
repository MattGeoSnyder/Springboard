import { createSlice } from "@reduxjs/toolkit";
import { updateUserProfile } from "../thunks";

export const profileForm = createSlice({
  name: 'profileForm',
  initialState: {
    status: 'idle',
    formData: {
      bio: '',
      hates: [],
      prompts: {}
    },
    errMsg: ''
  },
  reducers: {
    setDefault: (state, action) => {
      console.log(action.payload);
      state.formData = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    addHate: (state, action) => {
      const hateId = action.payload;
      if (!state.formData.hates.includes(hateId)){
        state.formData.hates = [...state.formData.hates, hateId];
      }
    },
    removeHate: (state, action) => {
      const hateId = action.payload;
      state.formData.hates = state.formData.hates.filter((hate) => hate.id !== hateId);
    },
    changeBio: (state, action) => {
      const bio = action.payload;
      state.formData.bio = bio;
    },
    changePrompt: (state, action) => {
      const { name, id, promptRes } = action.payload;
      state.formData.prompts[name] = { name, id, promptRes };
    }
  },
  extraReducers(builder) {
    builder.addCase(updateUserProfile.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.status = 'success';
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.status = 'rejected';
      state.errMsg = action.payload;
    })
  }
});

export const { addHate, removeHate, changeBio, changePrompt, setDefault, setStatus } = profileForm.actions;
export default profileForm.reducer;