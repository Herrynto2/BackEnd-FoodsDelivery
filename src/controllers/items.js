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

const addItem = async(req, res) => {
    const { id } = req.params
    const key = Object.keys(req.body)
    const params = key.map((v, i) => {
        if (v && (key[i] === 'id_restaurant' || key[i] === 'category' || key[i] === 'name_item' || key[i] === 'price' || key[i] === 'description' || key[i] === 'images' || key[i] === 'total_item')) {
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
        res.send({ success: false, msg: error.message })
    }
}

const addtotal = async(req, res) => {
    const { id } = req.params
    const key = Object.keys(req.body)
    const params = key.map((v, i) => {
        if (v && (key[i] === 'id_item' || key[i] === 'total_item')) {
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
            const add = await user.value(id, params)
            if (add) {
                res.send({ success: true, msg: `total item successfully added` })
            } else {
                res.send({ success: false, msg: 'Failed to add' })
            }
        } else {
            res.send({ success: false, msg: 'Invalid User' })
        }
    } catch (error) {
        res.send({ success: false, msg: error.message })
    }
}

const editItem = async(req, res) => {
    const { id } = req.params
    const key = Object.keys(req.body)
    const params = key.map((v, i) => {
        if (v && (key[i] === 'id_restaurant' || key[i] === 'id_item' || key[i] === 'category' || key[i] === 'name_item' || key[i] === 'price' || key[i] === 'description' || key[i] === 'images' || key[i] === 'total_item')) {
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
        res.send({ success: false, msg: error.message })
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

//Add Review items
const addReview = async(req, res) => {
    const { id } = req.params
    const key = Object.keys(req.body)
    const params = key.map((v, i) => {
        if (v && (key[i] === 'id_item' || key[i] === 'id_restaurant' || key[i] === 'review' || key[i] === 'rating')) {
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
            const del = await user.postReview(id, params)
            if (del) {
                res.send({ success: true, msg: `success to give review` })
            } else {
                res.send({ success: false, msg: 'Failed to give review' })
            }
        } else {
            res.send({ success: false, msg: 'Invalid user id' })
        }
    } catch (error) {
        res.send({ success: false, msg: error.message })
    }
}

//Edit Review Items
const editReview = async(req, res) => {
    const { id } = req.params
    const key = Object.keys(req.body)
    const params = key.map((v, i) => {
        if (v && (key[i] === 'id_item' || key[i] === 'review' || key[i] === 'rating')) {
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
            const del = await user.patchReview(id, params)
            if (del) {
                res.send({ success: true, msg: `success to edit review` })
            } else {
                res.send({ success: false, msg: 'Failed to edit review' })
            }
        } else {
            res.send({ success: false, msg: 'Invalid user id' })
        }
    } catch (error) {
        res.send({ success: false, msg: error.message })
    }
}

//get list review
const listReview = async(req, res) => {
    const { id } = req.params
    const key = Object.keys(req.body)
    const params = key.map((v, i) => {
        if (v && (key[i] === 'id_item')) {
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
            const detail = await user.getReview(id, params)
            console.log(detail)
            if (detail) {
                res.send({
                    success: true,
                    id_restaurant: detail[0].id_restaurant,
                    name_item: detail[0].name_item,
                    Review: detail.map(e => [`id_user: ${e.id_user}`, `Review: ${e.review}`, `Rating: ${e.rating}`, `date_created: ${e.date_created}`])
                })

            } else {
                res.send({ success: false, msg: 'item not found' })
            }
        } else {
            res.send({ success: false, msg: 'Invalid User' })
        }
    } catch (error) {
        res.send({ success: false, msg: error.message })
    }
}

const deleteReview = async(req, res) => {
    const { id } = req.params
    const key = Object.keys(req.body)
    const params = key.map((v, i) => {
        if (v && (key[i] === 'id_item')) {
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
            const detail = await user.delReview(id, params)
            console.log(detail)
            if (detail) {
                res.send({ success: true, msg: 'delete review success' })
            } else {
                res.send({ success: false, msg: 'item not found' })
            }
        } else {
            res.send({ success: false, msg: 'Invalid User' })
        }
    } catch (error) {
        res.send({ success: false, msg: error.message })
    }
}

module.exports = { pagination, getItems, addItem, editItem, deleteItem, addReview, editReview, listReview, deleteReview, addtotal }