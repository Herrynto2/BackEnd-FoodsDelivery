const { conn } = require('../config/db')
const { dates, time } = require('./time')

module.exports = {
        //Topup
        update: (id, params) => {
                return new Promise((resolve, reject) => {
                            conn.query(`SELECT Saldo from userdetail where id = ${id}`,
                                    (error, results, fields) => {
                                        console.log(results[0].Saldo)
                                        if (!error) {
                                            const { total } = results[0]
                                            if (total === 0) {
                                                resolve(false)

                                            } else {
                                                conn.query(`UPDATE userdetail set ${params.map(v => `${v.keys} = '${v.value}'`)}+${results[0].Saldo}  WHERE id = ${id}`,
                                (error, results, fields) => {
                                    console.log(params[0].value)
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
    //still fail : cara 2 untuk mengatasi data yang sama masih tesave
    delete: (id) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT COUNT(*) AS total from cart where id = ${id}`,
                (error, results, fields) => {
                    if (!error) {
                        const { total } = results[0]
                        if (total === 0) {
                            resolve(false)
                        } else {
                            conn.query(`DELETE FROM cart where id = ${id}`,
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
    create: (id) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT COUNT(*) AS total from foodsdata where id = ${id}`,
                (error, results, fields) => {
                    if (!error) {
                        const { total } = results[0]
                        if (total === 0) {
                            resolve(false)
                        } else {
                            conn.query(`Insert into cart (id_restaurant, name, price, description, images) select id_restaurant, name, price, description, images from foodsdata where id = ${id}`,
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
    // creates: (id) => {
    //     return new Promise((resolve, reject) => {
    //         conn.query(`SELECT COUNT(*) AS total from foodsdata where id = ${id}`,
    //             (error, results, fields) => {
    //                 if (!error) {
    //                     const { total } = results[0]
    //                     if (total === 0) {
    //                         resolve(false)
    //                     } else {
    //                         conn.query(`SELECT cart.name, foodsdata.name from cart join foodsdata on cart.name = foodsdata.name where foodsdata.id = ${id}`, (error, results, fields) => {
    //                             if (!error) {
    //                                 const { total } = results[0]
    //                                 if (total === 0) {
    //                                     resolve(false)
    //                                 } else {
    //                                     console.log(results)
    //                                     conn.query(`Insert into cart (id_restaurant, name, price, description, images) select id_restaurant, name, price, description, images from foodsdata where id = ${id}`,
    //                                         (error, results, fields) => {
    //                                             if (error) {
    //                                                 reject(new Error(error))
    //                                             }
    //                                             resolve(true)
    //                                         })
    //                                 }
    //                             }
    //                         })
    //                         }
    //                 } else {
    //                     reject(new Error(error))
    //                 }
    //             })
    //     })
    // }
}