import mysql from 'mysql2';

import dotenv from 'dotenv';
dotenv.config()

import fs from 'fs';

const pool = mysql.createPool({
    host: process.env.MySQL_HOST,
    name: process.env.MySQL_NAME,
    password: process.env.MySQL_PASSWORD,
    multipleStatements: true
}).promise();

const executeSQLFile = async (filePath) => {
    try {
        const sql = fs.readFileSync(filePath);
        await pool.query(sql)
        console.log(`Query OK ${filePath}`)
    } catch (error) {
        console.log(`Error in Excuting ${filePath}: ${error.message}`)
    }
}