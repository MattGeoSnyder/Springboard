import db from '../db.js';
import ExpressError from '../helpers/expressError.js';
import { BCRYPT_WORK_FACTOR } from "../config.js";


class Like {
  static async getLike(likerId, likeeId) {
    const result = await db.query(`SELECT 
                                    liker_id, likee_id
                                  FROM 
                                    likes
                                  WHERE 
                                    liker_id = $1
                                  AND 
                                    likee_id = $2`, [likerId, likeeId]);
    
    return result.rows[0];
  }

  static async addLike(likerId, likeeId) {
    const result = await db.query(`INSERT INTO likes
                                    (liker_id, likee_id)
                                  VALUES 
                                    ($1, $2)
                                  RETURNING
                                    liker_id, likee_id`, [likerId, likeeId]);
    return result.rows[0];                                
  }
}

export default Like;