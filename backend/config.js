// require('dotenv').config();
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || '$Boy07032018';

const PORT = +process.env.PORT || 3001;

const BCRYPT_WORK_FACTOR = 10;

const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;

const DB_URI = process.env.NODE_ENV === 'test' ? 'postgresql:///haters_test' : 'postgresql:///haters';

export { SECRET_KEY, PORT, BCRYPT_WORK_FACTOR, DB_URI, CLOUDINARY_SECRET };

// module.exports = {
//     SECRET_KEY,
//     PORT,
//     BCRYPT_WORK_FACTOR,
//     DB_URI
// }