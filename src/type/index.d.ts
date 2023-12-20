declare interface Note {
  content: string;
  edittedAt: Date;
}

declare interface Notebook {
  [key: string]: Note[];
}
