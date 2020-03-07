const user = require('../models/resto')
var bcrypt = require('bcryptjs')
const { authmiddleware } = require('../middleware/authmiddleware')
var salt = bcrypt.genSaltSync(10);
const qs = require('qs')

const pagination = async(req, res) => {
    //Default Condition
    const params = {
        currentPage: req.query.page || 1,
        perPage: req.query.limit || 5,
        search: req.query.search || null,
        sort: req.query.sort || { keys: 'name', value: 0 }
    };
    //Reformatting Search
    const key = Object.keys(params.search)
    if (req.query.search) {
        params.search = key.map((v, i) => ({ keys: key[i], value: req.query.search[key[i]] }))
    }
    //Reformatting Sort
    const keysort = Object.keys(params.sort)
    if (req.query.sort) {
        params.sort = keysort.map((v, i) => ({ keys: key[i], value: req.query.sort[key[i]] }))
    }

    //Get data from user module
    const data = await user.get('', params);

    //Generatting Pagination
    const { query } = req
    query.page = parseInt(query.page + 1)
    if (!query.page) {
        query.page = '1'
    }
    console.log(query)


    const totalPages = Math.ceil(data.total / parseInt(params.perPage))
    query.page = parseInt(query.page) + 1
    const nextPage = (parseInt(params.currentPage) < totalPages ? process.env.APP_URL.concat('user?').concat(qs.stringify(query)) : null)
    console.log(nextPage)
    query.page = parseInt(query.page) - 2
    const previousPage = (parseInt(params.currentPage) > 1 ? process.env.APP_URL.concat('user?').concat(qs.stringify(query)) : null)
    console.log(previousPage)
    const pagination = {
        currentPage: parseInt(params.currentPage),
        nextPage,
        previousPage,
        totalPages,
        perPage: parseInt(params.perPage),
        totalEntries: data.total
    };
    //Send Response to End User
    res.send({
        success: true,
        data: data.results,
        pagination

    })
}

//Profile Restaurant
const getProfileResto = async(req, res) => {
    const { id } = req.params
    const key = Object.keys(req.body)
    const params = key.map((v, i) => {
        if (v && (key[i] === 'id_restaurant')) {
            console.log(key[i])
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
        if (parseInt(id) === parseInt(req.auth.id)) {
            const detail = await user.getProfile(id, params)
            if (detail) {
                res.send({ success: true, msg: detail })
            } else {
                res.send({ success: false, msg: 'Restaurant not found' })
            }
        } else {

        }
    } catch (error) {
        res.send({ success: false, message: "Unvalid id" })
    }
}

//List Restaurant
const getListResto = async(req, res) => {
    const { id } = req.params
    if (parseInt(id) === parseInt(req.auth.id)) {
        const detail = await user.get(id)
        console.log(detail)
        if (detail) {
            res.send({
                success: true,
                data: detail
            })
        } else {
            res.send({
                success: false,
                data: detail
            })
        }
    } else {
        res.send({
            success: false,
            message: "Unvalid id"
        })
    }
}

//Add restaurant
const addResto = async(req, res) => {
    const { id } = req.params
    const key = Object.keys(req.body)
    const params = key.map((v, i) => {
        if (v && (key[i] === 'name_restaurant' || key[i] === 'logo' || key[i] === 'location' || key[i] === 'description' || key[i] === 'created_by')) {
            console.log(key[i])
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
        // console.log(req.auth.id)
        if (parseInt(id) === parseInt(req.auth.id)) {
            const detail = await user.create(id, params)
            console.log(detail)
            if (detail) {
                res.send({ success: true, msg: 'Restaurant successfully created' })
            } else {
                res.send({ success: false, msg: 'User can only have maximal 2 restaurant in one account' })
            }
        } else {
            res.send({ success: false, message: "Unvalid id" })
        }
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

//edit restaurant
const editResto = async(req, res) => {
    const { id } = req.params
    const key = Object.keys(req.body)
    const params = key.map((v, i) => {
        if (v && (key[i] === 'id_restaurant' || key[i] === 'name_restaurant' || key[i] === 'logo' || key[i] === 'location' || key[i] === 'description' || key[i] === 'created_by')) {
            console.log(key[i])
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
        if (parseInt(id) === parseInt(req.auth.id)) {
            const update = await user.update(id, params)
            if (update) {
                res.send({ success: true, msg: `restaurant id ${id} has been updated` })
            } else {
                res.send({ success: false, msg: 'Failed to update Restaurant' })
            }
        } else {
            res.send({ success: false, msg: 'Invalid id user' })
        }

    } catch (error) {
        res.send({ success: false, msg: 'Error' })
    }
}

//Delete Restaurant
const deleteResto = async(req, res) => {
    const { id } = req.body
    const del = await user.delete(id)
    if (del) {
        res.send({ success: true, Message: `delete ID :${id} success` })
    } else {
        res.send({ success: false, Message: 'delete failed' })
    }
}

//Search list customer who order
const getlistOrder = async(req, res) => {
    const { id } = req.params
    const detail = await user.order(id)
    if (detail) {
        res.send({
            success: true,
            data: detail,
            total: detail.length
        })
    } else {
        res.send({
            success: false,
            data: detail
        })
    }
}

//Add Category
const addCategory = async(req, res) => {
    const { id } = req.params
    const key = Object.keys(req.body)
    const params = key.map((v, i) => {
        if (v && (key[i] === 'id_restaurant' || key[i] === 'category')) {
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
        if (parseInt(id) === parseInt(req.auth.id)) {
            const update = await user.addcategor(id, params)
            if (update) {
                res.send({ success: true, msg: `Category successfully added` })
            } else {
                res.send({ success: false, msg: 'Category has been available' })
            }
        } else {
            res.send({ success: false, msg: 'Invalid id user' })
        }

    } catch (error) {
        res.send({ success: false, msg: error.message })
    }
}

//Search list category item
const getcategory = async(req, res) => {
    const { id } = req.params
    const detail = await user.category(id)
    if (detail) {
        res.send({
            success: true,
            data: detail,
            total: detail.length
        })
    } else {
        res.send({
            success: false,
            data: detail
        })
    }
}

module.exports = { pagination, getProfileResto, getListResto, getlistOrder, addCategory, getcategory, addResto, editResto, deleteResto }