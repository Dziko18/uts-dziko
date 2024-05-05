const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const productsControllers = require('./products-controller');
const productsValidator = require('./products-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/products', route);

  route.get('/', authenticationMiddleware, productsControllers.getProducts);

  route.post(
    '/',
    authenticationMiddleware,
    celebrate(productsValidator.createProduct),
    productsControllers.createProduct
  );

  route.get('/:id', authenticationMiddleware, productsControllers.getProduct);

  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(productsValidator.updateProduct),
    productsControllers.updateProduct
  );

  route.delete(
    '/:id',
    authenticationMiddleware,
    productsControllers.deleteProduct
  );
};
