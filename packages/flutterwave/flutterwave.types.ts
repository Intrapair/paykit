export interface IApiKeys {
    publicKey: string;
    secretKey: string;
}

export interface IPaymentLinkPayload {
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

export interface IRatesPayload { 
    sourceCurrency: string; 
    destinationCurrency: string; 
    amount?: number 
}

export default {};
