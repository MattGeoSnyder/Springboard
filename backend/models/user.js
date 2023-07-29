// const bcrypt = require('bcrypt');
// const db = require('../db.js');
// const ExpressError = require('../helpers/expressError.js');
// const { BCRYPT_WORK_FACTOR } = require("../config.js");

import bcrypt from 'bcrypt';
import db from '../db.js';
import ExpressError from '../helpers/expressError.js';
import { BCRYPT_WORK_FACTOR } from "../config.js";

const BOT_PIC_BASE_URL = `https:randomuser.me/portraits`;

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
                                        RETURNING id, is_admin;`, 
                                        [username, 
                                        hashedPassword,
                                        first_name,
                                        birthday,
                                        user_sex,
                                        sex_preference ]);
        
        return result.rows[0];          
    }

    static async login({ username, pw }){
        const checkUser = await db.query(`SELECT 
                                            id,
                                            is_admin,
                                            pw
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

    static async getUserById(userId) {
        const result = await db.query(`SELECT 
                                        users.id,
                                        username,
                                        first_name,
                                        birthday,
                                        user_sex,
                                        sex_preference,
                                        bio,
                                        prompt1,
                                        prompt2,
                                        prompt3,
                                        prompt1_res,
                                        prompt2_res,
                                        prompt3_res,
                                        ARRAY[hate1, hate2, hate3, hate4, hate5] AS hates,
                                        json_agg(photos.*) AS photos_arr
                                    FROM 
                                        users
                                    LEFT JOIN
                                        photos
                                    ON
                                        users.id = photos.user_id
                                    WHERE 
                                        users.id = $1
                                    GROUP BY 
                                        users.id;`, [userId]);

        const data = result.rows[0];
        const { id , username, first_name, birthday, user_sex, sex_preference, bio } = data;

        const prompts = {}
        for (let i = 1; i <=3; i++) {
            const key = `prompt${i}`;
            prompts[key] = {
                name: key,
                id: data[key],
                promptRes: data[`${key}_res`]
            }
        }

        const hates = data.hates.filter((val) => val !== null);

        const { photos_arr } = data;
        console.log(photos_arr);
        const photos = photos_arr.reduce((acc, photo, i) => {
            // If user id <= 100 load seeded url
            if (id > 1 && id <= 100 && i === 0) {
                const sex = user_sex === 'male' ? 'men' : 'women'
                const photo1 = { publicId: `${username}/photo1`, 
                                user_id: id, 
                                image_url: `${BOT_PIC_BASE_URL}/${sex}/${id}.jpg` }
                return ({ ...acc, photo1 });
            }
            else if (photo) {
                const name = photo.public_id.split('/')[1];
                return ({...acc, [name]: photo });
            } else {
                return acc;
            }
        }, {});

        return { id, username, first_name, birthday, user_sex, sex_preference, bio, prompts, hates, photos }
    }

    // Selects matched users for given userId
    // int: userId -> [match, ...]

    static async queryMatches(userId) {
        const result = await db.query(`WITH matchedUsers AS
                                    (SELECT
                                        id,
                                        last_interaction, 
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
                                        matchedUsers.last_interaction as last_interaction,
                                        users.id,
                                        users.username,
                                        users.first_name,
                                        users.birthday,
                                        users.bio,
                                        users.user_sex,
                                        users.sex_preference,
                                        users.hate1,
                                        users.hate2,
                                        users.hate3,
                                        users.hate4,
                                        users.hate5,
                                        users.prompt1,
                                        users.prompt2,
                                        users.prompt3,
                                        users.prompt1_res,
                                        users.prompt2_res,
                                        users.prompt3_res,
                                        json_agg(photos.*) AS photos_arr
                                    FROM 
                                        matchedUsers
                                    JOIN 
                                        users 
                                    ON 
                                        users.id = matchedUsers.user_id
                                    LEFT JOIN
                                        photos
                                    ON 
                                        users.id = photos.user_id
                                    GROUP BY 
                                        matchedUsers.id, matchedUsers.last_interaction, users.id;
                                    `,[userId]);
        

        return result.rows.reduce((acc, match) => {
            const { match_id, last_interaction, photos_arr, ...user } = match;
            const photos = photos_arr.reduce((acc, photo, i) => {
                if ( user.user_id > 1 && user.user_id <= 100 && i === 0) {
                    const sex = user.user_sex === 'male' ? 'men' : 'women';
                    const image_url = `${BOT_PIC_BASE_URL}/${sex}/${user.user_id}.jpg`;
                    const photo1 = { user_id: user.user_id, 
                                    public_id: `${user.username}/photo1`, 
                                    image_url }
                    return ({ ...acc, photo1 })
                }
                if (photo) {
                    const name = photo.public_id.split('/')[1];
                    return ({...acc, [name]: photo });
                } else {
                    return null;
                }
            }, {});
            acc[match_id] = {...user, photos, last_interaction, messages: []};
            return acc;
        }, {});
    }

    static async queryUserIds({ userId, offset=0 }) {
        const result = await db.query(`WITH excluded 
                                        AS
                                        (
                                            (SELECT likee_id AS id FROM likes WHERE liker_id = $1)
                                            UNION
                                            (SELECT dislikee_id AS id FROM dislikes WHERE disliker_id = $1)
                                            UNION
                                            (SELECT user2_id AS id FROM matches WHERE user1_id = $1)
                                            UNION
                                            (SELECT user1_id AS id FROM matches WHERE user2_id = $1)
                                            UNION
                                            (SELECT $1 AS id)
                                        )

                                        SELECT 
                                            ARRAY_AGG(u2.id) AS ids
                                        FROM 
                                            users u1
                                        JOIN
                                            users u2
                                        ON
                                            u1.sex_preference = u2.user_sex
                                        WHERE
                                            u1.id = $1
                                        AND
                                            u2.id NOT IN (SELECT id FROM excluded)
                                        LIMIT 100;
                                        `, [userId]);
        return result.rows[0].ids;
    }

    static async getPhotoById(publicId) {
        const result = await db.query(`SELECT 
                                        public_id, image_url 
                                    FROM 
                                        photos
                                    WHERE 
                                        public_id = $1`, [publicId]);
        return result.rows[0];
    }

    static async getUserPhotos(userId) {
        const result = await db.query(`SELECT 
                                        public_id, image_url 
                                    FROM 
                                        photos
                                    WHERE 
                                        user_id = $1
                                    ORDER BY 
                                        public_id`, [userId]);
        return result.rows.reduce((acc, value, i) => {
            return ({...acc, [`photo${i+1}`]: value })   
        }, {});
    }

    static async addPhoto({ userId, publicId, imageUrl }) {
        const result = await db.query(`INSERT INTO photos
                                        (user_id, public_id, image_url)
                                    VALUES
                                        ($1, $2, $3)
                                    RETURNING user_id, public_id, image_url`, [userId, publicId, imageUrl]);
        return result.rows[0];
    }

    static async updatePhoto({ publicId, imageUrl }) {
        const result = await db.query(`UPDATE 
                                        photos 
                                    SET 
                                        image_url = $1 
                                    WHERE 
                                        public_id = $2
                                    RETURNING 
                                        public_id, image_url`, [imageUrl, publicId]);
        return result.rows[0];
    }

    static async deletePhoto(public_id) {
        const result = await db.query(`DELETE FROM 
                                            photos
                                        WHERE 
                                            public_id = $1
                                        RETURNING public_id`, [public_id]);
        return result.rows[0];
    }

    static async addBio(bio, userId) {
        const result = await db.query(`UPDATE users
                                    SET bio = $1 
                                    WHERE id = $2
                                    RETURNING bio`, [bio, userId]);
        return result.rows[0].bio;
    }

    static async addPrompt(prompt, userId) {
        const { name, id = null, promptRes=null } = prompt;
        const result = await db.query(`UPDATE users
                        SET ${name} = $1,
                            ${name}_res = $2
                        WHERE id = $3
                        RETURNING ${name} AS id, ${name}_res AS promptRes`, [id, promptRes, userId]);
        return result.rows[0];
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
                                            ARRAY[hate1,
                                            hate2,
                                            hate3,
                                            hate4,
                                            hate5] as hates`, [hate1, hate2, hate3, hate4, hate5, userId]);
        
        return res.rows[0].hates.filter(val => val !== null);
      }
      
      
}

export default User;