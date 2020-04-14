const user = require('../models/transaction')
var bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10);
const qs = require('qs')

//Top up 
const topUp = async(req, res) => {
    try {
        const { id } = req.params
        console.log('req', req.body)
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
        console.log(req.body.saldo)
        const iduser = req.auth.id
        if (req.body.saldo >= 0) {
            const update = await user.update(id, iduser, params)
            if (update) {
                res.send({ success: true, msg: `Topup success` })
            } else {
                res.send({ success: false, msg: 'Failed to top up' })
            }
        } else {
            res.send({ success: false, msg: 'value cannot minus' })
        }
    } catch (error) {
        res.send({ success: false, msg: error.message })
    }
}

//Delete items
const delItem = async(req, res) => {
    const { id } = req.params
    const iduser = req.auth.id
    try {
        const data = await user.delete(id, iduser)
        if (data) {
            res.send({
                success: true,
                message: 'delete items success'
            })
        } else {
            res.send({
                success: false,
                msg: 'failed to delete item'
            })
        }
    } catch (error) {
        res.send({
            success: false,
            msg: error.message
        })
    }
}

//Save items 
const saveCart = async(req, res) => {
        try {
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
            const iduser = req.auth.id
            const data = await user.create(id, iduser, params)
            if (data) {
                res.send({ success: true, msg: `Save items success` })
            } else {
                res.send({ success: false, msg: 'Failed to save item' })
            }
        } catch (error) {
            res.send({ success: false, msg: error.message })
        }
    }
    //     const { id } = req.params
    //     const iduser = req.auth.id
    //     try {
    //         const data = await user.create(id, iduser)
    //         if (data) {
    //             res.send({
    //                 success: true,
    //                 message: 'Save items success'
    //             })
    //         } else {
    //             res.send({
    //                 success: false,
    //                 msg: 'failed to save item'
    //             })
    //         }
    //     } catch (error) {
    //         res.send({
    //             success: false,
    //             msg: error.message
    //         })
    //     }
    // }


//Check items
const checkItem = async(req, res) => {
    const iduser = req.auth.id
    const { id } = req.params
    try {
        const detail = await user.get(id, iduser)
        console.log(detail)
        if (detail.length >= 1) {
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
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}

const checkItemID = async(req, res) => {
    const iduser = req.auth.id
    const { id } = req.params
    try {
        const detail = await user.getid(id, iduser)
        if (detail) {
            res.send({
                success: true,
                data: detail,
                total_Item: detail[0].total_item,
                checkout: detail[0].total_item * detail[0].price
                    //detail.map(e => e.price).reduce((i, v) => i + v)
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

//Checkout
const checkOutItem = async(req, res) => {
    console.log(req.body)
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
        const check = await user.checkout(id, iduser, params)
        if (check) {
            res.send({ success: true, msg: `checkout success` })
        } else {
            res.send({ success: false, msg: 'failed to checkout' })
        }

    } catch (error) {
        res.send({ success: false, msg: error.message })
    }
}




module.exports = { topUp, saveCart, delItem, checkItem, checkItemID, checkOutItem }