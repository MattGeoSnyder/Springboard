import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api.js';
import { updateUserProfile, uploadPhoto, loadUserOnLogin } from '../thunks';

const registerUser = createAsyncThunk('/user/registerUser', async (userData, { rejectWithValue }) => {
    try {
        const newUser = await API.signup(userData);
        console.log(newUser);
        return newUser;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const authUser = createAsyncThunk('/user/authUser', async (userData, { rejectWithValue }) => {
    try {
        const user = await API.login(userData);
        return user;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const updateProfile = createAsyncThunk('/user/updateProfile', async (payload, { rejectWithValue }) => {
    const { userId, formData } = payload;
    const { hates, bio, prompts } = formData;
    try {
        const hatesRes = await API.addHates(hates, userId);
        const bioRes = await API.addBio(bio, userId);
        const promptsRes = await Promise.all(Object.values(prompts).map(prompt => API.addPrompt(prompt, userId)));
        return ({ hates: hatesRes, bio: bioRes, prompts: promptsRes.reduce((acc, prompt) => ({...acc, [prompt.name]: prompt}), {}) });
    } catch (error) {
        return rejectWithValue("Your profile cannot be updated at this time");
    }
});

export const user = createSlice({
    name: 'user',
    initialState: {
        // id will need to be added on signup/login. This is here for testing now.
        status: 'idle',
        user: {
            id: 3,
            photos: {},
            prompts: {},
            hates: []
        },
        errMsg: ''
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setErrMsg: (state, action) => {
            state.errMsg = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.status = 'success';
            state.user = action.payload;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            const { status, message } = action.payload;
            state.status = 'rejected';
            state.errMsg = `Status ${status}: ${message}`;
        })
        builder.addCase(authUser.pending, (state, action) => {
            state.status = 'pending';
        });
        builder.addCase(authUser.fulfilled, (state, action) => {
            state.user = {...state.user, ...action.payload};
            state.status = 'success';
        });
        builder.addCase(authUser.rejected, (state, action) => {
            const { status, message } = action.payload;
            state.status = 'rejected';
            state.errMsg = `Status ${status}: ${message}`;
        });
        builder.addCase(loadUserOnLogin.pending, (state, action) => {
            state.status = action.payload;
        });
        builder.addCase(loadUserOnLogin.fulfilled, (state, action) => {
            state.status = 'success';
            state.user = { ...state.user, ...action.payload.user };
        })
        builder.addCase(uploadPhoto.fulfilled, (state, action) => {
            const { name, public_id, image_url } = action.payload;
            state.user.photos[name] = { public_id, image_url };
        });
        builder.addCase(updateUserProfile.fulfilled, (state, action) => {
            const { hates, bio, prompts } = action.payload;
            state.user = {...state.user, hates, bio, prompts};
        });
    }
});

export { registerUser, authUser, updateProfile } 
export const { addHate, removeHate, setStatus, setErrMsg } = user.actions;
export default user.reducer;