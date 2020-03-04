const mysql = require('mysql')
require('dotenv').config()

//Connection database
const conn = mysql.createConnection({
    host: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true
});

//Console testing
conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

//
const connquery = (query, callBack) => {
    query = `use ${process.env.DB_NAME};` + query
    return conn.query(query, callBack)
}
module.exports = { conn, connquery };