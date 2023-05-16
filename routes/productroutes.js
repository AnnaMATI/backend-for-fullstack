const express = require('express');
const router = express.Router();
const productController = require('../controlers/product_controler');
const jwt_authenticate = require ("../jwt/autenticate")


 // Get all products
router.get('/', productController.getAllProducts);

// Get a single product by ID
router.get('/:id', productController.getProductById);

// Create a new product
router.post('/createProduct',jwt_authenticate.authenticateAdminToken,productController.createProduct);

// Update an existing product by ID
router.put('/update',jwt_authenticate.authenticateAdminToken, productController.updateProduct);

// Delete an existing product by ID
router.delete('/delete',jwt_authenticate.authenticateAdminToken,productController.deleteProduct);

module.exports = router;