import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Download } from 'lucide-react';
import UserLayout from '../../components/Layout/UserLayout';
import { forms } from '../../data/forms';

const DocumentLinks: React.FC = () => {
  const { t } = useTranslation();

  // Mock document URLs (in a real application, these would be actual URLs to PDF files)
  const documentUrls = {
    form1: '#',
    form2: '#',
    form3: '#',
    form4: '#'
  };

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('dashboard.downloadForms')}</h1>
        <p className="text-gray-600 mb-8">Download the required forms, fill them manually, and submit them to the office.</p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-medium text-blue-800 mb-4">Instructions</h2>
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>Download all the required forms using the links below.</li>
            <li>Print the forms and fill them with accurate information.</li>
            <li>Attach all necessary supporting documents as mentioned in each form.</li>
            <li>Submit the completed forms to the Fire Department office.</li>
            <li>You will receive a tracking code for your application.</li>
            <li>Use the tracking code to check your application status.</li>
          </ol>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {forms.map((form) => (
            <div 
              key={form.id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex justify-between items-center"
            >
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FileText size={24} className="text-blue-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">{t(`forms.${form.id}`)}</h2>
                  <p className="text-gray-600 text-sm">{form.description}</p>
                </div>
              </div>
              
              <a 
                href={documentUrls[form.id as keyof typeof documentUrls]}
                className="bg-blue-600 text-white py-2 px-4 rounded flex items-center hover:bg-blue-700 transition duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={18} className="mr-2" />
                {t('common.download')}
              </a>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default DocumentLinks;