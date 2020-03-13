const user = require('../models/items')
var bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10);
const qs = require('qs')
const upload = require('../middleware/upload')


const getItems = async(req, res) => {
    try {
        const iduser = req.auth.id
        const { id } = req.params
        const detail = await user.get(id, iduser)
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
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }

}

const getListItems = async(req, res) => {
    //Default Condition
    const params = {
        currentPage: req.query.page || 1,
        perPage: req.query.limit || 3,
        search: req.query.search || '',
        sort: req.query.sort || { keys: 'name_item', value: 0 }
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
    if (!query.page) {
        query.page = 1
    }

    const totalPages = Math.ceil(data.total / parseInt(params.perPage))
    query.page = parseInt(query.page) + 1

    const nextPage = (parseInt(params.currentPage) < totalPages ? process.env.APP_URL.concat('browse-items?').concat(qs.stringify(query)) : null)

    query.page = parseInt(query.page) - 2
    const previousPage = (parseInt(params.currentPage) > 1 ? process.env.APP_URL.concat('browse-items?').concat(qs.stringify(query)) : null)

    const pagination = {
        currentPage: parseInt(params.currentPage),
        nextPage: nextPage,
        previousPage: previousPage,
        totalPages: totalPages,
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

const addItem = async(req, res) => {
    await upload(req, res, 'images')
    console.log(req.file)
    req.body.images = '/uploads/' + req.file.filename

    const iduser = req.auth.id
    const { id_restaurant, category, name_item, price, description, images, total_item } = req.body
    try {
        const add = await user.create(id_restaurant, category, name_item, price, description, images, total_item, iduser)
        if (add) {
            res.send({ success: true, Message: 'add items success' })
        } else {
            res.send({ success: false, Message: 'add items failed' })
        }
    } catch (error) {
        res.send({ success: false, Message: error.message })
    }
}

const addtotal = async(req, res) => {
    const { id } = req.params
    const key = Object.keys(req.body)
    const params = key.map((v, i) => {
        if (v && (key[i] === 'total_item')) {
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
        const iduser = req.auth.id
        const add = await user.value(id, iduser, params)
        if (add) {
            res.send({ success: true, msg: `total item successfully added` })
        } else {
            res.send({ success: false, msg: 'Failed to add' })
        }
    } catch (error) {
        res.send({ success: false, msg: error.message })
    }
}

const editItem = async(req, res) => {

    const { id } = req.params
    const key = Object.keys(req.body)
    const params = key.map((v, i) => {
        if (v && (key[i] === 'id_restaurant' || key[i] === 'category' || key[i] === 'name_item' || key[i] === 'price' || key[i] === 'description' || key[i] === 'images' || key[i] === 'total_item')) {
            console.log(req.body[key[i]])
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
        const iduser = req.auth.id
        await upload(req, res, 'images')
        console.log(req.file)
        req.body.images = '/uploads/' + req.file.filename
        const update = await user.update(id, iduser, params)
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
        if (v && (key[i] === 'id_restaurant')) {
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
        const iduser = req.auth.id
        const add = await user.delete(id, iduser, params)
        if (add) {
            res.send({ success: true, msg: `delete item success` })
        } else {
            res.send({ success: false, msg: 'Failed to delete item' })
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
        if (v && (key[i] === 'review' || key[i] === 'rating')) {
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
        const iduser = req.auth.id
        const del = await user.postReview(id, iduser, params)
        if (del) {
            res.send({ success: true, msg: `success to give review` })
        } else {
            res.send({ success: false, msg: 'Failed to give review' })
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
        if (v && (key[i] === 'review' || key[i] === 'rating')) {
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
        const iduser = req.auth.id
        const del = await user.patchReview(id, iduser, params)
        if (del) {
            res.send({ success: true, msg: `success to edit review` })
        } else {
            res.send({ success: false, msg: 'Failed to edit review' })
        }
    } catch (error) {
        res.send({ success: false, msg: error.message })
    }
}

//get list review
const listReview = async(req, res) => {
    const { id } = req.params
    const iduser = req.auth.id
    try {
        const detail = await user.getReview(id, iduser)
        if (detail) {
            res.send({
                success: true,
                name_item: detail[0].name_item,
                Review: detail.map(e => [`id_user: ${e.id_user}`, `Review: ${e.review}`, `Rating: ${e.rating}`, `date_created: ${e.date_created}`])
            })
        } else {
            res.send({
                success: false,
                msg: 'error'
            })
        }
    } catch (error) {
        res.send({
            success: false,
            msg: error.message
        })
    }
}

const deleteReview = async(req, res) => {
    const { id } = req.params
    const iduser = req.auth.id
    try {
        const add = await user.delReview(id, iduser)
        if (add) {
            res.send({ success: true, Message: 'delete review success' })
        } else {
            res.send({ success: false, Message: 'deletw review failed' })
        }
    } catch (error) {
        res.send({ success: false, Message: error.message })
    }
}

module.exports = { getItems, getListItems, addItem, editItem, deleteItem, addReview, editReview, listReview, deleteReview, addtotal }