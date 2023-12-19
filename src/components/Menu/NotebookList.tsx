import { MouseEvent, useState } from "react";
import ButtonIcon from "components/ButtonIcon";

export default function NotebookList({
  children,
  ...props
}: {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  const [isMore, setIsMore] = useState(false);

  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    setIsMore((prev) => !prev);
  };

  return (
    <article {...props}>
      <h2 className="flex items-center p-1 pl-0 cursor-pointer">
        <ButtonIcon
          icon={isMore ? "expand_more" : "chevron_right"}
          onClick={clickHandler}
          className="text-gray-500 hover:text-gray-700"
        />
        <span className="font-bold text-blue-600 grow text-ellipsis overflow-hidden">
          NOTEBOOKS
        </span>
        <ButtonIcon icon="add" className="text-blue-600" />
      </h2>
      {isMore && <ul className="w-full transition">{children}</ul>}
    </article>
  );
}
