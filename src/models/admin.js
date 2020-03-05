const { conn } = require('../config/db')
const { dates } = require('./time')

module.exports = {
        create: (id_restaurant, id_category, name, price, description, images) => {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT COUNT(*) AS total from foodsdata where name = '${name}' LIMIT 1`,
                    (error, results, fields) => {
                        if (!error) {
                            const { total } = results[0]
                            if (total !== 0) {
                                resolve(false)
                            } else {
                                conn.query(`INSERT INTO foodsdata(id_restaurant, id_category, name, price, description, images, date_created, date_updated) VALUES ('${id_restaurant}','${id_category}','${name}','${price}','${description}','${images}','${dates()}',' ')`,
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
                conn.query(`SELECT COUNT(*) AS total from foodsdata where id = ${id}`,
                    (error, results, fields) => {
                        if (!error) {
                            const { total } = results[0]
                            if (total === 0) {
                                resolve(false)
                            } else {
                                conn.query(`DELETE FROM foodsdata where id = ${id}`,
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
        update: (id, params) => {
                return new Promise((resolve, reject) => {
                            conn.query(`SELECT COUNT(*) AS total from foodsdata where id = ${id}`,
                                    (error, results, fields) => {
                                        if (!error) {
                                            const { total } = results[0]
                                            if (total === 0) {
                                                resolve(false)
                                            } else {
                                                conn.query(`UPDATE foodsdata set ${params.map(v => `${v.keys} = '${v.value}'`).join(' , ')} WHERE id = ${id}`,
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
    //get a food
    get: (id, params) => {
        //Command Detail GET 
        if (id) {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT * FROM foodsdata where id = ${id}`, (error, results, fields) => {
                    if (error) reject(new Error(error))
                    resolve(results[0])
                })
            })
        } else  {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT * FROM foodsdata`, (error, results, fields) => {
                    if (error) reject(new Error(error))
                    resolve(results[0])
                })
            })
        }
    }
    // //get detail data like search sort and pagination
    //     else {
    //         return new Promise((resolve, reject) => {

    //         //Destructing Parameter
    //         const { perPage, currentPage, search, sort } = params

    //         //Searching & Pagination
    //         const condition = `${search && `WHERE ${search.map(v => `${v.keys} LIKE '${v.value}%'`).join(' AND ')}`} ORDER BY ${sort.keys} ${!sort.value ? 'ASC' : 'DESC'} ${(currentPage && perPage) && `LIMIT ${perPage} OFFSET ${parseInt(perPage) * (parseInt(currentPage) - 1)}`}`
    //         console.log(condition)

    //         //Count All data 
    //         conn.query(`SELECT COUNT(*) AS total from foodsdata ${condition.slice(0, condition.indexOf('LIMIT'))}`, (error, results, fields) => {

    //             //error Handling
    //             if (error) {
    //                 reject(new Error(error))
    //             }
    //             const { total } = results[0]
    //             const query = `SELECT * FROM foodsdata ${condition}`
    //             conn.query(query, (error, results, fields) => {
    //                 if (error) {
    //                     reject(new Error(error))
    //                 }
    //                 resolve({ results, total })
    //             })
    //         })
    //     })
    //     }
    // }
}