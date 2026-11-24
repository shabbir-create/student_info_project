const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  ssl: process.env.MYSQL_SSL_CA
    ? { ca: process.env.MYSQL_SSL_CA.replace(/\\n/g, "\n"), rejectUnauthorized: true, verifyIdentity: true }
    : undefined,
  dateStrings: ["DATE"],
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
