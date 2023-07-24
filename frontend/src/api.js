import axios from 'axios';
import { parse, stringify } from 'qs';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class APIError extends Error {
    constructor(error) {
        super(error.message);        
        this.status = error.status;
    }
}

class API {
    static async request(endpoint, data={} , method='get', token='') {
        const url = `${BASE_URL}${endpoint}`;
        const params = (method === 'get') ? data : {};
        const headers = { 'Authorization': `Bearer ${token}`}
        try {
            const res = (await axios({ url, method, params, data, headers })).data;
            return res;
        } catch (error) {
            console.log(error);
            throw new APIError(error);
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

    static async getMatches(userId, token) {
        let matches = await this.request(`/users/${userId}/matches`, {}, 'get', token);
        return matches;
    }

    static async getConversation({ matchId, userId, offset=0 }) {
        let messages = await this.request(`/messages/match/${matchId}?offset=${offset}`, { userId }, 'patch');
        return messages;
    }

    static async markMessageSeen(messageId) {
        let message = await this.request(`/messages/${messageId}`, {}, 'patch');
        return message;
    }

    static async addPhoto(imageData) {
        let photo = await this.request('/images/add', imageData, 'post');
        return photo;
    }

    static async deletePhoto({ userId, public_id }) {
        let res = await this.request(`/users/${userId}/photo`, { public_id }, 'delete') ;
        return res;
    }

    static async addBio(bioData, userId) {
        await this.request(`/users/${userId}/bio`, { bioData }, 'post');
    }

    static async addHates(hatesArr, userId) {
        const hates = JSON.stringify(hatesArr);
        const result = await this.request(`/users/${userId}/hates`, { hates }, 'post');
        return result;
    }

    static async addPrompts(prompts, userId) {
        let prompt = await this.request(`/users/${userId}/prompts`, { prompts }, 'post');
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

    static async getNotifications(userId) {
        let notifications = await this.request(`/users/${userId}/notifications`);
        return notifications;
    }

    static async getChatBotRes(message) {
        console.log(message);
        let res = await this.request(`/chat`, { ...message }, 'post');
        return res.message;
    }

}

export default API;