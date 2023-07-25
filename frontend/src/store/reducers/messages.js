import { createSlice } from '@reduxjs/toolkit';
import { loadUserAssets, getConversation, addNewMessage } from '../thunks';
import { addLike } from './matches';
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
    addNotification: (state, action) => {
      const { matchId } = action.payload;
      state.messages[matchId].notifications++;
      state.notifications++;
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
    builder.addCase(loadUserAssets.fulfilled, (state, action) => {
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
    builder.addCase(addNewMessage.fulfilled, (state, action) => {
      const { match_id } = action.payload;
      state.messages[match_id].messages.unshift(action.payload);
    });
    builder.addCase(addLike.fulfilled, (state, action) => {
      const { match } = action.payload;
      
      if (!match) return;

      const { id, user } = match;
      state.messages[id] = { notifications: 0, messages: [] }
    })
  }
});

export default messages.reducer;
export const { addNotification, addConversationNotification, setErrMsg } = messages.actions;
