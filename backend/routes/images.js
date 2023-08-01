import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_SECRET } from '../config.js';
import User from '../models/user.js';
import { ensureLoggedIn } from '../middleware/auth.js';

const router = new express.Router();

cloudinary.config({ secure: true });

router.get('/:username/:name', async function(req, res, next) {
  const { username, name } = req.params;
  try {
      let photo = await User.getPhotoById(`${username}/${name}`);
      return res.json(photo);
  } catch (error) {
      next(error);
  }
}) 


router.post('/auth', ensureLoggedIn, async function (req, res, next) {
  const params_to_sign = req.body;
  const signature = cloudinary.utils.api_sign_request(params_to_sign, CLOUDINARY_SECRET);
  return res.json({ signature });
});

export default router;