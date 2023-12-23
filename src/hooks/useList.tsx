import { appContext } from "context/appContext";
import { useContext } from "react";

export default function useList() {
  const notebookList = useContext(appContext)?.notebookList;

  if (notebookList) {
    return Object.entries(notebookList);
  } else return [];
}
