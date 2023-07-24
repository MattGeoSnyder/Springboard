import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';
import { UnauthorizedError } from '../helpers/expressError.js';

function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

function isAdmin (req, res, next) {
  try {
    if (!res.locals.user.is_admin) throw new UnauthorizedError();
    next()
  } catch (error) {
    return next(error);
  }
}

function ensureLoggedIn(req, res, next) {
  try {
    if (!res.locals.user) throw new UnauthorizedError();
    next();
  } catch (error) {
    next(error);
  }
}

function isUser(req, res, next) {

  try {
    if ((req.params.userId != res.locals.user.id) && !res.locals.user.is_admin) {
      throw new UnauthorizedError();
    }
    next();
  } catch (error) {
    return next(error);
  }
}

export {authenticateJWT,
        isAdmin,
        ensureLoggedIn,
        isUser}