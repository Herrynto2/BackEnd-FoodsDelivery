const user = require('../models/items')
var bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10);
const qs = require('qs')

const pagination = async(req, res) => {
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
    const data = await user.search('', params);

    //Generatting Pagination
    const { query } = req
    query.page = parseInt(query.page + 1)
    if (!query.page) {
        query.page = '1'
    }
    console.log(query)


    const totalPages = Math.ceil(data.total / parseInt(params.perPage))
    query.page = parseInt(query.page) + 1
    const nextPage = (parseInt(params.currentPage) < totalPages ? process.env.APP_URL.concat('items?').concat(qs.stringify(query)) : null)
    console.log(nextPage)
    query.page = parseInt(query.page) - 2
    const previousPage = (parseInt(params.currentPage) > 1 ? process.env.APP_URL.concat('items?').concat(qs.stringify(query)) : null)
    console.log(previousPage)
    const pagination = {
        currentPage: parseInt(params.currentPage),
        nextPage,
        previousPage,
        totalPages,
        perPage: parseInt(params.perPage),
        totalEntries: data.total
    };
    res.send({
        success: true,
        data: data.results,
        pagination

    })
}

const getItems = async(req, res) => {
    const { id } = req.params
    if (parseInt(id) === parseInt(req.auth.id)) {
        const detail = await user.get(id)
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

const addItem = async(req, res) => {
    const { id } = req.params
    const key = Object.keys(req.body)
    const params = key.map((v, i) => {
        if (v && (key[i] === 'id_restaurant' || key[i] === 'category' || key[i] === 'name_item' || key[i] === 'price' || key[i] === 'description' || key[i] === 'images')) {
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
            const add = await user.create(id, params)
            if (add) {
                res.send({ success: true, msg: `add item success` })
            } else {
                res.send({ success: false, msg: 'Failed to add item' })
            }
        } else {
            res.send({ success: false, msg: 'Invalid User' })
        }
    } catch (error) {
        res.send({ success: false, msg: 'Error' })
    }
}

const editItem = async(req, res) => {
    const { id } = req.params
    const key = Object.keys(req.body)
    const params = key.map((v, i) => {
        if (v && (key[i] === 'id_restaurant' || key[i] === 'id_item' || key[i] === 'category' || key[i] === 'name_item' || key[i] === 'price' || key[i] === 'description' || key[i] === 'images')) {
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

const deleteItem = async(req, res) => {
    const { id } = req.params
    const key = Object.keys(req.body)
    const params = key.map((v, i) => {
        if (v && (key[i] === 'id_restaurant' || key[i] === 'id_item')) {
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
            const add = await user.delete(id, params)
            if (add) {
                res.send({ success: true, msg: `delete item success` })
            } else {
                res.send({ success: false, msg: 'Failed to add item' })
            }
        } else {
            res.send({ success: false, msg: 'Invalid User' })
        }
    } catch (error) {
        res.send({ success: false, msg: 'Error' })
    }
}

module.exports = { pagination, getItems, addItem, editItem, deleteItem }