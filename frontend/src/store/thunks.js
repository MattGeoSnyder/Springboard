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

      return ({...currentUser, photos: {...currentUser.photos, ...photos}});
    }

    return currentUser;

  } catch (error) {
    return rejectWithValue("Can't load user data.")
  }
});

const loadUserOnLogin = createAsyncThunk('/loadUserOnLogin', async (userId, { rejectWithValue }) => {
  try {
    const user = await API.getUserById(userId);
    const matches = await API.getMatches(userId);
    const notifications = await API.getNotifications(userId);
    let bot_user;

    console.log(user);

    for (let key in matches.matches) {
      if (matches.matches[key].id <= 100) {
        const sex = matches.matches[key].user_sex === 'male' ? 'men' : 'women';
        const image_url = `${PROFILE_PIC_BASE_URL}/${sex}/${matches.matches[key].id}.jpg`
        const public_id = `${matches.matches[key].username}/photo1`;
        const photos = { photo1: { public_id, image_url, user_id: matches.matches[key].id }};

        matches.matches[key] = {...matches.matches[key], photos};
      }
    }

    if (userId <= 100) {
      const sex = user.user_sex === 'male' ? 'men' : 'women';
      const image_url = `${PROFILE_PIC_BASE_URL}/${sex}/${userId}.jpg`
      const public_id = `${user.username}/photo1`;
      const photos = { photo1: { public_id, image_url, user_id: userId }};

      bot_user = {...user, photos: {...user.photos, ...photos}};
      return ({ user: bot_user, matches: matches.matches, notifications });
    }

    return { user: user, matches: matches.matches, notifications};
  } catch(error) {
    return rejectWithValue("Can't load user data");
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

const uploadPhoto = createAsyncThunk('/uploadPhoto', async (payload, { rejectWithValue }) => {
  const { image, options, name, userId } = payload;
  console.log(name);
  try {
    const res = await CloudinaryAPI.uploadImage(image, options);
    const query = await API.addPhoto({ userId, publicId: res.public_id, imageUrl: res.secure_url });
    return { name, ...query};
  } catch(error) {
    return rejectWithValue("We can't upload your photo right now");
  }
});

const deletePhoto = createAsyncThunk('/deletePhoto', async (payload, { rejectWithValue }) => {
  const { userId, public_id } = payload;
  try {
    const res = await CloudinaryAPI.deletePhoto({ public_id });
    const message = await API.deletePhoto(payload);
    return message;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Cannot delete image')
  }
})

const getConversation = createAsyncThunk('/getConversation', async (payload, { rejectWithValue }) => {
  try {
    const conversation = await API.getConversation(payload)
    console.log(conversation);
    return (conversation)
  } catch (error) {
    return rejectWithValue("Can't load messages");
  } 
});

const chatBot = createAsyncThunk('/getChatBot', async (payload, { rejectWithValue }) => {
  try {
    const res = (await API.getChatBotRes(payload)).data;
    return res;
  } catch (error) {
    console.log(error);
  }
});


export { updateUserProfile, 
        uploadPhoto,
        deletePhoto, 
        getCurrentUserById, 
        loadUserOnLogin,
        getConversation,
        chatBot };