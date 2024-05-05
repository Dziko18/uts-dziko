const joi = require('joi');

module.exports = {
  createProduct: {
    body: {
      product_name: joi.string().required().label('Product Name'),
      product_price: joi.number().min(0).required().label('Product Price'),
      product_description: joi.string().required().label('Product Description'),
    },
  },

  updateProduct: {
    body: {
      product_name: joi.string().required().label('Product Name'),
      product_price: joi.number().min(0).required().label('Product Price'),
      product_description: joi.string().required().label('Product Description'),
    },
  },
};
