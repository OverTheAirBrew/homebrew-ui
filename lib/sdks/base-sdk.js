"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSdk = void 0;
const isomorphic_unfetch_1 = __importDefault(require("isomorphic-unfetch"));
class BaseSdk {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    async get(url, options) {
        console.log('AAA', url);
        return await this.makeRequest(url, Object.assign(Object.assign({}, options), { method: 'GET' }));
    }
    async post(url, options) {
        return await this.makeRequest(url, Object.assign(Object.assign({}, options), { method: 'POST' }));
    }
    async put(url, options) {
        return await this.makeRequest(url, Object.assign(Object.assign({}, options), { method: 'PUT' }));
    }
    async delete(url, options) {
        return await this.makeRequest(url, Object.assign(Object.assign({}, options), { method: 'DELETE' }));
    }
    async makeRequest(url, options) {
        this.validateUrl(url);
        const absoluteUrl = this.createAbsoluteUrl(url);
        console.log(absoluteUrl);
        const response = await isomorphic_unfetch_1.default(absoluteUrl, options);
        try {
            const validResponse = await this.validateResponse(response);
            return {
                status: response.status,
                data: validResponse,
                isSuccess: validResponse !== null,
            };
        }
        catch (err) {
            return {
                status: response.status,
                data: { message: err },
                isSuccess: false,
            };
        }
    }
    async validateResponse(response) {
        if (response.ok) {
            return await response.json();
        }
        else {
            // console.log('ERROR RESPONSE', await response.json());
            return null;
        }
    }
    validateUrl(url) {
        if (url.indexOf('http') > -1)
            throw new Error('Url must be relative');
    }
    createAbsoluteUrl(url) {
        console.log(url);
        if (url[0] === '/')
            url = url.substr(1);
        return `${this.baseUrl}/${url}`;
    }
}
exports.BaseSdk = BaseSdk;
