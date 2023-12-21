import { getDB, storage } from "./db";

export default async function addNotebook(name: string) {
  try {
    const db = getDB();
    if (name === "") {
      throw new Error("한 글자 이상 입력해야 합니다.");
    }
    if (Object.keys(db).includes(name)) {
      throw new Error(`The name "${name}" is already taken.`);
    } else {
      const newData = {
        ...db,
        [name]: [],
      };
      localStorage.setItem(storage, JSON.stringify(newData));
      return newData;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return error;
    }
  }
}
