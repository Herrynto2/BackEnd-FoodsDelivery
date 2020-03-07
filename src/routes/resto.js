//Import express
const user = require('express').Router
const { checktoken } = require('../middleware/authmiddleware')
const checkPermission = require('../middleware/authpermission')
const app = user()
const { getProfileResto, getListResto, addResto, editResto, deleteResto, addCategory, getlistOrder, getcategory } = require('../controllers/resto')

app.get('/user/restaurant/order', getlistOrder); //search list order
app.get('/user/restaurant/order/:id', getlistOrder); //search list order
app.get('/user/restaurant/categories', getcategory); //search list order

//
app.delete('/restaurant', checktoken, checkPermission.superadmin, deleteResto); //Superadmin : delete restaurant
app.post('/restaurant/:id', checktoken, addResto); //create restaurant : Admin
app.get('/restaurant/:id', checktoken, getListResto); //Admin : Check list restaurant 
app.get('/restaurant/profile/:id', checktoken, getProfileResto); //Admin : Check profile restaurant 
app.patch('/restaurant/:id', checktoken, editResto); //Admin : Edit Resto
app.post('/categories/:id', checktoken, addCategory); //admin : add category item 
app.get('/categories', checktoken, getcategory);

module.exports = { users: app }