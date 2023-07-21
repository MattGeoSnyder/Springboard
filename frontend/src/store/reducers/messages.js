import { createSlice } from '@reduxjs/toolkit';
import { loadUserOnLogin, getConversation } from '../thunks';
import API from '../../api.js';

export const messages = createSlice({
  name: 'messages',
  initialState: {
    status: 'idle',
    notifications: 0,
    errMsg: '',
    messages: {}
  },
  reducers: {
    addNewMessage: (state, action) => {
      const { matchId, message } = action.payload;
      state.messages[matchId].messages.unshift(message);
    },
    addNotification: (state, action) => {
      state.notifications++;
    },
    addConversationNotification: (state, action) => {
      const { matchId } = action.payload;
      state.messages[matchId].notifications++;
    },
    setErrMsg: (state, action) => {
      state.errMsg = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(getConversation.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(getConversation.fulfilled, (state, action) => {
      console.log(action.payload);
      const { matchId, messages } = action.payload;
      state.messages[matchId].messages = messages;

      const messageCount = state.messages[matchId].notifications;
      state.notifications -= +messageCount;
      state.messages[matchId].notifications = 0;
    });
    builder.addCase(loadUserOnLogin.fulfilled, (state, action) => {
      const { matches, notifications } = action.payload;
      let total = 0;
      for (let matchId in matches) {
        if (matchId in notifications) {
          state.messages[matchId] = {
            notifications: notifications[matchId],
            messages: []
          }
          total += Number(notifications[matchId]);
        } else {
          state.messages[matchId] = {
            notifications: 0,
            messages: []
          }
        }
      }
      state.notifications = total;
    });
  }
});

export default messages.reducer;
export const { addNewMessage, addNotification, addConversationNotification, setErrMsg } = messages.actions;
