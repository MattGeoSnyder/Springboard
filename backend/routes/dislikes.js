import Dislike from '../models/dislike.js';
import { Router } from 'express';

const router = new Router();

router.post('/:dislikerId/:dislikeeId', async function (req, res, next) {
  const { dislikerId, dislikeeId } = req.params;
  try {
    const dislike = await Dislike.addDislike(dislikerId, dislikeeId);
    return res.status(201).send(dislike);
  } catch (error) {
    next(error);
  }
});

export default router;