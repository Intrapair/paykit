import { describe, it, expect, jest, test, afterAll } from '@jest/globals';
import { faker } from '@faker-js/faker';
import Flutterwave from './index';

const fluterwave = new Flutterwave(String(process.env.PAYKIT_FLW_PUBLIC_KEY), String(process.env.PAYKIT_FLW_SECRET_KEY))

describe('Collection', () => {
    test('should generate a payment link', async () => {
        const { data } = await fluterwave.Collection.createPaymentLink({
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

