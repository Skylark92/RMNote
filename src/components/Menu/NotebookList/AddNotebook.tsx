import Modal from "components/Modal";
import useApi from "hooks/useApi";
import addNotebook from "api/addNotebook";
import { dispatchContext } from "context/appContext";
import { MouseEvent, useContext, useRef } from "react";

export default function AddNotebook({
  toggler,
}: {
  toggler: (event?: MouseEvent) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isPending, error, run } = useApi(addNotebook);
  const update = useContext(dispatchContext);

  const add = async () => {
    if (inputRef.current) {
      const res = await run(inputRef.current.value);

      if (res instanceof Error) {
        alert(res.message);
      } else {
        if (update) {
          update({ type: "UPDATE_LIST", payload: res });
        } else {
          alert("NOTEBOOK 정보를 업데이트 하지 못했습니다.");
        }
        toggler();
      }
    }
  };

  return (
    <Modal toggler={toggler}>
      <form>
        <h2 className="font-bold text-lg text-center mb-2 mx-auto">
          Create New Notebook
        </h2>
        <div className="border-b py-4">
          <label
            className="text-gray-400 font-bold mr-8"
            htmlFor="add_notebook_name"
          >
            Name
          </label>
          <input
            className="rounded bg-gray-200 px-4 py-2"
            id="add_notebook_name"
            type="text"
            placeholder="Enter notebook name"
            ref={inputRef}
          />
        </div>
        <p className="w-full min-h-[20px] text-right my-2 text-sm">{error}</p>
        <button
          disabled={isPending}
          className="block ml-auto rounded py-1 px-5 bg-blue-500 text-white border disabled:text-gray-300 disabled:bg-white"
          type="button"
          onClick={add}
        >
          Create
        </button>
      </form>
    </Modal>
  );
}
