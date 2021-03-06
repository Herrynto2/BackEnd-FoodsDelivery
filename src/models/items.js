const { conn } = require('../config/db')
const { dates } = require('./time')

module.exports = {
        //Get list item
        getitems: (id, iduser, params) => {
                if (id) {
                    return new Promise((resolve, reject) => {
                        conn.query(`SELECT foodsdata.id_restaurant, restodata.name_restaurant, foodsdata.name_item, foodsdata.images, foodsdata.price, foodsdata.category, foodsdata.description FROM foodsdata JOIN restodata on foodsdata.id_restaurant = restodata.id_restaurant where restodata.id_user = ${iduser} && restodata.id_restaurant = ${id}`, (error, results, fields) => {
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

    get: (id, iduser, params) => {
        if (id) {
            return new Promise((resolve, reject) => {
                const query = `SELECT foodsdata.id_restaurant, foodsdata.id_item, restodata.name_restaurant, foodsdata.name_item, foodsdata.images, foodsdata.price, foodsdata.category, foodsdata.description,  restodata.location FROM foodsdata JOIN restodata on foodsdata.id_restaurant = restodata.id_restaurant where foodsdata.id_item = ${id};SELECT foodreview.id, foodreview.name_user, foodreview.review, userdetail.images, foodreview.date_created FROM foodsdata JOIN foodreview on foodsdata.id_item = foodreview.id_item JOIN userdetail on userdetail.id_user=foodreview.id_user WHERE foodsdata.id_item = ${id}`
                conn.query(query, (error, result, field) => {
                    if (error) reject = new Error(error)
                    resolve(result)
                    if (result) {
                    }
                })
            })
        } 
},
 
    getAll: (iduser) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT foodsdata.id_restaurant, foodsdata.total_item, foodsdata.description, foodsdata.id_item, restodata.name_restaurant, foodsdata.name_item, foodsdata.images, foodsdata.price FROM foodsdata JOIN restodata on foodsdata.id_restaurant = restodata.id_restaurant where restodata.id_user = ${iduser}`, (error, results, fields) => {
                console.log(results)
                if (error) reject(new Error(error))
                resolve(results)
            })
        })
    },


        //Add Items
        create: (category, name_item, price, description, images, total_item, iduser) => {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT * from restodata where id_user = ${iduser}  LIMIT 1`,
                    (error, results, fields) => {
                        console.log(results)
                        if (!error) {
                            const { total } = results[0]
                            if (total === 0) {
                                resolve(false)
                            } else {
                                
                                conn.query(`INSERT INTO foodsdata(category, name_item, price, description, images, total_item) VALUES ('${category}','${name_item}','${price}','${description}','${images}','${total_item}');UPDATE foodsdata, restodata set foodsdata.name_restaurant=restodata.name_restaurant, foodsdata.id_restaurant=restodata.id_restaurant where restodata.id_user=${iduser} && foodsdata.id_restaurant=${0}`,
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
            return new Promise((resolve, reject) => {
                conn.query(`SELECT foodsdata.id_item, foodsdata.id_restaurant FROM foodsdata JOIN restodata on foodsdata.id_restaurant = restodata.id_restaurant WHERE restodata.id_user = ${iduser} && foodsdata.id_item = ${id}`,
                    (error, results, fields) => {
                        if (!error) {
                            const { total } = results[0]
                            if (total === 0) {
                                resolve(false)
                            } else {
                                conn.query(`DELETE FROM foodsdata where id_item = ${id};DELETE FROM cart where id_item=${id}`,
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
                        console.log('key', params)
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
        update: (id, iduser, params, images) => {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT foodsdata.id_item, foodsdata.name_item, foodsdata.category, foodsdata.description, foodsdata.price, foodsdata.id_restaurant FROM foodsdata JOIN restodata on foodsdata.id_restaurant = restodata.id_restaurant WHERE restodata.id_user = ${iduser} && foodsdata.id_item = ${id}`,
                    (error, results, fields) => {
                        if (!error) {
                            const { total } = results[0]
                            if (total === 0) {
                                resolve(false)
                            } else {
                                console.log(images)
                                conn.query(`UPDATE foodsdata set category = '${params[1].value}', name_item = '${params[0].value}',  price = '${params[2].value}', description = '${params[3].value}', images='${images}' WHERE id_item = ${id}`,
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
                            conn.query(`INSERT INTO foodreview (id_user, id_item, review) VALUES (${iduser}, ${id},'${params[0].value}');update foodreview, userdetail set foodreview.name_user=userdetail.name_user where userdetail.id_user = ${iduser} && foodreview.name_user='${''}'`,
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
                conn.query(`SELECT foodsdata.name_item, userdetail.images, foodreview.id_item, foodreview.id_user, foodreview.name_user, foodreview.review, foodreview.rating, foodreview.date_created, foodreview.date_uploaded FROM foodreview JOIN foodsdata on foodreview.id_item = foodsdata.id_item JOIN userdetail on foodreview.id_user=userdetail.id_user WHERE foodreview.id_item = ${id} `, (error, results, fields) => {
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
    },
    delReviewAdmin: (id, iduser, params) => {
        console.log(params)
        return new Promise((resolve, reject) => {
            conn.query(`SELECT COUNT(*) AS total from foodreview where id = ${id}`,
                (error, results, fields) => {
                    if (!error) {
                        const { total } = results[0]
                        if (total === 0) {
                            resolve(false)
                        } else {
                            conn.query(`DELETE FROM foodreview where id = ${id}`,
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