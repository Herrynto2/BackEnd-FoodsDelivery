const migration = require('express').Router();
//import migration/user.js to create table
migration.get('/foodsdata', (req, res) => {
    require('../migration/user')
    res.send()
    console.log('create table success')
})
module.exports = { migration }