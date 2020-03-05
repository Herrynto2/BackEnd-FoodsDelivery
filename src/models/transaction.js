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
    //Delete Items
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
    //Save item in cart
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
    },
    //Check item as user
    get: (id, params) => {
        if (id) {
            return new Promise((resolve, reject) => {
                console.log(id)
                conn.query(`SELECT * FROM cart where id_user = ${id}`, (error, results, fields) => {
                    if (error) reject(new Error(error))
                    resolve(results)
                })
            })
        } else {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT * FROM cart`, (error, results, fields) => {
                    if (error) reject(new Error(error))
                    resolve(results)
                })
            })
        }
    },
    //Check item where id
    gets: (id) => {
        if (id) {
            return new Promise((resolve, reject) => {
                console.log(id)
                conn.query(`SELECT * FROM cart where id = ${id}`, (error, results, fields) => {
                    if (error) reject(new Error(error))
                    resolve(results)
                })
            })
        } 
    },
    //select cart.price, userdetail.Saldo from cart join userdetail on cart.id_user=userdetail.id where cart.id = 1
    //Checkout
    checkout: (id) => {
        return new Promise((resolve, reject) => {
            conn.query(`select cart.price, userdetail.Saldo from cart join userdetail on cart.id_user=userdetail.id where cart.id = ${id}`,
                (error, results, fields) => {
                    const transact = results[0].Saldo - results[0].price
                    console.log(transact)
                    if (!error) {
                        const { total } = results[0]
                        if (total === 0) {
                            resolve(false)
                        } else if (transact < 0){
                            resolve('Please topup saldo first')
                        } else {
                            const inst1 = `INSERT into transaction (id_user, name_user, email) select id_user, name_user, email from userdetail where id = ${id}`
                            const inst2 = `INSERT into transaction (id_restaurant, name_resto) select id_restaurant, name_resto from restodata where id = ${id}`
                            const inst3 = `INSERT into transaction (id_item, name_item, price) select id_item, name_item, price from foodsdata where id = ${id}`                            
                            const del = `DELETE FROM cart where id = ${id}`
                            
                            conn.query(`UPDATE userdetail SET Saldo = ${transact} where `,
                                (error, results, fields) => {
                                    if (error) {
                                        reject(new Error(error))
                                    }
                                    resolve(`Transaction success`)
                                })
                        }
                    } else {
                        reject(new Error(error))
                    }
                })
        })
    }
}