import { ensureLoggedIn, isLiker } from '../middleware/auth.js';
import Like from '../models/like.js';
import Match from '../models/match.js';
import User from '../models/user.js';
import { Router } from "express";

const router = new Router();

router.get('/:likerId/:likeeId', [ensureLoggedIn, isLiker], async function (req, res, next) {
  const { likerId, likeeId } = req.params;
  try {
    let like = await Like.getLike(likerId, likeeId);
    return res.json({ like });
  } catch (error) {
    next(error);
  }
});

router.post('/:likerId/:likeeId', [ensureLoggedIn, isLiker], async function (req, res, next) {
  const { likerId, likeeId } = req.params;
  try {
    //seed users will automatically match
    if (likeeId < 101) {
      await Like.addLike(likeeId, likerId);
    }


    //Check if likee already likes liker
    const check = await Like.getLike(likeeId, likerId);
    const like = await Like.addLike(likerId, likeeId);

    if (check) {
      //put user ids in order
      const sorted = [ Number(likerId), Number(likeeId) ].sort();
      //add match
      const matchId = await Match.addMatch(sorted[0], sorted[1]);
      const user = await User.getUserById(likeeId);
      const match = {...matchId, user};
      return res.status(201).json({ match });
    } else {
      return res.status(201).json({ like });
    }
  } catch (error) {
    next(error);
  }
});

export default router;