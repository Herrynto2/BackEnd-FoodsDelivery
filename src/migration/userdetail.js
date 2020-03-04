const conn = require('../config/db')

//Create table foodsdata
conn.query(`CREATE TABLE userdetail (
    id Int(11) PRIMARY KEY AUTO_INCREMENT,
    name varchar(70),
    email varchar(20),
    gender varchar(20),
    work varchar(30)
)`, (error, result, fields) => {
    if (error) {
        throw error
    } else {
        console.log('success Migrating User')
    }
})