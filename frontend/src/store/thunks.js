import { createAsyncThunk } from "@reduxjs/toolkit";
import CloudinaryAPI from '../cloudinaryAPI';
import API from "../api";

const PROFILE_PIC_BASE_URL = `https:randomuser.me/portraits`;

const getCurrentUserById = createAsyncThunk('/getCurrentUserById', async (userId, {rejectWithValue}) => {
  try {
    const currentUser = await API.getUserById(userId);

    if (userId <= 100) {
      const sex = currentUser.user_sex === 'male' ? 'men' : 'women';
      const image_url = `${PROFILE_PIC_BASE_URL}/${sex}/${userId}.jpg`
      const public_id = `${currentUser.username}/photo1`;
      const photos = { photo1: { public_id, image_url, user_id: userId }};

      return ({...currentUser, photos});
    }

    return currentUser;

  } catch (error) {
    rejectWithValue("Can't load user data.")
  }
});

const updateUserProfile = createAsyncThunk('/userProfileUpdate', async (payload, { rejectWithValue }) => {
  const { formData, userId } = payload;
  const { bio, hates, prompts } = formData;

  try {

    const res = await Promise.all([
      API.addHates(hates, userId),
      API.addBio(bio, userId),
      API.addPrompts(prompts, userId)
    ]);

    console.log(res);

    return { hates: res[0], bio, prompts: res[2] }
  } catch (error) {
    rejectWithValue('Cannot update user profile.');
  }

});

const uploadPhoto = createAsyncThunk('/user/uploadPhoto', async (payload) => {
  const { image, options, name, userId } = payload;
  console.log(name);
  const res = await CloudinaryAPI.uploadImage(image, options);
  const query = await API.addPhoto({ userId, publicId: res.public_id, imageUrl: res.secure_url });
  return { name, ...query};
});


export { updateUserProfile, uploadPhoto, getCurrentUserById };