import { getDB, storage } from "./db";

export default async function editNote({
  notebook,
  index,
  note,
}: {
  notebook: keyof NoteDB;
  index: number;
  note: Note;
}) {
  try {
    const db = getDB();
    const write = { ...note };
    const target = db[notebook];
    target[index] = write;
    localStorage.setItem(storage, JSON.stringify(db));

    return {
      index: index,
      note: note,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return error;
    }
  }
}
