const conn = require('../config/db')

//Create table foodsdata
conn.query(`CREATE TABLE users (
    id Int(11) PRIMARY KEY AUTO_INCREMENT,
    username varchar(40),
    password varchar(60),
    is_superadmin tinyint(1),
    password tinyint(1),
    created_at datetime,
    updated_at datetime
)`, (error, result, fields) => {
    if (error) {
        throw error
    } else {
        console.log('success Migrating User')
    }
})