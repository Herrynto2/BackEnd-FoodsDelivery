const migration = require('express').Router();
//send table foodsdata
migration.get('/foodsdata', (req, res) => {
    require('../migration/foods')
    res.send()
    console.log('create table success')
})

// //send table users
migration.get('/foodrating', (req, res) => {
    require('../migration/foodrating')
    res.send()
    console.log('create table success')
})

// //send table users
migration.get('/foodreview', (req, res) => {
    require('../migration/foodreview')
    res.send()
    console.log('create table success')
})

//send table restodata 
migration.get('/restodata', (req, res) => {
    require('../migration/restaurants')
    res.send()
    console.log('create table success')
})

//send table users
migration.get('/users', (req, res) => {
    require('../migration/users')
    res.send()
    console.log('create table success')
})

// //send table users
migration.get('/userdetail', (req, res) => {
    require('../migration/userdetail')
    res.send()
    console.log('create table success')
})

module.exports = { migration }