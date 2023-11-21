// db and table configs, should be extensible
import 'dotenv/config'; // load env variables

import createConnectionPool, { sql } from '@databases/mysql';
import tables, { greaterThan } from '@databases/mysql-typed';
import DatabaseSchema, { serializeValue } from '../__generated__';

export { sql, greaterThan };
// create db connection pool
// const startTimes = new Map<SQLQuery, number>();
const db = createConnectionPool({
    connectionString: process.env.PAYKIT_DATABASE_URL,
    // onQueryStart: (query) => {
    //     startTimes.set(query, Date.now());
    //   },
    //   onQueryResults: (query, {text}, results) => {
    //     const start = startTimes.get(query);
    //     startTimes.delete(query);
    //     if (start) {
    //       console.log(`${text} - ${Date.now() - start}ms`);
    //     } else {
    //       console.log(`${text} - uknown duration`);
    //     }
    //   },
});

export default db;

// get typed table schema
const { wallets, walletTransactions } = tables<DatabaseSchema>({
    serializeValue,
});
export { wallets, walletTransactions };
