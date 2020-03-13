const user = require('express').Router
const app = user()
const { searchItem, searchAllItem, searchResto, searchAllResto, searchCategory, searchAllCategory } = require('../controllers/guest')

app.get('/browse-category', searchAllCategory); //Guest : check list restaurant
app.get('/browse-category/:id', searchCategory); //Guest : check list restaurant
app.get('/browse-items', searchAllItem); //Guest : check list item
app.get('/browse-items/:id', searchItem); //Guest : check list item
app.get('/browse-restaurant', searchAllResto); //Guest : check list restaurant
app.get('/browse-restaurant/:id', searchResto); //Guest : check list restaurant



module.exports = { guest: app }