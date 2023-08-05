const express = require('express')

const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles} = require('../middleware/auth');


const router = express.Router();

router.route(("/products")).get(getAllProducts)
router.route(("/product/new")).post(isAuthenticatedUser, authorizeRoles("admin"),createProduct) //admin
router.route(("/product/:id")).put(isAuthenticatedUser, authorizeRoles("admin"),updateProduct)  //admin
router.route(("/product/:id")).delete(isAuthenticatedUser, authorizeRoles("admin"),deleteProduct) //admin
router.route(("/product/:id")).get(getProductDetails)



//either we could do like this also
// router.route(("/products/:id")).put(updateProduct).delete(deleteProduct)
//extra isAuthenticatedUser,authorizeRole("admin"),


module.exports = router;