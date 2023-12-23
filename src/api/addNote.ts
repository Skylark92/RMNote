import Res from "./Res";
import { getDB, setDB } from "./db";

export default async function addNote(notebook: keyof NoteDB) {
  const response = new Res<Note>();

  try {
    const db = getDB();
    const newWrite = {
      content: "Test",
      edittedAt: new Date().toLocaleString(),
    };
    const target = db[notebook];
    target.unshift(newWrite);
    setDB(db);
    response.setData(newWrite);
    response.setOk();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      response.setError(error);
    }
  } finally {
    return response;
  }
}
