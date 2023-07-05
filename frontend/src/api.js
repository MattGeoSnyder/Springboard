import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class API {
    static async request(endpoint, data={}, method='get') {
        const url = `${BASE_URL}${endpoint}`;
        const params = (method === 'get') ? data : {};
        const validateStatus = (status) => status < 500;

        try {
            const res = (await axios({url, method, data, params, validateStatus})).data;
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    static async signup(userData) {
        let newUser = await this.request('/auth/register', userData, 'post');
        return newUser;
    }

    static async login(userData) {
        let user = await this.request('/auth/login', userData, 'post');
        return user;
    }

    static async getPrompts() {
        let prompts = await this.request('/prompts');
        return prompts;
    }

    static async getHates() {
        let hates = await this.request('/hates');
        return hates;
    }

    static async addHates(hatesArr, userId) {
        const hates = JSON.stringify(hatesArr);
        let result = this.request('/hates', { hates, userId }, 'post');
        return result;
    }

    static async getMatches(userId) {
        let matches = await this.request(`/users/${userId}/matches`);
        return matches;
    }

    static async getConversation(matchId, offset=0) {
        let messages = await this.request(`/messages/match/${matchId}?offset=${offset}`);
        return messages;
    }

    static async addPhoto(imageData) {
        let photo = await this.request('/images/add', imageData, 'post');
        return photo;
    }

    static async addBio(bioData) {
        let bio = await this.request('/users/bio', bioData, 'post');
        return bio;
    }

    static async addPrompt(promptData, userId) {
        let prompts = await this.request(`/users/${userId}/prompts`, promptData, 'post');
        return prompts;
    }

}

export default API;