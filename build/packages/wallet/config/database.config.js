// db and table configs, should be extensible
import 'dotenv/config'; // load env variables
import createConnectionPool, { sql } from '@databases/mysql';
import tables, { greaterThan, lessThan } from '@databases/mysql-typed';
import { serializeValue } from '../__generated__';
export { sql, greaterThan, lessThan };
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
const { wallets, walletTransactions } = tables({
    serializeValue,
});
export { wallets, walletTransactions };
