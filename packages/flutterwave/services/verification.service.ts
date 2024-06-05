import apiKit, { ApiKeys } from '../utils/apiKit';

type BvnVerificationResponse = {
    status: string;
    message: string;
    data: {
        url: string;
        reference: string;
    };
};

type BvnPayload = {
    bvn: string;
    firstname: string;
    lastname: string;
    redirect_url: string;
};

type BankAccountPayload = {
    account_number: string;
    account_bank: string;
};

type BankAccountResponse = {
    status: string;
    message: string;
    data: {
        account_number: string;
        account_name: string;
    };
};

type TransactionResponse = {
    status: string;
    message: string;
    data: {
        [key: string]: any;
    };
};

export default class Verification {
    private apiKeys: ApiKeys = {
        publicKey: '',
        secretKey: '',
    };

    private headers: { [key: string]: string } = {};

    constructor(apiKeys: ApiKeys) {
        this.apiKeys = apiKeys;
        this.headers = { Authorization: `Bearer ${this.apiKeys.secretKey}` };
    }

    async bvn(payload: BvnPayload) {
        return await apiKit.post<BvnVerificationResponse>(
            '/bvn/verifications',
            payload,
            {
                headers: { ...this.headers },
            }
        );
    }

    async bankAccount(payload: BankAccountPayload) {
        return await apiKit.post<BankAccountResponse>(
            '/accounts/resolve',
            payload,
            {
                headers: { ...this.headers },
            }
        );
    }

    async transaction(transaction_id: string) {
        return await apiKit.get<TransactionResponse>(
            `/transactions/${transaction_id}/verify`,
            {
                headers: { ...this.headers },
            }
        );
    }
}
