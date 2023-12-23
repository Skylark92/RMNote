import { getDB } from "api/db";
import { Dispatch, createContext, useEffect, useReducer } from "react";

const appContext = createContext<AppState | null>(null);
const dispatchContext = createContext<Dispatch<ReducerAction> | null>(null);

const init = {
  notebookList: {},
  currentNotebook: null,
  currentNote: null,
};

const reducer = (state: AppState, action: ReducerAction): AppState => {
  switch (action.type) {
    case "UPDATE_LIST":
      return { ...state, notebookList: { ...action.payload } };
    case "CHANGE_NOTEBOOK":
      return {
        ...state,
        notebookList: getDB(),
        currentNotebook: action.payload,
      };
    case "CHANGE_NOTE":
      return { ...state, notebookList: getDB(), currentNote: action.payload };
    default:
      return { ...state };
  }
};

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, init);

  useEffect(() => {
    try {
      const db = getDB();
      dispatch({ type: "UPDATE_LIST", payload: db });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        alert(`초기 정보를 불러오는 데 실패했습니다.\n${error.message}`);
      }
    }
  }, []);

  return (
    <appContext.Provider value={{ ...state }}>
      <dispatchContext.Provider value={dispatch}>
        {children}
      </dispatchContext.Provider>
    </appContext.Provider>
  );
};

export { appContext, dispatchContext, AppContextProvider };
