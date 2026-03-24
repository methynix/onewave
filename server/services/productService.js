const productRepository = require('../repositories/productRepository');
const AppError = require('../utils/appError');

const productService = {
  getAllProducts: async (query) => {
    // Logic for filtering by category or price can go here
    return await productRepository.findAll(query);
  },

  getProduct: async (id) => {
    const product = await productRepository.findById(id);
    if (!product) throw new AppError('Product not found', 404);
    return product;
  },

  createProduct: async (body) => {
    // Business logic: e.g., only admins can do this (checked in controller/middleware)
    return await productRepository.create(body);
  }
};

module.exports = productService;