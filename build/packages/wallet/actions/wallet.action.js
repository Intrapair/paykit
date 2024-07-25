import { sql } from '@databases/mysql';
import db, { wallets, walletTransactions, greaterThan, } from '../config/database.config';
/**
 * Create wallet for user
 * @param userId The unique id of the user
 * @param currency The currency of the wallet. Default is NGN
 * @param balance The opening balance of the wallet. Default is 0
 * @returns boolean
 */
export const createWallet = async (userId, currency = 'NGN', balance = 0, label = null) => {
    const wallet = {
        currency: currency.toUpperCase(),
        id: 0,
        userId,
        balance,
        label
    };
    await wallets(db).insert(wallet);
    return true;
};
/**
 * Get user wallet balance and top 10 transactions in DESC order
 * @param userId User uuid
 * @param label Wallet label
 * @returns Array of wallet and transactions
 */
export const getWallet = async (userId, label = null) => {
    const wallet = await wallets(db).findOne({ userId, label });
    if (!wallet)
        throw new Error('Wallet not found');
    let transactions = await walletTransactions(db)
        .find({ walletId: wallet.id })
        .orderByDesc('id')
        .limit(10);
    transactions = transactions.map((row) => {
        let d = {
            ...row,
            transactionDetails: JSON.parse(row.transactionDetails),
        };
        return d;
    });
    return [wallet, transactions];
};
/**
 * Get user wallet balance only
 * @param userId the unique id of the user
 * @param label Wallet label
 * @returns wallet balance
 */
export const getWalletBalance = async (userId, label = null) => {
    const wallet = await wallets(db).findOne({ userId, label });
    if (!wallet)
        throw new Error('Wallet not found');
    return wallet.balance;
};
/**
 * Get user wallet transactions in DESC order with pagination support
 * @param userId the unique id of the user
 * @param lastId the last id of the last transaction returned in previous call. Default is 0
 * @param limit the maximum number of transactions to return. Default is 10
 * @optional walletLabel Wallet label
 * @returns Array of transactions
 */
export const getWalletTransactions = async (userId, lastId = 0, limit = 10, walletLabel = null) => {
    const wallet = await wallets(db).findOne({ userId, label: walletLabel });
    if (!wallet)
        throw new Error('Wallet not found');
    let transactions = await walletTransactions(db)
        .find({
        walletId: wallet.id,
        ...(lastId ? { id: greaterThan(lastId) } : {}),
        walletLabel,
    })
        .orderByDesc('id')
        .limit(limit);
    transactions = transactions.map((row) => {
        let d = {
            ...row,
            transactionDetails: JSON.parse(row.transactionDetails),
        };
        return d;
    });
    return transactions;
};
/**
 * Get all wallet transactions in DESC order with pagination support
 * @param lastId the last id of the last transaction returned in previous call. Default is 0
 * @param limit the maximum number of transactions to return. Default is 10
 * @param walletLabel Wallet label
 * @returns Array of transactions
 */
export const getAllWalletTransactions = async (lastId = 0, limit = 10, walletLabel = null) => {
    let transactions = await walletTransactions(db)
        .find({
        ...(walletLabel ? { walletLabel } : {}),
        ...(lastId ? { id: greaterThan(lastId) } : {}),
    })
        .orderByDesc('id')
        .limit(limit);
    transactions = transactions.map((row) => {
        let d = {
            ...row,
            transactionDetails: JSON.parse(row.transactionDetails),
        };
        return d;
    });
    return transactions;
};
/**
 * Get all wallet balance summation
 * @param walletLabel Wallet label
 * @returns Array of transactions
 */
export const getWalletBalanceSum = async (walletLabel = null) => {
    // const condition = ;
    const filter = sql.__dangerous__rawValue(`${walletLabel ? `= '${walletLabel}'` : `IS ${walletLabel}`}`);
    const walletSum = await db.query(sql `SELECT SUM(balance) as balance FROM wallets WHERE label ${filter}`);
    return walletSum[0].balance;
};
