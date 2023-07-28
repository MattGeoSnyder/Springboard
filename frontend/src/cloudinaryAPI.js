import axios from 'axios';
import { CLOUD_NAME, API_KEY } from './cloudinarySecret';
import API from './api';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
const CLOUDINARY_BASE_URL = 'https://api.cloudinary.com/v1_1';
const USER_PIC_BASE_URL = 'https://res.cloudinary.com/dubjhgxii/image/upload';

class CloudinaryAPI {

  static async requestSignature(options, token) {
    try {
      const paramsToSign = { ...options, timestamp: Math.floor(Date.now()/1000) };
      const res = await API.authPost(`/images/auth`, paramsToSign, token);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async uploadImage(file, options={}, token) {
    const { signature } = (await this.requestSignature(options, token));
    console.log(signature);
    const formData = new FormData();
    formData.append('timestamp', Math.floor(Date.now()/1000));
    formData.append('signature', signature);
    formData.append('api_key', API_KEY);
    formData.append('file', file);
    
    Object.entries(options).forEach(([key, val]) => {
      formData.append(key,val);
    }); 

    try {
      const res = await axios.post(`${CLOUDINARY_BASE_URL}/${CLOUD_NAME}/image/upload`, formData);
      return res.data;
    } catch (error) {
      throw error;
    } 
  }

  static async deletePhoto(params, token) {
    const { signature } = (await this.requestSignature(params, token));
    try {
      const res = await axios.post(`${CLOUDINARY_BASE_URL}/${CLOUD_NAME}/image/destroy`, 
                                    { ...params, 
                                      signature, 
                                      api_key: API_KEY, 
                                      timestamp: Math.floor(Date.now()/1000) });
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export default CloudinaryAPI;
export { USER_PIC_BASE_URL }