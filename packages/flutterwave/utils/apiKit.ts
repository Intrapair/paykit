import axios from 'axios';

const FLUTTERWAVE_BASE_URL = 'https://api.flutterwave.com/v3';

export type ApiKeys = {
    publicKey: string;
    secretKey: string;
}

//create axios client pre-configured with base URL
export default axios.create({
    baseURL: FLUTTERWAVE_BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});
