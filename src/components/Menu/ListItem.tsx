import ButtonIcon from "components/ButtonIcon";
import useApi from "hooks/useApi";
import deleteNotebook from "api/deleteNotebook";
import { MouseEvent, useContext } from "react";
import { appContext, dispatchContext } from "context/appContext";

export default function ListItem({
  name,
  notebook,
}: {
  name: keyof NoteDB;
  notebook: Notebook;
}) {
  const { isPending, run } = useApi(deleteNotebook);
  const notebookList = useContext(appContext)?.notebookList;
  const currentNotebook = useContext(appContext)?.currentNotebook;
  const update = useContext(dispatchContext);

  if (!name) return null;

  const isSelected = currentNotebook?.name === name;

  const selectThis = async () => {
    if (!(update && notebookList)) return;
    update({
      type: "CHANGE_NOTEBOOK",
      payload: {
        name: name,
        notebook: notebookList[name],
      },
    });
    update({
      type: "CHANGE_NOTE",
      payload: null,
    });
  };

  const deleteThis = async (event: MouseEvent) => {
    event.stopPropagation();
    if (!(update && currentNotebook)) return;

    const isAllowed = window.confirm("정말로 삭제하시겠습니까?");

    if (isAllowed) {
      const res = await run(name);

      if (res.ok && res.payload) {
        if (currentNotebook.name === name) {
          update({ type: "CHANGE_NOTEBOOK", payload: null });
        }
        update({ type: "UPDATE_LIST", payload: res.payload });
      } else {
        if (res.error) {
          alert(res.error.message || "NOTEBOOK을 삭제하지 못했습니다.");
        }
      }
    } else return;
  };

  return (
    <li
      className={
        "group w-full py-2 px-6 flex items-center gap-2 hover:bg-zinc-100 cursor-pointer h-12" +
        (isSelected ? " bg-zinc-100" : "")
      }
      onClick={selectThis}
    >
      <div className="inline-block w-6 h-8 bg-red-300 min-w-[1.5rem] rounded"></div>
      <h3 className="shrink whitespace-nowrap">{name}</h3>
      <small className="text-xs text-gray-400">{notebook.length}</small>
      <ButtonIcon
        disabled={isPending}
        icon="delete"
        className="ml-auto invisible text-gray-400 group-hover:visible hover:text-black"
        onClick={deleteThis}
      />
    </li>
  );
}
