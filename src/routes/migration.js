const migration = require('express').Router();
//send table foodsdata
migration.get('/foodsdata', (req, res) => {
    require('../migration/fooddata')
    res.send()
    console.log('create table success')
})

//send table restodata 
migration.get('/restodata', (req, res) => {
    require('../migration/restodata')
    res.send()
    console.log('create table success')
})

migration.get('/users', (req, res) => {
    require('../migration/users')
    res.send()
    console.log('create table success')
})
module.exports = { migration }