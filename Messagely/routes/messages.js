const express = require('express');
const router = new express.Router();

let Message = require('../models/message.js');
const ExpressError = require('../expressError');

const { authenticateJWT, ensureLoggedIn, ensureCorrectUser } = require('../middleware/auth.js');

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

router.get('/:id', ensureLoggedIn, async (req, res, next) => {
    try {
        let results = await Message.get(req.params.id);
        console.log(results);
        let auth_users = [results.from_user.username, results.to_user.username];
        if (auth_users.includes(req.user.username)){
            return res.send({ message: results });
        }
        throw new ExpressError('Unauthorized', 401);
    } catch (error) {
        return next(error);
    }
});


/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

router.post('/', ensureLoggedIn, async (req, res, next) => {
    try {
        let message = await Message.create({ from_username: req.user.username, 
                                            to_username: req.body.to_username, 
                                            body: req.body.body });
        return res.send({ message })
    } catch (error) {
        return next(error);
    }


})


/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

router.post('/:id/read', ensureCorrectUser, async (req, res, next) => {
    try {
        let message = await Message.markRead(req.params.id);
        return res.send({ message });
    } catch (error) {
        return next(error);
    }
})

module.exports = router;