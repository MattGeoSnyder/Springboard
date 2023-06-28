import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
})

export const user = createSlice({
    name: 'user',
    initialState: {
        // id will need to be added on signup/login. This is here for testing now.
        status: 'idle',
        user: { username: 'rachwake23' },
        id: 1,
        testuser: { id: 24, 
                    username: 'rachwake23',
                    first_name: 'Rachel', 
                    birthday: '1999-03-23',
                    user_sex: 'female',
                    sex_preference: 'male',
                    }
    },
    reducers: {},
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
        })
    }
});

export { registerUser, authUser } 
export default user.reducer;