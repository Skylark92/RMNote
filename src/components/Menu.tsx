import NotebookList from "./Menu/NotebookList";

export default function Menu({ isMenu }: { isMenu: boolean }) {
  const fold = " basis-0 w-0";
  const spread = " basis-60";

  return (
    <section
      className={
        "py-4 gap-2 flex flex-col transition-all duration-300 overflow-auto" +
        (isMenu ? spread : fold)
      }
    >
      <NotebookList />
    </section>
  );
}
