const conn = require('../config/db')

//Create table foodsdata
conn.query(`CREATE TABLE users (
    id Int(11) PRIMARY KEY AUTO_INCREMENT,
    name varchar(30),
    username varchar(30),
    password varchar(100),
    created_at datetime,
    updated_at datetime
)`, (error, result, fields) => {
    if (error) {
        throw error
    } else {
        console.log('success Migrating User')
    }
})