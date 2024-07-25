/**
 * !!! This file is autogenerated do not edit by hand !!!
 *
 * Generated by: @databases/pg-schema-print-types
 * Checksum: WDAzMjc4sTbGJ7e1GecJHDa6cqqpW+ByTA/YozlalZzgG9hWAn5sGTyJkXxoAgRMTH/R7NcvbGMgJPdMXjvarQ==
 */

/* eslint-disable */
// tslint:disable

import Wallets from './wallets'

interface WalletTransactions {
  amount: number
  /**
   * @default current_timestamp()
   */
  createdAt: (string | Date)
  id: number & {readonly __brand?: 'walletTransactions_id'}
  narration: string
  newBalance: number
  previousBalance: number
  /**
   * @default 'pending'
   */
  status: ("pending" | "completed")
  transactionDetails: unknown
  transactionId: string
  transactionType: ("credit" | "debit")
  /**
   * @default current_timestamp()
   */
  updatedAt: (string | Date)
  walletId: Wallets['id']
  /**
   * @default NULL
   */
  walletLabel: (string) | null
}
export default WalletTransactions;

interface WalletTransactions_InsertParameters {
  amount: number
  /**
   * @default current_timestamp()
   */
  createdAt?: (string | Date)
  id: number & {readonly __brand?: 'walletTransactions_id'}
  narration: string
  newBalance: number
  previousBalance: number
  /**
   * @default 'pending'
   */
  status?: ("pending" | "completed")
  transactionDetails: unknown
  transactionId: string
  transactionType: ("credit" | "debit")
  /**
   * @default current_timestamp()
   */
  updatedAt?: (string | Date)
  walletId: Wallets['id']
  /**
   * @default NULL
   */
  walletLabel?: (string) | null
}
export type {WalletTransactions_InsertParameters}
