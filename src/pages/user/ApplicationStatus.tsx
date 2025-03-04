import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import UserLayout from '../../components/Layout/UserLayout';

interface ApplicationStatus {
  id: string;
  trackingCode: string;
  formId: string;
  formName: string;
  status: 'pending' | 'in_process' | 'accepted' | 'rejected';
  statusReason?: string;
  submittedAt: string;
  updatedAt: string;
}

const ApplicationStatus: React.FC = () => {
  const { t } = useTranslation();
  const [trackingCode, setTrackingCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [application, setApplication] = useState<ApplicationStatus | null>(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!trackingCode.trim()) {
      setError('Please enter a tracking code');
      return;
    }
    
    setIsSearching(true);
    setError('');
    
    // Simulate API call to fetch application status
    setTimeout(() => {
      // Check if tracking code exists in localStorage
      const storedTrackingCodes = localStorage.getItem('trackingCodes');
      if (!storedTrackingCodes) {
        setError('No application found with this tracking code');
        setIsSearching(false);
        return;
      }
      
      const trackingCodes = JSON.parse(storedTrackingCodes);
      let formId = null;
      
      // Find the form ID associated with this tracking code
      for (const [key, value] of Object.entries(trackingCodes)) {
        if (value === trackingCode) {
          formId = key;
          break;
        }
      }
      
      if (!formId) {
        setError('No application found with this tracking code');
        setIsSearching(false);
        return;
      }
      
      // Get form data from localStorage
      const formData = localStorage.getItem(`formData_${formId}`);
      if (!formData) {
        setError('Application data not found');
        setIsSearching(false);
        return;
      }
      
      const parsedFormData = JSON.parse(formData);
      
      // Get form name
      const formName = formId === 'form1' 
        ? 'Building Fire Safety Certificate'
        : formId === 'form2'
        ? 'Fire Safety Equipment Verification'
        : formId === 'form3'
        ? 'Emergency Evacuation Plan'
        : 'Fire Safety Compliance Declaration';
      
      // Create mock application status
      const mockApplication: ApplicationStatus = {
        id: Math.random().toString(36).substring(2, 10),
        trackingCode,
        formId,
        formName,
        status: Math.random() > 0.7 ? 'in_process' : 'pending',
        submittedAt: parsedFormData.submittedAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setApplication(mockApplication);
      setIsSearching(false);
    }, 1500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle size={24} className="text-green-500" />;
      case 'rejected':
        return <XCircle size={24} className="text-red-500" />;
      case 'in_process':
        return <Clock size={24} className="text-blue-500" />;
      default:
        return <AlertCircle size={24} className="text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepted':
        return t('status.accepted');
      case 'rejected':
        return t('status.rejected');
      case 'in_process':
        return t('status.inProcess');
      default:
        return t('status.pending');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'in_process':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <UserLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('status.title')}</h1>
        <p className="text-gray-600 mb-8">{t('status.enterTrackingCode')}</p>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex">
            <input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder="Enter tracking code"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-70 flex items-center"
            >
              {isSearching ? (
                t('common.loading')
              ) : (
                <>
                  <Search size={18} className="mr-2" />
                  {t('status.checkStatus')}
                </>
              )}
            </button>
          </div>
          
          {error && (
            <p className="mt-4 text-red-600">{error}</p>
          )}
        </div>
        
        {application && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Application Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-600">{t('status.applicationId')}</p>
                <p className="font-medium">{application.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Form</p>
                <p className="font-medium">{application.formName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('status.submittedOn')}</p>
                <p className="font-medium">{new Date(application.submittedAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('status.lastUpdated')}</p>
                <p className="font-medium">{new Date(application.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center">
                <div className="mr-3">
                  {getStatusIcon(application.status)}
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('status.currentStatus')}</p>
                  <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                    {getStatusText(application.status)}
                  </p>
                </div>
              </div>
              
              {application.statusReason && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Reason</p>
                  <p className="mt-1">{application.statusReason}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default ApplicationStatus;