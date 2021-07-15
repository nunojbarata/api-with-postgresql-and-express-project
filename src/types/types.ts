export interface NewProduct {
  title: string,
  price: number,
  category: string
}

export interface Product extends NewProduct {
  id: number,
}

export interface User {
  id?: number,
  firstName: string,
  lastName: string,
  password: string
}

export interface Order {
  id?: number,
  products: OrderItems[],
  user_id: number,
  status: string
}

export interface OrderItems {
  id?: number,
  quantity: number,
  name: string,
}
