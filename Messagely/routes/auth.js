const express = require('express');
const router = new express.Router();

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config.js');

let User = require('../models/user.js');
const ExpressError = require('../expressError');

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

router.post('/login', async (req, res, next) => {
    try {
        let { username, password } = req.body;
        if (!username || !password) {
            throw new ExpressError("Username and Password required", 400);
        }
        let auth = await User.authenticate(username, password);
        if (auth) {
            let iat = parseInt(await User.updateLoginTimestamp(username));
            let token = jwt.sign({ username, iat }, SECRET_KEY);
            return res.json({ token });
        }
        throw new ExpressError('Invalid username/password', 400);
    } catch (error) {
        return next(error);
    }
})


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

router.post('/register', async (req, res, next) => {
    // debugger;
    try {
        let { username } = await User.register(req.body);
        let iat = parseInt(await User.updateLoginTimestamp(username));
        let token = jwt.sign({ username, iat }, SECRET_KEY);
        return res.json({ token });    
    } catch (error) {
        return next(error);
    }

})

module.exports = router;

