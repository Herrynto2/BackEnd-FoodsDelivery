const user = require('express').Router
const app = user()
const { checktoken } = require('../middleware/authmiddleware')
const checkPermission = require('../middleware/authpermission')
const { pagination, getItems, addItem, editItem, deleteItem, addReview, editReview, listReview, deleteReview, addtotal } = require('../controllers/items')

app.get('/', pagination);
app.get('/:id', getItems);
app.get('/', getItems);

app.get('/items/:id', checktoken, checkPermission.admin, getItems); //Admin : check list item
app.patch('/items/total/:id', checktoken, checkPermission.admin, addtotal); //Admin : check list item
app.post("/items/:id", checktoken, checkPermission.admin, addItem); //Admin : add new items
app.delete("/items/:id", checktoken, checkPermission.admin, deleteItem); //Admin : delete item
app.patch("/items/:id", checktoken, checkPermission.admin, editItem); //Admin : Edit item
app.post("/review/:id", checktoken, addReview); //User General : Give Review item
app.patch("/review/:id", checktoken, editReview); //User General : Give Review item
app.get("/review/:id", checktoken, listReview); //User General : list Review item
app.delete("/review/:id", checktoken, deleteReview); //User General : Delete Review item

module.exports = { user: app }