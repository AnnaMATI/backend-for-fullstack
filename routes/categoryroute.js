const express = require('express');
const router = express.Router();
const category_controller = require('../controlers/category_controller')
const jwt_authenticate = require ("../jwt/autenticate")


    router.get('/allproducts',category_controller.getCategory)
    router.get('/category/:id',category_controller.getCategoryById)
    router.post('/createcategory',jwt_authenticate.authenticateAdminToken,category_controller.createCategory )
    router.delete('/deletecategory/:id', jwt_authenticate.authenticateAdminToken,category_controller.deleteCategory)
    router.put('/updatecategory/:id',jwt_authenticate.authenticateAdminToken,category_controller.updateCategory)


    module.exports = router;