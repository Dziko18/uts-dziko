const productsRepository = require('./products-repository');

async function getProducts(
  pageNumber = 1,
  pageSize = 10,
  sortBy = 'product_name',
  sortOrder = 'asc',
  searchParameter = null
) {
  let Product = await productsRepository.getProducts();
  if (searchParameter) {
    const [searchField, searchTerm] = searchParameter.split(':');
    const searchRegex = new RegExp(searchTerm, 'i');
    Product = Product.filter((Product) =>
      Product[searchField].match(searchRegex)
    );
  }
  Product.sort((a, b) => {
    const fieldA = a[sortBy];
    const fieldB = b[sortBy];
    if (typeof fieldA === 'string' && typeof fieldB === 'string') {
      return sortOrder === 'asc'
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    }
    return 0;
  });

  const totalProducts = Product.length;
  const totalPages = Math.ceil(totalProducts / pageSize);
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = Math.min(pageNumber * pageSize, totalProducts);
  const productsPerPage = Product.slice(startIndex, endIndex);
  const formattedProducts = productsPerPage.map((product) => ({
    id: product.id,
    product_name: product.product_name,
    oroduct_price: product.product_price,
    product_description: product.product_description,
  }));

  const pagination = {
    page_number: pageNumber,
    page_size: pageSize,
    count: formattedProducts.length,
    total_pages: totalPages,
    has_previous_page: pageNumber > 1,
    has_next_page: pageNumber < totalPages,
    data: formattedProducts,
  };

  return pagination;
}

async function getProduct(id) {
  const product = await productsRepository.getProduct(id);
  if (!product) {
    return null;
  }
  return {
    id: product.id,
    product_name: product.product_name,
    oroduct_price: product.product_price,
    product_description: product.product_description,
  };
}

async function createProduct(product_name, product_price, product_description) {
  try {
    const newProduct = await productsRepository.createProduct(
      product_name,
      product_price,
      product_description
    );
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
    const existingProduct = await productsRepository.getProduct(id);
    if (!existingProduct) {
      return null;
    }
    const updatedProduct = await productsRepository.updateProduct(
      id,
      product_name,
      product_price,
      product_description
    );
    if (!updatedProduct) {
      return null;
    }
    return updatedProduct;
  } catch (error) {
    throw new Error('Failed to update product');
  }
}

async function deleteProduct(id) {
  const product = await productsRepository.getProduct(id);
  if (!product) {
    return null;
  }
  try {
    await productsRepository.deleteProduct(id);
  } catch (err) {
    return null;
  }
  return true;
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
