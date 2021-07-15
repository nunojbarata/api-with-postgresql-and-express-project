import { NewProduct } from "../../types/types";

export async function requestIsInvalid(values: NewProduct): Promise<boolean> {

  const { title, price, category } = values;

  if(!title || !price || isNaN(price) || !category){
    return true;
  } else {
    return false;
  }

}
