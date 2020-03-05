const user = require('../models/transaction')
var bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10);
const qs = require('qs')

const topUp = async(req, res) => {
    const { id } = req.params
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
        const update = await user.update(id, params)
        if (update) {
            res.send({ success: true, msg: `Top up with ${id} success` })
        } else {
            res.send({ success: false, msg: 'Failed to top up' })
        }
    } catch (error) {
        res.send({ success: false, msg: 'Error' })
    }
}

const delItem = async(req, res) => {
    const { id } = req.body
    console.log(id)
    try {
        const del = await user.delete(id)
        if (del) {
            res.send({ success: true, msg: `Item with id :${id} success to deleted` })
        } else {
            res.send({ success: false, msg: 'Failed to delete item' })
        }
    } catch (error) {
        res.send({ success: false, msg: error })
    }
}

const saveCart = async(req, res) => {
    const { id } = req.body
    try {
        const create = await user.create(id)
        if (create) {
            res.send({ success: true, Message: `Item with id : ${id} success to save in a cart` })
        } else {
            res.send({ success: false, Message: 'failed to save in a cart' })
        }
    } catch (error) {
        res.send({ success: false, msg: error })
    }
}

const checkItem = async(req, res) => {
    const { id } = req.params
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
            success: true,
            data: detail
        })
    }
}


const checkItems = async(req, res) => {
    const { id } = req.params
    const detail = await user.gets(id)
    if (detail.length > 1) {
        res.send({
            success: true,
            data: detail,
            total_Item: detail.length,
            checkout: detail.map(e => e.price).reduce((i, v) => i + v)
        })
    } else {
        res.send({
            success: true,
            data: detail
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

module.exports = { topUp, saveCart, delItem, checkItem, checkItems, checkOutItem }