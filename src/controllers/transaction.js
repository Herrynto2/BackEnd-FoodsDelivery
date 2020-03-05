const user = require('../models/transaction')
var bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10);
const qs = require('qs')

const topup = async(req, res) => {
    const { id } = req.params
    const key = Object.keys(req.body)
    const params = key.map((v, i) => {
        if (v && (key[i] === 'saldo')) {

            if (req.body[key[i]]) {
                // console.log(req.body[key[i]])
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
            res.send({ success: true, msg: `restaurant id ${id} has been updated` })
        } else {
            res.send({ success: false, msg: 'Failed to update Restaurant' })
        }
    } catch (error) {
        res.send({ success: false, msg: 'Error' })
    }
}

module.exports = { topup }