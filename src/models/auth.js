const { conn, connquery } = require('../config/db')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10);
const { dates, codes } = require('./time')

module.exports = {
        //Register
        create: (username, password, name, email, gender, address, work) => {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT COUNT(*) AS total from users where username = '${username}' || password = '${password}'`,
                    (error, results, fields) => {
                        if (!error) {
                            const { total } = results[0]
                            if (total !== 0) {
                                resolve(false)
                            } else {
                                let code = codes()
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
        verifyUser: (code) => {
            return new Promise((resolve, reject) => {
                connquery(`SELECT id_user from users WHERE verification_code= '${code}'`,
                    (err, results, fields) => {
                        if (!err) {
                            if (results[1][0] && results[1][0].id_user) {
                                const idUser = results[1][0].id_user
                                conn.query(`UPDATE users SET is_verified = ${true}, verification_code = ${null} WHERE id_user = ${idUser}
            `, (err, results, fields) => {
                                    if (err) {
                                        reject(new Error(err))
                                    } else {
                                        resolve(true)
                                    }
                                })
                            } else {
                                return reject(new Error('Code Verification Wrong'))
                            }
                        } else {
                            return reject(new Error(err))
                        }
                    })
            })
        },
        delete: (id) => {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT COUNT(*) AS total from users where id_user = ${id}`,
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
        },
        //Delete Profile
        delete: (id) => {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT * FROM users where id_user = ${id}`,
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
        },
        //Change Profile
        change: (id, params) => {
                return new Promise((resolve, reject) => {
                            conn.query(`SELECT COUNT(*) AS total from users where id_user = ${id}`,
                                    (error, results, fields) => {
                                        if (!error) {
                                            const { total } = results[0]
                                            if (total === 0) {
                                                resolve(false)
                                            } else {
                                                conn.query(`UPDATE userdetail set ${params.map(v => `${v.keys} = '${v.value}'`).join(' , ')} WHERE id_user = ${id}`,
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
    //Get profile user
    get: (id, params) => {
        if (id) {
            return new Promise((resolve, reject) => {
                console.log(id)
                conn.query(`SELECT * FROM userdetail where id_user = ${id}`, (error, results, fields) => {
                    if (error) reject(new Error(error))
                    resolve(results)
                })
            })
        } 
    },
    //Forgot the Password
    update: (username, newpassword) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT COUNT(*) AS total from users where username = '${username}'`,
                (error, results, fields) => {
                    if (!error) {
                        const { total } = results[0]
                        if (total === 0) {
                            resolve(false)
                        } else {
                            let code = codes()
                            var hashPassword = bcrypt.hashSync(`${newpassword}`, salt);
                            conn.query(`UPDATE users SET password = '${hashPassword}', is_verified = ${false}, verification_code='${code}'  WHERE username = '${username}'`,
                                (error, results, fields) => {
                                    if (error) {
                                        reject(new Error(error))
                                    }
                                    resolve(`${code}`)
                                })
                        }
                    } else {
                        reject(new Error(error))
                    }
                })
        })
    },
    //Forgot the Password verify
    update: (username, newpassword) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT COUNT(*) AS total from users where username = '${username}'`,
                (error, results, fields) => {
                    if (!error) {
                        const { total } = results[0]
                        if (total === 0) {
                            resolve(false)
                        } else {
                            let code = codes()
                            var hashPassword = bcrypt.hashSync(`${newpassword}`, salt);
                            conn.query(`UPDATE users SET password = '${hashPassword}', is_verified = ${false}, verification_code='${code}'  WHERE username = '${username}'`,
                                (error, results, fields) => {
                                    if (error) {
                                        reject(new Error(error))
                                    }
                                    resolve(`${code}`)
                                })
                        }
                    } else {
                        reject(new Error(error))
                    }
                })
        })
    }
}