import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';

function createToken(user) {
  let payload = {
    id: user.id,
    is_admin: user.is_admin || false
  };

  return jwt.sign(payload, SECRET_KEY);
}

export default createToken;