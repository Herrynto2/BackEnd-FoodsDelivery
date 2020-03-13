const { conn } = require('../config/db')
const { dates, time } = require('./time')

module.exports = {
        //Profile Restaurant
        getResto: (iduser) => {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT * from restodata where id_user = ${iduser} `, (error, results, fields) => {
                    if (error) reject(new Error(error))
                    resolve(results)
                })
            })
        },
        //Create Restaurant
        create: (name_restaurant, logo, location, description, created_by, iduser) => {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT COUNT(*) AS total from restodata where id_user = ${iduser} `,
                    (error, results, fields) => {
                        if (!error) {
                            const { total } = results[0]
                            if (total !== 0) {
                                resolve(false)
                            } else {
                                conn.query(`INSERT INTO restodata(id_user, name_restaurant, logo, location, description, created_by) VALUES ('${iduser}', '${name_restaurant}', '${logo}', '${location}', '${description}', '${created_by}') ; UPDATE users SET is_admin = ${true} where id_user = ${iduser};`,
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
        delete: (id, iduser) => {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT COUNT(*) AS total from restodata where id_restaurant = ${id} && id_user = ${iduser}`,
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
        update: (id, iduser, params) => {
                return new Promise((resolve, reject) => {
                            conn.query(`SELECT COUNT(*) AS total from restodata where id_user = ${iduser} && id_restaurant = ${id}`,
                                    (error, results, fields) => {
                                        console.log(params[0].value)
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
    //Add Categories
    addcategor: (category, iduser) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT COUNT(*) AS total from categories JOIN restodata on categories.id_restaurant = restodata.id_restaurant WHERE restodata.id_user = ${iduser} && categories.category ='${category}'`,
                (error, results, fields) => {
                    if (!error) {
                        const { total }  = results[0]
                        if (total !== 0) {
                            resolve(false)
                        } else {
                            conn.query(`INSERT INTO categories( category) VALUES ('${category}');UPDATE categories, restodata set categories.id_restaurant = restodata.id_restaurant where categories.id_restaurant =${0} && restodata.id_user = ${iduser}`,
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
    addcategorid: (id, params) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT COUNT(*) AS total from categories_id where category = '${params[0].value}' LIMIT 1`,
                (error, results, fields) => {
                    if (!error) {
                        const { total } = results[0]
                        if (total === 1) {
                            resolve(false)
                        } else {
                            conn.query(`INSERT INTO categories_id(category) VALUES ('${params[0].value}')`,
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
    editcategor: (id,iduser, params) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT categories.id_category, categories.category FROM categories JOIN restodata on categories.id_restaurant = restodata.id_restaurant WHERE restodata.id_user = ${iduser} && categories.id_category = ${id}`,
                (error, results, fields) => {
                    if (!error) {
                        const { total } = results[0]
                        if (total === 0) {
                            resolve('faile')
                        } else {
                            conn.query(`UPDATE categories SET category = '${params[0].value}' WHERE id_category = ${id} `,
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
    category: (id, iduser, params) => {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT categories.id_category, categories.category FROM categories JOIN restodata on categories.id_restaurant = restodata.id_restaurant WHERE restodata.id_user = ${iduser}`, (error, results, fields) => {
                    if (error) reject(new Error(error))
                    resolve(results)
                })
            })
    },
    //Edit Categories
    deletecategor: (id, iduser, params) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT COUNT(*) AS total FROM categories JOIN restodata on categories.id_restaurant = restodata.id_restaurant WHERE restodata.id_user = ${iduser} && categories.id_category = ${id}`,
                (error, results, fields) => {
                    if (!error) {
                        const { total } = results[0]
                        if (total === 0) {
                            resolve(false)
                        } else {
                            conn.query(`DELETE FROM categories where id_category = ${id} `,
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