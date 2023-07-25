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
        const headers = { 'Authorization': `Bearer ${token}` }
        try {
            const res = (await axios({ url, method, params, data, headers })).data;
            return res;
        } catch (error) {
            console.log(error);
            throw new APIError(error.response.data.error);
        }
    }

    //...these are for convenience in adding token

    static async authGet(endpoint, token) {
        return await this.request(endpoint, {}, 'get', token);
    }

    static async authPost(endpoint, data, token) {
        return await this.request(endpoint, data, 'post', token);
    }

    static async authPatch(endpoint, data, token) {
        return await this.request(endpoint, data, 'patch', token);
    }

    static async authPut(endpoint, data, token) {
        return await this.request(endpoint, data, 'delete', token);
    }

    static async signup(userData) {
        let newUser = await this.request('/auth/register', userData, 'post');
        return newUser;
    }

    static async login(userData) {
        let user = await this.request('/auth/login', userData, 'post');
        return user;
    }

    static async getUserById(userId, token) {
        let user = await this.authGet(`/users/${userId}`, token);
        return user;
    }

    static async getUserIds({ userId }, token) {
        let userIds = await this.authGet(`/users/${userId}/users`, token);
        return userIds;
    }

    static async getPrompts() {
        let prompts = await this.request('/prompts');
        return prompts;
    }

    //This is used but probably doesn't have to be
    static async getPromptById(promptId) {
        let prompt = await this.request(`/prompts/${promptId}`);
        return prompt;
    }

    static async getHates() {
        let hates = await this.request('/hates');
        return hates;
    }

    //Don't think is used anymore
    static async getHateById(hateId) {
        let hate = await this.request(`/hates/${hateId}`);
        return hate;
    }

    //Don't think is used anymore
    static async getUserPhotoById(username, name) {
        let photo = await this.request(`/images/${username}/${name}`);
        return photo;
    }

    //Don't think is used anymore
    static async getUserPhotos(userId) {
        let photos = await this.request(`/users/${userId}/photos`);
        return photos;
    }


    static async getMatches(userId, token) {
        let matches = await this.authGet(`/users/${userId}/matches`, token);
        return matches;
    }

    static async getConversation({ matchId, userId, offset=0 }, token) {
        let messages = await this.authPatch(`/messages/match/${matchId}?offset=${offset}`, { userId }, token);
        return messages;
    }

    static async markMessageSeen(messageId, token) {
        let message = await this.request(`/messages/${messageId}`, {}, token);
        return message;
    }

    static async addPhoto(imageData) {
        let photo = await this.request(`/users/${imageData.userId}/photos`, imageData, 'post');
        return photo;
    }

    static async deletePhoto({ userId, public_id }, token) {
        let res = await this.authDelete(`/users/${userId}/photo`, { public_id }, token) ;
        return res;
    }

    static async addBio(bioData, userId, token) {
        await this.authPost(`/users/${userId}/bio`, { bioData }, token);
    }

    static async addHates(hatesArr, userId, token) {
        const hates = JSON.stringify(hatesArr);
        const result = await this.authPost(`/users/${userId}/hates`, { hates }, token);
        return result;
    }

    static async addPrompts(prompts, userId, token) {
        let prompt = await this.authPost(`/users/${userId}/prompts`, { prompts }, token);
        return prompt;
    }

    static async like(likerId, likeeId, token) {
        let result = await this.authPost(`/likes/${likerId}/${likeeId}`, token);
        return result;
    }

    static async dislike(dislikerId, dislikeeId, token) {
        let dislike = await this.request(`/dislikes/${dislikerId}/${dislikeeId}`, token);
        return dislike;
    }

    static async getNotifications(userId, token) {
        let notifications = await this.authGet(`/users/${userId}/notifications`, token);
        return notifications;
    }

    //Not used anymore
    static async getChatBotRes(message) {
        console.log(message);
        let res = await this.request(`/chat`, { ...message }, 'post');
        return res.message;
    }

}

export default API;