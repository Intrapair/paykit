import apiKit from '../utils/apiKit';
export default class Verification {
    constructor(apiKeys) {
        this.apiKeys = {
            publicKey: '',
            secretKey: '',
        };
        this.headers = {};
        this.apiKeys = apiKeys;
        this.headers = { Authorization: `Bearer ${this.apiKeys.secretKey}` };
    }
    async bvn(payload) {
        return await apiKit.post('/bvn/verifications', payload, {
            headers: { ...this.headers },
        });
    }
    async bankAccount(payload) {
        return await apiKit.post('/accounts/resolve', payload, {
            headers: { ...this.headers },
        });
    }
    async transaction(transaction_id) {
        return await apiKit.get(`/transactions/${transaction_id}/verify`, {
            headers: { ...this.headers },
        });
    }
}
