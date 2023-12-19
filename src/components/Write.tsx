import { ChangeEvent, useRef, useState } from "react";

export default function Write() {
  const editor = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState("");

  const onInput = (event: ChangeEvent<HTMLDivElement>) => {
    setContent(event.target.innerText);
  };

  console.log(content);

  return (
    <section className="grow">
      <header className="h-header bg-neutral-100 flex items-center justify-between py-2 px-4 border-gray-300 border-b">
        WYSIWYG
      </header>
      <div
        className="focus:outline-none w-full h-main p-6 empty:before:content-['내용을_입력해주세요'] before:text-gray-400"
        contentEditable="true"
        onInput={onInput}
        ref={editor}
      ></div>
    </section>
  );
}
