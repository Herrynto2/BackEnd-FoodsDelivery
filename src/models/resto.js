const { conn } = require('../config/db')
const { dates, time } = require('./time')

module.exports = {
        //Create Resto
        create: (name_restaurant, logo, location, description, created_by) => {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT COUNT(*) AS total from restodata where name_restaurant = '${name_restaurant}' LIMIT 1`,
                    (error, results, fields) => {
                        if (!error) {
                            const { total } = results[0]
                            if (total !== 0) {
                                resolve(false)
                            } else {
                                conn.query(`INSERT INTO restodata(name_restaurant, logo, location, description, created_by, date_created) VALUES ('${name_restaurant}','${logo}','${location}','${description}','${created_by}','${dates()}')`,
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
        //delete Resto
        delete: (id) => {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT COUNT(*) AS total from restodata where id_restaurant = ${id}`,
                    (error, results, fields) => {
                        if (!error) {
                            const { total } = results[0]
                            if (total === 0) {
                                resolve(false)
                            } else {
                                conn.query(`DELETE FROM restodata where id_restaurant = ${id}`,
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
        //Edit data Resto
        update: (id, params) => {
                return new Promise((resolve, reject) => {
                            conn.query(`SELECT COUNT(*) AS total from restodata where id_restaurant = ${id}`,
                                    (error, results, fields) => {
                                        if (!error) {
                                            const { total } = results[0]
                                            if (total === 0) {
                                                resolve(false)
                                            } else {
                                                conn.query(`UPDATE restodata set ${params.map(v => `${v.keys} = '${v.value}'`).join(' , ')}  WHERE id_restaurant = ${id}`,
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
    
    get: (id, params) => {
        //List Food from a Resto
        if (id) {
            return new Promise((resolve, reject) => {
                console.log(id)
                conn.query(`SELECT restodata.id_restaurant, restodata.name_restaurant, restodata.location, restodata.created_by, foodsdata.name_item, foodsdata.price, foodsdata.images FROM restodata JOIN foodsdata ON restodata.id_restaurant=foodsdata.id_restaurant WHERE restodata.id_restaurant = ${id}`, (error, results, fields) => {
                    if (error) reject(new Error(error))
                    resolve(results)
                })
            })
        //List Resto
        } else {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT * FROM restodata`, (error, results, fields) => {
                    if (error) reject(new Error(error))
                    resolve(results)
                })
            })
        }
    },
    
    search: (id, params) => {
                //Command Detail GET 
                if (id) {
                    return new Promise((resolve, reject) => {
                        conn.query(`SELECT * FROM restodata where id_resto = ${id}`, (error, results, fields) => {
                            if (error) reject(new Error(error))
                            resolve(results[0])
                        })
                    })
                } else {
                    return new Promise((resolve, reject) => {
                                const { perPage, currentPage, search, sort } = params
                                const condition = `${search && `WHERE ${search.map(v => `${v.keys} LIKE '${v.value}%'`).join(' AND ')}`} ORDER BY ${sort.keys} ${!sort.value ? 'ASC' : 'DESC'} ${(currentPage && perPage) && `LIMIT ${perPage} OFFSET ${parseInt(perPage) * (parseInt(currentPage) - 1)}`}`
                console.log(condition)

                //Count All data 
                conn.query(`SELECT COUNT(*) AS total from restodata ${condition.slice(0, condition.indexOf('LIMIT'))}`, (error, results, fields) => {

                    //error Handling
                    if (error) {
                        reject(new Error(error))
                    }
                    const { total } = results[0]
                    const query = `SELECT * FROM restodata ${condition}`
                    conn.query(query, (error, results, fields) => {
                        if (error) {
                            reject(new Error(error))
                        }
                        resolve({ results, total })
                    })
                })
            })
        }
    }
}