declare interface Note {
  content: string;
  edittedAt: string;
}

declare type Notebook = Note[];

declare interface NoteDB {
  [key: string]: Note[];
}

declare interface AppState {
  notebookList: NoteDB;
  currentNotebook:
    | { name: keyof NoteDB; notebook: Notebook }
    | null
    | undefined;
  currentNote: { index: number; note: Note } | null | undefined;
}

declare type ReducerAction =
  | { type: "UPDATE_LIST"; payload: NoteDB }
  | {
      type: "CHANGE_NOTEBOOK";
      payload: { name: keyof NoteDB; notebook: Notebook } | null | undefined;
    }
  | {
      type: "CHANGE_NOTE";
      payload: { index: number; note: Note } | null | undefined;
    };
