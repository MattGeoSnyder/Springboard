import User from '../models/user.js';
import express, { Router } from 'express';
import ExpressError from '../helpers/expressError.js';

const router = new Router();

router.get('/:userId', async function (req, res, next) {
    const { userId } = req.params;
    try {
        let user = await User.getUserById(userId);
        return res.json(user);
    } catch (error) {
        next(error);
    }
})

router.get('/:userId/users', async function(req, res, next) {
    const { userId } = req.params;
    const { offset } = req.body;
    try {
        let userIds = await User.queryUserIds({ userId, offset });
        return res.json(userIds);
    } catch (error) {
        next(error);
    }
});


router.get('/:userId/photos', async function(req, res, next) {
    const { userId } = req.params;
    try {
        let photos = await User.getUserPhotos(userId);
        return res.json(photos);
    } catch (error) {
        next(error);
    }
})

router.get('/:userId/matches', async function(req, res, next) {
    try {
        const { userId } = req.params;
        let matches = await User.queryMatches(userId);
        return res.json({ matches });
    } catch (error) {
        return next(error);
    }
});

router.post('/:userId/bio', async function (req, res, next) {
    try {
        const { bioData } = req.body;
        console.log(req.body);
        const { userId } = req.params;
        let query = await User.addBio({ bio: bioData, userId });
        return res.status(201).json(query);
    } catch (error) {
        return next(error);
    }
});

router.post('/:userId/hates', async function(req, res, next) {
    try {
        const { userId } = req.params;
        const hates = JSON.parse(req.body.hates);
        const hateIds = hates.map(hate => hate.id);
        const query = await User.addHates(hateIds, userId);
        return res.status(201).json(Object.values(query));
    } catch (error) {
        next(error);    
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
});

export default router;