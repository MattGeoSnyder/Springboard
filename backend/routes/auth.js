import User from '../models/user.js';
import express from 'express';
import createToken from '../helpers/token.js';

const router = new express.Router();

router.post('/register', async function (req, res, next) {
  try {
    //add validation with jsonschema here.
    const newUser = await User.register(req.body);
    const token = createToken(newUser);
    return res.status(201).json({ ...newUser, token })
  } catch (error) {
    return next(error);
  }
});

router.post('/login', async function (req, res, next) {
  try {
    const user = await User.login(req.body);
    const token = createToken(user);
    return res.json({ ...user, token });
  } catch (error) {
    return next(error);
  }
})

export default router;