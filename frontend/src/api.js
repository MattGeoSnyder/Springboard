import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class API {
    static async request(endpoint, data={}, method='get') {
        const url = `${BASE_URL}${endpoint}`;
        const params = (method === 'get') ? data : {};
        const validateStatus = (status) => status <= 500;

        try {
            const res = (await axios({url, method, data, params, validateStatus})).data;
            return res;
        } catch (error) {
            console.log(error.response.data);
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

    static async getUserById(userId) {
        let user = await this.request(`/users/${userId}`);
        return user;
    }

    static async getUserIds({ userId, offset }) {
        let userIds = await this.request(`/users/${userId}/users`, { offset });
        return userIds;
    }

    static async getPrompts() {
        let prompts = await this.request('/prompts');
        return prompts;
    }

    static async getPromptById(promptId) {
        let prompt = await this.request(`/prompts/${promptId}`);
        return prompt;
    }

    static async getHates() {
        let hates = await this.request('/hates');
        return hates;
    }

    static async getHateById(hateId) {
        let hate = await this.request(`/hates/${hateId}`);
        return hate;
    }

    static async getUserPhotoById(username, name) {
        let photo = await this.request(`/images/${username}/${name}`);
        return photo;
    }

    static async getUserPhotos(userId) {
        let photos = await this.request(`/users/${userId}/photos`);
        return photos;
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

    static async addBio(bioData, userId) {
        let bio = await this.request(`/users/${userId}/bio`, { bioData }, 'post');
        return bio;
    }

    static async addHates(hatesArr, userId) {
        const hates = JSON.stringify(hatesArr);
        const result = await this.request(`/users/${userId}/hates`, { hates }, 'post');
        return result;
    }

    static async addPrompt(promptData, userId) {
        let prompt = await this.request(`/users/${userId}/prompts`, promptData, 'post');
        return prompt;
    }

    static async like(likerId, likeeId) {
        let result = await this.request(`/likes/${likerId}/${likeeId}`, {} ,'post');
        return result;
    }

    static async dislike(dislikerId, dislikeeId) {
        let dislike = await this.request(`/dislikes/${dislikerId}/${dislikeeId}`, {}, 'post');
        return dislike;
    }

}

export default API;