const user = require('../models/resto')
var bcrypt = require('bcryptjs')
const { authmiddleware } = require('../middleware/authmiddleware')
var salt = bcrypt.genSaltSync(10);
const qs = require('qs')
const upload = require('../middleware/upload')


//Profile Restaurant
const getProfileResto = async(req, res) => {
    const iduser = req.auth.id
    try {
        const data = await user.getResto(iduser)
        if (data.length === 1) {
            res.send({
                success: true,
                data
            })
        } else {
            res.send({
                success: false,
                msg: 'You havent restaurants'
            })
        }
    } catch (error) {
        res.send({
            success: false,
            msg: error.message
        })
    }
}

const addResto = async(req, res) => {
    await upload(req, res, 'logo')
    req.body.logo = '/uploads/' + req.file.filename
    const iduser = req.auth.id
    const { name_restaurant, logo, location, description, created_by } = req.body
    try {
        const add = await user.create(name_restaurant, logo, location, description, created_by, iduser)
        if (add) {
            res.send({ success: true, Message: 'add resto success' })
        } else {
            res.send({ success: false, Message: 'add resto failed' })
        }
    } catch (error) {
        res.send({ success: false, Message: error.message })
    }
}

//edit restaurant
const editResto = async(req, res) => {
    try {
        await upload(req, res, 'logo')
        req.body.logo = '/uploads/' + req.file.filename
        const { id } = req.params
        const key = Object.keys(req.body)
        const params = key.map((v, i) => {
            if (v && (key[i] === 'name_restaurant' || key[i] === 'logo' || key[i] === 'location' || key[i] === 'description' || key[i] === 'created_by')) {
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
        const update = await user.update(id, iduser, params, req.body.logo)
        if (update) {
            res.send({ success: true, msg: `restaurant successfully updated` })
        } else {
            res.send({ success: false, msg: 'Failed to update Restaurant' })
        }
    } catch (error) {
        res.send({ success: false, msg: error.message })
    }
}

//Delete Restaurant
const deleteResto = async(req, res) => {
    const iduser = req.auth.id
    const { id } = req.params
    const del = await user.delete(id, iduser)
    if (del) {
        res.send({ success: true, Message: `delete ID :${id} success` })
    } else {
        res.send({ success: false, Message: 'delete failed' })
    }
}


//Add Category
const addCategory = async(req, res) => {
    const iduser = req.auth.id
    const { category } = req.body
    try {
        const add = await user.addcategor(category, iduser)
        if (add) {
            res.send({ success: true, Message: 'add category success' })
        } else {
            res.send({ success: false, Message: 'add category failed' })
        }
    } catch (error) {
        res.send({ success: false, Message: error.message })
    }
}

//Add Categoryid
const addCategoryid = async(req, res) => {
    const { id } = req.params
    const key = Object.keys(req.body)
    const params = key.map((v, i) => {
        if (v && (key[i] === 'category')) {
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
            const update = await user.addcategorid(id, params)
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


const editCategory = async(req, res) => {
    const iduser = req.auth.id
    const { id } = req.params
    const key = Object.keys(req.body)
    const params = key.map((v, i) => {
        if (v && (key[i] === 'category')) {
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
        const update = await user.editcategor(id, iduser, params)
        if (update) {
            res.send({ success: true, msg: `Category successfully edit` })
        } else {
            res.send({ success: false, msg: 'Category id not found' })
        }

    } catch (error) {
        res.send({ success: false, msg: error.message })
    }
}

//Search list category item
const getcategory = async(req, res) => {
    const iduser = req.auth.id
    const { id } = req.params
    const detail = await user.category(id, iduser)
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

const delCategory = async(req, res) => {
    const iduser = req.auth.id
    const { id } = req.params
    const detail = await user.deletecategor(id, iduser)
    if (detail) {
        res.send({
            success: true,
            message: 'delete success',
            data: detail,
            total: detail.length
        })
    } else {
        res.send({
            success: false,
            message: 'delete failed',
            data: detail
        })
    }
}

module.exports = { getProfileResto, addResto, editResto, deleteResto, addCategory, addCategoryid, getcategory, editCategory, delCategory }