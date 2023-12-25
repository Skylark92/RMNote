import { FocusEvent, MouseEvent, useState } from "react";

export default function useToggle(initialState: boolean) {
  const [isOn, setIsOn] = useState(initialState);

  const toggle = (event?: MouseEvent | FocusEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setIsOn((prev) => !prev);
  };

  return { isOn, toggle };
}
