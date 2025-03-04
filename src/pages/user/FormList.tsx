import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, CheckCircle } from 'lucide-react';
import UserLayout from '../../components/Layout/UserLayout';
import { forms } from '../../data/forms';

const FormList: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [completedForms, setCompletedForms] = useState<string[]>([]);

  useEffect(() => {
    // Check if user info exists
    const storedUserInfo = localStorage.getItem('userInfo');
    if (!storedUserInfo) {
      navigate('/online-form');
      return;
    }
    
    setUserInfo(JSON.parse(storedUserInfo));
    
    // Get completed forms from localStorage
    const storedCompletedForms = localStorage.getItem('completedForms');
    if (storedCompletedForms) {
      setCompletedForms(JSON.parse(storedCompletedForms));
    }
  }, [navigate]);

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('forms.title')}</h1>
        <p className="text-gray-600 mb-8">{t('forms.subtitle')}</p>
        
        {userInfo && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <h2 className="text-lg font-medium text-blue-800 mb-2">Applicant Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{userInfo.firstName} {userInfo.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Mobile</p>
                <p className="font-medium">{userInfo.mobileNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{userInfo.email}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {forms.map((form) => (
            <div 
              key={form.id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FileText size={24} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold ml-4">{t(`forms.${form.id}`)}</h2>
                </div>
                {completedForms.includes(form.id) && (
                  <CheckCircle size={24} className="text-green-500" />
                )}
              </div>
              
              <p className="text-gray-600 mb-4">{form.description}</p>
              
              <Link 
                to={`/form/${form.id}`} 
                className={`inline-block py-2 px-4 rounded transition duration-200 ${
                  completedForms.includes(form.id) 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {completedForms.includes(form.id) ? 'View Submitted Form' : t('common.next')}
              </Link>
            </div>
          ))}
        </div>
        
        {completedForms.length === forms.length && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold text-green-800 mb-2">All Forms Completed!</h2>
            <p className="text-green-700 mb-4">
              You have successfully completed all required forms. You will receive confirmation emails with PDFs of your submitted forms.
            </p>
            <Link 
              to="/status" 
              className="inline-block bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-200"
            >
              Track Application Status
            </Link>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default FormList;