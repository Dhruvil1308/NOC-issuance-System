import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Flame, FileText, Users, BarChart2, LogOut } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear admin session
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 flex flex-col">
        <div className="flex items-center mb-8">
          <Flame size={32} className="text-red-500 mr-2" />
          <h1 className="text-xl font-bold">Fire NOC Admin</h1>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link 
            to="/admin/dashboard" 
            className={`flex items-center p-3 rounded-lg ${location.pathname === '/admin/dashboard' ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
          >
            <BarChart2 size={20} className="mr-3" />
            <span>Dashboard</span>
          </Link>
          <Link 
            to="/admin/applications" 
            className={`flex items-center p-3 rounded-lg ${location.pathname === '/admin/applications' ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
          >
            <FileText size={20} className="mr-3" />
            <span>Applications</span>
          </Link>
          <Link 
            to="/admin/officers" 
            className={`flex items-center p-3 rounded-lg ${location.pathname === '/admin/officers' ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
          >
            <Users size={20} className="mr-3" />
            <span>Officers</span>
          </Link>
        </nav>
        
        <button 
          onClick={handleLogout}
          className="mt-8 flex items-center p-3 rounded-lg text-red-400 hover:bg-gray-800"
        >
          <LogOut size={20} className="mr-3" />
          <span>Logout</span>
        </button>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;