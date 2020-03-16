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
            console.log(detail[1])
            res.send({
                success: true,
                data: {
                    name_restaurant: detail[0][0].name_item,
                    location: detail[0][0].location,
                    id_item: detail[0][0].id_item,
                    name_item: detail[0][0].name_restaurant,
                    images: detail[0][0].images,
                    price: detail[0][0].price,
                    category: detail[0][0].category,
                    desciption: detail[0][0].description,
                    total_items: detail[0][0].total_items
                },
                review: detail[1].map(e => ({
                    name_user: `${e.name_user}`,
                    review: `${e.review}`,
                    date_created: `${e.date_created}`
                }))
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

const searchAllItem = async(req, res) => {
    //Default Condition
    const params = {
        currentPage: req.query.page || 1,
        perPage: req.query.limit || 8,
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
        params.sort = keysort.map((v, i) => ({ keys: keysort[i], value: req.query.sort[keysort[i]] }))
    }
    console.log(params.sort)

    //Get data from user module
    const data = await user.getitems('', params);

    //Generatting Pagination
    const { query } = req
    if (!query.page) {
        query.page = 1
    }
    console.log(query)


    const totalPages = Math.ceil(data.total / parseInt(params.perPage))
    query.page = parseInt(query.page) + 1
    console.log('cek')
    console.log(query.page)
    const nextPage = (parseInt(params.currentPage) < totalPages ? process.env.APP_URL.concat('browse-items?').concat(qs.stringify(query)) : null)
    console.log(nextPage)
    query.page = parseInt(query.page) - 2
    console.log(query.page)
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


const searchResto = async(req, res) => {
    const { id } = req.params
    try {
        const detail = await user.getresto(id)
        if (detail) {
            res.send({
                success: true,
                detail: {
                    id_restaurant: detail[0][0].id_restaurant,
                    id_user: detail[0][0].id_user,
                    name_restaurant: detail[0][0].name_restaurant,
                    logo: detail[0][0].logo,
                    location: detail[0][0].location,
                    description: detail[0][0].description,
                    created_by: detail[0][0].created_by,
                    date_: detail[0][0].date_created,
                    date_updated: detail[0][0].date_updated
                },
                items: detail[1].map(e => ({
                    id_item: `${e.id_item}`,
                    name_item: `${e.name_item}`,
                    category: `${e.category}`,
                    price: `${e.price}`,
                    images: `${e.images}`,
                    description: `${e.description}`,
                    total_item: `${e.total_item}`,
                    date_created: `${e.date_created}`
                }))
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

const searchAllResto = async(req, res) => {
    //Default Condition
    const params = {
        currentPage: req.query.page || 1,
        perPage: req.query.limit || 8,
        search: req.query.search || '',
        sort: req.query.sort || { keys: 'name_restaurant', value: 0 }
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
    console.log(params.sort)

    //Get data from user module
    const data = await user.getresto('', params);

    //Generatting Pagination
    const { query } = req
    if (!query.page) {
        query.page = 1
    }
    console.log(query)


    const totalPages = Math.ceil(data.total / parseInt(params.perPage))
    query.page = parseInt(query.page) + 1
    console.log('cek')
    console.log(query.page)
    const nextPage = (parseInt(params.currentPage) < totalPages ? process.env.APP_URL.concat('browse-restaurant?').concat(qs.stringify(query)) : null)
    console.log(nextPage)
    query.page = parseInt(query.page) - 2
    console.log(query.page)
    const previousPage = (parseInt(params.currentPage) > 1 ? process.env.APP_URL.concat('browse-restaurant?').concat(qs.stringify(query)) : null)

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


const searchCategory = async(req, res) => {
    const { id } = req.params
    try {
        const data = await user.getcategories(id)
        if (data) {
            res.send({
                success: true,
                data
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

const searchAllCategory = async(req, res) => {
    //Default Condition
    const params = {
        currentPage: req.query.page || 1,
        perPage: req.query.limit || 8,
        search: req.query.search || '',
        sort: req.query.sort || { keys: 'category', value: 0 }
    };
    //Reformatting Search
    const key = Object.keys(params.search)
    if (req.query.search) {
        params.search = key.map((v, i) => ({ keys: key[i], value: req.query.search[key[i]] }))
    }
    //Reformatting Sort
    const keysort = Object.keys(params.sort)
    if (req.query.sort) {
        params.sort = keysort.map((v, i) => ({ keys: keysort[i], value: req.query.sort[keysort[i]] }))
    }
    console.log(params.sort)

    //Get data from user module
    const data = await user.getcategories('', params);

    //Generatting Pagination
    const { query } = req
    if (!query.page) {
        query.page = 1
    }
    console.log(query)


    const totalPages = Math.ceil(data.total / parseInt(params.perPage))
    query.page = parseInt(query.page) + 1
    console.log('cek')
    console.log(query.page)
    const nextPage = (parseInt(params.currentPage) < totalPages ? process.env.APP_URL.concat('browse-category?').concat(qs.stringify(query)) : null)
    console.log(nextPage)
    query.page = parseInt(query.page) - 2
    console.log(query.page)
    const previousPage = (parseInt(params.currentPage) > 1 ? process.env.APP_URL.concat('browse-category?').concat(qs.stringify(query)) : null)

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


module.exports = { searchItem, searchAllItem, searchResto, searchAllResto, searchCategory, searchAllCategory }