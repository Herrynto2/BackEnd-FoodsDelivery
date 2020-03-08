const { conn } = require('../config/db')
const { dates, time } = require('./time')

module.exports = {
        //List Restaurant
        get: (id, params) => {
            if (id) {
                return new Promise((resolve, reject) => {
                    conn.query(`SELECT * from restodata where id_user = ${id}`, (error, results, fields) => {
                        if (error) reject(new Error(error))
                        resolve(results)
                    })
                })
            }
        },
        //Profile Restaurant
        getProfile: (id, params) => {
            if (id) {
                return new Promise((resolve, reject) => {
                    console.log(id)
                    conn.query(`SELECT * from restodata where id_user = ${id} && id_restaurant = ${params[0].value}`, (error, results, fields) => {
                        if (error) reject(new Error(error))
                        resolve(results)
                    })
                })
            }
        },
        //Create Restaurant
        create: (id, params) => {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT COUNT(*) AS total from restodata where id_user = ${id} LIMIT 1`,
                    (error, results, fields) => {
                        if (!error) {
                            const { total } = results[0]
                            console.log(total)
                            if (total === 2) {
                                resolve(false)
                            } else {
                                conn.query(`INSERT INTO restodata(name_restaurant, id_user, logo, location, description, created_by, date_created) VALUES ('${params[0].value}', ${id}, '${params[1].value}', '${params[2].value}', '${params[3].value}', '${params[4].value}','${dates()}');UPDATE users SET is_admin = ${true} where id_user = ${id}`,
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
                            conn.query(`SELECT COUNT(*) AS total from restodata where id_user = ${id} && id_restaurant = ${parseInt(params[0].value)}`,
                                    (error, results, fields) => {
                                        console.log(params[0].value)
                                        if (!error) {
                                            const { total } = results[0]
                                            if (total === 0) {
                                                resolve(false)
                                            } else {
                                                conn.query(`UPDATE restodata set ${params.map(v => `${v.keys} = '${v.value}'`).join(' , ')}  WHERE id_restaurant = ${parseInt(params[0].value)}`,
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
    //Add Categories
    addcategor: (id, params) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT COUNT(*) AS total from categories where category = '${params[1].value}' && id_restaurant = ${params[0].value} LIMIT 1`,
                (error, results, fields) => {
                    console.log(params[1].value)
                    if (!error) {
                        const { total } = results[0]
                        console.log(total)
                        if (total === 1) {
                            resolve(false)
                        } else {
                            conn.query(`INSERT INTO categories(id_restaurant, category) VALUES (${params[0].value}, '${params[1].value}')`,
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
    //Edit Categories
    editcategor: (id, params) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT COUNT(*) AS total from categories where id_category = ${params[1].value} && id_restaurant = ${params[0].value} LIMIT 1`,
                (error, results, fields) => {
                    console.log(params[1].value)
                    if (!error) {
                        const { total } = results[0]
                        console.log(total)
                        if (total === 0) {
                            resolve(false)
                        } else {
                            conn.query(`UPDATE categories SET category = '${params[2].value}' WHERE id_category = ${params[1].value} `,
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
    //get list category
    category: (id, params) => {
        if (id) {
            return new Promise((resolve, reject) => {
                console.log(id)
                conn.query(`select categories.category FROM categories JOIN restodata ON categories.id_restaurant = restodata.id_restaurant  WHERE restodata.id_user  = ${id}`, (error, results, fields) => {
                    if (error) reject(new Error(error))
                    resolve(results)
                })
            })
        } else {
            return new Promise((resolve, reject) => {
                conn.query(`select categories.category, foodsdata.name_item, foodsdata.price, foodsdata.description, foodsdata.images FROM foodsdata categories JOIN foodsdata ON categories.category = foodsdata.category`, (error, results, fields) => {
                    if (error) reject(new Error(error))
                    resolve(results)
                })
            })
        }
    },
    //Edit Categories
    deletecategor: (id, params) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT COUNT(*) AS total from categories where id_category = ${params[0].value} LIMIT 1`,
                (error, results, fields) => {
                    if (!error) {
                        const { total } = results[0]
                        console.log(total)
                        if (total === 0) {
                            resolve(false)
                        } else {
                            conn.query(`DELETE FROM categories where id_category = ${params[0].value} `,
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