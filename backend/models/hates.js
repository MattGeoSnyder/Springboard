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
  
  static async addHates([ hate1=null, hate2=null, hate3=null, hate4=null, hate5=null,], userId) {
    const res = await db.query(`UPDATE users 
                                    SET
                                        hate1=$1, 
                                        hate2=$2, 
                                        hate3=$3, 
                                        hate4=$4,
                                        hate5=$5
                                    WHERE 
                                        id = $6
                                    RETURNING
                                        hate1,
                                        hate2,
                                        hate3,
                                        hate4,
                                        hate5`, [hate1, hate2, hate3, hate4, hate5, userId]);
    
    return res.rows[0];
  }    
}

export default Hates;