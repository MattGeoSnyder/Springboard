import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_SECRET } from '../config.js';

const router = new express.Router();

cloudinary.config({ secure: true });

router.post('/auth', async function (req, res, next) {
  const params_to_sign = req.body;
  console.log( typeof params_to_sign);
  console.log(params_to_sign);
  const signature = cloudinary.utils.api_sign_request(params_to_sign, CLOUDINARY_SECRET);
  res.json({ signature });
})

console.log(cloudinary.config());

export default router;