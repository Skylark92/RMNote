import ListItem from "./Menu/ListItem";
import MenuItem from "./Menu/MenuItem";
import NotebookList from "./Menu/NotebookList";

export default function Menu({ isMenu }: { isMenu: boolean }) {
  const fold = " basis-0 w-0";
  const spread = " basis-60";

  return (
    <section
      className={
        "py-4 gap-2 flex flex-col transition-all duration-300 overflow-hidden" +
        (isMenu ? spread : fold)
      }
    >
      <MenuItem name="All Notes"></MenuItem>
      <NotebookList />
      <MenuItem name="TEMPLATES"></MenuItem>
      <MenuItem name="TRASH"></MenuItem>
    </section>
  );
}
