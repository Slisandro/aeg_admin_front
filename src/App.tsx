import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/header-component';
import SideBarComponent from './components/side-bar-component';
import { DashboardPage } from './pages/dashboard';
import { ClientsPage } from './pages/clients';
import { CoursesPage } from './pages/courses';
import { ConstanciesPage } from './pages/constancies';
import { UsersPage } from './pages/users';
import { LanguageProvider } from './context/i18n-context';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <main className="w-screen h-screen bg-white-500 grid grid-cols-[max-content_1fr] grid-rows-[max-content_1fr] gap-0">
          <HeaderComponent />
          <SideBarComponent />
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/constancies" element={<ConstanciesPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
