import apiKit, { ApiKeys } from '../utils/apiKit';

type RatesPayload = {
    sourceCurrency: string;
    destinationCurrency: string;
    amount?: number;
}

export default class Transfer {
    private apiKeys: ApiKeys = {
        publicKey: '',
        secretKey: '',
    };

    private headers: { [key: string]: string } = {};

    constructor(apiKeys: ApiKeys) {
        this.apiKeys = apiKeys;
        this.headers = { Authorization: `Bearer ${this.apiKeys.secretKey}` };
    }

    async getRate(data: RatesPayload) {
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

    async getBanks(bank: string = 'NG') {
        return await apiKit.get(
            `/banks/${bank}`,
            {
                headers: { ...this.headers },
            }
        );
    }

}
