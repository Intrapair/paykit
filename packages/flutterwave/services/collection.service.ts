import apiKit, { ApiKeys } from '../utils/apiKit';

type PaymentLinkPayload = {
    tx_ref: string;
    customer: {
        email: string;
        name?: string;
        phonenumber?: string;
    };
    currency: string;
    amount: number;
    customizations: {
        title: string;
        logo: string;
    };
    redirect_url: string;
}

type PaymentLinkResponse = {
    status: string;
    message: string;
    data: {
        link: string;
    }
}
export default class Collection {
    private apiKeys: ApiKeys = {
        publicKey: '',
        secretKey: '',
    };

    private headers: { [key: string]: string } = {};

    constructor(apiKeys: ApiKeys) {
        this.apiKeys = apiKeys;
        this.headers = { Authorization: `Bearer ${this.apiKeys.secretKey}` };
    }

    async createPaymentLink(payload: PaymentLinkPayload) {
        return await apiKit.post<PaymentLinkResponse>('/payments', payload, {
            headers: { ...this.headers },
        });
    }
}
