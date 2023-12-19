import Header from "components/Header";
import Menu from "components/Menu";
import NoteList from "components/NoteList";
import Write from "components/Write";
import { useState } from "react";

function App() {
  const [isMenu, setIsMenu] = useState(true);

  const menuHandler = () => {
    setIsMenu((prev) => !prev);
  };
  return (
    <div id="App" className="w-full h-full min-w-[1400px] max-w-[1920px]">
      <Header menuHandler={menuHandler} />
      <main className="w-full h-main flex divide-x">
        <Menu isMenu={isMenu} />
        <NoteList />
        <Write />
      </main>
    </div>
  );
}

export default App;
