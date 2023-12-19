import React, { MouseEvent, useState } from "react";
import ButtonIcon from "components/ButtonIcon";

export default function MenuItem({
  name,
  children,
  ...props
}: {
  name: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  const [isMore, setIsMore] = useState(false);
  const isList = React.Children.toArray(children).length > 0;

  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    setIsMore((prev) => !prev);
  };

  return (
    <article
      className={
        "flex items-center py-2 px-1 cursor-pointer flex-nowrap whitespace-nowrap" +
        (isList ? " pl-0" : " pl-8")
      }
      {...props}
    >
      {isList && (
        <ButtonIcon
          icon={isMore ? "expand_more" : "chevron_right"}
          onClick={clickHandler}
        />
      )}
      <h2 className="font-bold text-blue-600 grow">{name}</h2>
    </article>
  );
}
