import db from '../db.js';

class Dislike {
  static async addDislike(disliker, dislikee) {
    const result = await db.query(`INSERT INTO dislikes
                              (disliker_id, dislikee_id)
                            VALUES  
                              ($1, $2)
                            RETURNING *`, [disliker, dislikee]);
    return result.rows[0];
  }
}

export default Dislike;