import client from "../database";
import { NewProduct, Product } from "../types/types";

export class ProductModel {

  async getAllProducts(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sqlReq = 'SELECT * FROM products';
      const res = await conn.query(sqlReq);
      conn.release();

      return res.rows;
    } catch(err) {
      throw new Error(`Cannot get products. ${err}`);
    }
  }

  async getProductById(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sqlReq = `SELECT * FROM products WHERE id=($1)`;
      const res = await conn.query(sqlReq, [id]);
      conn.release();

      return res.rows[0];
    } catch(err) {
      throw new Error(`Cannot find product with the ${id}. ${err}`);
    }
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sqlReq = `SELECT * FROM products WHERE category=($1)`;
      const res = await conn.query(sqlReq, [category]);
      conn.release();

      return res.rows;
    } catch(err) {
      throw new Error(`Cannot find products with the category ${category}. ${err}`);
    }
  }


  async createProduct(product: NewProduct): Promise<Product> {
    const { title, price, category } = product;
    try {
      const conn = await client.connect();
      const sqlReq = 'INSERT INTO products (title, price, category) VALUES($1, $2, $3) RETURNING *';
      const res = await conn.query(sqlReq, [title, price, category]);
      conn.release();

      return res.rows[0];
    } catch (err) {
      throw new Error(`Could not add new product ${title}. ${err}`)
    }
  }

  async updateProduct(id: number, newProductData: NewProduct): Promise<Product> {
    const { title, price, category } = newProductData;
    try {
      const conn = await client.connect();
      const sqlReq = `UPDATE products SET title=$1, price=$2, category=$3 WHERE id=$4 RETURNING *`;
      const res = await conn.query(sqlReq, [title, price, category, id]);
      conn.release();

      return res.rows[0];
    } catch (err) {
      throw new Error(`Could not update product ${title}. ${err}`)
    }
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      const conn = await client.connect();
      const sqlReq = 'DELETE FROM products WHERE id=$1';
      await conn.query(sqlReq, [id]);
      conn.release();

    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`)
    }
  }

}
