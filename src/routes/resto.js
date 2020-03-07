//Import express
const user = require('express').Router
const { checktoken } = require('../middleware/authmiddleware')
const app = user()
const { pagination, getResto, addCategory, getlistOrder, getcategory, addResto, editResto, deleteResto } = require('../controllers/resto')

app.get('/', getResto);
app.get('/:id', getResto);
app.get('/user/restaurant/order', getlistOrder); //search list order
app.get('/user/restaurant/order/:id', getlistOrder); //search list order
app.get('/user/restaurant/categories', getcategory); //search list order
app.post('/admin/categories', checktoken, addCategory); //add category item : Superadmin
app.get('/user/restaurant/categories/:id', getcategory); //search list order
app.post('/user/restaurant', addResto); //create restaurant : Admin
app.patch('/user/restaurant/:id', checktoken, editResto); //Edit restaurant : Admin
app.delete("/admin/deleterestaurant", deleteResto); //delete restaurant : Superadmin



module.exports = { users: app }