const conn = require('../config/db')

//Create table foodsdata
conn.query(`CREATE TABLE foodsdata (
    id_food Int(11) PRIMARY KEY AUTO_INCREMENT,
    name varchar(30),
    price varchar(30),
    description varchar(100),
    images varchar(30),
    created_by varchar(30),
    created_at datetime,
    updated_at datetime
)`, (error, result, fields) => {
    if (error) {
        throw error
    } else {
        console.log('success Migrating User')
    }
})