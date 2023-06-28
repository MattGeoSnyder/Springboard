import axios from 'axios';
import { CLOUD_NAME, API_KEY } from './cloudinarySecret';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
const CLOUDINARY_BASE_URL = 'https://api.cloudinary.com/v1_1';

class CloudinaryAPI {

  static async requestSignature(options) {
    const paramsToSign = { ...options, timestamp: Math.floor(Date.now()/1000) };
    const res = await axios.post(`${BASE_URL}/images/auth`, paramsToSign);
    return res.data;
  }

  static async uploadImage(file, options={}) {
    const { signature } = (await this.requestSignature(options));
    const formData = new FormData();
    formData.append('timestamp', Math.floor(Date.now()/1000));
    formData.append('signature', signature);
    formData.append('api_key', API_KEY);
    formData.append('file', file);
    
    Object.entries(options).forEach(([key, val]) => {
      formData.append(key,val);
    }) 

    const res = await axios.post(`${CLOUDINARY_BASE_URL}/${CLOUD_NAME}/image/upload`, formData, {validateStatus: (status) => status < 500});
    console.log(res);
    return res.data;
  }
}

export default CloudinaryAPI;