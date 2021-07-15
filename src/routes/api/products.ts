import express, { Router, Request, Response } from "express";
import { ProductModel } from '../../models/productModel';
import { NewProduct, Product } from "../../types/types";
import { requestIsInvalid } from "../utils/utils";

// TODO - confirmar que os erros em todos os catch estao correctos

/*
ISTO DO FICHEIRO INDEX DE ROUTES:
routes.get('/deleteproduct', deleteProduct);

fazer para todos os metodos
*/

const productModel = new ProductModel();

export const productsList = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const listAllProducts: Product[] = await productModel.getAllProducts();
    if (listAllProducts.length > 0) {
      res.send(listAllProducts)
    } else {
      res.send('There are no available products on the db!')
    }
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

export const productById = async (req: express.Request, res: express.Response): Promise<void> => {

  const id = parseInt(req.params.id);
  try {
    const product: Product = await productModel.getProductById(id);
    if(typeof id !== 'number' || !product) {
      res.send('There is no product with the specified id!')
    } else {

      res.send(product)
    }
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}


export const productByCategory = async (req: express.Request, res: express.Response ): Promise<void> => {

  const category = req.params.category;
  try {
    const productsByCategory: Product[] = await productModel.getProductsByCategory(category);
    if(!category || !productsByCategory || productsByCategory.length === 0) {
      res.send('There are no products with the specified category!')
    } else {
      res.send(productsByCategory)
    }
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

export const createProduct = async (req: express.Request, res: express.Response): Promise<void> => {
  const query = req.query as unknown as NewProduct;

  try {
    if(await requestIsInvalid(query) == true) {
      res.send('Something went wrong. Try again!')
    } else {
      const newProduct = await productModel.createProduct(query);
      res.send(`<h3>Product successfully created.</h3>
      <p>ID: ${newProduct.id}</p>
      <p>TITLE: ${newProduct.title}</p>
      <p>PRICE: ${newProduct.price}</p>
      <p>CATEGORY: ${newProduct.category}</p>`)
    }
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

export const updateProduct = async (req: express.Request, res: express.Response): Promise<void> => {

  const id: number = req.query.id as unknown as number;
  const query: NewProduct =  {
    title:req.query.title as string,
    price:req.query.price as unknown as number,
    category:req.query.category as string
  };

  try {
    if(await requestIsInvalid(query) == true || !id) {
      res.send('Something went wrong. Try again!')
    } else {
      const productToUpdate = await productModel.getProductById(id);
      if(!productToUpdate) {
        res.send(`There is no product with the id ${id}`)
      } else {
        const updatedProduct: Product = await productModel.updateProduct(id, query);
        res.send(`<h3>Product successfully updated.</h3>
        <p>ID: ${updatedProduct.id}</p>
        <p>TITLE: ${updatedProduct.title}</p>
        <p>PRICE: ${updatedProduct.price}</p>
        <p>CATEGORY: ${updatedProduct.category}</p>`)
      }
    }
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}


export const deleteProduct = async (req: express.Request, res: express.Response): Promise<void> => {

  const id = parseInt(req.query.id as string);
  try {
    const productToDelete: Product = await productModel.getProductById(id);
    console.log(id);
    console.log(productToDelete);
    if(!productToDelete) {
      res.send('There is no product with the specified id!')
    } else {
      await productModel.deleteProduct(id)
      res.send(`Product with ${id} was deleted`)
    }
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

export const productsRoutes = (app: express.Application): void => {
  app.get('/api/products_list', productsList)
  app.get('/api/products/:id', productById)
  app.get('/api/products/:category', productByCategory)
  app.post('/api/products_create', createProduct)
  app.put('/api/products_update', updateProduct)
  app.delete('/api/products_create', deleteProduct)
}

