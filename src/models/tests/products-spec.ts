import { ProductModel } from "../product_model"

const productModel = new ProductModel();

describe("products Model", () => {
  it('should have a getAllProducts method', () => {
    expect(productModel.getAllProducts).toBeDefined();
  });

  it('should have a getProductById method', () => {
    expect(productModel.getProductById).toBeDefined();
  });

  it('should have a show by getProductsByCategory method', () => {
    expect(productModel.getProductsByCategory).toBeDefined();
  });

  it('should have a createProduct method', () => {
    expect(productModel.createProduct).toBeDefined();
  });

  it('should have a updateProduct method', () => {
    expect(productModel.updateProduct).toBeDefined();
  });

  it('should have a deleteProduct method', () => {
    expect(productModel.deleteProduct).toBeDefined();
  });

  it('createProduct method should add a product', async () => {
    const result = await productModel.createProduct({
      title: 'Blue T-Shirt',
      price: 25,
      category: 'Apparel',
    });
    expect(result).toEqual({
      id: 1,
      title: 'Blue T-Shirt',
      price: 25,
      category: 'Apparel',
    });
  });

  it('getProductById method should return the product with the id specified', async () => {
    const result = await productModel.getProductById(1);
    expect(result).toEqual({
      id: 1,
      title: 'Blue T-Shirt',
      price: 25,
      category: 'Apparel',
    });
  });

  it('getByCategory method should return the products with the category specified', async () => {
    const result = await productModel.getProductsByCategory('Apparel');
    expect(result).toEqual([{
      id: 1,
      title: 'Blue T-Shirt',
      price: 25,
      category: 'Apparel',
    }]);
  });

  it('getAllProducts method should return all product', async () => {
    const result = await productModel.getAllProducts();
    expect(result).toEqual([{
      id: 1,
      title: 'Blue T-Shirt',
      price: 25,
      category: 'Apparel',
    }]);
  });

  it('update method should update a certain product', async () => {
    const result = await productModel.updateProduct(1, {
      title: 'Red T-Shirt',
      price: 20,
      category: 'Apparel',
    });
    expect(result).toEqual({
      id: 1,
      title: 'Red T-Shirt',
      price: 20,
      category: 'Apparel',
    });
  });

  it('delete method should delete the product with the id specified', async () => {
    await productModel.deleteProduct(1);
    expect((await productModel.getAllProducts()).length).toEqual(0);
  });
})
