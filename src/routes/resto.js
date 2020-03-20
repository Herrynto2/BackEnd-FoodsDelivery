//Import express
const user = require('express').Router
const { checktoken } = require('../middleware/authmiddleware')
const checkPermission = require('../middleware/authpermission')
const app = user()
const { getProfileResto, addResto, editResto, deleteResto, addCategory, addCategoryid, getcategory, editCategory, delCategory } = require('../controllers/resto')


app.post('/restaurant', checktoken, addResto); //create restaurant : Admin
app.get('/restaurant', checktoken, checkPermission.admin, getProfileResto); //Admin : Check profile restaurant 
app.patch('/restaurant', checktoken, checkPermission.admin, editResto); //Admin : Edit Resto
app.delete('/restaurant/:id', checktoken, checkPermission.superadmin, deleteResto); //Superadmin : delete restaurant
app.post('/categories', checktoken, checkPermission.admin, addCategory)
app.get('/categories', checktoken, checkPermission.admin, getcategory); //search list order
app.patch('/categories/:id', checktoken, checkPermission.admin, editCategory);
app.delete('/categories/:id', checktoken, checkPermission.admin, delCategory); //Admin : Delete category

module.exports = { users: app }