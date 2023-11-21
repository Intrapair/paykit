import db, { wallets, walletTransactions } from '../config/database.config';

/**
 * Debit user wallet and create wallet transaction
 * @param userId the unique id of the user
 * @param amount amount to be debited
 * @param transactionId ID of the transaction
 * @returns boolean
 */
export const initiateDebit = async (userId: string, amount: number, transactionId: string): Promise<boolean> => {
    return await db.tx(async (db) => {
        // get wallet
        const wallet = await wallets(db).findOne({ userId });
        if(!wallet) {
            throw new Error('Wallet not found');
        }
        // calculate new balance
        const newBalance = parseFloat(String(wallet.balance - amount));

        // create wallet history for the new transaction
        await walletTransactions(db).insert({
            transactionType: 'debit',
            previousBalance: wallet.balance,
            newBalance: newBalance,
            walletId: wallet.id,
            transactionDetails: '{}',
            id: 0,
            amount,
            transactionId,
        });
        // update user wallet balance
        await wallets(db).update({ id: wallet.id }, { balance: newBalance });
        return true;
    });
}

/**
 * Complete a debit transaction and update transaction details
 * @param transactionId ID of the transaction to be completed
 * @param transactionDetails details of the transaction
 * @returns boolean
 */
export const completeDebit = async (transactionId: string, transactionDetails: object = {}): Promise<boolean> => {
    const transaction = await walletTransactions(db).findOne({ transactionId });
    if(!transaction) {
        throw new Error('Transaction not found');
    }
    await walletTransactions(db).update({ transactionId }, {
        transactionDetails: JSON.stringify(transactionDetails),
        status: 'completed',
    });
    return true;
}