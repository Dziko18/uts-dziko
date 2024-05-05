const { Product } = require('../../../models');

async function getProducts() {
  return Product.find({});
}

async function getProduct(id) {
  return Product.findById(id);
}

async function createProduct(product_name, product_price, product_description) {
  try {
    const newProduct = await Product.create({
      product_name,
      product_price,
      product_description,
    });
    return newProduct;
  } catch (error) {
    throw new Error('Failed to create product');
  }
}

async function updateProduct(
  id,
  product_name,
  product_price,
  product_description
) {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      { product_name, product_price, product_description },
      { new: true }
    );
    return updatedProduct;
  } catch (error) {
    throw new Error('Failed to update product');
  }
}

async function deleteProduct(id) {
  return Product.deleteOne({ _id: id });
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
