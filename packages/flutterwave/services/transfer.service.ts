import { IApiKeys, IRatesPayload } from '../flutterwave.types';
import apiKit from '../utils/apiKit';

export default class Transfer {
    private apiKeys: IApiKeys = {
        publicKey: '',
        secretKey: '',
    };

    private headers: { [key: string]: string } = {};

    constructor(apiKeys: IApiKeys) {
        this.apiKeys = apiKeys;
        this.headers = { Authorization: `Bearer ${this.apiKeys.secretKey}` };
    }

    async getRate(data: IRatesPayload) {
        const { sourceCurrency, destinationCurrency, amount } = data;
        return await apiKit.get(
            `/transfers/rates?source_currency=${sourceCurrency}&destination_currency=${destinationCurrency}&amount=${
                amount || 50
            }`,
            {
                headers: { ...this.headers },
            }
        );
    }
}
