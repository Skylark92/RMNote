export default function AddNotebook() {
  return (
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
        />
      </div>
      <button className="block ml-auto bg-white rounded py-1 px-5 bg-blue-500 text-white mt-4 border disabled:text-gray-300 disabled:bg-white">
        Create
      </button>
    </form>
  );
}
