import { describe, it, expect, jest, test, afterAll } from '@jest/globals';
import { faker } from '@faker-js/faker';
import {
    walletModel,
    debitActions,
    creditActions,
    walletActions,
} from './index';

describe('Wallet Model', () => {
    test('should authenticate to db', async () => {
        const result = await walletModel.authenticate();
        expect(result).toBe(true);
    });
});

const userId = faker.string.uuid();

describe('Wallet Actions', () => {
    test('should create wallet', async () => {
        const result = await walletActions.createWallet(userId);
        expect(result).toBe(true);
    });

    test('should get wallet', async () => {
        const [wallet, transaction] = await walletActions.getWallet(userId);
        expect(wallet).toHaveProperty('id');
        expect(transaction).toEqual([]);
    });

    test('should credit user wallet', async () => {
        const result = await creditActions.credit(
            userId,
            1000,
            faker.string.uuid()
        );
        expect(result).toBe(true);
    });

    test('user wallet balance should be 1000', async () => {
        const result = await walletActions.getWalletBalance(userId);
        expect(result).toBe(1000);
    });

    test('should debit user wallet', async () => {
        const result = await debitActions.initiateDebit(
            userId,
            500,
            faker.string.uuid()
        );
        expect(result).toBe(true);
    });

    test('user wallet balance should be 500', async () => {
        const result = await walletActions.getWalletBalance(userId);
        expect(result).toBe(500);
    });

    test('should debit user wallet with 100', async () => {
        const result = await debitActions.debitWallet(
            userId,
            100,
            faker.string.uuid()
        );
        expect(result).toBe(true);
    });
});
