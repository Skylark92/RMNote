import { getDB, storage } from "./db";

export default async function deleteNotebook(name: string) {
  try {
    const db = getDB();
    if (!Object.keys(db).includes(name)) {
      throw new Error(`존재하지 않는 Notebook입니다.`);
    } else {
      console.log("????");
      delete db[name];
      localStorage.setItem(storage, JSON.stringify(db));
      return db;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return error;
    }
  }
}
