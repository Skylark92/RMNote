import { appContext } from "context/appContext";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";

export default function Write() {
  const editor = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState("");
  const currentNote = useContext(appContext)?.currentNote;

  const inputHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  console.log(content);
  console.log(currentNote);
  useEffect(() => {
    if (editor.current) {
      if (currentNote) {
        editor.current.value = currentNote.note.content;
      }
    }
  }, [editor]);

  return (
    <section className="grow flex flex-col">
      {currentNote && (
        <>
          <header className="h-header bg-neutral-100 flex items-center py-2 px-4 border-gray-300 border-b shrink-0">
            <button>이 노트 삭제하기</button>
          </header>
          <textarea
            className="focus:outline-none w-full h-main p-6 resize-none"
            placeholder="내용을 입력해주세요"
            onChange={inputHandler}
            ref={editor}
          />
        </>
      )}
    </section>
  );
}
