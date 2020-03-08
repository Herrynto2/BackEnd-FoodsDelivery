const user = require('express').Router
const app = user()
const { GetAllItem, GetDetailItem, searchResto, searchCategory } = require('../controllers/guest')

app.get('/browse-items', GetAllItem); //Guest : check list item
app.get('/browse-items/:id', GetDetailItem); //Guest : check list item
app.get('/browse-restaurant', searchResto); //Guest : check list restaurant
app.get('/browse-restaurant/:id', searchResto); //Guest : check list restaurant
app.get('/browse-category', searchCategory); //Guest : check list restaurant
app.get('/browse-category/:id', searchCategory); //Guest : check list restaurant


module.exports = { guest: app }