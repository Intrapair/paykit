import 'dotenv/config';
import { describe, it, expect, jest, test, afterAll } from '@jest/globals';
import { faker } from '@faker-js/faker';
import { Flutterwave } from './index';

const flutterwave = new Flutterwave(
    String(process.env.PAYKIT_FLUTTERWAVE_PUBLIC_KEY),
    String(process.env.PAYKIT_FLUTTERWAVE_SECRET_KEY)
);

describe('Collection', () => {
    test('should generate a payment link', async () => {
        const { data } = await flutterwave.Collection.createPaymentLink({
            tx_ref: faker.string.uuid(),
            customer: {
                email: faker.internet.email(),
                name: faker.internet.userName(),
                phonenumber: faker.phone.number(),
            },
            currency: 'NGN',
            amount: 500,
            customizations: {
                title: 'Flutterwave',
                logo: 'https://flutterwave.com/images/logo-colored.svg',
            },
            redirect_url: 'https://flutterwave.com',
        });
        expect(data).toHaveProperty('status');
        expect(data.status).toBe('success');
    });
});

describe('Transfer', () => {
    test('should get NGN to USD rate', async () => {
        const { data } = await flutterwave.Transfer.getRate({
            sourceCurrency: 'NGN',
            destinationCurrency: 'USD',
        });
        expect(data).toHaveProperty('status');
        expect(data.status).toBe('success');
        console.log(data.data.rate);
    });
    test('should get the list of Nigerian banks', async () => {
        const { data } = await flutterwave.Transfer.getBanks();
        expect(data).toHaveProperty('status');
        expect(data.status).toBe('success');
        console.log(data.data);
    });
});

describe('Verification', () => {
    test('verify bank account', async () => {
        const { data } = await flutterwave.Verification.bankAccount({
            account_number: "2209214163",
            account_bank: "057"
        });
        expect(data).toHaveProperty('status');
        expect(data.status).toBe('success');
        console.log(data.data);
    });
});
