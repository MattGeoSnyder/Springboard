import { createAsyncThunk } from "@reduxjs/toolkit";
import CloudinaryAPI from '../cloudinaryAPI';
import API from "../api";
import { useLocalStorage } from "../hooks/useLocalStorage";

const BOT_PIC_BASE_URL = `https:randomuser.me/portraits`;
const USER_PIC_BASE_URL = 'https://res.cloudinary.com/dubjhgxii/image/upload';

const register = createAsyncThunk('/user/registerUser', async (userData, { rejectWithValue }) => {
  const [ get, set, remove ] = useLocalStorage();
  try {
      const { userId, token } = await API.signup(userData);
      const newUser = await API.getUserById(userId)
      set({ ...newUser, token });
      return { ...newUser, token };
  } catch (error) {
      return rejectWithValue(error);
  }
});

const login = createAsyncThunk('/login', async (userData, { rejectWithValue }) => {
  const [ get, set, remove ] = useLocalStorage();
  console.log(userData);
  try {
      const { id , token } = await API.login(userData);
      const user = await API.getUserById(id, token);
      set({ ...user, token });
      return ({ ...user, token });
  } catch (error) {
      return rejectWithValue(error);
  }
});



const getCurrentUserById = createAsyncThunk('/getCurrentUserById', async (userId, { rejectWithValue, getState }) => {
  const [ get, set, remove ] = useLocalStorage();
  const token = getState().user.user.token;
  console.log(userId);
  try {
    const currentUser = await API.getUserById(userId, token);

    if (userId <= 100) {
      const sex = currentUser.user_sex === 'male' ? 'men' : 'women';
      const image_url = `${BOT_PIC_BASE_URL}/${sex}/${userId}.jpg`
      const public_id = `${currentUser.username}/photo1`;
      const photo1 = { public_id, image_url, user_id: userId }

      return ({...currentUser, photos: {...currentUser.photos, photo1 }})
    }

    return currentUser

  } catch (error) {
    return rejectWithValue("Can't load user data.");
  }
});

const loadUserAssets = createAsyncThunk('/loadUserOnLogin', async (userId, { rejectWithValue, getState }) => {
  const token = getState().user.user.token;
  console.log(token);
  try {

    const matches = await API.getMatches(userId, token);
    const notifications = await API.getNotifications(userId, token);

    for (let key in matches.matches) {
      if (matches.matches[key].id <= 100) {
        const sex = matches.matches[key].user_sex === 'male' ? 'men' : 'women';
        const image_url = `${BOT_PIC_BASE_URL}/${sex}/${matches.matches[key].id}.jpg`
        const public_id = `${matches.matches[key].username}/photo1`;
        const photos = { photo1: { public_id, image_url, user_id: matches.matches[key].id }};

        matches.matches[key] = {...matches.matches[key], photos};
      }
    }


    return { matches: matches.matches, notifications};
  } catch(error) {
    return rejectWithValue("Can't load user data");
  }
});

const updateUserProfile = createAsyncThunk('/userProfileUpdate', async (payload, { rejectWithValue, getState }) => {
  const { formData, userId } = payload;
  const { bio, hates, prompts } = formData;
  const token = getState().user.user.token;

  try {

    const res = await Promise.all([
      API.addHates(hates, userId, token),
      API.addBio(bio, userId, token),
      API.addPrompts(prompts, userId, token)
    ]);

    return { hates: res[0], bio, prompts: res[2] }
  } catch (error) {
    rejectWithValue('Cannot update user profile.');
  }

});

const uploadPhoto = createAsyncThunk('/uploadPhoto', async (payload, { rejectWithValue, getState }) => {
  const token = getState().user.user.token;
  const { image, options, name, userId } = payload;
  console.log(name);
  try {
    const res = await CloudinaryAPI.uploadImage(image, options);
    const query = await API.addPhoto({ userId, publicId: res.public_id, imageUrl: res.secure_url }, token);
    return { name, ...query};
  } catch(error) {
    return rejectWithValue("We can't upload your photo right now");
  }
});

const deletePhoto = createAsyncThunk('/deletePhoto', async (payload, { rejectWithValue, getState }) => {
  const token = getState().user.user.token;
  const { name, public_id } = payload;
  try {
    const res = await CloudinaryAPI.deletePhoto({ public_id });
    const message = await API.deletePhoto(payload);
    return { name, ...message };
  } catch (error) {
    console.log(error);
    return rejectWithValue('Cannot delete image')
  }
});

const getConversation = createAsyncThunk('/getConversation', async (payload, { rejectWithValue, getState }) => {
  const token = getState().user.user.token;
  try {
    const conversation = await API.getConversation(payload, token)
    return (conversation)
  } catch (error) {
    return rejectWithValue("Can't load messages");
  } 
});

const addNewMessage = createAsyncThunk('/addNewMessage', async (payload, { rejectWithValue, getState }) => {

  const token = getState().user.user.token;
  const { userId, message, message: {id, from_user} } = payload;

  if ( userId === from_user) return message;

  try {
    const message = await API.markMessageSeen(id, token);
    return message;
  } catch (error) {
    return rejectWithValue("We can't send your message right now.")
  }
}); 


export {register,
        login,
        updateUserProfile, 
        uploadPhoto,
        deletePhoto, 
        getCurrentUserById, 
        loadUserAssets,
        getConversation,
        addNewMessage };