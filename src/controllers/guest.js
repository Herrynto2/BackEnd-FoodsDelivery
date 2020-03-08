const user = require('../models/guest')
const { conn } = require('../config/db')
var bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10);
const qs = require('qs')


const searchItem = async(req, res) => {
    try {
        const { id } = req.params
        const detail = await user.getitems(id)
        if (detail) {
            res.send({
                success: true,
                data: detail
            })
        } else {
            res.send({
                success: false,
                message: detail
            })
        }
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}

const searchResto = async(req, res) => {
    try {
        const { id } = req.params
        const detail = await user.getresto(id)
        if (detail) {
            res.send({
                success: true,
                data: detail
            })
        } else {
            res.send({
                success: false,
                message: detail
            })
        }
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}

const searchCategory = async(req, res) => {
    try {
        const { id } = req.params
        const detail = await user.getcategory(id)
        if (detail) {
            res.send({
                success: true,
                data: detail
            })
        } else {
            res.send({
                success: false,
                message: detail
            })
        }
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}

const GetAllItem = async(req, res, next) => {
    try {
        const params = {
            currentPage: req.query.page || 1,
            perPage: req.query.limit || 5,
            search: req.query.search || '',
            sort: req.query.sort || [{ key: 'name', value: 0 }]
        }
        const column = ['_id', 'name', 'price', 'description']
        if (req.query.search) {
            params.search = Object.keys(params.search).map((v, i) => {
                if (column.includes(v)) {
                    return { key: v, value: req.query.search[v] }
                } else {
                    return ''
                }
            })
        }
        if (req.query.sort) {
            params.sort = Object.keys(params.sort).map((v, i) => {
                if (column.includes(v)) {
                    return { key: v, value: req.query.sort[v] }
                } else {
                    return { key: 'name', value: 0 }
                }
            })
        }
        if (req.query.search && req.query.search.category) {
            const idcategory = await GetIdCategory(req.query.search.category)
            params.id_category = idcategory || [0]
        }
        const dataItems = await GetItem(false, params)

        const totalPages = Math.ceil(dataItems.total / parseInt(params.perPage))
        const query = req.query
        query.page = parseInt(params.currentPage) + 1
        const nextPage = (parseInt(params.currentPage) < totalPages ? process.env.APP_URL.concat(`${req.baseUrl}?${qs.stringify(query)}`) : null)
        query.page = parseInt(params.currentPage) - 1
        const previousPage = (parseInt(params.currentPage) > 1 ? process.env.APP_URL.concat(`${req.baseUrl}${qs.stringify(query)}`) : null)

        const pagination = {
            currentPage: params.currentPage,
            nextPage,
            previousPage,
            totalPages,
            perPage: params.perPage,
            totalEntries: dataItems.total
        }
        if (dataItems.results.length > 0) {
            res.status(200).send({
                success: true,
                data: dataItems.results,
                pagination
            })
        } else {
            res.status(200).send({
                success: true,
                data: false,
                msg: 'Data is Empty'
            })
        }
    } catch (e) {
        console.log(e)
        res.status(202).send({
            success: false,
            msg: e.message
        })
    }
}

const GetDetailItem = async(req, res, next) => {
    try {
        const dataitem = await user.getItems(req.params.id)
        const relatedItem = await user.getItems(false, {
            id_category: [dataitem.id_category],
            search: '',
            currentPage: 1,
            perPage: 5,
            sort: [{ key: 'name', value: 0 }]
        })
        if (dataitem) {
            res.status(200).send({
                success: true,
                data: {
                    ...dataitem,
                    relatedItem: relatedItem.results.filter(v => v._id !== dataitem._id)
                }

            })
        } else {
            res.status(200).send({
                success: true,
                data: false,
                msg: `Item With id ${req.params.id} Not Exists`
            })
        }
    } catch (e) {
        console.log(e)
        res.status(202).send({
            success: false,
            msg: e.message
        })
    }
}


module.exports = { GetAllItem, GetDetailItem, searchItem, searchResto, searchCategory }