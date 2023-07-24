import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register, login, updateUserProfile, uploadPhoto, deletePhoto } from '../thunks';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const user = createSlice({
    name: 'user',
    initialState: {
        status: 'idle',
        user: {
            photos: {},
            prompts: {},
            hates: []
        },
        errMsg: ''
    },
    reducers: {
        setUser: (state, action) => {
            state.user = {...state.user, ...action.payload };
        },
        logoutUser: (state, action) => {
            state.user = {};
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setErrMsg: (state, action) => {
            state.errMsg = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(register.pending, (state, action) => {
            state.status = 'pending';
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.status = 'success';
            state.user = {...state.user, ...action.payload};
        });
        builder.addCase(register.rejected, (state, action) => {
            const { status, message } = action.payload;
            state.status = 'rejected';
            state.errMsg = `Status ${status}: ${message}`;
        });
        builder.addCase(login.pending, (state, action) => {
            state.status = 'pending';
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.status = 'success';
            state.user = action.payload;
        });
        builder.addCase(login.rejected, (state, action) => {
            const { status, message } = action.payload;
            state.status = 'rejected';
            state.errMsg = `Status ${status}: ${message}`;
        });
        builder.addCase(updateUserProfile.fulfilled, (state, action) => {
            const { hates, bio, prompts } = action.payload;
            state.user = { ...state.user, hates, bio, prompts };
        });
        builder.addCase(uploadPhoto.fulfilled, (state, action) => {
            const { name, ...photo } = action.payload;
            state.user.photos[name] = photo;
        });
        builder.addCase(deletePhoto.fulfilled, (state, action) => {
            const { name } = action.payload;
            delete state.user.photos[name];
        });
    }
});

export const { setStatus, setErrMsg, setUser, setPhoto, logoutUser } = user.actions;
export default user.reducer;