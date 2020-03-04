const conn = require('../config/db')
const { dates } = require('./time')

module.exports = {
    create: (username, password, name, email, gender, work) => {
        return new Promise((resolve, reject) => {
            // const sel1 = `SELECT COUNT(*) AS total from users where username = '${username}' || password = '${password}' LIMIT 1`
            // const sel2 = `SELECT COUNT(*) AS total from userdetail where email = '${email}' LIMIT 1`
            // const sel3 = [sel1, sel2]
            conn.query(`SELECT COUNT(*) AS total from users where username = '${username}' || password = '${password}' LIMIT 1`,
                (error, results, fields) => {
                    if (!error) {
                        const { total } = results[0]
                        if (total !== 0) {
                            resolve(false)
                        } else {
                            //Insert into table users and userdetails 
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
    }
}