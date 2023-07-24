import User from '../models/user.js';
import express from 'express';
import chatBot from '../openaiAPI.js'
import Match from '../models/match.js';
import Message from '../models/message.js';
import createToken from '../helpers/token.js';

const BASE_URL = 'ws://localhost:3001'

const router = new express.Router();

router.post('/register', async function (req, res, next) {
  try {
    //add validation with jsonschema here.
    const user = await User.register(req.body);
    const token = createToken(user);

    const match = await Match.addMatch(1, user.id);

    const message = await Message.saveMessage(chatBot.introduce(match.id, user.id));

    return res.status(201).json({ ...user, token });
  } catch (error) {
    return next(error);
  }
});

router.post('/login', async function (req, res, next) {
  try {
    const user = (await User.login(req.body));
    const token = createToken(user);
    return res.json({ id: user.id, token });
  } catch (error) {
    return next(error);
  }
})

export default router;