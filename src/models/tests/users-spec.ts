import { UserModel } from "../user_model";
import bcrypt from 'bcrypt';
import { User } from "../../types/types";

const store = new UserModel();
const pepper: string = process.env.BCRYPT_PASSWORD as unknown as string;
const saltRounds: number = parseInt(process.env.SALT_ROUNDS as unknown as string)

describe("products Model", () => {
  it('should have a getAllUsers method', () => {
    expect(store.getAllUsers).toBeDefined();
  });

  it('should have a getUserById method', () => {
    expect(store.getUserById).toBeDefined();
  });

  it('should have a show by createUser method', () => {
    expect(store.createUser).toBeDefined();
  });

  it('should have a updateUser method', () => {
    expect(store.updateUser).toBeDefined();
  });

  it('should have a deleteUser method', () => {
    expect(store.deleteUser).toBeDefined();
  });

  it('should have a authenticate method', () => {
    expect(store.authenticate).toBeDefined();
  });

  it('createUser method should add an user', async () => {
    const result = await store.createUser({
      firstName: 'John',
      lastName: 'Doe',
      username: 'john_doe',
      password: 'password123',
    });
    expect(result[0].id).toEqual(1);
    expect(result[0].firstName).toEqual('John');
    expect(result[0].lastName).toEqual('Doe');
    expect(result[0].username).toEqual('john_doe');
    expect(result[0].password).toBeDefined();
  });

  it('getUserById method should return the user with the id specified', async () => {
    const result = await store.getUserById(1);
    expect(result[0].id).toEqual(1);
    expect(result[0].firstName).toEqual('John');
    expect(result[0].lastName).toEqual('Doe');
    expect(result[0].username).toEqual('john_doe');
    expect(result[0].password).toBeDefined();
  });

  it('getAllUsers method should return all users', async () => {
    const result = await store.getAllUsers();
    expect(result[0].id).toEqual(1);
    expect(result[0].firstName).toEqual('John');
    expect(result[0].lastName).toEqual('Doe');
    expect(result[0].username).toEqual('john_doe');
    expect(result[0].password).toBeDefined();
  });

  it('update method should update a certain user', async () => {
    const result = await store.updateUser(1, {
      firstName: 'Jane',
      lastName: 'Doe',
      username: 'jane_doe',
      password: bcrypt.hashSync('password321' + pepper, saltRounds),
    });
    expect(result[0].id).toEqual(1);
    expect(result[0].firstName).toEqual('Jane');
    expect(result[0].lastName).toEqual('Doe');
    expect(result[0].username).toEqual('jane_doe');
    expect(result[0].password).toBeDefined();
  });

    it('authenticate method should authenticate a certain user', async () => {
    const result = await store.authenticate('jane_doe', 'password123');
    if(result) {
      expect(result[0].id).toEqual(1);
      expect(result[0].firstName).toEqual('Jane');
      expect(result[0].lastName).toEqual('Doe');
      expect(result[0].username).toEqual('jane_doe');
      expect(result[0].password).toBeDefined();
    }
  });

  it('delete method should delete the product with the id specified', async () => {
    await store.deleteUser(1);
    expect((await store.getAllUsers()).length).toEqual(0);
  });
})
