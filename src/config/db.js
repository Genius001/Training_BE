const pg = require('pg');
const { Pool } = pg;

const {
    DB_PASS,
    DB_USER,
    DB_HOST,
    DB_PORT,
    DB,
} = process.env;

const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB,
    password: DB_PASS,
    port: DB_PORT,
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
})

pool.connect((err, connect) => {
    if (err) throw err;
    console.log('Database connected');
    connect.release();
})

module.exports = pool