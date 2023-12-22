import { useContext, useEffect, useState } from "react";
import ButtonIcon from "components/ButtonIcon";
import useToggle from "hooks/useToggle";
import AddNotebook from "./NotebookList/AddNotebook";
import ListItem from "./ListItem";
import { appContext } from "context/appContext";

export default function NotebookList() {
  const [list, setList] = useState<[keyof NoteDB, Note[]][]>([]);
  const notebookList = useContext(appContext)?.notebookList;
  const [isMore, setIsMore] = useState(false);
  const { isOn, toggle } = useToggle(false);
  const clickHandler = () => {
    setIsMore((prev) => !prev);
  };

  useEffect(() => {
    if (notebookList) {
      const l = Object.entries(notebookList);
      setList(l);
    }
  }, [notebookList]);

  return (
    <article>
      <h2 className="flex items-center p-1 pl-0 cursor-pointer">
        <ButtonIcon
          icon={isMore ? "expand_more" : "chevron_right"}
          onClick={clickHandler}
          className="text-gray-500 hover:text-gray-700"
        />
        <span className="font-bold text-blue-600 grow text-ellipsis overflow-hidden">
          NOTEBOOKS
        </span>
        <ButtonIcon icon="add" className="text-blue-600" onClick={toggle} />
      </h2>
      {isMore && (
        <ul className="w-full transition">
          {list.map((notebook, i) => {
            return (
              <ListItem
                name={notebook[0]}
                count={notebook[1].length}
                key={i + "_" + notebook}
              />
            );
          })}
        </ul>
      )}
      {isOn && <AddNotebook toggler={toggle} />}
    </article>
  );
}
