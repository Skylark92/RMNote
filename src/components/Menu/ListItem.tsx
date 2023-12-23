import ButtonIcon from "components/ButtonIcon";
import useApi from "hooks/useApi";
import deleteNotebook from "api/deleteNotebook";
import { MouseEvent, useContext } from "react";
import { appContext, dispatchContext } from "context/appContext";

export default function ListItem({
  name,
  count,
}: {
  name: keyof NoteDB;
  count: number;
}) {
  const { isPending, run } = useApi(deleteNotebook);
  const app = useContext(appContext);
  const update = useContext(dispatchContext);

  if (!name) return null;

  const selectThis = async () => {
    if (update) {
      update({
        type: "CHANGE_NOTEBOOK",
        payload: {
          name: name,
          notebook: app?.notebookList ? app.notebookList[name] : [],
        },
      });
    } else {
      alert(
        "문제가 생겨서 해당 노트북을 확인할 수 없습니다. 다시 시도해주세요."
      );
    }
  };

  const deleteThis = async (event: MouseEvent) => {
    event.stopPropagation();

    const isAllowed = window.confirm("정말로 삭제하시겠습니까?");

    if (isAllowed) {
      const res = await run(name);

      if (res instanceof Error) {
        alert(res.message);
      } else {
        if (update) {
          if (app?.currentNotebook?.name === name) {
            update({ type: "CHANGE_NOTEBOOK", payload: null });
          }
          if (res.payload) {
            update({ type: "UPDATE_LIST", payload: res.payload });
          }
        } else {
          alert("NOTEBOOK 정보를 업데이트 하지 못했습니다.");
        }
      }
    } else return;
  };

  return (
    <li
      className={
        "group w-full py-2 px-6 flex items-center gap-2 hover:bg-zinc-100 cursor-pointer h-12" +
        (app?.currentNotebook?.name === name ? " bg-zinc-100" : "")
      }
      onClick={selectThis}
    >
      <div className="inline-block w-6 h-8 bg-red-300 min-w-[1.5rem] rounded"></div>
      <h3 className="shrink whitespace-nowrap">{name}</h3>
      <small className="text-xs text-gray-400">{count}</small>
      <ButtonIcon
        disabled={isPending}
        icon="delete"
        className="ml-auto invisible text-gray-400 group-hover:visible hover:text-black"
        onClick={deleteThis}
      />
    </li>
  );
}
