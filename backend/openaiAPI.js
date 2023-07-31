import { Configuration, OpenAIApi } from 'openai';
import Message from './models/message.js';
import db from './db.js';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_SECRET
});

const API = new OpenAIApi(configuration);

class ChatBot {
  constructor(openai) {
    this.chat = openai
    this.model = 'gpt-3.5-turbo'
    this.messages = []  
  }

  async respond(message) {
    const res = {
      match_id: message.match_id,
      from_user: message.to_user,
      to_user: message.from_user,
      content: ""
    }

    try {
      const messages = await this.getPastChats(res.match_id);
      this.messages = messages;
  
      const chatRes = await this.chat.createChatCompletion({
        model: this.model,
        messages: this.messages
      });
  
      res.content = chatRes.data.choices[0].message.content;
      const response = await Message.saveMessage({ matchId: res.match_id, fromUser: res.from_user, toUser: res.to_user, content: res.content });
      return response;
    } catch (error) {
      return ({ ...response, content: "Sorry, I don't have a good response to that right now. Try again later" });  
    }

  }
  
  async getPastChats(matchId) {
    const messages = await db.query(`SELECT * FROM 
                                      messages
                                    WHERE
                                      match_id = $1
                                    AND
                                      sent_at >= CURRENT_DATE`, [matchId]);

    const pastMessages = messages.rows.map((message) => {
      if (message.from_user === 1) {
        return ({ role: 'assistant', content: message.content });
      } else {
        return ({ role: 'user', content: message.content });
      }
    });

    return [{ role: 'system', content: "You are a friendly companion for conversation"}, ...pastMessages];
  }

  introduce(matchId, toUser) {
    const res = {
      matchId,
      fromUser: 1,
      toUser,
      content: "Hi, I'm your friendly companion! We can talk about anything, because I'm powered by Open AI's chat GPT 3.5"
    }

    this.messages.push({ role: 'assistant', content: res.content });

    return res;
  }
}

const chatBot = new ChatBot(API);

export default chatBot;
export { API };