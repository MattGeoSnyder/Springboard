import env from 'dotenv'

env.config()

const CLOUDINARY_CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.API_KEY;

export { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY };