import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/Footer.jsx';
import Header from '../components/layout/Header.jsx';

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-950 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
