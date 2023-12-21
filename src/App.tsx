import Header from "components/Header";
import Menu from "components/Menu";
import NoteList from "components/NoteList";
import Write from "components/Write";
import useToggle from "hooks/useToggle";

function App() {
  const { isOn, toggle } = useToggle(true);

  return (
    <div id="App" className="w-full h-full min-w-[1400px] max-w-[1920px]">
      <Header toggler={toggle} />
      <main className="w-full h-main flex divide-x">
        <Menu isMenu={isOn} />
        <NoteList />
        <Write />
      </main>
    </div>
  );
}

export default App;
