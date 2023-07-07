import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";

const postHates = createAsyncThunk('/hates/add', async (payload) => {
  const { hates, userId } = payload;
  const res = await API.addHates(hates, userId);
  return res;
});

const postBio = createAsyncThunk('/bio/post', async (payload) => {
  const res = await API.addBio(payload);
  return res
});

const postPrompt = createAsyncThunk('/prompts/add', async (payload) => {
  console.log(payload);
  const { userId, ...promptData } = payload;
  const res = await API.addPrompt(promptData, userId);
  return res;
});

export const profileForm = createSlice({
  name: 'profileForm',
  initialState: {
    status: 'idle',
    formData: {
      bio: '',
      hates: [],
      prompt1: {},
      prompt2: {},
      prompt3: {}
    }
  },
  reducers: {
    addHate: (state, action) => {
      const hate = action.payload;
      if (!state.formData.hates.map((hate) => hate.id).includes(hate.id)){
        state.formData.hates = [...state.formData.hates, hate];
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
      state.formData[name] = { name, id, promptRes };
    },
    submitForm: (state, action) => {
      state.status = 'pending';
    }
  },
  extraReducers(builder) {
    builder.addCase(postHates.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(postHates.fulfilled, (state, action) => {
      state.status = 'success';
    });
    builder.addCase(postBio.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(postBio.fulfilled, (state, action) => {
      state.status = 'success';
      state.formData.bio = action.payload;
    }); 
    builder.addCase(postPrompt.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(postPrompt.fulfilled, (state, action) => {
      state.status = 'success';
      console.log(action.payload);
      const { name, id, promptres: promptRes } = action.payload;
      state.formData[name] = { id, promptRes };
    });
  }
});

export const { addHate, removeHate, changeBio, changePrompt, submitForm } = profileForm.actions;
export default profileForm.reducer;
export { postHates, postBio, postPrompt };