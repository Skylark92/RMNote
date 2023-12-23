import { useContext } from "react";
import { appContext, dispatchContext } from "context/appContext";
import useApi from "hooks/useApi";
import addNote from "api/addNote";

export default function NewNote() {
  const app = useContext(appContext);
  const update = useContext(dispatchContext);
  const { isPending, run } = useApi(addNote);

  const writeNew = async () => {
    if (!app) {
      alert("앱이 준비 되지 않았습니다.");
      return;
    }

    if (!app.currentNotebook) {
      alert("먼저 메모를 저장할 Notebook을 선택해주세요.");
      return;
    } else {
      const name = app.currentNotebook.name;
      const notes = app.currentNotebook.notebook;

      const res = await run(name);
      if (res.ok) {
        if (res.payload) {
          notes.unshift(res.payload);
          if (update) {
            update({
              type: "CHANGE_NOTEBOOK",
              payload: { name: name, notebook: [...notes] },
            });
            update({
              type: "CHANGE_NOTE",
              payload: { index: 0, note: res.payload },
            });
          }
        }
      } else {
        alert("새로운 Note를 생성하지 못했습니다. 다시 시도해주세요.");
      }
    }
  };
  return (
    <button
      disabled={isPending}
      className="text-sm bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-3 rounded disabled:bg-gray-200"
      onClick={writeNew}
    >
      New Note
    </button>
  );
}