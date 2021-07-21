import client from "../database";

export async function getAllData<T>(sqlReq: string): Promise<T[]> {
  const conn = await client.connect();
  const res = await conn.query(sqlReq);
  conn.release();
  return res.rows;
}

export async function getDataBy<T>(sqlReq: string, searchterm: string | number): Promise<T | T[]> {
  const conn = await client.connect();
  const res = await conn.query(sqlReq, [searchterm]);
  conn.release();
  if(typeof searchterm === 'number') {
    return res.rows[0];
  } else {
    return res.rows;
  }
}

export async function createData<T>(sqlReq: string, newData: (string|number)[]): Promise<T> {
  console.log(newData);
  const conn = await client.connect();
  const res = await conn.query(sqlReq, newData);
  conn.release();

  return res.rows[0];
}

export async function updateData<T>(sqlReq: string, newData: (string|number)[]): Promise<T> {
  const conn = await client.connect();
  const res = await conn.query(sqlReq, newData);
  conn.release();

  return res.rows[0];
}

export async function deleteData<T>(sqlReq: string, id: number): Promise<T> {
  const conn = await client.connect();
  const res = await conn.query(sqlReq, [id]);
  conn.release();

  return res.rows[0];
}
