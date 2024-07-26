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
const userWithLabel = faker.string.uuid();
const walletLabel = 'Test';

describe('Wallet Actions', () => {
    test('should create wallet without label', async () => {
        const result = await walletActions.createWallet(userId);
        expect(result).toBe(true);
    });

    test('should create wallet with label', async () => {
        const result = await walletActions.createWallet(
            userWithLabel,
            'NGN',
            0,
            walletLabel
        );
        expect(result).toBe(true);
    });

    test('should get wallet', async () => {
        const [wallet, transaction] = await walletActions.getWallet(userId);
        expect(wallet).toHaveProperty('id');
        expect(transaction).toEqual([]);
    });

    test('should get wallet', async () => {
        const [wallet, transaction] = await walletActions.getWallet(
            userWithLabel,
            walletLabel
        );
        expect(wallet).toHaveProperty('id');
        expect(transaction).toEqual([]);
    });

    test('should get wallet', async () => {
        const [wallet, transaction] = await walletActions.getWallet(
            userWithLabel,
            walletLabel
        );
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

    test('should get user wallet transaction', async () => {
        const result = await walletActions.getWalletTransactions(userId);
        expect(result.length).toBe(3);
    });

    test('should get user wallet transaction', async () => {
        const result = await walletActions.getWalletTransactions(
            userWithLabel,
            0,
            10,
            walletLabel
        );
        expect(result.length).toBe(0);
    });

    test('should get all user wallet balance', async () => {
        const result = await walletActions.getWalletBalanceSum();
        console.log('Wallet with label sum', result);
        expect(result).toBe(400);
    });

    test('should get all user wallet with label balance', async () => {
        const result = await walletActions.getWalletBalanceSum(walletLabel);
        expect(result).toBe(0);
    });

    test('should get all wallet transaction', async () => {
        const [transactions, pagination] =
            await walletActions.getAllWalletTransactions(0, 10);
        expect(transactions.length).toBe(3);
    });
});
