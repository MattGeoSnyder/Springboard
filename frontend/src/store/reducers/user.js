import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api.js';
import { updateUserProfile, uploadPhoto } from '../thunks';

const registerUser = createAsyncThunk('/user/registerUser', async (userData) => {
    const newUser = await API.signup(userData);
    return newUser;
});

const authUser = createAsyncThunk('/user/authUser', async (userData, { rejectWithValue }) => {
    const res = await API.login(userData);
    const { error } = res;
    if (error) {
        return rejectWithValue(error);
    }
    return res;
});

const updateProfile = createAsyncThunk('/user/updateProfile', async (payload, { rejectWithValue }) => {
    const { userId, formData } = payload;
    const { hates, bio, prompts } = formData;
    try {
        const hatesRes = await API.addHates(hates, userId);
        const bioRes = await API.addBio(bio, userId);
        const promptsRes = await Promise.all(Object.values(prompts).map(prompt => API.addPrompt(prompt, userId)));
        console.log(promptsRes);
        return ({ hates: hatesRes, bio: bioRes, prompts: promptsRes.reduce((acc, prompt) => ({...acc, [prompt.name]: prompt}), {}) });
    } catch (error) {
        return rejectWithValue("Your profile cannot be updated at this time");
    }
});

const getUserById = createAsyncThunk('/user/getUserById', async (userId) => {
    const user = await API.getUserById(userId);
    return user;
})

export const user = createSlice({
    name: 'user',
    initialState: {
        // id will need to be added on signup/login. This is here for testing now.
        status: 'idle',
        user: {
            id: 3, 
            username: 'rachwake23',
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
        }
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
        builder.addCase(uploadPhoto.fulfilled, (state, action) => {
            const { name, public_id, image_url } = action.payload;
            state.testuser.photos[name] = { publicId: public_id, image_url };
        });
        builder.addCase(getUserById.fulfilled, (state, action) => {
            state.user = action.payload;
            state.status = 'success';
        });
        builder.addCase(updateUserProfile.fulfilled, (state, action) => {
            const { hates, bio, prompts } = action.payload;
            state.user = {...state.user, hates, bio, prompts};
        });
    }
});

export { registerUser, authUser, updateProfile, getUserById } 
export const { addHate, removeHate, setStatus } = user.actions;
export default user.reducer;