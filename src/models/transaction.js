const { conn } = require('../config/db')
const { dates, time } = require('./time')

module.exports = {
        //Topup balance
        update: (id, params) => {
                return new Promise((resolve, reject) => {
                            conn.query(`SELECT Saldo from userdetail where id_user = ${id}`,
                                    (error, results, fields) => {
                                        console.log(results[0].Saldo)
                                        if (!error) {
                                            const { total } = results[0]
                                            if (total === 0) {
                                                resolve(false)
                                            } else {
                                                conn.query(`UPDATE userdetail set ${params.map(v => `${v.keys} = '${v.value}'`)}+${results[0].Saldo}  WHERE id_user = ${id}`,
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
        return new Promise((resolve, reject) => {
            conn.query(`SELECT COUNT(*) AS total from cart where id_user = ${id}`,
                (error, results, fields) => {
                    console.log()
                    if (!error) {
                        const { total } = results[0]
                        if (total === 0) {
                            resolve(false)
                        } else {
                            conn.query(`DELETE FROM cart WHERE id_item = ${params[0].value} && id_user = ${id}`,
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
    create: (id, params) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * from foodsdata where id_item = ${params[0].value}`,
                (error, results, fields) => {
                    if (!error) {
                        const { total } = results[0]
                        if (total === 0) {
                            resolve(false)
                        } else {    
                            conn.query(`INSERT INTO cart (id_restaurant, id_item, name_item, price, description, images) select id_restaurant, id_item, name_item, price, description, images from foodsdata where id_item = ${params[0].value} ; UPDATE cart SET id_user = ${id} WHERE id_user =  ${0}`,
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
    //Check user items in cart 
    get: (id, params) => {
        if (id) {
            return new Promise((resolve, reject) => {
                console.log(id)
                conn.query(`SELECT * FROM cart where id_user = ${id}`, (error, results, fields) => {
                    if (error) reject(new Error(error))
                    resolve(results)
                })
            })
        }
    },  
   //Checkout
    checkout: (id, params) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT foodsdata.total_item, foodsdata.price, foodsdata.id_item, userdetail.Saldo, cart.id_cart from cart join foodsdata on cart.id_item = foodsdata.id_item JOIN userdetail on cart.id_user = userdetail.id_user  WHERE cart.id_user = ${id} && cart.id_item = ${params[0].value} `,
                (error, results, fields) => {
                    console.log(results[0].id_cart)
                    const price = results[0].Saldo - (results[0].price * params[1].value)
                    const available = Number(results[0].total_item) - Number(params[1].value) 
                    if (!error) {
                        const { total } = results[0]
                        if (total === 0) {
                            resolve(false)
                        } 
                        else if (price < 0) {
                             resolve(false)
                        } else if (available < 0){
                            resolve(false)
                        }
                         else {
                            conn.query(`INSERT into transaction(id_cart) select id_cart from cart id where id_cart = ${results[0].id_cart} ; UPDATE transaction,userdetail set transaction.id_user=userdetail.id_user, transaction.name_user=userdetail.name_user, transaction.email=userdetail.email WHERE id_cart = ${results[0].id_cart} ; UPDATE transaction, cart SET transaction.id_restaurant=cart.id_restaurant, transaction.id_item=cart.id_item, transaction.name_item=cart.name_item, transaction.price=cart.price WHERE transaction.id_cart = ${results[0].id_cart} ; UPDATE transaction SET total=2, total_price=2000 WHERE id_cart = ${results[0].id_cart} ; UPDATE userdetail SET Saldo = ${price} WHERE id_user = ${id} ; UPDATE foodsdata SET total_item = ${available} WHERE id_item = ${params[0].value} ; DELETE FROM cart where id_cart= ${results[0].id_cart}`,
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