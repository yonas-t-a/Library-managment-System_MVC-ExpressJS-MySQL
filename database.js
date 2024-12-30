import mysql from 'mysql2';

import dotenv from 'dotenv';
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MySQL_HOST,
    name: process.env.MySQL_NAME,
    password: process.env.MySQL_PASSWORD,
    multipleStatements: true
}).promise();
