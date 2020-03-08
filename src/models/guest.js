const { conn, connquery } = require('../config/db')
const { dates } = require('./time')

module.exports = {
        getresto: (id, params) => {
            if (id) {
                return new Promise((resolve, reject) => {
                    conn.query(`SELECT * FROM restodata WHERE id_restaurant = ${id}`, (error, results, fields) => {
                        if (error) reject(new Error(error))
                        resolve(results)
                    })
                })
            }
        },
        getcategory: (id, params) => {
            if (id) {
                return new Promise((resolve, reject) => {
                    conn.query(`SELECT * FROM category WHERE id_ = ${id}`, (error, results, fields) => {
                        if (error) reject(new Error(error))
                        resolve(results)
                    })
                })
            }
        },
        getItems: (id, params) => {
                return new Promise((resolve, reject) => {
                            if (id) {
                                connquery(`SELECT * FROM foodsdata WHERE id_item = ${id}`, (err, results, fields) => {
                                    console.log(results)
                                    if (err) {
                                        return reject(new Error(err))
                                    }
                                    return resolve(results)
                                })
                            } else {
                                const { perPage, currentPage, search, sort } = params
                                const condition = `
          ${params.id_category ? `WHERE id_category IN (${params.id_category.join(',')})` : ''}
          ${search && search[0] && `${params.id_category ? 'AND' : 'WHERE'} ${search.map(v => `${v.key} LIKE '%${v.value}%'`).join(' AND ')}`}
          ORDER BY ${sort.map(v => `${v.key} ${!v.value ? 'ASC' : 'DESC'}`).join(' , ')}
          ${(parseInt(currentPage) && parseInt(perPage)) ? `LIMIT ${parseInt(perPage)} 
          OFFSET ${(parseInt(currentPage) - 1) * parseInt(perPage)}` : ''}
         `
                connquery(`
        SELECT COUNT(*) AS total from foodsdata ${condition.substring(0, condition.indexOf('LIMIT'))};
        SELECT * from foodsdata ${condition}
      `, (err, results, fields) => {
                    if (err) {
                        return reject(new Error(err))
                    }
                    if (results[1][0]) {
                        const { total } = results[1][0]
                        return resolve({ results: results[2], total })
                    } else {
                        return resolve({ results: [], total: 0 })
                    }
                })
            }
        })
    }
}