import express from 'express';
import chatBot, { API } from '../openaiAPI.js';

const router = new express.Router();


router.post('/', async function (req, res, next) {
  try {
    const message = req.body;
    console.log(message);
    const chatBotRes = await chatBot.respond(message);
    return res.json({ message: chatBotRes });
  } catch (error) {
    next(error);
  }
});

export default router;