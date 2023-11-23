import apiKit from '../utils/apiKit';
export default class Collection {
    constructor(apiKeys) {
        this.apiKeys = {
            publicKey: '',
            secretKey: '',
        };
        this.headers = {};
        this.apiKeys = apiKeys;
        this.headers = { Authorization: `Bearer ${this.apiKeys.secretKey}` };
    }
    async createPaymentLink(payload) {
        return await apiKit.post('/payments', payload, {
            headers: { ...this.headers },
        });
    }
}
