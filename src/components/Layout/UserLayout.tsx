import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Flame, FileText, Search, Download, Home } from 'lucide-react';
import QRCode from 'qrcode.react';

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white p-6 flex flex-col">
        <div className="flex items-center mb-8">
          <Flame size={32} className="text-yellow-400 mr-2" />
          <h1 className="text-xl font-bold">{t('dashboard.title')}</h1>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link 
            to="/dashboard" 
            className={`flex items-center p-3 rounded-lg ${location.pathname === '/dashboard' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
          >
            <Home size={20} className="mr-3" />
            <span>{t('dashboard.title')}</span>
          </Link>
          <Link 
            to="/online-form" 
            className={`flex items-center p-3 rounded-lg ${location.pathname === '/online-form' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
          >
            <FileText size={20} className="mr-3" />
            <span>{t('dashboard.onlineForm')}</span>
          </Link>
          <Link 
            to="/documents" 
            className={`flex items-center p-3 rounded-lg ${location.pathname === '/documents' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
          >
            <Download size={20} className="mr-3" />
            <span>{t('dashboard.downloadForms')}</span>
          </Link>
          <Link 
            to="/status" 
            className={`flex items-center p-3 rounded-lg ${location.pathname === '/status' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
          >
            <Search size={20} className="mr-3" />
            <span>{t('status.title')}</span>
          </Link>
        </nav>
        
        <div className="mt-8 space-y-4">
          <div className="bg-blue-700 p-4 rounded-lg">
            <h3 className="text-sm font-medium mb-2">{t('dashboard.trackApplication')}</h3>
            <div className="bg-white p-2 rounded">
              <QRCode 
                value={`${window.location.origin}/status`} 
                size={120} 
                className="mx-auto"
              />
            </div>
          </div>
          
          <div className="bg-blue-700 p-4 rounded-lg">
            <h3 className="text-sm font-medium mb-2">{t('dashboard.requiredForms')}</h3>
            <div className="bg-white p-2 rounded">
              <QRCode 
                value={`${window.location.origin}/documents`} 
                size={120} 
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
};

export default UserLayout;