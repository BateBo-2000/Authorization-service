const mysql = require('mysql2');
require('dotenv').config()
 

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DB,
    password: process.env.MYSQL_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10
}, (err: Error) => { if (err) 
    console.log("Error in server setup"+ err)}); 

module.exports = pool;

