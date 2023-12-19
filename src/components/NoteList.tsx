import ButtonIcon from "./ButtonIcon";
import ListItem from "./NoteList/ListItem";

export default function NoteList() {
  return (
    <section className="basis-60">
      <header className="h-header bg-neutral-100 flex items-center justify-between py-2 px-4 border-stone-300 border-b">
        <h2>All Notes</h2>
        <ButtonIcon icon="more_horiz" />
      </header>
      <ol className="divide-y">
        <ListItem />
        <ListItem />
        <ListItem />
      </ol>
    </section>
  );
}
