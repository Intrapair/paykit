/**
 * !!! This file is autogenerated do not edit by hand !!!
 *
 * Generated by: @databases/pg-schema-print-types
 * Checksum: GvstQnrN7xG5WpVOrwV/Nke+DsDvvun6DPTolBJhAsG7TN76HMFdokMbhpwnwKWPOl3xkOX4QnSNFss4yegj7A==
 */

/* eslint-disable */
// tslint:disable

interface Wallets {
    /**
     * @default 0
     */
    balance: number;
    /**
     * @default current_timestamp()
     */
    createdAt: string | Date;
    currency: string;
    id: number & { readonly __brand?: 'wallets_id' };
    /**
     * @default current_timestamp()
     */
    updatedAt: string | Date;
    userId: string;
}
export default Wallets;

interface Wallets_InsertParameters {
    /**
     * @default 0
     */
    balance?: number;
    /**
     * @default current_timestamp()
     */
    createdAt?: string | Date;
    currency: string;
    id: number & { readonly __brand?: 'wallets_id' };
    /**
     * @default current_timestamp()
     */
    updatedAt?: string | Date;
    userId: string;
}
export type { Wallets_InsertParameters };
