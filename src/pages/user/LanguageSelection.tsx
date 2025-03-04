import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Flame } from 'lucide-react';

const LanguageSelection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem('preferredLanguage', language);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
          <Flame size={48} className="text-red-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-8">{t('language.title')}</h1>
        
        <div className="space-y-4">
          <button
            onClick={() => handleLanguageChange('en')}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center"
          >
            <span className="text-lg font-medium">{t('language.english')}</span>
          </button>
          
          <button
            onClick={() => handleLanguageChange('gu')}
            className="w-full py-3 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-200 flex items-center justify-center"
          >
            <span className="text-lg font-medium">{t('language.gujarati')}</span>
          </button>
        </div>
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Fire NOC Issuance System</p>
          <p>© 2025 Fire Department</p>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;