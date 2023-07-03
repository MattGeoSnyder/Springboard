import db from '../db.js';

class Hates {
  static async getAllHates() {
    const res = await db.query(`SELECT * FROM hates ORDER BY category, hate;`);

    const hates = res.rows.reduce((acc, {id, category, hate }) => {
      
      if (category in acc) {
        const arr = [...acc[category], {id, hate}];
        return {...acc, [category]: arr};
      } else {
        return {...acc, [category]: [{id, hate}]};
      }

    }, {})

    return hates;
  }

  static async getHateById(id) {
    const res = await db.query(`SELECT * FROM hates WHERE id = $1`, [id]);
    return res.rows[0];
  }
}

export default Hates;