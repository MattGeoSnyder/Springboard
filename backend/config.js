// require('dotenv').config();
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const PORT = +process.env.PORT || 3001;

const BCRYPT_WORK_FACTOR = 10;

const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;

const DB_URI = process.env.NODE_ENV === 'test' ? 'postgresql:///haters_test' : 'postgresql:///haters';

const DATABASE_URL = process.env.DATABASE_URL;

export { SECRET_KEY, PORT, BCRYPT_WORK_FACTOR, DB_URI, CLOUDINARY_SECRET, DATABASE_URL };

// module.exports = {
//     SECRET_KEY,
//     PORT,
//     BCRYPT_WORK_FACTOR,
//     DB_URI
// }