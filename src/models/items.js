const { conn } = require('../config/db')
const { dates } = require('./time')

module.exports = {
        //Get list item
        get: (id, iduser, params) => {
                if (id) {
                    return new Promise((resolve, reject) => {
                        conn.query(`SELECT foodsdata.id_restaurant, restodata.name_restaurant, foodsdata.name_item, foodsdata.price FROM foodsdata JOIN restodata on foodsdata.id_restaurant = restodata.id_restaurant where restodata.id_user = ${iduser} && restodata.id_restaurant = ${id}`, (error, results, fields) => {
                            if (error) reject(new Error(error))
                            resolve(results[0])
                        })
                    })
                } else {
                    return new Promise((resolve, reject) => {
                                //Destructing Parameter
                                const { perPage, currentPage, search, sort } = params
                                //Searching & Pagination
                                const condition = `${search && `WHERE ${search.map(v => `${v.keys} LIKE '${v.value}%'`).join(' AND ')}`} ORDER BY ${sort.keys} ${!sort.value ? 'ASC' : 'DESC'} ${(currentPage && perPage) && `LIMIT ${perPage} OFFSET ${parseInt(perPage) * (parseInt(currentPage) - 1)}`}`
            console.log(condition)

            //Count All data 
            conn.query(`SELECT COUNT(*) AS total from foodsdata ${condition.slice(0, condition.indexOf('LIMIT'))}`, (error, results, fields) => {

                //error Handling
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
        //Add Items
        create: (id_restaurant, category, name_item, price, description, images, total_item, iduser) => {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT COUNT(*) AS total from restodata where id_restaurant = ${id_restaurant} && id_user = ${iduser}  LIMIT 1`,
                    (error, results, fields) => {
                        if (!error) {
                            const { total } = results[0]
                            if (total === 0) {
                                resolve(false)
                            } else {
                                conn.query(`INSERT INTO foodsdata(id_restaurant, category, name_item, price, description, images, total_item) VALUES ('${id_restaurant}','${category}','${name_item}','${price}','${description}','${images}','${total_item}')`,
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
        delete: (id, iduser, params) => {
            console.log(params)
            return new Promise((resolve, reject) => {
                conn.query(`SELECT foodsdata.id_item, foodsdata.id_restaurant FROM foodsdata JOIN restodata on foodsdata.id_restaurant = restodata.id_restaurant WHERE restodata.id_user = ${iduser} && foodsdata.id_item = ${id}`,
                    (error, results, fields) => {
                        console.log(params[0].value)
                        if (!error) {
                            const { total } = results[0]
                            if (total === 0) {
                                resolve(false)
                            } else {
                                conn.query(`DELETE FROM foodsdata where id_item = ${id}`,
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
        value: (id, iduser, params) => {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT foodsdata.id_item, foodsdata.total_item FROM foodsdata JOIN restodata on foodsdata.id_restaurant = restodata.id_restaurant WHERE restodata.id_user = ${iduser} && foodsdata.id_item = ${id}`,
                    (error, results, fields) => {
                        console.log(results[0].total_item)
                        if (!error) {
                            const { total } = results[0]
                            if (total === 0) {
                                resolve(false)
                            } else {
                                conn.query(`UPDATE foodsdata set total_item = ${results[0].total_item}+${params[0].value} WHERE id_item = ${id}`,
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
        update: (id, iduser, params) => {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT foodsdata.id_item, foodsdata.id_restaurant FROM foodsdata JOIN restodata on foodsdata.id_restaurant = restodata.id_restaurant WHERE restodata.id_user = ${iduser} && foodsdata.id_item = ${id}`,
                    (error, results, fields) => {
                        if (!error) {
                            const { total } = results[0]
                            if (total === 0) {
                                resolve(false)
                            } else {
                                conn.query(`UPDATE foodsdata set category = '${params[1].value}', name_item = '${params[2].value}', price = '${params[3].value}', description = '${params[4].value}', images = '${params[5].value}' WHERE id_item = ${id}`,
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
    //Give Review Items
    postReview: (id, iduser, params) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT COUNT(*) AS total from foodsdata where id_item = ${id}`,
                (error, results, fields) => {
                    if (!error) {
                        const { total } = results[0]
                        if (total === 0) {
                            resolve(false)
                        } else {
                            conn.query(`INSERT INTO foodreview (id_user, id_item, review, rating) VALUES (${iduser}, ${id},'${params[0].value}', '${params[1].value}')`,
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
    patchReview: (id, iduser, params) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT COUNT(*) AS total from foodreview where id_user = ${iduser} && id_item = ${id}`,
                (error, results, fields) => {
                    if (!error) {
                        const { total } = results[0]
                        if (total === 0) {
                            resolve(false)
                        } else {
                            conn.query(`UPDATE foodreview set review = '${params[0].value}', rating = ${params[1].value} WHERE id_item = ${id} && id_user = ${iduser}`,
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
    getReview: (id, iduser, params) => {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT foodsdata.name_item, foodreview.id_item,foodreview.id_user, foodreview.review, foodreview.rating, foodreview.date_created, foodreview.date_uploaded FROM foodreview JOIN foodsdata on foodreview.id_item = foodsdata.id_item WHERE foodreview.id_item = ${id}`, (error, results, fields) => {
                    if (error) reject(new Error(error))
                    resolve(results)
                })
            })
        },
    delReview: (id, iduser, params) => {
        console.log(params)
        return new Promise((resolve, reject) => {
            conn.query(`SELECT COUNT(*) AS total from foodreview where id_item = ${id} && id_user = ${iduser}`,
                (error, results, fields) => {
                    if (!error) {
                        const { total } = results[0]
                        if (total === 0) {
                            resolve(false)
                        } else {
                            conn.query(`DELETE FROM foodreview where id_item = ${id} && id_user = ${iduser}`,
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