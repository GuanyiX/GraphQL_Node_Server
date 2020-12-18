const mysql = require("mysql");

require('dotenv').config()

// const pool = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Dx0310@im5x1',
//     database: 'Breze'
// });

const pool = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DATABASE
});

module.exports = pool;