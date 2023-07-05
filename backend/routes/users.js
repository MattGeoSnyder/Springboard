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

router.post('/bio', async function (req, res, next) {
    try {
        const { bio, userId } = req.body;
        let query = await User.addBio({ bio, userId });
        return res.status(201).json(query);
    } catch (error) {
        return next(error);
    }
});

router.post('/:userId/prompts', async function (req, res, next) {
    try {
        const promptData = req.body;
        const { userId } = req.params;
        let query = await User.addPrompt(promptData, userId);
        return res.status(201).json(query);
    } catch (error) {
        return next(error);
    }
})

export default router;