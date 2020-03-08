const { conn } = require('../config/db')
const { dates } = require('./time')

module.exports = {
        //Get list item
        get: (id, params) => {
            if (id) {
                return new Promise((resolve, reject) => {
                    console.log(id)
                    conn.query(`SELECT foodsdata.id_restaurant, restodata.name_restaurant, foodsdata.name_item, foodsdata.price FROM foodsdata JOIN restodata on foodsdata.id_restaurant = restodata.id_restaurant where restodata.id_user = ${id}`, (error, results, fields) => {
                        if (error) reject(new Error(error))
                        resolve(results)
                    })
                })
            }
        },
        //Add Items
        create: (id, params) => {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT COUNT(*) AS total from restodata where id_restaurant = ${params[0].value} && id_user = ${id}  LIMIT 1`,
                    (error, results, fields) => {
                        console.log(params[0].value)
                        if (!error) {
                            const { total } = results[0]
                            if (total === 0) {
                                resolve(false)
                            } else {
                                conn.query(`INSERT INTO foodsdata(id_restaurant, category, name_item, price, description, images, total_item) VALUES ('${params[0].value}','${params[1].value}','${params[2].value}','${params[3].value}','${params[4].value}','${params[5].value}','${params[6].value}')`,
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
        //Delete Items
        delete: (id, params) => {
            console.log(params)
            return new Promise((resolve, reject) => {
                conn.query(`SELECT COUNT(*) AS total from foodsdata where id_item = ${parseInt(params[1].value)} && id_restaurant = ${parseInt(params[0].value)}`,
                    (error, results, fields) => {
                        console.log(params[0].value)
                        if (!error) {
                            const { total } = results[0]
                            if (total === 0) {
                                resolve(false)
                            } else {
                                conn.query(`DELETE FROM foodsdata where id_item = ${params[1].value}`,
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
        //Update total items
        value: (id, params) => {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT total_item from foodsdata where id_item = ${params[0].value}`,
                    (error, results, fields) => {
                        console.log(results[0].total_item)
                        if (!error) {
                            const { total } = results[0]
                            if (total === 0) {
                                resolve(false)
                            } else {
                                conn.query(`UPDATE foodsdata set total_item = ${results[0].total_item}+${params[1].value} WHERE id_item = ${params[0].value}`,
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
        //Update Items
        update: (id, params) => {
            console.log(params)
            return new Promise((resolve, reject) => {
                conn.query(`SELECT COUNT(*) AS total from foodsdata where id_item = ${params[1].value} && id_restaurant = ${params[0].value}`,
                    (error, results, fields) => {
                        console.log(params[2].value)
                        if (!error) {
                            const { total } = results[0]
                            if (total === 0) {
                                resolve(false)
                            } else {
                                conn.query(`UPDATE foodsdata set category = '${params[2].value}', name_item = '${params[3].value}', price = '${params[4].value}', description = '${params[5].value}', images = '${params[6].value}' WHERE id_item = ${params[1].value}`,
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

        search: (id, params) => {
                if (id) {
                    return new Promise((resolve, reject) => {
                        conn.query(`SELECT * FROM foodsdata where id_item = ${id}`, (error, results, fields) => {
                            if (error) reject(new Error(error))
                            resolve(results[0])
                        })
                    })
                } else {
                    return new Promise((resolve, reject) => {
                                const { perPage, currentPage, search, sort } = params
                                const condition = `${search && `WHERE ${search.map(v => `${v.keys} LIKE '${v.value}%'`).join(' AND ')}`} ORDER BY ${sort.keys} ${!sort.value ? 'ASC' : 'DESC'} ${(currentPage && perPage) && `LIMIT ${perPage} OFFSET ${parseInt(perPage) * (parseInt(currentPage) - 1)}`}`
                console.log(condition)

                conn.query(`SELECT COUNT(*) AS total from foodsdata ${condition.slice(0, condition.indexOf('LIMIT'))}`, (error, results, fields) => {

                    if (error) {
                        reject(new Error(error))
                    }
                    const { total } = results[0]
                    const query = `SELECT * FROM foodsdata ${condition}`
                    conn.query(query, (error, results, fields) => {
                        if (error) {
                            reject(new Error(error))
                        }
                        resolve({ results, total })
                    })
                })
            })
        }
    },
    //Give Review Items
    postReview: (id, params) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT COUNT(*) AS total from foodsdata where id_item = ${parseInt(params[1].value)}`,
                (error, results, fields) => {
                    console.log(parseInt(params[1].value))
                    if (!error) {
                        const { total } = results[0]
                        if (total === 0) {
                            resolve(false)
                        } else {
                            conn.query(`INSERT INTO foodreview (id_user, id_restaurant, id_item, review, rating) VALUES (${id}, ${parseInt(params[0].value)}, ${parseInt(params[1].value)}, '${params[2].value}' ,'${parseInt(params[3].value)}')`,
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
    //Edit Review Items
    patchReview: (id, params) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT COUNT(*) AS total from foodreview where id_user = ${id} && id_item = ${parseInt(params[0].value)}`,
                (error, results, fields) => {
                    console.log(parseInt(params[1].value))
                    if (!error) {
                        const { total } = results[0]
                        if (total === 0) {
                            resolve(false)
                        } else {
                            conn.query(`UPDATE foodreview set ${params.map(v => `${v.keys} = '${v.value}'`)}  WHERE id_item = ${params[0].value}`,
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
    }, //Get list item
    getReview: (id, params) => {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT foodsdata.name_item,foodreview.id_restaurant, foodreview.id_item,foodreview.id_user, foodreview.review, foodreview.rating, foodreview.date_created, foodreview.date_uploaded FROM foodreview JOIN foodsdata on foodreview.id_item = foodsdata.id_item WHERE foodreview.id_item = ${params[0].value}`, (error, results, fields) => {
                    if (error) reject(new Error(error))
                    resolve(results)
                })
            })
        },
    delReview: (id, params) => {
        console.log(params)
        return new Promise((resolve, reject) => {
            conn.query(`SELECT COUNT(*) AS total from foodreview where id_item = ${parseInt(params[0].value)} && id_user = ${id}`,
                (error, results, fields) => {
                    console.log(params[0].value)
                    if (!error) {
                        const { total } = results[0]
                        if (total === 0) {
                            resolve(false)
                        } else {
                            conn.query(`DELETE FROM foodreview where id_item = ${params[0].value} && id_user = ${id}`,
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
}