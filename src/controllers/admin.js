const user = require('../models/admin')
var bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10);
const qs = require('qs')

// const getAllUser = async(req, res) => {
//     //Default Condition
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
//     const data = await user.get('', params);

//     //Generatting Pagination
//     const { query } = req
//     query.page = parseInt(query.page + 1)
//     if (!query.page) {
//         query.page = '1'
//     }
//     console.log(query)


//     const totalPages = Math.ceil(data.total / parseInt(params.perPage))
//     query.page = parseInt(query.page) + 1
//     const nextPage = (parseInt(params.currentPage) < totalPages ? process.env.APP_URL.concat('user?').concat(qs.stringify(query)) : null)
//     console.log(nextPage)
//     query.page = parseInt(query.page) - 2
//     const previousPage = (parseInt(params.currentPage) > 1 ? process.env.APP_URL.concat('user?').concat(qs.stringify(query)) : null)
//     console.log(previousPage)
//     const pagination = {
//         currentPage: parseInt(params.currentPage),
//         nextPage,
//         previousPage,
//         totalPages,
//         perPage: parseInt(params.perPage),
//         totalEntries: data.total
//     };
//     //Send Response to End User
//     res.send({
//         success: true,
//         data: data.results,
//         pagination

//     })
// }

// const getUser = async(req, res) => {
//     const { id } = req.params
//     const detail = await user.get(id)
//     if (detail) {
//         res.send({
//             success: true,
//             data: detail
//         })
//     } else {
//         res.send({
//             success: false,
//             data: detail
//         })
//     }
// }

const postUser = async(req, res) => {
    const { name, price, description, images, created_by } = req.body
    try {
        const create = await user.create(name, price, description, images, created_by)
        console.log(create)
        if (create) {
            res.send({ success: true, msg: 'User has been created' })
        } else {
            res.send({ success: false, msg: 'Failed to create user' })
        }
    } catch (error) {
        res.send({ success: false, msg: error })
    }
}


const patchUser = async(req, res) => {
    const { id } = req.params
    const key = Object.keys(req.body)
    const params = key.map((v, i) => {
        if (v && (key[i] === 'name' || key[i] === 'price' || key[i] === 'description' || key[i] === 'images' || key[i] === 'created_by')) {
            if (req.body[key[i]]) {
                return { keys: key[i], value: req.body[key[i]] }
            } else {
                return null
            }
        } else {
            return null
        }
    }).filter(o => o)
    try {
        const update = await user.update(id, params)
        if (update) {
            res.send({ success: true, msg: `user id ${id} has been updated` })
        } else {
            res.send({ success: false, msg: 'Failed to update user' })
        }
    } catch (error) {
        res.send({ success: false, msg: 'Error' })
    }
}

const deleteUser = async(req, res) => {
    const { id } = req.body
    const del = await user.delete(id)
    if (del) {
        res.send({ success: true, Message: 'delete success' })
    } else {
        res.send({ success: false, Message: 'delete failed' })
    }
}

module.exports = { postUser, patchUser, deleteUser }