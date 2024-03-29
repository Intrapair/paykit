/**
 * !!! This file is autogenerated do not edit by hand !!!
 *
 * Generated by: @databases/pg-schema-print-types
 * Checksum: ZkcFM2Tca9HPpXkBnH6PeumIQ97TzglOKtLPt5Aa/rv5ZwnaDpTrdc0O+iO2Rd3VPijxJx/qLI7dTdGazmFWZA==
 */

/* eslint-disable */
// tslint:disable

import WalletTransactions, {
    WalletTransactions_InsertParameters,
} from './walletTransactions';
import Wallets, { Wallets_InsertParameters } from './wallets';

interface DatabaseSchema {
    wallets: { record: Wallets; insert: Wallets_InsertParameters };
    walletTransactions: {
        record: WalletTransactions;
        insert: WalletTransactions_InsertParameters;
    };
}
export default DatabaseSchema;

function serializeValue(
    _tableName: string,
    _columnName: string,
    value: unknown
): unknown {
    return value;
}
export { serializeValue };
