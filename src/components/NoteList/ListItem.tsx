import ContextMenu from "components/ContextMenu";
import { appContext, dispatchContext } from "context/appContext";
import useToggle from "hooks/useToggle";
import { PointerEvent, useContext, useRef } from "react";

export default function ListItem({
  content,
  edittedAt,
  index,
}: { index: number } & Note) {
  const currentNote = useContext(appContext)?.currentNote;
  const update = useContext(dispatchContext);
  const { isOn, toggle } = useToggle(false);
  const pos = useRef({ x: 0, y: 0 });

  const selectThis = () => {
    if (!update) return;

    update({
      type: "CHANGE_NOTE",
      payload: {
        index: index,
        note: { content: content, edittedAt: edittedAt },
      },
    });
  };

  const contextHandler = (event: PointerEvent<HTMLLIElement>) => {
    event.preventDefault();
    pos.current.x = event.pageX;
    pos.current.y = event.pageY;
    selectThis();
    toggle();
  };

  const [title, body] = makeTitle(content);

  const isSelected = currentNote?.index === index;
  return (
    <>
      <li
        className={`p-6 w-full overflow-hidden cursor-pointer space-y-3 ${
          isSelected ? "bg-blue-100" : ""
        }`}
        onClick={selectThis}
        onContextMenu={contextHandler}
      >
        <h3 className="text-lg font-bold h-6">{title || "New Note"}</h3>
        <p className="h-6">{body || "No additional text"}</p>
        <time className="block text-xs text-gray-400">
          {timeFormat(edittedAt)}
        </time>
      </li>
      {isOn && (
        <ContextMenu
          x={pos.current.x}
          y={pos.current.y}
          index={index}
          toggler={toggle}
        />
      )}
    </>
  );
}

/* utils */
const makeTitle = (content: string) => {
  const splitted = content.split("\n");
  return [splitted.shift(), splitted.join("\n")];
};

const timeFormat = (time: string) => {
  const date = new Date(time);
  const now = new Date();
  const diff = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  ); // 초-분-시-일
  let day;
  if (diff > 0) day = `${diff}일 전`;
  else if (diff === 0) {
    if (now.getDay() === date.getDay()) day = "Today";
    else if (now.getDate() > date.getDay()) day = "1일 전";
  } else if (diff < 0) {
    day = `${Math.abs(diff)}일 후`;
  }
  return `${day}, ${date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};
