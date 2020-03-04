const conn = require('../config/db')

//Create table restodata
conn.query(`CREATE TABLE restodata (
    id_resto Int(11) PRIMARY KEY AUTO_INCREMENT,
    name varchar(30),
    logo varchar(30),
    location varchar(60),
    description varchar(100)
)`, (error, result, fields) => {
    if (error) {
        throw error
    } else {
        console.log('success Migrating User')
    }
})

// //Create table restorating
// conn.query(`CREATE TABLE restorating (
//     id Int(11) PRIMARY KEY AUTO_INCREMENT,
//     id_user Int(11) PRIMARY KEY,
//     id_resto Int(11) PRIMARY KEY,
//     rating int(2)
// )`, (error, result, fields) => {
//     if (error) {
//         throw error
//     } else {
//         console.log('success Migrating User')
//     }
// })

// //Create table restreview
// conn.query(`CREATE TABLE restoreview (
//     id Int(11) PRIMARY KEY AUTO_INCREMENT,
//     id_user Int(11) PRIMARY KEY,
//     id_resto Int(11) PRIMARY KEY,
//     review varchar(60)
// )`, (error, result, fields) => {
//     if (error) {
//         throw error
//     } else {
//         console.log('success Migrating User')
//     }
// })