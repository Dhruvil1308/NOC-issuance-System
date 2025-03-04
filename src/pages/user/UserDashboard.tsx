import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FileText, Search, Download } from 'lucide-react';
import UserLayout from '../../components/Layout/UserLayout';

const UserDashboard: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    // Load preferred language from localStorage
    const preferredLanguage = localStorage.getItem('preferredLanguage');
    if (preferredLanguage) {
      i18n.changeLanguage(preferredLanguage);
    }
  }, [i18n]);

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('dashboard.title')}</h1>
        <p className="text-gray-600 mb-8">{t('dashboard.subtitle')}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-200">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText size={24} className="text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold ml-4">{t('dashboard.onlineForm')}</h2>
            </div>
            <p className="text-gray-600 mb-4">Apply for Fire NOC certificate by filling out the required forms online.</p>
            <Link 
              to="/online-form" 
              className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
            >
              {t('common.next')}
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-200">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Download size={24} className="text-green-600" />
              </div>
              <h2 className="text-xl font-semibold ml-4">{t('dashboard.downloadForms')}</h2>
            </div>
            <p className="text-gray-600 mb-4">Download the required forms, fill them manually, and submit them to the office.</p>
            <Link 
              to="/documents" 
              className="inline-block bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200"
            >
              {t('common.next')}
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-200">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Search size={24} className="text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold ml-4">{t('dashboard.trackApplication')}</h2>
          </div>
          <p className="text-gray-600 mb-4">Track the status of your Fire NOC application using your tracking code.</p>
          <Link 
            to="/status" 
            className="inline-block bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-200"
          >
            {t('common.next')}
          </Link>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;