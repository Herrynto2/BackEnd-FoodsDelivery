const conn = require('../config/db')
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
                            const query1 = `INSERT INTO users(username, password) VALUES ('${username}','${password}')`
                            const query2 = `INSERT INTO userdetail(name, email) VALUES ('${name}','${email}')`
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
    }
}