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
                res.send({ success: true, msg: `Delete item success` })
            } else {
                res.send({ success: false, msg: 'Failed delete item' })
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
            const save = await user.create(id, params)
            if (save) {
                res.send({ success: true, msg: `Save item success` })
            } else {
                res.send({ success: false, msg: 'Failed to save item' })
            }
        } else {
            res.send({ success: false, msg: 'Invalid user id' })
        }
    } catch (error) {
        res.send({ success: false, msg: error.message })
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
    const { id } = req.params
    const key = Object.keys(req.body)
    const params = key.map((v, i) => {
        if (v && (key[i] === 'id_item' || key[i] === 'total')) {
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
            const check = await user.checkout(id, params)
            if (check) {
                res.send({ success: true, msg: `checkout success` })
            } else {
                res.send({ success: false, msg: 'Failed to checkout' })
            }
        } else {
            res.send({ success: false, msg: 'Invalid user id' })
        }
    } catch (error) {
        res.send({ success: false, msg: error.message })
    }
}



module.exports = { topUp, saveCart, delItem, checkItem, checkOutItem }