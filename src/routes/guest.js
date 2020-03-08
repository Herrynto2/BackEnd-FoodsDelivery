const user = require('express').Router
const app = user()
const { searchItem, searchResto } = require('../controllers/guest')

app.get('/browse-items', searchItem); //Guest : check list item
app.get('/browse-items/:id', searchItem); //Guest : check list item
app.get('/browse-restaurant', searchResto); //Guest : check list restaurant
app.get('/browse-restaurant/:id', searchResto); //Guest : check list restaurant

module.exports = { guest: app }