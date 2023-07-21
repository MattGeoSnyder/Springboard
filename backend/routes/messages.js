import Message from '../models/message.js';
import express, { Router } from 'express';
import ExpressError from '../helpers/expressError.js';

const router = new Router();

router.patch('/match/:matchId', async function (req, res, next) {
    try {
        const { matchId } = req.params;
        const { userId } = req.body;
        const { offset = 0 } = req.query;

        await Message.markMessagesSeen(matchId, userId);
        let messages = await Message.queryConversation(matchId, userId, offset);
        return res.json(messages);
    } catch (error) {
        return next(error);
    }
});

export default router;