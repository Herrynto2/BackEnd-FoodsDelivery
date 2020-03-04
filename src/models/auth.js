const conn = require('../config/db')
const bcrypt = require('bcryptjs')
const { dates } = require('./time')

module.exports = {
    create: (username, password, name, email, gender, work) => {
        return new Promise((resolve, reject) => {

            conn.query(`SELECT COUNT(*) AS total from users where username = '${username}' || password = '${password}' LIMIT 1`,
                (error, results, fields) => {
                    if (!error) {
                        const { total } = results[0]
                        if (total !== 0) {
                            resolve(false)
                        } else {
                            //Insert into table users and userdetails
                            const hashPassword = bcrypt.hashSync(`${password}`, salt);
                            const query1 = `INSERT INTO users(username, password) VALUES ('${username}','${password}')`
                            const query2 = `INSERT INTO userdetail(name, email, gender, work) VALUES ('${name}','${email}','${gender}','${work}')`
                            const query3 = [query1, query2]
                            query3.map(e => {
                                conn.query(e,
                                    (error, results, fields) => {
                                        if (error) {
                                            reject(new Error(error))
                                        }
                                        resolve(true)
                                    })
                            })


                        }
                    } else {
                        reject(new Error(error))
                    }
                })
        })
    },
    update: (username, password, email, id, id_user) => {
        return new Promise((resolve, reject) => {
            console.log(password + " " + username)
                //SELECT COUNT(*) AS total from userdetail where email = '${email}'
            conn.query(`select userdetail.'${email}', users.'${username}', users.'${password}' from users join userdetail on users.${id_user} = userdetail.${id}`,
                (error, results, fields) => {
                    console.log(results)
                    if (!error) {
                        const { total } = results[0]
                        console.log(total)
                        if (total == 0) {
                            resolve(false)
                        } else {
                            //UPDATE users SET password = '${password}' WHERE username = '${username}'
                            conn.query(`UPDATE users SET password = '${password}' WHERE username = '${username}'`,
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
    //     update: (id, username, password, params) => {
    //             return new Promise((resolve, reject) => {
    //                         conn.query(`SELECT COUNT(*) AS total from users where id = '${id}'`,
    //                                 (error, results, fields) => {
    //                                     if (!error) {
    //                                         const { total } = results[0]
    //                                         if (total !== 0) {
    //                                             resolve(false)
    //                                         } else {
    //                                             conn.query(`UPDATE users set ${params.map(v => `${v.keys} = '${v.value}'`).join(' , ')} WHERE id = ${id}`,
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
    // get: (username, params) => {
    //     if (username) {
    //         return new Promise((resolve, reject) => {
    //             conn.query(`SELECT  COUNT(*) AS total from users where username = '${username} LIMIT 1' `, (error, results, fields) => {
    //                 if (error) {
    //                     console.log(error)
    //                 } else {
    //                     response.ok(rows, res)
    //                 }
    //             })
    //         })
    //     }
    // }
}