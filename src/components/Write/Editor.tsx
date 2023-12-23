import editNote from "api/editNote";
import { appContext, dispatchContext } from "context/appContext";
import {
  ChangeEvent,
  FocusEvent,
  ForwardedRef,
  TextareaHTMLAttributes,
  forwardRef,
  useContext,
  useEffect,
  useRef,
} from "react";

const Editor = forwardRef(
  (
    { ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    const app = useContext(appContext);
    const currentNote = app?.currentNote;
    const currentNotebook = app?.currentNotebook;
    const update = useContext(dispatchContext);
    const timer = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
      if (timer.current) clearTimeout(timer.current);
    }, [currentNote]);

    const editCurrent = async (content: string) => {
      if (!(app && update)) return;
      if (!(currentNotebook && currentNote)) return;
      const res = await editNote(
        currentNotebook.name,
        currentNote.index,
        content
      );

      if (res.ok && res.payload) {
        const newList = [...currentNotebook.notebook];
        newList[res.payload.index] = res.payload.note;
        update({
          type: "CHANGE_NOTEBOOK",
          payload: { name: currentNotebook.name, notebook: newList },
        });
        update({
          type: "CHANGE_NOTE",
          payload: res.payload,
        });
      } else {
        alert("갱신된 정보를 수신하지 못했습니다. 새로고침 해주세요.");
      }
    };

    const onChangeHandler = async (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => editCurrent(event.target.value), 3000);
    };

    const onBlurHandler = async (event: FocusEvent<HTMLTextAreaElement>) => {
      if (timer.current) clearTimeout(timer.current);
      editCurrent(event.target.value);
    };

    return (
      <textarea
        className="focus:outline-none w-full h-main p-6 resize-none"
        placeholder="내용을 입력해주세요"
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        ref={ref}
        {...props}
      />
    );
  }
);

export default Editor;
