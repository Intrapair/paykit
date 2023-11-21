import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import createConnectionPool, { sql } from '@databases/mysql';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = createConnectionPool(process.env.PAYKIT_DATABASE_URL);

fs.readdir(__dirname)
    .then((files) => files.filter((file) => file.split('.').pop() === 'sql'))
    .then(async (sqlFiles) => {
        await db.tx(async (db) => {
            sqlFiles.forEach(async (sqlFile) => {
                console.info(`Creating table ${sqlFile}`);
                const migration = sql.file(path.join(__dirname, sqlFile));
                await db.query(migration);
                console.info(`Done creating table ${sqlFile}`);
            });
        });
    })
    .catch((error) => {
        console.error(error);
    })
    .finally(() => db.dispose());

process.once('SIGTERM', () => {
    db.dispose().catch((ex) => {
        console.error(ex);
    });
});
