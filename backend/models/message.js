// const bcrypt = require('bcrypt');
// const db = require('../db.js');
// const ExpressError = require('../helpers/expressError.js');
// const { BCRYPT_WORK_FACTOR } = require("../config.js");

import db from '../db.js';

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

    static async queryConversation(matchId, userId, offset=0) {
        console.log(matchId, userId);

        const result = await db.query(`SELECT
                                        *
                                    FROM messages 
                                    WHERE match_id = $1 
                                    ORDER BY sent_at DESC
                                    OFFSET $2 LIMIT 10`, [matchId, offset]);

        return { matchId, messages: result.rows };
    }

    static async markMessagesSeen(matchId, userId) {
        await db.query(`UPDATE 
                            messages
                        SET 
                            seen_at = NOW()
                        WHERE
                            match_id = $1
                        AND
                            to_user = $2
                        AND
                            seen_at IS NULL`, [matchId, userId]);
    }

    static async matchNotifications(userId) {
        const result = await db.query(`SELECT
                                        match_id,
                                        count(*) AS notifications
                                    FROM
                                        messages
                                    WHERE
                                        to_user = $1
                                    AND
                                        seen_at IS NULL
                                    GROUP BY match_id`, [userId]);
        return result.rows.reduce((acc, {match_id, notifications}) => {
            return ({...acc, [match_id]: notifications});
        }, {});
    }

}

export default Message;