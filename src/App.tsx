import HeaderComponent from './components/header-component';
import SideBarComponent from './components/side-bar-component';
import TableComponent from './components/table-component';

function App() {
  return (
    <main className="w-screen h-screen bg-white-500 grid grid-cols-[max-content_1fr] grid-rows-[max-content_1fr] gap-0">
      <HeaderComponent />
      <SideBarComponent />
      <div className="w-full row-start-2 h-full p-6">
        <TableComponent columns={["Name", "Email", "Password", "Id", ""]} />
      </div>
    </main>
  );
}

export default App;
