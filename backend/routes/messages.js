import Message from '../models/message.js';
import express, { Router } from 'express';
import ExpressError from '../helpers/expressError.js';
import { isInMatch } from '../middleware/auth.js';

const router = new Router();

router.patch('/match/:matchId', isInMatch, async function (req, res, next) {
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

router.patch('/:messageId', async function (req, res, next) {
    try {
        const { messageId } = req.params;
        const message = await Message.markMessageSeen(messageId);
        return res.json(message);
    } catch (error) {
        next(error);
    }
})

export default router;