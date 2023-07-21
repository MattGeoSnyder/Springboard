import db from '../db.js';

class Prompt {
  static async queryAllPrompts() {
    const prompts = await db.query(`SELECT * FROM prompts;`);
    return prompts.rows;
  }

  static async queryPrompt(id) {
    const prompt = await db.query(`SELECT * FROM prompts WHERE id=$1`,[id]);
    return prompt.rows[0];
  }
}

export default Prompt