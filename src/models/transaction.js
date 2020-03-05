const { conn } = require('../config/db')
const { dates, time } = require('./time')

module.exports = {
        //     //Create Resto
        //     create: (name_resto, logo, location, description, created_by) => {
        //         return new Promise((resolve, reject) => {
        //             conn.query(`SELECT COUNT(*) AS total from restodata where name_resto = '${name_resto}' LIMIT 1`,
        //                 (error, results, fields) => {
        //                     if (!error) {
        //                         const { total } = results[0]
        //                         if (total !== 0) {
        //                             resolve(false)
        //                         } else {
        //                             conn.query(`INSERT INTO restodata(name_resto, logo, location, description, created_by, date_created) VALUES ('${name_resto}','${logo}','${location}','${description}','${created_by}','${dates()}')`,
        //                                 (error, results, fields) => {
        //                                     if (error) {
        //                                         reject(new Error(error))
        //                                     }
        //                                     resolve(true)
        //                                 })
        //                         }
        //                     } else {
        //                         reject(new Error(error))
        //                     }
        //                 })
        //         })
        //     },
        //     //delete Resto
        //     delete: (id) => {
        //         return new Promise((resolve, reject) => {
        //             conn.query(`SELECT COUNT(*) AS total from restodata where id_resto = ${id}`,
        //                 (error, results, fields) => {
        //                     if (!error) {
        //                         const { total } = results[0]
        //                         if (total === 0) {
        //                             resolve(false)
        //                         } else {
        //                             conn.query(`DELETE FROM restodata where id_resto = ${id}`,
        //                                 (error, results, fields) => {
        //                                     if (error) {
        //                                         reject(new Error(error))
        //                                     }
        //                                     resolve(true)
        //                                 })
        //                         }
        //                     } else {
        //                         reject(new Error(error))
        //                     }
        //                 })
        //         })
        //     },
        //     //Get a food from a resto (not yet)
        //     getFood: (id, params) => {
        //         //Command Detail GET 
        //         if (id) {
        //             return new Promise((resolve, reject) => {
        //                 conn.query(`SELECT restodata.name_resto, restodata.logo, restodata.location, restodata.description, foodsdata.name, foodsdata.price,  foodsdata.images FROM restodata join foodsdata on restodata.id_resto = foodsdata.id_restaurant where foodsdata.id = ${id}`, (error, results, fields) => {
        //                     if (error) reject(new Error(error))
        //                     resolve(results[0])
        //                 })
        //             })
        //         }
        //     },
        //     // Get List Restaurant (not yet)
        //     getListResto: (id, params) => {
        //         //Command Detail GET 
        //         if (id) {
        //             return new Promise((resolve, reject) => {
        //                 conn.query(`SELECT * FROM restodata`, (error, results, fields) => {
        //                     if (error) reject(new Error(error))
        //                     resolve(results[0])
        //                 })
        //             })
        //         }
        //     },
        //     get: (id, params) => {
        //             //Command Detail GET 
        //             if (id) {
        //                 return new Promise((resolve, reject) => {
        //                     conn.query(`SELECT * FROM restodata where id_resto = ${id}`, (error, results, fields) => {
        //                         if (error) reject(new Error(error))
        //                         resolve(results[0])
        //                     })
        //                 })
        //             } else {
        //                 return new Promise((resolve, reject) => {
        //                             const { perPage, currentPage, search, sort } = params
        //                             const condition = `${search && `WHERE ${search.map(v => `${v.keys} LIKE '${v.value}%'`).join(' AND ')}`} ORDER BY ${sort.keys} ${!sort.value ? 'ASC' : 'DESC'} ${(currentPage && perPage) && `LIMIT ${perPage} OFFSET ${parseInt(perPage) * (parseInt(currentPage) - 1)}`}`
        //             console.log(condition)

        //             //Count All data 
        //             conn.query(`SELECT COUNT(*) AS total from restodata ${condition.slice(0, condition.indexOf('LIMIT'))}`, (error, results, fields) => {

        //                 //error Handling
        //                 if (error) {
        //                     reject(new Error(error))
        //                 }
        //                 const { total } = results[0]
        //                 const query = `SELECT * FROM restodata ${condition}`
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
    }
}