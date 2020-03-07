const user = require('../models/transaction')
var bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10);
const qs = require('qs')

//Top up 
const topUp = async(req, res) => {
    const { id } = req.params
    console.log(req.auth.id)
    const key = Object.keys(req.body)
    const params = key.map((v, i) => {
        if (v && (key[i] === 'saldo')) {
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
                res.send({ success: true, msg: `Topup success` })
            } else {
                res.send({ success: false, msg: 'Failed to top up' })
            }
        } else {
            res.send({ success: false, msg: 'Invalid user id' })
        }
    } catch (error) {
        res.send({ success: false, msg: 'Error' })
    }
}

//Delete items
const delItem = async(req, res) => {
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
            const del = await user.delete(id, params)
            if (del) {
                res.send({ success: true, msg: `Delete success` })
            } else {
                res.send({ success: false, msg: 'Failed to top up' })
            }
        } else {
            res.send({ success: false, msg: 'Invalid user id' })
        }
    } catch (error) {
        res.send({ success: false, msg: 'Error' })
    }
}

//Save items 
const saveCart = async(req, res) => {
    const { id } = req.body
    try {
        // if (parseInt(id) === parseInt(req.auth.id)) {
        const create = await user.create(id)
        if (create) {
            res.send({ success: true, Message: `Item with id : ${id} success to save in a cart` })
        } else {
            res.send({ success: false, Message: 'failed to save in a cart' })
        }
        // } else {
        //     res.send({
        //         success: false,
        //         message: 'Invalid user'
        //     })
        // }
    } catch (error) {
        res.send({ success: false, msg: error })
    }
}

//Check items
const checkItem = async(req, res) => {
    const { id } = req.params
    if (parseInt(id) === parseInt(req.auth.id)) {
        const detail = await user.get(id)
        if (detail.length > 1) {
            res.send({
                success: true,
                data: detail,
                total_Item: detail.length,
                checkout: detail.map(e => e.price).reduce((i, v) => i + v)
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
            message: 'Invalid user'
        })
    }
}

//Checkout
const checkOutItem = async(req, res) => {
    const { id } = req.body
    console.log(id)
    try {
        const check = await user.checkout(id)
        if (check) {
            res.send({ success: check, msg: `success` })
        } else {
            res.send({ success: false, msg: 'Failed' })
        }
    } catch (error) {
        res.send({ success: false, msg: error })
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
        res.send({ success: false, msg: 'Error' })
    }
}

//Edit Review Items
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
        res.send({ success: false, msg: 'Error' })
    }
}

module.exports = { topUp, saveCart, delItem, checkItem, checkOutItem, addReview }