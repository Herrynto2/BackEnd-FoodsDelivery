const { conn } = require('../config/db')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10);
const { dates, codes } = require('./time')
let code = codes()

module.exports = {
        //Register verify
        create: (username, password, name, email, gender, address, work) => {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT COUNT(*) AS total from users where username = '${username}' || password = '${password}'`,
                    (error, results, fields) => {
                        if (!error) {
                            const { total } = results[0]
                            if (total !== 0) {
                                resolve(false)
                            } else {
                                var hashPassword = bcrypt.hashSync(`${password}`, salt);
                                const users = `INSERT INTO users(username, password, is_verified, verification_code) VALUES ('${username}','${hashPassword}', ${false}, '${code}')`
                                const userdetail = `INSERT INTO userdetail(id_role, name_user, email, gender, address, work) VALUES ('3','${name}','${email}','${gender}','${address}','${work}')`
                                const data = [users, userdetail]
                                data.map(e => {
                                    conn.query(e,
                                        (error, results, fields) => {
                                            console.log(e)
                                            if (error) {
                                                reject(new Error(error))
                                            }
                                            resolve(`${code}`)
                                        })
                                }).join("")
                            }
                        } else {
                            reject(new Error(error))
                        }
                    })
            })
        },
        verifyreg: (id, params) => {
                return new Promise((resolve, reject) => {
                            conn.query(`SELECT COUNT(*) AS total from users where id_user = ${id}`,
                                    (error, results, fields) => {
                                        if (!error) {
                                            const { total } = results[0]
                                            if (total === 0) {
                                                resolve(false)
                                            } else {
                                                conn.query(`UPDATE users set ${params.map(v => `${v.keys} = '${v.value}'`).join(' , ')} WHERE id_user = ${id}`,
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
    },
    delete: (id) => {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT users.username, users.password, userdetail.name_user from users join userdetail on users.id_user=userdetail.id_user where users.id_user = ${id}`,
                    (error, results, fields) => {
                        if (!error) {
                            const { total } = results[0]
                            if (total === 0) {
                                resolve(false)
                            } else {
                                const del1 = `DELETE FROM users where id_user = ${id}`
                                const del2 = `DELETE FROM userdetail where id_user = ${id}`
                                const del3 = [del1, del2]
                                del3.map(e => {
                                    conn.query(e,
                                        (error, results, fields) => {
                                            if (error) {
                                                reject(new Error(error))
                                            }
                                            resolve(true)
                                        })
                                }).join("")
                            }
                        } else {
                            reject(new Error(error))
                        }
                    })
            })
        }
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