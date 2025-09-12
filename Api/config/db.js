const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
host: process.env.DB_HOST,
port: process.env.DB_PORT,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,


})

pool.connect()
    .then(() => console.log('connexion à la db réussie '))
    .catch(err => console.error('connexion à la db échouée', err))

    module.exports = pool