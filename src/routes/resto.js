//Import express
const user = require('express').Router
const { checktoken } = require('../middleware/authmiddleware')
const checkPermission = require('../middleware/authpermission')
const app = user()
const { getProfileResto, getListResto, addResto, editResto, deleteResto, addCategory, addCategoryid, checkCategory, getcategory, editCategory, delCategory } = require('../controllers/resto')

//
app.delete('/restaurant', checktoken, checkPermission.superadmin, deleteResto); //Superadmin : delete restaurant
app.post('/restaurant/:id', checktoken, addResto); //create restaurant : Admin
app.get('/restaurant/:id', checktoken, checkPermission.admin, getListResto); //Admin : Check list restaurant 
app.get('/restaurant/profile/:id', checktoken, checkPermission.admin, getProfileResto); //Admin : Check profile restaurant 
app.patch('/restaurant/:id', checktoken, checkPermission.admin, editResto); //Admin : Edit Resto
app.post('/categories/:id', checktoken, checkPermission.admin, addCategory, addCategoryid); //admin : add category item 
app.patch('/categories/:id', checktoken, checkPermission.admin, editCategory);
app.get('/categories/:id', checktoken, checkPermission.admin, getcategory); //search list order
app.delete('/categories/:id', checktoken, checkPermission.admin, delCategory); //Admin : Delete category

module.exports = { users: app }