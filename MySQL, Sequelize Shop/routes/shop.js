const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productID', shopController.productDetails)

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.addCart);

router.post('/cart-delete-item', shopController.removeFromCart); 

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

router.post("/create-orders", shopController.postOrders); 

module.exports = router;
