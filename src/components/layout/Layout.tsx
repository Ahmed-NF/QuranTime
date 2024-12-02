import React from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';
import { Book, Bookmark, Settings, BarChart2, GamepadIcon } from 'lucide-react';
import { Footer } from './Footer';

export const Layout: React.FC = () => {
  const location = useLocation();
  const isReadingPage = location.pathname.startsWith('/surah/');
  
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-40">
        <div className="max-w-xl mx-auto flex justify-around items-center py-3 px-4">
          <NavLink to="/browse" icon={Book} label="القرآن" isActive={location.pathname === '/browse'} />
          <NavLink to="/progress" icon={BarChart2} label="التقدم" isActive={location.pathname === '/progress'} />
          <NavLink to="/quiz" icon={GamepadIcon} label="اختبار" isActive={location.pathname === '/quiz'} />
          <NavLink to="/bookmarks" icon={Bookmark} label="المحفوظات" isActive={location.pathname === '/bookmarks'} />
          <NavLink to="/settings" icon={Settings} label="الإعدادات" isActive={location.pathname === '/settings'} />
        </div>
      </nav>
      
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {!isReadingPage && <Footer />}
    </div>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.FC<any>;
  label: string;
  isActive: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon: Icon, label, isActive }) => (
  <Link
    to={to}
    className={`flex flex-col items-center gap-1.5 px-4 py-1.5 rounded-lg transition-all duration-300 ${
      isActive 
        ? 'text-primary bg-primary/10' 
        : 'text-gray-500 hover:text-primary hover:bg-primary/5'
    }`}
  >
    <Icon size={20} className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
    <span className="text-xs font-medium">{label}</span>
  </Link>
);