import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';
import { UnauthorizedError } from '../helpers/expressError.js';
import db from '../db.js';

function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      if (!token) {
        res.locals.user = "";
      } else {
        res.locals.user = jwt.verify(token, SECRET_KEY);
      }  
    }
    next();
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

async function isInMatch(req, res, next) {
  const matchId = req.params.matchId;
  const userId = res.locals.user.id;
  try {
    const match = await db.query(`SELECT 
                              user1_id, 
                              user2_id
                            FROM 
                              matches
                            WHERE 
                              id = $1`, [matchId]);
    const { user1_id, user2_id } = match.rows[0];

    if (userId !== user1_id && userId !== user2_id) {
      throw new UnauthorizedError("You aren't a part of this match");
    }
    return next()
  } catch (error) {
    return next(error)
  }
}

function isLiker(req, res, next) {
  const likerId = req.params.likerId;
  try {
    if (res.locals.user.id !== likerId) throw new UnauthorizedError('You cannot view this like.');
    return next();
  } catch (error) {
    return next(error);
  }
}

function isDisliker(req, res, next) {
  const dislikerId = req.params.dislikerId;
  try {
    if (res.locals.user.id !== dislikerId) throw new UnauthorizedError('You cannot view this like.');
    return next();
  } catch (error) {
    return next(error);
  }
}


export {authenticateJWT,
        isAdmin,
        ensureLoggedIn,
        isUser,
        isInMatch,
        isLiker,
        isDisliker}