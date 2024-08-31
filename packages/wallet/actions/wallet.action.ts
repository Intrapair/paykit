import { sql } from '@databases/mysql';
import WalletTransactions from '../__generated__/walletTransactions';
import Wallets from '../__generated__/wallets';
import db, {
    wallets,
    walletTransactions,
    greaterThan,
    lessThan,
} from '../config/database.config';

/**
 * Create wallet for user
 * @param userId The unique id of the user
 * @param currency The currency of the wallet. Default is NGN
 * @param balance The opening balance of the wallet. Default is 0
 * @returns boolean
 */
export const createWallet = async (
    userId: string,
    currency: string = 'NGN',
    balance: number = 0,
    label: string = null
): Promise<boolean> => {
    const wallet = {
        currency: currency.toUpperCase(),
        id: 0,
        userId,
        balance,
        label,
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
export const getWallet = async (
    userId: string,
    label: string = null
): Promise<[Wallets, WalletTransactions[]]> => {
    const wallet = await wallets(db).findOne({ userId, label });
    if (!wallet) throw new Error('Wallet not found');
    let transactions = await walletTransactions(db)
        .find({ walletId: wallet.id })
        .orderByDesc('id')
        .limit(10);
    transactions = transactions.map((row: any) => {
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
export const getWalletBalance = async (
    userId: string,
    label: string = null
) => {
    const wallet = await wallets(db).findOne({ userId, label });
    if (!wallet) throw new Error('Wallet not found');
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
export const getWalletTransactions = async (
    userId: string,
    lastId: number = 0,
    limit: number = 10,
    walletLabel: string = null
): Promise<WalletTransactions[]> => {
    const wallet = await wallets(db).findOne({ userId, label: walletLabel });
    if (!wallet) throw new Error('Wallet not found');
    let transactions = await walletTransactions(db)
        .find({
            walletId: wallet.id,
            ...(lastId ? { id: greaterThan(lastId) } : {}),
            walletLabel,
        })
        .orderByDesc('id')
        .limit(limit);
    transactions = transactions.map((row: any) => {
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
export const getAllWalletTransactions = async (
    lastId: number = null,
    limit: number = 10,
    walletLabel: string = null
): Promise<{
    transactions: WalletTransactions[];
    pagination: { [key: string]: number | null };
}> => {
    const whereClause = sql.__dangerous__rawValue(
        `${walletLabel ? `WHERE walletLabel = '${walletLabel}'` : ''}`
    );
    // get total count and max ID
    const countAndMaxId = await db.query(
        sql`SELECT COUNT(*) AS total, MAX(id) as maxId FROM walletTransactions ${whereClause}`
    );
    const total: number = countAndMaxId[0].total;
    const maxId: number = countAndMaxId[0].maxId;

    let transactions = await walletTransactions(db)
        .find({
            ...(walletLabel ? { walletLabel: walletLabel } : {}),
            ...(lastId
                ? {
                      id: lessThan(!lastId ? maxId : lastId),
                  }
                : {}),
        })
        .orderByDesc('id')
        .limit(limit + 1);
    transactions = transactions.map((row: any) => {
        let d = {
            ...row,
            transactionDetails: JSON.parse(row.transactionDetails),
        };
        return d;
    });

    const hasNextPage = transactions.length > limit;
    if (hasNextPage) {
        transactions.pop(); // Remove the extra item
    }

    // Calculate total pages
    const totalPages = Math.ceil(total / limit);

    // Determine current page, previous and next page
    let currentPage: number | null,
        prevPage: number | null,
        nextPage: number | null,
        nextPageLastId: number | null;

    if (transactions.length > 0) {
        const andClause = sql.__dangerous__rawValue(
            `${walletLabel ? `AND walletLabel = '${walletLabel}'` : ''}`
        );
        const itemsAfterLastId = await db.query(
            sql`SELECT COUNT(*) AS count FROM walletTransactions WHERE id >= ${transactions[0].id} ${andClause}`
        );
        const itemsAfter = itemsAfterLastId[0].count;

        currentPage = Math.ceil(itemsAfter / limit);
        prevPage = currentPage > 1 ? currentPage - 1 : null;
        nextPage = hasNextPage ? currentPage + 1 : null;
        nextPageLastId = hasNextPage
            ? transactions[transactions.length - 1].id
            : null;
    } else {
        currentPage = 1;
        prevPage = null;
        nextPage = null;
        nextPageLastId = null;
    }

    return {
        transactions,
        pagination: {
            totalPages,
            currentPage,
            prevPage,
            nextPage,
            nextPageLastId,
            totalItems: total,
        },
    };
};

/**
 * Get all wallet balance summation
 * @param walletLabel Wallet label
 * @returns Array of transactions
 */
export const getWalletBalanceSum = async (
    walletLabel: string = null
): Promise<number> => {
    // const condition = ;
    const filter = sql.__dangerous__rawValue(
        `${walletLabel ? `= '${walletLabel}'` : `IS ${walletLabel}`}`
    );
    const walletSum = await db.query(
        sql`SELECT SUM(balance) as balance FROM wallets WHERE label ${filter}`
    );
    return walletSum[0].balance;
};
