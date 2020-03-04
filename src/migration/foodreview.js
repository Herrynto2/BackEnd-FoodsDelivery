const conn = require('../config/db')

//Create table foodsdata
conn.query(`CREATE TABLE foodreview (
    id Int(11) PRIMARY KEY AUTO_INCREMENT,
    id_user Int(11),
    id_food varchar(70),
    review varchar(60)
)`, (error, result, fields) => {
    if (error) {
        throw error
    } else {
        console.log('success Migrating User')
    }
})