declare interface Note {
  content: string;
  edittedAt: string;
}

declare type Notebook = Note[];

declare interface NoteDB {
  [key: string]: Note[];
}

declare type NotebookList = [keyof NoteDB, Notebook][];

declare type CurrentNotebook =
  | { name: keyof NoteDB; notebook: Notebook }
  | null
  | undefined;

declare type CurrentNote = { index: number; note: Note } | null | undefined;

declare interface AppState {
  notebookList: NoteDB;
  currentNotebook: CurrentNotebook;
  currentNote: CurrentNote;
}

declare type ReducerAction =
  | { type: "UPDATE_LIST"; payload: NoteDB }
  | { type: "CHANGE_NOTEBOOK"; payload: CurrentNotebook }
  | { type: "CHANGE_NOTE"; payload: CurrentNote };
