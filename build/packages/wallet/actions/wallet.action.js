import db, { wallets, walletTransactions, greaterThan, } from '../config/database.config';
/**
 * Create wallet for user
 * @param userId The unique id of the user
 * @param currency The currency of the wallet. Default is NGN
 * @param balance The opening balance of the wallet. Default is 0
 * @returns boolean
 */
export const createWallet = async (userId, currency = 'NGN', balance = 0) => {
    const wallet = {
        currency: currency.toUpperCase(),
        id: 0,
        userId,
        balance,
    };
    await wallets(db).insert(wallet);
    return true;
};
/**
 * Get user wallet balance and top 10 transactions in DESC order
 * @param userId User uuid
 * @returns Array of wallet and transactions
 */
export const getWallet = async (userId) => {
    const wallet = await wallets(db).findOne({ userId });
    if (!wallet)
        throw new Error('Wallet not found');
    const transactions = await walletTransactions(db)
        .find({ walletId: wallet.id })
        .orderByDesc('id')
        .limit(10);
    return [wallet, transactions];
};
/**
 * Get user wallet balance only
 * @param userId the unique id of the user
 * @returns wallet balance
 */
export const getWalletBalance = async (userId) => {
    const wallet = await wallets(db).findOne({ userId });
    if (!wallet)
        throw new Error('Wallet not found');
    return wallet.balance;
};
/**
 * Get user wallet transactions in DESC order with pagination support
 * @param userId the unique id of the user
 * @param lastId the last id of the last transaction returned in previous call. Default is 0
 * @param limit the maximum number of transactions to return. Default is 10
 * @returns Array of transactions
 */
export const getWalletTransactions = async (userId, lastId = 0, limit = 10) => {
    const wallet = await wallets(db).findOne({ userId });
    if (!wallet)
        throw new Error('Wallet not found');
    return await walletTransactions(db)
        .find({
        ...(lastId ? { id: greaterThan(lastId) } : {}),
    })
        .orderByDesc('id')
        .limit(limit);
};