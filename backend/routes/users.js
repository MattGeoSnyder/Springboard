import User from '../models/user.js';
import express, { Router } from 'express';
import ExpressError from '../helpers/expressError.js';

const router = new Router();

router.get('/:userId/matches', async function(req, res, next) {
    try {
        const { userId } = req.params;
        let matches = await User.queryMatches(userId);
        return res.json({ matches });
    } catch (error) {
        return next(error);
    }
});

export default router;