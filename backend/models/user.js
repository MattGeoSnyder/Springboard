// const bcrypt = require('bcrypt');
// const db = require('../db.js');
// const ExpressError = require('../helpers/expressError.js');
// const { BCRYPT_WORK_FACTOR } = require("../config.js");

import bcrypt from 'bcrypt';
import db from '../db.js';
import ExpressError from '../helpers/expressError.js';
import { BCRYPT_WORK_FACTOR } from "../config.js";

class User {

    static async register({ username, pw, first_name, birthday, user_sex, sex_preference }) {
        const duplicateCheck = await db.query(`SELECT username FROM users WHERE username=$1`, [username]);

        if (duplicateCheck.rows[0]) {
            throw new ExpressError(`Account registered with username ${username}`, 400);
        }

        const hashedPassword = await bcrypt.hash(pw, BCRYPT_WORK_FACTOR);
        console.log(typeof birthday)
        const result = await db.query(`INSERT INTO users
                                            (username, pw, first_name, birthday, user_sex, sex_preference)
                                        VALUES 
                                            ($1, $2, $3, $4, $5, $6)
                                        RETURNING id, username, first_name, birthday, user_sex, sex_preference`, 
                                        [username, 
                                        hashedPassword,
                                        first_name,
                                        birthday,
                                        user_sex,
                                        sex_preference ]);
        
        return result.rows[0];          
    }

    static async login({ username, pw }){
        console.log(username, pw);
        const checkUser = await db.query(`SELECT 
                                            id,
                                            username,
                                            pw,
                                            first_name,
                                            birthday,
                                            user_sex,
                                            sex_preference
                                        FROM users WHERE username=$1`, [username]);

        const user = checkUser.rows[0];
        console.log(user);

        if (!user) {
            throw new ExpressError(`User with username ${username} does not exist`, 403);
        }

        if (user && (await bcrypt.compare(pw, user.pw))) {
            delete user.pw;
            return user;
        } else {
            throw new ExpressError('Incorrect password', 401);
        }
    }

    // Selects matched users for given userId
    // int: userId -> [match, ...]

    static async queryMatches(userId) {
        const result = await db.query(`WITH matchedUsers AS
                                    (SELECT
                                        id, 
                                        CASE 
                                            WHEN user1_id = $1 THEN user2_id
                                            ELSE user1_id 
                                        END AS user_id
                                    FROM 
                                        matches
                                    WHERE 
                                        $1 IN (user1_id, user2_id))

                                    SELECT
                                        matchedUsers.id AS match_id,
                                        users.*
                                    FROM 
                                        matchedUsers
                                    JOIN 
                                        users 
                                    ON users.id = matchedUsers.user_id;
                                    `,[userId])
        
        return result.rows.reduce((acc, match) => {
            const { match_id, ...user } = match;
            acc[match_id] = user;
            return acc;
        }, {});
    }

}

export default User;