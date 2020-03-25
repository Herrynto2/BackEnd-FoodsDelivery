const { conn } = require('../config/db')
const { dates, time } = require('./time')

module.exports = {
        //Topup balance
        update: (id, iduser, params) => {
                return new Promise((resolve, reject) => {
                            conn.query(`SELECT Saldo from userdetail where id_user = ${iduser}`,
                                    (error, results, fields) => {
                                        if (!error) {
                                            const { total } = results[0]
                                            if (total === 0) {
                                                resolve(false)
                                            } else if (params[0].value < 0) {
                                                resolve(false)
                                            } else {
                                                conn.query(`UPDATE userdetail set ${params.map(v => `${v.keys} = '${v.value}'`)}+${results[0].Saldo}  WHERE id_user = ${iduser}`,
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
            conn.query(`SELECT COUNT(*) AS total from cart where id_user = ${iduser}`,
                (error, results, fields) => {
                    console.log()
                    if (!error) {
                        const { total } = results[0]
                        if (total === 0) {
                            resolve(false)
                        } else {
                            conn.query(`DELETE FROM cart WHERE id_item = ${id} && id_user = ${iduser}`,
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
    create: (id, iduser, params) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT COUNT(*) AS total from foodsdata where id_item = ${id}`,
                (error, results, fields) => {
                    if (!error) {
                        const { total } = results[0]
                        if (total === 0) {
                            resolve(false)
                        } else {
                            conn.query(`SELECT COUNT(*) AS total from cart where id_item = ${id} && id_user = ${iduser};SELECT * from cart where id_item = ${id} && id_user = ${iduser}`,
                                (error, results, fields) => {
                                    if (!error) {
                                        const { total } = results[0][0]
                                        if(total == 0) {   
                                            conn.query(`INSERT INTO cart (id_restaurant, id_item, name_item, price, description, images) select id_restaurant, id_item, name_item, price, description, images from foodsdata where foodsdata.id_item = ${id} ; UPDATE cart SET id_user = ${iduser}, total_item = ${params[0].value} WHERE id_user =  ${0};`,
                                            (error, results, fields) => {
                                                console.log(results)
                                                  if (error) {
                                                     reject(new Error(error))
                                                 }
                                                  resolve(true)
                                                  })
                                       
                                        } else {
                                            conn.query(`UPDATE cart set total_item=${results[1][0].total_item}+${params[0].value} WHERE id_user=${iduser} && id_item=${id}`,
                                                (error, results, fields) => {
                                                    if (error) {
                                                        reject(new Error(error))
                                                    }
                                                    resolve(true)
                                                })
                                        }
                                    }
                                  
                                })
                        }
                    } else {
                        reject(new Error(error))
                    }
                })
        })
    },

    //Save item in cart
    // create: (id, iduser, params) => {
    //     return new Promise((resolve, reject) => {
    //         conn.query(`SELECT COUNT(*) AS total from foodsdata where id_item = ${id}`,
    //             (error, results, fields) => {
    //                 if (!error) {
    //                     const { total } = results[0]
    //                     if (total === 0) {
    //                         resolve(false)
    //                     } else {    
    //                         conn.query(`INSERT INTO cart (id_restaurant, id_item, name_item, price, description, images) select id_restaurant, id_item, name_item, price, description, images from foodsdata where id_item = ${id} ; UPDATE cart SET id_user = ${iduser} WHERE id_user =  ${0}`,
    //                             (error, results, fields) => {
    //                                 if (error) {
    //                                     reject(new Error(error))
    //                                 }
    //                                 resolve(true)
    //                             })
    //                     }
    //                 } else {
    //                     reject(new Error(error))
    //                 }
    //             })
    //     })
    // },
    //Check user items in cart 
    get: (id, iduser, params) => {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT cart.id_cart, cart.id_user, cart.total_item, cart.id_restaurant, cart.id_item, cart.name_item, cart.price, cart.description, cart.images, cart.date_created, restodata.name_restaurant, restodata.location from cart JOIN restodata on cart.id_restaurant= restodata.id_restaurant WHERE cart.id_user=${iduser}`, (error, results, fields) => {
                    if (error) reject(new Error(error))
                    resolve(results)
                })
            })
    },  
    getid: (id, iduser, params) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT cart.id_cart, cart.id_user, cart.id_restaurant, cart.id_item, cart.name_item, cart.price, cart.description, cart.images, cart.total_item, cart.date_created, restodata.name_restaurant, restodata.location from cart JOIN restodata on cart.id_restaurant= restodata.id_restaurant WHERE cart.id_user=${iduser} && cart.id_cart=${id}`, (error, results, fields) => {
                if (error) reject(new Error(error))
                resolve(results)
            })
        })
    },  
   //Checkout
    checkout: (id, iduser, params) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT foodsdata.total_item, foodsdata.price, foodsdata.id_item, userdetail.Saldo, cart.id_cart, cart.total_item from cart join foodsdata on cart.id_item = foodsdata.id_item JOIN userdetail on cart.id_user = userdetail.id_user  WHERE cart.id_user = ${iduser} && cart.id_cart = ${id}`,
                (error, results, fields) => {
                    const idItem = results[0].id_item
                    const valueCart = results[0].total_item //items at cart
                    const valueCheckout = params[0].value 
                    let balance = results[0].Saldo - (results[0].price*params[0].value) //Sisa saldo
                    let checkout = results[0].price * params[0].value //total harga
                    let cartLimit = valueCart - params[0].value //Sisa item at cart 
                    
                    if (!error) {
                        const { total } = results[0]
                        if (total === 0) {
                            resolve(false)
                        } else {
                            conn.query(`SELECT total_item from foodsdata where id_item = ${results[0].id_item}`,
                                (error, results, fields) => {
                                    const valueItems = results[0].total_item
                                    let available = valueItems - valueCheckout //sisa ketersediaan item di admin

                                    if (available < 0) {
                                        resolve(false)
                                        return
                                    } else if (balance < 0) {
                                        resolve(false)
                                        return
                                    } else if (cartLimit <= 0) {
                                        conn.query(`INSERT into transaction(id_cart) select id_cart from cart where id_cart = ${id} ; UPDATE transaction, userdetail set transaction.id_user=userdetail.id_user, transaction.name_user=userdetail.name_user, transaction.email=userdetail.email WHERE transaction.id_user = ${0} && userdetail.id_user=${iduser} ; UPDATE transaction, cart SET transaction.id_restaurant=cart.id_restaurant, transaction.id_item=cart.id_item, transaction.name_item=cart.name_item, transaction.price=cart.price WHERE transaction.id_restaurant = ${0} ; UPDATE transaction SET total=${params[0].value}, total_price=${checkout} WHERE total = ${0} ; UPDATE userdetail SET Saldo = ${balance} WHERE id_user = ${iduser} ; UPDATE foodsdata SET total_item = ${available} WHERE id_item = ${idItem} ; DELETE FROM cart where id_cart= ${id}`,
                                            (error, results, fields) => {
                                                if (error) {
                                                    reject(new Error(error))
                                                }
                                                resolve(true)
                                            })
                                            return
                                    } else {
                                        conn.query(`INSERT into transaction(id_cart) select id_cart from cart where id_cart = ${id} ; UPDATE transaction, userdetail set transaction.id_user=userdetail.id_user, transaction.name_user=userdetail.name_user, transaction.email=userdetail.email WHERE transaction.id_user = ${0} && userdetail.id_user=${iduser} ; UPDATE transaction, cart SET transaction.id_restaurant=cart.id_restaurant, transaction.id_item=cart.id_item, transaction.name_item=cart.name_item, transaction.price=cart.price WHERE transaction.id_restaurant = ${0} ; UPDATE transaction SET total=${params[0].value}, total_price=${checkout} WHERE total = ${0} ; UPDATE userdetail SET Saldo = ${balance} WHERE id_user = ${iduser} ; UPDATE foodsdata SET total_item = ${available} WHERE id_item = ${idItem} ; UPDATE cart set total_item = ${valueCart}-${params[0].value} where id_cart= ${id}`,
                                            (error, results, fields) => {
                                                if (error) {
                                                    reject(new Error(error))
                                                }
                                                resolve(true)
                                            })
                                    }
                                    resolve(true)
                                })
                            
                        }
                        
                        //  else {
                           
                        // }
                    } else {
                        reject(new Error(error))
                    }
                })
        })
    }
}