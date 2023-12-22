import { useContext } from "react";
import ButtonIcon from "./ButtonIcon";
import ListItem from "./NoteList/ListItem";
import { appContext } from "context/appContext";

export default function NoteList() {
  const currentNotebook = useContext(appContext)?.currentNotebook;

  return (
    <section className="basis-60">
      <header className="h-header bg-neutral-100 flex items-center justify-between py-2 px-4 border-stone-300 border-b">
        {currentNotebook ? (
          <>
            <h2>All Notes</h2>
            <ButtonIcon icon="more_horiz" />
          </>
        ) : null}
      </header>
      {currentNotebook && (
        <ol className="divide-y">
          {currentNotebook.notebook.map((note) => {
            return <ListItem />;
          })}
        </ol>
      )}
    </section>
  );
}
