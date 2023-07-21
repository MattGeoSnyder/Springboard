import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_SECRET
});

const API = new OpenAIApi(configuration);

class ChatBot {
  constructor(openai) {
    this.chat = openai
    this.model = 'gpt-3.5-turbo'
    this.messages = [{ role: 'system', content: "You are a friendly companion for conversation"}]  
}

  respond = async function(message) {
    const res = {
      matchId: message.matchId,
      fromUser: message.toUser,
      toUser: message.fromUser,
      content: ""
    }

    this.messages.push({ role: 'user', content: message.content });

    const chatRes = await this.chat.createChatCompletion({
      model: this.model,
      messages: this.messages
    });

    res.content = chatRes.data.choices[0].message.content;
    this.messages.push(chatRes.data.choices[0].message);
    return res;
  } 

  introduce(matchId, toUser) {
    const res = {
      matchId,
      fromUser: 1,
      toUser,
      content: "Hi, I'm your friendly companion! We can talk about anything, because I'm powered by Open AI's chat GPT 3.5"
    }

    this.messages.push({ role: 'assisstant', content: res.content });

    return res;
  }
}

const chatBot = new ChatBot(API);

export default chatBot;
export { API };