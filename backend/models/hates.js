import db from '../db.js';

class Hates {
  static async getAllHates() {
    const res = await db.query(`SELECT * FROM hates;`);

    const hates = res.rows.reduce((acc, hate) => {
      return ({...acc, [hate.id]: hate});
    }, {})

    return hates;
  }

  static async getHateById(id) {
    const res = await db.query(`SELECT * FROM hates WHERE id = $1`, [id]);
    return res.rows[0];
  }
}

export default Hates;