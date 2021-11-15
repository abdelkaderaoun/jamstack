import createConnectionPool, {sql} from "@databases/pg";
import dotenv from 'dotenv';


dotenv.config();

const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT,
    DB_HOST
} = process.env
const run = async () => {
    const db = createConnectionPool(
        `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
    );

    await db.query(sql.file('schema/schema.sql'));

    await db.dispose();
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});