import apiKit from '../utils/apiKit';
export default class Transfer {
    constructor(apiKeys) {
        this.apiKeys = {
            publicKey: '',
            secretKey: '',
        };
        this.headers = {};
        this.apiKeys = apiKeys;
        this.headers = { Authorization: `Bearer ${this.apiKeys.secretKey}` };
    }
    async getRate(data) {
        const { sourceCurrency, destinationCurrency, amount } = data;
        return await apiKit.get(`/transfers/rates?source_currency=${sourceCurrency}&destination_currency=${destinationCurrency}&amount=${amount || 50}`, {
            headers: { ...this.headers },
        });
    }
    async getBanks(bank = 'NG') {
        return await apiKit.get(`/banks/${bank}`, {
            headers: { ...this.headers },
        });
    }
}
