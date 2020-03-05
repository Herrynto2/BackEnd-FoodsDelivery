const conn = require('../config/db')
const bcrypt = require('bcryptjs')
const { dates } = require('./time')

module.exports = {
    //Register
    creates: (name_item, price) => {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT COUNT(*) AS total from foodsdata where name_item = '${name}' LIMIT 1`,
                    (error, results, fields) => {
                        console.log(results[0])
                        if (!error) {
                            const { total } = results[0]
                            if (total !== 0) {
                                resolve(false)
                            } else {
                                conn.query(`INSERT INTO foodsdata(name_item, price) VALUES ('${name}','${price}')`,
                                    (error, results, fields) => {
                                        if (error) {
                                            reject(new Error(error))
                                        }
                                        resolve(true)
                                    })
                            }
                        } else {
                            reject(new Error(error))
                        }
                    })
            })
        }
        // create: (username, password, name, email, gender, address, work) => {
        //     return new Promise((resolve, reject) => {
        //         conn.query(`SELECT * from users where name = '${name}'`,
        //             (error, results, fields) => {
        //                 if (!error) {
        //                     const { total } = results[0]
        //                     if (total !== 0) {
        //                         resolve(false)
        //                     } else {
        //                         conn.query(`SELECT * FROM detailuser)`,
        //                             (error, results, fields) => {
        //                                 if (error) {
        //                                     reject(new Error(error))
        //                                 }
        //                                 resolve(true)
        //                             })
        //                     }
        //                 } else {
        //                     reject(new Error(error))
        //                 }
        //             })
        //     })
        // },
        // //Forgot the Password
        // update: (username, password) => {
        //     return new Promise((resolve, reject) => {
        //         console.log(password + " " + username)
        //         conn.query(`SELECT COUNT(*) AS total from users where username = '${username}'`,
        //             (error, results, fields) => {
        //                 console.log(results)
        //                 if (!error) {
        //                     const { total } = results[0]
        //                     console.log(total)
        //                     if (total === 0) {
        //                         resolve(false)
        //                         console.log(resolve)
        //                     } else {
        //                         conn.query(`UPDATE users SET password = '${password}' WHERE username = '${username}'`,
        //                             (error, results, fields) => {
        //                                 if (error) {
        //                                     reject(new Error(error))
        //                                 }
        //                                 resolve(true)
        //                             })
        //                     }
        //                 } else {
        //                     reject(new Error(error))
        //                 }
        //             })
        //     })
        // },
        // //Change data user
        // change: (username, password) => {
        //     return new Promise((resolve, reject) => {
        //         console.log(password + " " + username)
        //         conn.query(`SELECT COUNT(*) AS total from users where username = '${username}'`,
        //             (error, results, fields) => {
        //                 console.log(results)
        //                 if (!error) {
        //                     const { total } = results[0]
        //                     console.log(total)
        //                     if (total === 0) {
        //                         resolve(false)
        //                         console.log(resolve)
        //                     } else {
        //                         conn.query(`UPDATE users SET password = '${password}' WHERE username = '${username}'`,
        //                             (error, results, fields) => {
        //                                 if (error) {
        //                                     reject(new Error(error))
        //                                 }
        //                                 resolve(true)
        //                             })
        //                     }
        //                 } else {
        //                     reject(new Error(error))
        //                 }
        //             })
        //     })
        // }
}