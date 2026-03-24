const productService = require('../services/productService');
const asyncHandler = require('../middlewares/asyncHandler');

exports.getAllProducts = asyncHandler(async (req, res) => {
  const products = await productService.getAllProducts();
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: { products }
  });
});

exports.getProduct = asyncHandler(async (req, res) => {
  const product = await productService.getProduct(req.params.id);
  res.status(200).json({
    status: 'success',
    data: { product }
  });
});

exports.getProductsByCategory = asyncHandler(async (req, res) => {
  const products = await productService.getProductsByCategory(req.params.category);
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: { products }
  });
});

exports.createProduct = asyncHandler(async (req, res) => {
  const newProduct = await productService.addProduct(req.body);
  res.status(201).json({
    status: 'success',
    data: { product: newProduct }
  });
});