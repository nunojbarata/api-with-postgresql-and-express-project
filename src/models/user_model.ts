import { NewUser, User } from "../types/types";
import { createData, deleteData, getAllData, getDataBy, updateData } from "./shared";
import bcrypt from 'bcrypt';
import client from "../database";

const pepper: string = process.env.BCRYPT_PASSWORD as unknown as string;
const saltRounds: number = parseInt(process.env.SALT_ROUNDS as unknown as string)

export class UserModel {

  async getAllUsers(): Promise<User[]> {
    try {
      const sqlReq = 'SELECT * FROM users';
      return await getAllData(sqlReq) as User[];
    } catch(err) {
      throw new Error(`Cannot get users. ${err}`);
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const sqlReq = `SELECT * FROM users WHERE id=($1)`;
      return await getDataBy(sqlReq, id) as User;
    } catch(err) {
      throw new Error(`Cannot find User with the ${id}. ${err}`);
    }
  }

  async createUser(newUserData: NewUser): Promise<User> {
    const { firstName, lastName, username, password } = newUserData;
    try {
      const sqlReq = 'INSERT INTO users (firstName, lastName, username, password) VALUES($1, $2, $3, $4) RETURNING *';
      const hash = bcrypt.hashSync(password + pepper, saltRounds)
      return await createData(sqlReq, [firstName, lastName, username, hash]) as User;
    } catch (err) {
      throw new Error(`Could not add new User ${username}. ${err}`)
    }
  }

  async updateUser(id: number, newUserData: NewUser): Promise<User> {
    const { firstName, lastName, username, password } = newUserData;
    try {
      const sqlReq = `UPDATE users SET firstName=$1, lastName=$2, username=$3, password=$4 WHERE id=$5 RETURNING *`;
      const hash = bcrypt.hashSync(password + pepper, saltRounds)
      return await updateData(sqlReq, [firstName, lastName, username, hash, id]) as User;
    } catch (err) {
      throw new Error(`Could not update User ${username}. ${err}`)
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      const sqlReq = 'DELETE FROM users WHERE id=$1';
      return await deleteData(sqlReq, id);
    } catch (err) {
      throw new Error(`Could not delete User ${id}. Error: ${err}`)
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await client.connect();
    const sqlReq = 'SELECT password FROM users WHERE username=$1';
    const res = await conn.query(sqlReq, [username]);

    if(res.rows.length) {

      const user = res.rows[0];

      if(bcrypt.compareSync(password + pepper, user.password)) {
        conn.release();
        return user
      }
    }
    conn.release();
    return null;
  }

}
