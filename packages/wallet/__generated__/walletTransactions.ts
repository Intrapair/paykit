/**
 * !!! This file is autogenerated do not edit by hand !!!
 *
 * Generated by: @databases/pg-schema-print-types
 * Checksum: cRS9Z9mSsMqvQtOkWrRA1w2jly8kvF5Q++GDH0+nbR1HNLw+U+qj61lbaS4B3INY7Rsfy3JRd99NLdfI6PFa+g==
 */

/* eslint-disable */
// tslint:disable

import Wallets from './wallets';

interface WalletTransactions {
    amount: number;
    /**
     * @default current_timestamp()
     */
    createdAt: string | Date;
    id: number & { readonly __brand?: 'walletTransactions_id' };
    narration: string;
    newBalance: number;
    previousBalance: number;
    /**
     * @default 'pending'
     */
    status: 'pending' | 'completed';
    transactionDetails: unknown;
    transactionId: string;
    transactionType: 'credit' | 'debit';
    /**
     * @default current_timestamp()
     */
    updatedAt: string | Date;
    walletId: Wallets['id'];
}
export default WalletTransactions;

interface WalletTransactions_InsertParameters {
    amount: number;
    /**
     * @default current_timestamp()
     */
    createdAt?: string | Date;
    id: number & { readonly __brand?: 'walletTransactions_id' };
    narration: string;
    newBalance: number;
    previousBalance: number;
    /**
     * @default 'pending'
     */
    status?: 'pending' | 'completed';
    transactionDetails: unknown;
    transactionId: string;
    transactionType: 'credit' | 'debit';
    /**
     * @default current_timestamp()
     */
    updatedAt?: string | Date;
    walletId: Wallets['id'];
}
export type { WalletTransactions_InsertParameters };
