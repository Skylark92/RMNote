import { useContext, useState } from "react";
import { appContext } from "context/appContext";
import ButtonIcon from "components/ButtonIcon";
import useToggle from "hooks/useToggle";
import AddNotebook from "./NotebookList/AddNotebook";
import ListItem from "./ListItem";

export default function NotebookList() {
  const db = useContext(appContext)?.notebookList || {};
  const [isMore, setIsMore] = useState(false);
  const { isOn, toggle } = useToggle(false);

  const list = Object.entries(db);

  const clickHandler = () => {
    setIsMore((prev) => !prev);
  };

  return (
    <article>
      <h2
        className="flex items-center p-1 pl-0 cursor-pointer"
        onClick={clickHandler}
      >
        <ButtonIcon
          icon={isMore ? "expand_more" : "chevron_right"}
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
                notebook={notebook[1]}
                key={i + "_" + notebook[0]}
              />
            );
          })}
        </ul>
      )}
      {isOn && <AddNotebook toggler={toggle} />}
    </article>
  );
}
