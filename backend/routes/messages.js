import Message from '../models/message.js';
import express, { Router } from 'express';
import ExpressError from '../helpers/expressError.js';

const router = new Router();

router.get('/match/:matchId', async function (req, res, next) {
    try {
        const { matchId } = req.params;
        const { offset = 0 } = req.query;
        
        let messages = await Message.queryConversation(matchId, offset);
        return res.json(messages);
    } catch (error) {
        return next(error);
    }
});

export default router;