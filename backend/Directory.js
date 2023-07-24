class Directory {
  constructor() {
    this.chats = {}
    this.notifications = {}
  }

  join(userId, ws) {
    this.notifications[userId] = ws;
  }

  notify(matchId, userId) {
    const client = this.notifications[userId];

    if (!client) {
      return;
    }

    if (client.readyState === 1){
      client.send(JSON.stringify({ matchId }));
    }
  }

  joinChat(matchId, userId, ws) {
    if (matchId in this.chats) {
      this.chats[matchId] = { ...this.chats[matchId], [userId]: ws };
    } else {
      this.chats[matchId] = { [userId]: ws }
    }
  }

  leaveChat(matchId, userId) {
    if (matchId in this.chats){
      if (userId in this.chats[matchId]){
        this.chats[matchId] = null;
      }
    }
  }

  chat(message) {
    const { match_id, to_user } = message;
    if (match_id in this.chats) {

      const toUser = this.chats[match_id][to_user];

      if (!toUser || toUser.readyState !== 1) {
        this.notify(match_id, to_user);
      }

      Object.entries(this.chats[match_id]).forEach(([id, client]) => {

        if (client.readyState === 1) {
          const response = JSON.stringify(message);
          client.send(response);
        }

      });

    }
  }
}

export default Directory;