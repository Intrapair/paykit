import db, { wallets, walletTransactions } from '../config/database.config';
/**
 * Credit user wallet and create wallet transaction
 * @param userId unique id of the user
 * @param amount amount to be credited
 * @param transactionId ID of the transaction
 * @param narration short description of the transaction
 * @param transactionDetails details of the transaction
 * @returns boolean
 */
export const credit = async (userId, amount, transactionId, narration, transactionDetails = {}) => {
    // start db transaction
    return await db.tx(async (db) => {
        // get wallet
        const wallet = await wallets(db).findOne({ userId });
        if (!wallet) {
            throw new Error('Wallet not found');
        }
        // update wallet balance
        const newBalance = parseFloat(String(wallet.balance + amount));
        // create wallet history for the new transaction
        await walletTransactions(db).insert({
            transactionType: 'credit',
            previousBalance: wallet.balance,
            newBalance: newBalance,
            walletId: wallet.id,
            walletLabel: wallet.label,
            transactionDetails: JSON.stringify(transactionDetails),
            status: 'completed',
            narration: narration || `Wallet credit of ${wallet.currency}${amount}`,
            id: 0,
            amount,
            transactionId,
        });
        // update user wallet balance
        await wallets(db).update({ id: wallet.id }, { balance: newBalance });
        return true;
    });
};
/**
 * Revert a debit transaction and update wallet balance
 * @param transactionId ID of the transaction to be reverted
 * @returns boolean
 */
export const revertDebit = async (transactionId) => {
    // start db transaction
    return await db.tx(async (db) => {
        // get wallet transaction
        const transaction = await walletTransactions(db).findOne({
            transactionId,
        });
        if (!transaction) {
            throw new Error('Transaction not found');
        }
        const { amount, walletId } = transaction;
        // get wallet
        const wallet = await wallets(db).findOne({ id: walletId });
        if (!wallet) {
            throw new Error('Wallet not found');
        }
        // get new balance
        const newBalance = parseFloat(String(wallet.balance + amount));
        // create wallet history for the new transaction
        await walletTransactions(db).insert({
            transactionType: 'credit',
            previousBalance: wallet.balance,
            newBalance: newBalance,
            walletId: wallet.id,
            walletLabel: wallet.label,
            status: 'completed',
            narration: `Revert: ${transaction.narration}`,
            id: 0,
            amount,
            transactionId: transactionId + '-revert',
            transactionDetails: '{}',
        });
        // update user wallet balance
        await wallets(db).update({ id: wallet.id }, { balance: newBalance });
        return true;
    });
};
