// const bcrypt = require('bcrypt');
// const db = require('../db.js');
// const ExpressError = require('../helpers/expressError.js');
// const { BCRYPT_WORK_FACTOR } = require("../config.js");

import bcyprt from 'bcrypt';
import db from '../db.js';
import ExpressError from '../helpers/expressError.js';
import { BCRYPT_WORK_FACTOR } from '../config.js';

class Message {
    
    static async saveMessage({ matchId, fromUser, toUser, content }) {
        const result = await db.query(`INSERT INTO messages 
                                        (match_id, from_user, to_user, content)
                                    VALUES
                                        ($1, $2, $3, $4) 
                                    RETURNING *;`, [matchId,
                                                    fromUser,
                                                    toUser,
                                                    content]);

        const messageStr = JSON.stringify(result.rows[0]);
        return messageStr;
    }

    static async queryConversation(matchId, offset=0) {
        const result = await db.query(`SELECT 
                                        from_user, 
                                        to_user,
                                        content,
                                        sent_at
                                    FROM messages 
                                    WHERE match_id = $1 
                                    ORDER BY sent_at DESC
                                    OFFSET $2 LIMIT 10`, [matchId, offset]);

        return { matchId, messages: result.rows };
    }

}

export default Message;