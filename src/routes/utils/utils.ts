import { NewProduct, NewUser } from "../../types/types";

export async function requestIsInvalid(values: NewProduct): Promise<boolean> {

  const { title, price, category } = values;

  if(!title || !price || isNaN(price) || !category){
    return true;
  } else {
    return false;
  }

}


export async function userRequestIsInvalid(values: NewUser): Promise<boolean> {

  const { firstName, lastName, username, password } = values;

  if(!firstName || !lastName || !username || !password){
    return true;
  } else {
    return false;
  }

}
