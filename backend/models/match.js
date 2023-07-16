import db from '../db.js';

class Match {
  static async addMatch(user1Id, user2Id) {
    const match = await db.query(`INSERT INTO matches
                                    (user1_id, user2_id)
                                  VALUES
                                    ($1, $2)
                                  RETURNING id`, [user1Id, user2Id]);
    return match.rows[0];
  }
}

export default Match;