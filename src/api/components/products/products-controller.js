const productsService = require('./products-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getProducts(request, response, next) {
  const {
    page_number = 1,
    sort = 'email:asc',
    search = null,
    page_size = 10,
  } = request.query;
  const pageNumber = parseInt(page_number);
  const pageSize = parseInt(page_size);
  const [sortField, sortOrder] = sort.split(':');
  try {
    const products = await productsService.getProducts(
      pageNumber,
      pageSize,
      sortField,
      sortOrder,
      search
    );
    response.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

async function getProduct(request, response, next) {
  try {
    const product = await productsService.getProduct(request.params.id);

    if (!product) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown Product');
    }
    return response.status(200).json(product);
  } catch (error) {
    return next(error);
  }
}

async function createProduct(request, response, next) {
  const { product_name, product_price, product_description } = request.body;
  try {
    const createdProduct = await productsService.createProduct(
      product_name,
      product_price,
      product_description
    );
    return response.status(201).json(createdProduct);
  } catch (error) {
    return next(error);
  }
}

async function updateProduct(request, response, next) {
  const productId = request.params.id;
  const { product_name, product_price, product_description } = request.body;
  try {
    if (!product_name || !product_price || !product_description) {
      throw new Error('Please fill all fields');
    }
    const updatedProduct = await productsService.updateProduct(
      productId,
      product_name,
      product_price,
      product_description
    );
    if (!updatedProduct) {
      throw new Error('Product not found or could not be updated');
    }
    return response.status(200).json(updatedProduct);
  } catch (error) {
    return next(error);
  }
}

async function deleteProduct(request, response, next) {
  const productId = request.params.id;
  return productsService
    .deleteProduct(productId)
    .then(() => {
      return response.status(200).json({ message: 'Product has been deleted' });
    })
    .catch((error) => {
      return next(error);
    });
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
