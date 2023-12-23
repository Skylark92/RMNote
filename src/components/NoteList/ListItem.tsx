import { appContext } from "context/appContext";
import { useContext, useState } from "react";

export default function ListItem({
  content,
  edittedAt,
  index,
}: { index: number } & Note) {
  const currentNote = useContext(appContext)?.currentNote;
  const [isPinned, setIsPinned] = useState(false);

  const isSelected = currentNote?.index === index;
  return (
    <li
      className={`p-6 w-full overflow-hidden cursor-pointer ${
        isSelected ? "bg-blue-100" : ""
      }`}
    >
      <h3 className="font-bold">
        {isPinned && (
          <span className="material-icons text-[14px]">push_pin</span>
        )}
        제목
      </h3>
      <p>{content}</p>
      <time className="text-xs text-gray-400">
        {edittedAt.toLocaleString()}
      </time>
    </li>
  );
}
