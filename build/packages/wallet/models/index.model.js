import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import db, { sql } from '../config/database.config';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const walletModel = {
    async authenticate() {
        return new Promise((resolve, reject) => {
            // authenticate db
            db.query(sql `SELECT 1 + 1 as result;`)
                .then(() => resolve(true))
                .catch((error) => reject(error));
            resolve(true);
        });
    },
    async setup() {
        fs.readdir(__dirname)
            .then((files) => files.filter((file) => file.split('.').pop() === 'sql'))
            .then(async (sqlFiles) => {
            await db.tx(async (db) => {
                sqlFiles.forEach(async (sqlFile) => {
                    // console.info(`Creating table ${sqlFile}`)
                    const migration = sql.file(path.join(__dirname, sqlFile));
                    const tableResult = await db.query(migration);
                    // console.info(`Done creating table ${sqlFile}`)
                    // console.log('tableResult ==>', tableResult);
                });
            });
        })
            .catch((error) => {
            console.error(error);
        });
    },
    async disconnect() {
        db.dispose().catch((ex) => {
            console.error(ex);
        });
    },
};
