const { conn, connquery } = require('../config/db')
const { dates } = require('./time')

module.exports = {
        getresto: (id, params) => {
                if (id) {
                    return new Promise((resolve, reject) => {
                        const query = `SELECT * FROM restodata where id_restaurant = ${id}; 
                        SELECT foodsdata.name_item, foodsdata.id_item, foodsdata.price, foodsdata.category, foodsdata.images, foodsdata.description, foodsdata.total_item FROM foodsdata JOIN restodata on foodsdata.id_restaurant = restodata.id_restaurant WHERE restodata.id_restaurant = ${id}`

                        conn.query(query, (error, result, field) => {
                            console.log(result)
                            if (error) reject = new Error(error)
                            resolve(result)
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
    },
    getitems: (id, params) => {
        if (id) {
            return new Promise((resolve, reject) => {
                const query = `SELECT  foodsdata.id_item, foodsdata.name_restaurant, foodsdata.images, restodata.location, foodsdata.name_item, foodsdata.category, foodsdata.price, foodsdata.description, foodsdata.images, foodsdata.total_item, restodata.name_restaurant FROM foodsdata JOIN restodata on foodsdata.id_restaurant = restodata.id_restaurant where foodsdata.id_item=${id} ; SELECT foodreview.name_user, foodreview.review, userdetail.images, foodreview.date_created FROM foodsdata JOIN foodreview on foodsdata.id_item = foodreview.id_item JOIN userdetail on userdetail.id_user=foodreview.id_user WHERE foodsdata.id_item = ${id}`
                conn.query(query, (error, result, field) => {
                    if (error) reject = new Error(error)
                    resolve(result)
                    if (result) {
                    }   
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
                    const query = `SELECT  foodsdata.id_item, restodata.name_restaurant, foodsdata.name_item, foodsdata.category, foodsdata.price, foodsdata.description, foodsdata.images, foodsdata.total_item, restodata.name_restaurant FROM foodsdata JOIN restodata on foodsdata.id_restaurant=restodata.id_restaurant  ${condition}`
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

    //     getitems: (id, params) => {
    //             if (id) {
    //                 return new Promise((resolve, reject) => {
    //                     conn.query(`SELECT * FROM foodsdata WHERE id_item = ${id}`, (error, results, fields) => {
    //                         if (error) reject(new Error(error))
    //                         resolve(results[0])
    //                     })
    //                 })
    //             } else {
    //                 return new Promise((resolve, reject) => {

    //                             //Destructing Parameter
    //                             const { perPage, currentPage, search, sort } = params
    //                             console.log(sort)
    //                             //Searching & Pagination
    //                     const condition = `${search && `WHERE ${search.map(v => `${v.keys} LIKE '${v.value}%'`).join(' AND ')}`} ORDER BY ${sort.map(v => `${v.keys} ${!v.value ? 'ASC' : 'DESC'}`).join(' AND ')}
    //                 ${(currentPage && perPage) && `LIMIT ${perPage} OFFSET ${parseInt(perPage) * (parseInt(currentPage) - 1)}`}`
    //             console.log(condition)

    //             //Count All data 
    //             conn.query(`SELECT COUNT(*) AS total from foodsdata ${condition.slice(0, condition.indexOf('LIMIT'))}`, (error, results, fields) => {

    //                 //error Handling
    //                 if (error) {
    //                     reject(new Error(error))
    //                 }
    //                 const { total } = results[0]
    //                 const query = `SELECT * FROM foodsdata ${condition}`
    //                 conn.query(query, (error, results, fields) => {
    //                     if (error) {
    //                         reject(new Error(error))
    //                     }
    //                     resolve({ results, total })
    //                 })
    //             })
    //         })
    //     }
    // },

    getcategories: (id, params) => {
        if (id) {
            return new Promise((resolve, reject) => {
                conn.query(`SELECT categories_id.category, foodsdata.id_item, foodsdata.name_restaurant, foodsdata.name_item, foodsdata.price, foodsdata.description, foodsdata.images, foodsdata.total_item, foodsdata.date_created, foodsdata.date_updated FROM categories_id JOIN foodsdata ON foodsdata.category = categories_id.category WHERE categories_id.id = ${id}`, (error, results, fields) => {
                    if (error) reject(new Error(error))
                    resolve(results)
                })
            })
        } else {
            return new Promise((resolve, reject) => {

                //Destructing Parameter
                const { perPage, currentPage, search, sort } = params
                console.log(sort)
                //Searching & Pagination
                const condition = `${search && `WHERE ${search.map(v => `${v.keys} LIKE '${v.value}%'`).join(' AND ')}`} ORDER BY ${sort.keys} ${!sort.value ? 'ASC' : 'DESC'} ${(currentPage && perPage) && `LIMIT ${perPage} OFFSET ${parseInt(perPage) * (parseInt(currentPage) - 1)}`}`
                console.log(condition)
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
    }
}