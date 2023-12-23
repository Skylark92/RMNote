import { useContext, useEffect, useRef } from "react";
import { appContext, dispatchContext } from "context/appContext";
import Editor from "./Write/Editor";
import useApi from "hooks/useApi";
import deleteNote from "api/deleteNote";

export default function Write() {
  const editor = useRef<HTMLTextAreaElement>(null);
  const { isPending, run } = useApi(deleteNote);
  const app = useContext(appContext);
  const currentNote = app?.currentNote;
  const currentNotebook = app?.currentNotebook;
  const update = useContext(dispatchContext);

  const deleteCurrent = async () => {
    if (!(update && app && currentNote && currentNotebook)) return;
    const name = currentNotebook.name;

    const isAllowed = window.confirm("정말로 삭제하시겠습니까?");

    if (isAllowed) {
      const res = await run(currentNotebook.name, currentNote.index);

      if (res.ok && res.payload) {
        update({
          type: "UPDATE_LIST",
          payload: res.payload,
        });
        update({
          type: "CHANGE_NOTEBOOK",
          payload: { name: name, notebook: res.payload[name] },
        });
        update({
          type: "CHANGE_NOTE",
          payload: null,
        });
      }
    } else return;
  };

  useEffect(() => {
    if (editor.current) {
      if (currentNote) {
        editor.current.value = currentNote.note.content;
      }
    }
  }, [editor, currentNote]);

  return (
    <section className="grow flex flex-col">
      {currentNote && (
        <>
          <header className="h-header bg-neutral-100 flex items-center py-2 px-4 border-gray-300 border-b shrink-0">
            <button
              className="bg-stone-50 text-red-500 font-bold border px-3 py-1 rounded shadow-inner disabled:bg-gray-200 hover:shadow-none hover:bg-red-500 hover:text-white transition"
              disabled={isPending}
              onClick={deleteCurrent}
            >
              이 노트 삭제하기
            </button>
          </header>
          <Editor ref={editor} />
        </>
      )}
    </section>
  );
}
