const { conn } = require('../config/db')
const { dates } = require('./time')

module.exports = {
    //Get item
    getitems: (id, params) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM foodsdata`, (error, results, fields) => {
                if (error) reject(new Error(error))
                resolve(results)
            })
        })

    },
    getresto: (id, params) => {
        if (id) {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT * FROM restodata WHERE id_restaurant = ${id}`, (error, results, fields) => {
                    if (error) reject(new Error(error))
                    resolve(results)
                })
            })
        }
    }
}