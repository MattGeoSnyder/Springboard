import User from '../models/user.js';
import Message from '../models/message.js';
import { Router } from 'express';
import { ensureLoggedIn, isUser } from '../middleware/auth.js';

const router = new Router();

router.get('/:userId', ensureLoggedIn, async function (req, res, next) {
    const { userId } = req.params;
    try {
        let user = await User.getUserById(userId);
        return res.json(user);
    } catch (error) {
        next(error);
    }
});

router.get('/:userId/users', ensureLoggedIn, async function(req, res, next) {
    const { userId } = req.params;
    const { offset } = req.body;
    try {
        let userIds = await User.queryUserIds({ userId, offset });
        return res.json(userIds);
    } catch (error) {
        next(error);
    }
});


// router.get('/:userId/photos', isUser, async function(req, res, next) {
//     const { userId } = req.params;
//     try {
//         let photos = await User.getUserPhotos(userId);
//         return res.json(photos);
//     } catch (error) {
//         next(error);
//     }
// });

router.post('/:userId/photos/', async (req, res, next) => {
    const { userId } = req.params;

    const { publicId, imageUrl } = req.body;
  
    const duplicateCheck = await User.getPhotoById(publicId);
  
    if (duplicateCheck) {
      const query = await User.updatePhoto({ publicId, imageUrl });
      return res.json(query);
    } else {
      const query = await User.addPhoto({ userId, publicId, imageUrl });
      return res.json(query);
    }
  
});  

router.delete('/:userId/photo', [ ensureLoggedIn, isUser ], async function(req, res, next) {
    const { public_id } = req.body;
    try {
        const result = await User.deletePhoto(public_id);
        return res.json({ message: `Deleted photo with public id ${result.public_id}`});
    } catch (error) {
        next(error);
    }
});



router.get('/:userId/matches', [ ensureLoggedIn, isUser], async function(req, res, next) {
    try {
        const { userId } = req.params;
        let matches = await User.queryMatches(userId);
        return res.json({ matches });
    } catch (error) {
        next(error);
    }
});

router.post('/:userId/bio', [ ensureLoggedIn, isUser ], async function (req, res, next) {
    try {
        const { bioData } = req.body;
        const { userId } = req.params;
        const bio = await User.addBio(bioData, userId);
        console.log(bio);
        return res.status(201).json({ bio });
    } catch (error) {
        next(error);
    }
});

router.post('/:userId/hates', [ensureLoggedIn, isUser], async function(req, res, next) {
    try {
        const { userId } = req.params;
        const hates = JSON.parse(req.body.hates);
        const result = await User.addHates(hates, userId);
        return res.status(201).json(result);
    } catch (error) {
        next(error);    
    }
});  

router.post('/:userId/prompts', [ensureLoggedIn, isUser], async function (req, res, next) {
    try {
        const { prompts } = req.body;
        const { userId } = req.params;
        const result = await Promise.all(Object.values(prompts).map(prompt => (
            User.addPrompt(prompt, userId)
        )));
        
        const res_obj = result.reduce((acc, prompt, i) => {
            console.log(prompt);
            return ({...acc, [`prompt${i+1}`]: { name: `prompt${i+1}`, id: prompt.id, promptRes: prompt.promptres}});
        }, {});
        return res.status(201).json(res_obj);
    } catch (error) {
        next(error);
    }
});

router.get(`/:userId/notifications`, [ensureLoggedIn, isUser], async function (req, res, next) {
    try {
        const { userId } = req.params;
        const notifications = await Message.matchNotifications(userId);
        return res.json(notifications);
    } catch (error) {
        next(error);
    }
}) 

export default router;