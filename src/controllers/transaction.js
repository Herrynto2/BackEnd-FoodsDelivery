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

// const saveCart = async(req, res) => {
//     const { id } = req.body
//     console.log(id)
//     try {
//         const create = await user.create(id)
//         console.log(create)
//         if (create) {
//             res.send({ success: true, msg: 'User has been created' })
//         } else {

//             res.send({ success: false, msg: 'Failed to create user' })
//         }
//     } catch (error) {
//         res.send({ success: false, msg: error })
//     }
// }

const saveCart = async(req, res) => {
    const { id } = req.body
    const del = await user.create(id)
    if (del) {
        res.send({ success: true, Message: `Item with id :${id} success to save in a cart` })
    } else {
        res.send({ success: false, Message: 'failed to save in a cart' })
    }
}

module.exports = { topUp, saveCart }