const express = require('express');
const productController = require('../controllers/productController');
const checkId = require('../middlewares/checkId'); 
const validate = require('../middlewares/validatorMiddleware'); 
const { productSchema } = require('../validators/productValidator');

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/category/:category', productController.getProductsByCategory);
router.get('/:id', checkId, productController.getProduct);


router.post('/', validate(productSchema), productController.createProduct);

module.exports = router;