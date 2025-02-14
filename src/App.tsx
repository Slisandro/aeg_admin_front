import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/header-component';
import SideBarComponent from './components/side-bar-component';
import { DashboardPage } from './pages/dashboard';
import { ClientsPage } from './pages/clients';
import { CoursesPage } from './pages/courses';
import { ConstanciesPage } from './pages/constancies';
import { UsersPage } from './pages/users';
import { LanguageProvider } from './context/i18n-context';
import { useAllClients } from './hooks/use-all-clients-hook';
import { useEffect } from 'react';
import { useStore } from './store';
import { useAllConstancies } from './hooks/use-all-constancies-hook';
import { useAllCourses } from './hooks/use-all-courses-hook';
import { useAllUsers } from './hooks/use-all-users-hook';

function App() {
  const allClients = useAllClients();
  const allConstancies = useAllConstancies();
  const allCourses = useAllCourses();
  const allUsers = useAllUsers();

  const { getAllClients, getAllConstancies, getAllCourses, getAllUsers } = useStore();

  useEffect(() => {
    if (allClients.data?.getAllClients) {
      getAllClients(allClients.data.getAllClients);
    }

    if (allConstancies.data?.getAllConstancies) {
      getAllConstancies(allConstancies.data.getAllConstancies)
    }

    if (allCourses.data?.getAllCourses) {
      getAllCourses(allCourses.data.getAllCourses)
    }

    if (allUsers.data?.getAllUsers) {
      getAllUsers(allUsers.data.getAllUsers)
    }
  }, [
    allClients.data?.getAllClients,
    allConstancies.data?.getAllConstancies,
    allCourses.data?.getAllCourses,
    allUsers.data?.getAllUsers
  ])


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
