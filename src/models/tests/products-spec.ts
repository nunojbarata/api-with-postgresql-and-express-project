import { ProductModel } from "../productModel"

const store = new ProductModel();

describe("products Model", () => {
  it('should have a getAllProducts method', () => {
    expect(store.getAllProducts).toBeDefined();
  });

  it('should have a getProductById method', () => {
    expect(store.getProductById).toBeDefined();
  });

  it('should have a show by getProductsByCategory method', () => {
    expect(store.getProductsByCategory).toBeDefined();
  });

  it('should have a createProduct method', () => {
    expect(store.createProduct).toBeDefined();
  });

  it('should have a updateProduct method', () => {
    expect(store.updateProduct).toBeDefined();
  });

  it('should have a deleteProduct method', () => {
    expect(store.deleteProduct).toBeDefined();
  });

  it('createProduct method should add a product', async () => {
    const result = await store.createProduct({
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
    const result = await store.getProductById(1);
    expect(result).toEqual({
      id: 1,
      title: 'Blue T-Shirt',
      price: 25,
      category: 'Apparel',
    });
  });

  it('getByCategory method should return the products with the category specified', async () => {
    const result = await store.getProductsByCategory('Apparel');
    expect(result).toEqual([{
      id: 1,
      title: 'Blue T-Shirt',
      price: 25,
      category: 'Apparel',
    }]);
  });

  it('index method should return all product', async () => {
    const result = await store.getAllProducts();
    expect(result).toEqual([{
      id: 1,
      title: 'Blue T-Shirt',
      price: 25,
      category: 'Apparel',
    }]);
  });

  it('update method should update a certain product', async () => {
    const result = await store.updateProduct(1, {
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
    await store.deleteProduct(1);
    expect((await store.getAllProducts()).length).toEqual(0);
  });
})
