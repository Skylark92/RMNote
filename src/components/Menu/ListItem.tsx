import ButtonIcon from "components/ButtonIcon";
import useApi from "hooks/useApi";
import deleteNotebook from "api/deleteNotebook";
import { useContext } from "react";
import { dispatchContext } from "context/appContext";

export default function ListItem({
  name,
  count,
}: {
  name: keyof NoteDB;
  count: number;
}) {
  const { isPending, run } = useApi(deleteNotebook);
  const update = useContext(dispatchContext);

  if (!name) return null;

  const deleteThis = async () => {
    const res = await run(name);

    if (res instanceof Error) {
      alert(res.message);
    } else {
      if (update) {
        update({ type: "UPDATE_LIST", payload: res });
      } else {
        alert("NOTEBOOK 정보를 업데이트 하지 못했습니다.");
      }
    }
  };

  return (
    <li className="group w-full py-2 px-6 flex items-center gap-2 hover:bg-zinc-100 cursor-pointer h-12">
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
