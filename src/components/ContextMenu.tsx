import deleteNote from "api/deleteNote";
import { appContext, dispatchContext } from "context/appContext";
import useApi from "hooks/useApi";
import { FocusEvent, useContext, useEffect, useRef } from "react";

export default function ContextMenu({
  x,
  y,
  index,
  toggler,
}: {
  x: number;
  y: number;
  index: keyof Notebook;
  toggler: (event?: FocusEvent) => void;
}) {
  const app = useContext(appContext);
  const currentNotebook = app?.currentNotebook;
  const update = useContext(dispatchContext);
  const { run } = useApi(deleteNote);
  const inputRef = useRef<HTMLInputElement>(null);
  const isClick = useRef(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const deleteCurrent = async () => {
    if (inputRef.current) {
      inputRef.current.value = "run";
    }
    if (!(update && app && currentNotebook)) return;
    const name = currentNotebook.name;

    const isAllowed = window.confirm("정말로 삭제하시겠습니까?");

    if (isAllowed) {
      const res = await run(currentNotebook.name, index);

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

  const blurHandler = () => {
    if (isClick.current) {
      if (inputRef.current) inputRef.current.focus();
    } else {
      toggler();
    }
  };

  const mDownHanler = () => {
    isClick.current = true;
  };

  const mUpHandler = () => {
    isClick.current = false;
  };

  return (
    <ul
      style={{ top: y + 10, left: x + 10 }}
      className={`absolute drop-shadow-2xl bg-white border rounded py-4 m-0`}
      onMouseDown={mDownHanler}
      onMouseUp={mUpHandler}
      onMouseOut={mUpHandler}
    >
      <input
        type="button"
        ref={inputRef}
        className="sr-only"
        onBlur={blurHandler}
      />
      <li
        className="hover:bg-gray-200 py-1 px-6 cursor-pointer"
        onClick={deleteCurrent}
      >
        이 노트 삭제하기
      </li>
    </ul>
  );
}
