import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CloudinaryAPI from '../../cloudinaryAPI';
import API from '../../api.js';

const registerUser = createAsyncThunk('/users/registerUser', async (userData) => {
    const newUser = await API.signup(userData);
    return newUser;
});

const authUser = createAsyncThunk('/users/authUser', async (userData, { rejectWithValue }) => {
    const res = await API.login(userData);
    const { error } = res;
    if (error) {
        return rejectWithValue(error);
    }
    return res;
});

const uploadPhoto = createAsyncThunk('/users/uploadPhoto', async (payload) => {
    const { image, options, name, userId } = payload;
    console.log('uploading photo...')
    const res = await CloudinaryAPI.uploadImage(image, options);
    console.log(res);
    const query = await API.addPhoto({ userId, publicId: res.public_id, imageUrl: res.secure_url });
    return { name, ...query};
});
  

export const user = createSlice({
    name: 'user',
    initialState: {
        // id will need to be added on signup/login. This is here for testing now.
        status: 'idle',
        user: { username: 'rachwake23' },
        id: 1,
        testuser: { id: 3, 
                    username: 'rachwake23',
                    first_name: 'Rachel', 
                    birthday: '2000-03-23',
                    user_sex: 'female',
                    sex_preference: 'male',
                    photos: {},
                    hates: []
                    }
    },
    reducers: {
        
    },
    extraReducers(builder) {
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.status = 'success';
            state.user = action.payload;
            return state;
        });
        builder.addCase(authUser.pending, (state, action) => {
            state.status = 'pending';
            return state;
        });
        builder.addCase(authUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.status = 'success';
            return state;
        });
        builder.addCase(authUser.rejected, (state, action) => {
            const { message } = action.payload;
            state.status = 'rejected';
            state.errMsg = message;
        });
        builder.addCase(uploadPhoto.pending, (state, action) => {

        });
        builder.addCase(uploadPhoto.fulfilled, (state, action) => {
            const { name, public_id, image_url } = action.payload;
            state.testuser.photos[name] = { publicId: public_id, image_url }
        });
    }
});

export { registerUser, authUser, uploadPhoto } 
export const { addHate, removeHate } = user.actions;
export default user.reducer;