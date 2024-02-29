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
        try {
            return await apiKit.post('/accounts/resolve', { account_number: '2209214163', account_bank: '057' }, {
                headers: { ...this.headers },
            });
        }
        catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async transaction(transaction_id) {
        return await apiKit.get(`/transactions/${transaction_id}/verify`, {
            headers: { ...this.headers },
        });
    }
}
