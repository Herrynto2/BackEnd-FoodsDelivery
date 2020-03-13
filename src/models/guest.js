const { conn, connquery } = require('../config/db')
const { dates } = require('./time')

module.exports = {
        getresto: (id, params) => {
                if (id) {
                    return new Promise((resolve, reject) => {
                        const query = `SELECT *FROM restodata where id_restaurant = ${id}`
                        conn.query(query, (error, result, field) => {
                            console.log(result)
                            if (error) reject = new Error(error)
                            resolve(result[0])
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
                const query = `SELECT *FROM foodsdata where id_item = ${id}`
                conn.query(query, (error, result, field) => {
                    console.log(result)
                    if (error) reject = new Error(error)
                    resolve(result[0])
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
                    const query = `SELECT  foodsdata.name_item, foodsdata.category, foodsdata.price, foodsdata.description, foodsdata.images, foodsdata.total_item, restodata.name_restaurant FROM foodsdata JOIN restodata on foodsdata.id_restaurant=restodata.id_restaurant  ${condition}`
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
                conn.query(`SELECT * FROM categories_id WHERE id = ${id}`, (error, results, fields) => {
                    if (error) reject(new Error(error))
                    resolve(results[0])
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