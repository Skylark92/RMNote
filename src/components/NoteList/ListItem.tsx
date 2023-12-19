import { useState } from "react";

export default function ListItem() {
  const [isSelected, setIsSelected] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  return (
    <li
      className={`p-6 w-full overflow-hidden ${
        isSelected ? "bg-blue-100" : ""
      }`}
    >
      <h3 className="font-bold">
        {isPinned && (
          <span className="material-icons text-[14px]">push_pin</span>
        )}
        제목
      </h3>
      <p>내용</p>
      <time className="text-xs text-gray-400">시간</time>
    </li>
  );
}
