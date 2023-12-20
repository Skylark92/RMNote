import { MouseEventHandler, useState } from "react";

export default function useToggle(initialState: boolean) {
  const [isOn, setIsOn] = useState(initialState);

  const toggle: MouseEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOn((prev) => !prev);
  };

  return { isOn, toggle };
}
