import apiKit, { ApiKeys } from '../utils/apiKit';

type RatesPayload = {
    sourceCurrency: string;
    destinationCurrency: string;
    amount?: number;
};

type CreateTransferPayload = {
    account_bank: string;
    account_number: string;
    amount: number;
    currency: string;
    beneficiary_name: string;
    reference?: string;
    debit_currency: string;
    narration: string;
    meta?: {
        [key: string]: any;
    };
};

type CreateTransferResponse = {
    status: string;
    message: string;
    data: {
        [key: string]: any;
    };
};

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
                amount || 1
            }`,
            {
                headers: { ...this.headers },
            }
        );
    }

    async getBanks(bank: string = 'NG') {
        return await apiKit.get(`/banks/${bank}`, {
            headers: { ...this.headers },
        });
    }

    async createTransfer(payload: CreateTransferPayload) {
        return await apiKit.post<CreateTransferResponse>(
            '/transfers',
            payload,
            {
                headers: { ...this.headers },
            }
        );
    }
}
