const user = require('../models/guest')
const { conn } = require('../config/db')
var bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10);
const qs = require('qs')

// const pagination = async(req, res) => {
//     const params = {
//         currentPage: req.query.page || 1,
//         perPage: req.query.limit || 5,
//         search: req.query.search || null,
//         sort: req.query.sort || { keys: 'name', value: 0 }
//     };
//     //Reformatting Search
//     const key = Object.keys(params.search)
//     if (req.query.search) {
//         params.search = key.map((v, i) => ({ keys: key[i], value: req.query.search[key[i]] }))
//     }
//     //Reformatting Sort
//     const keysort = Object.keys(params.sort)
//     if (req.query.sort) {
//         params.sort = keysort.map((v, i) => ({ keys: key[i], value: req.query.sort[key[i]] }))
//     }

//     //Get data from user module
//     const data = await user.search('', params);

//     //Generatting Pagination
//     const { query } = req
//     query.page = parseInt(query.page + 1)
//     if (!query.page) {
//         query.page = '1'
//     }
//     console.log(query)


//     const totalPages = Math.ceil(data.total / parseInt(params.perPage))
//     query.page = parseInt(query.page) + 1
//     const nextPage = (parseInt(params.currentPage) < totalPages ? process.env.APP_URL.concat('items?').concat(qs.stringify(query)) : null)
//     console.log(nextPage)
//     query.page = parseInt(query.page) - 2
//     const previousPage = (parseInt(params.currentPage) > 1 ? process.env.APP_URL.concat('items?').concat(qs.stringify(query)) : null)
//     console.log(previousPage)
//     const pagination = {
//         currentPage: parseInt(params.currentPage),
//         nextPage,
//         previousPage,
//         totalPages,
//         perPage: parseInt(params.perPage),
//         totalEntries: data.total
//     };
//     res.send({
//         success: true,
//         data: data.results,
//         pagination

//     })
// }

const searchItem = `SELECT * FROM foodsdata`
conn.query(searchItem, function(err, results) {
    if (err) throw err
    console.log(results)
})


// const searchItem = async(req, res) => {
//     try {
//         const { id } = req.body
//         const detail = await user.getitems(id)
//         if (detail) {
//             res.send({
//                 success: true,
//                 data: detail
//             })
//         } else {
//             res.send({
//                 success: false,
//                 message: 'item not found'
//             })
//         }
//     } catch (error) {
//         res.send({
//             success: false,
//             message: error.message
//         })
//     }
// }



const searchResto = async(req, res) => {
    try {
        const { id } = req.params
        const detail = await user.getresto(id)
        if (detail) {
            res.send({
                success: true,
                data: detail
            })
        } else {
            res.send({
                success: false,
                message: 'item not found'
            })
        }
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}



module.exports = { searchItem, searchResto }