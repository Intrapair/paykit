import { IApiKeys, IPaymentLinkPayload } from '../flutterwave.types';
import apiKit from '../utils/apiKit';

export default class Collection {
    private apiKeys: IApiKeys = {
        publicKey: '',
        secretKey: '',
    };

    private headers: { [key: string]: string } = {};

    constructor(apiKeys: IApiKeys) {
        this.apiKeys = apiKeys;
        this.headers = { Authorization: `Bearer ${this.apiKeys.secretKey}` };
    }

    async createPaymentLink(payload: IPaymentLinkPayload) {
        return await apiKit.post('/payments', payload, {
            headers: { ...this.headers },
        });
    }
}
