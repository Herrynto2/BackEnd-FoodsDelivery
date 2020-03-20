const user = require('express').Router
const app = user()
const { checktoken } = require('../middleware/authmiddleware')
const checkPermission = require('../middleware/authpermission')
const { getItems, getListItems, addItem, editItem, deleteItem, addReview, editReview, listReview, deleteReview, deleteReviewAdmin, addtotal } = require('../controllers/items')

//already
app.post("/items", checktoken, checkPermission.admin, addItem); //Admin : add new items
app.delete("/items/:id", checktoken, checkPermission.admin, deleteItem); //Admin : delete item
app.patch("/items/:id", checktoken, checkPermission.admin, editItem); //Admin : Edit item
app.get('/items', checktoken, checkPermission.admin, getListItems); //Admin : check list item
app.get('/restaurant-items/:id', checktoken, checkPermission.admin, getItems); //Admin : check list item
app.patch('/items/total/:id', checktoken, addtotal); //Admin : check list item
app.post("/review/:id", checktoken, addReview); //User General : Give Review item
app.get("/review/:id", checktoken, listReview); //User General : list Review item
app.patch("/review/:id", checktoken, editReview); //User General : Edit Review item
app.delete("/review/:id", checktoken, deleteReview); //User General : Delete Review item    
app.delete("/items-review/:id", checktoken, checkPermission.admin, deleteReviewAdmin); //User General : Delete Review item    

module.exports = { user: app }