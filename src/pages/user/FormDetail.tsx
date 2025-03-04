import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CheckCircle } from 'lucide-react';
import UserLayout from '../../components/Layout/UserLayout';
import { forms } from '../../data/forms';
import { Form } from '../../types';

const FormDetail: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const [form, setForm] = useState<Form | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');

  useEffect(() => {
    // Find the form by ID
    const selectedForm = forms.find(f => f.id === id);
    if (!selectedForm) {
      navigate('/form-list');
      return;
    }
    
    setForm(selectedForm);
    
    // Check if user info exists
    const storedUserInfo = localStorage.getItem('userInfo');
    if (!storedUserInfo) {
      navigate('/online-form');
      return;
    }
    
    setUserInfo(JSON.parse(storedUserInfo));
    
    // Check if this form is already completed
    const storedCompletedForms = localStorage.getItem('completedForms');
    if (storedCompletedForms) {
      const completedForms = JSON.parse(storedCompletedForms);
      if (completedForms.includes(id)) {
        setIsSubmitted(true);
        
        // Get tracking code from localStorage
        const storedTrackingCodes = localStorage.getItem('trackingCodes');
        if (storedTrackingCodes) {
          const trackingCodes = JSON.parse(storedTrackingCodes);
          setTrackingCode(trackingCodes[id] || '');
        }
      }
    }
  }, [id, navigate]);

  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    
    // Generate a random tracking code
    const newTrackingCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    setTrackingCode(newTrackingCode);
    
    // Store form data in localStorage
    const formData = {
      ...data,
      formId: id,
      userId: userInfo.email,
      submittedAt: new Date().toISOString()
    };
    
    localStorage.setItem(`formData_${id}`, JSON.stringify(formData));
    
    // Update completed forms in localStorage
    const storedCompletedForms = localStorage.getItem('completedForms');
    let completedForms = storedCompletedForms ? JSON.parse(storedCompletedForms) : [];
    if (!completedForms.includes(id)) {
      completedForms.push(id);
      localStorage.setItem('completedForms', JSON.stringify(completedForms));
    }
    
    // Store tracking code in localStorage
    const storedTrackingCodes = localStorage.getItem('trackingCodes');
    let trackingCodes = storedTrackingCodes ? JSON.parse(storedTrackingCodes) : {};
    trackingCodes[id] = newTrackingCode;
    localStorage.setItem('trackingCodes', JSON.stringify(trackingCodes));
    
    // Simulate API call and email sending
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (!form || !userInfo) {
    return (
      <UserLayout>
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">{t('common.loading')}</p>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t(`forms.${form.id}`)}</h1>
        <p className="text-gray-600 mb-8">{form.description}</p>
        
        {isSubmitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 mb-2">Form Submitted Successfully!</h2>
            <p className="text-green-700 mb-6">
              Your form has been submitted successfully. A PDF copy has been sent to your email address.
            </p>
            <div className="bg-white p-4 rounded-lg border border-green-200 inline-block mb-6">
              <p className="text-sm text-gray-600 mb-1">Your Tracking Code</p>
              <p className="text-xl font-bold text-gray-800">{trackingCode}</p>
            </div>
            <div>
              <button
                onClick={() => navigate('/form-list')}
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Return to Form List
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit(onSubmit)}>
              {form.fields.map((field) => (
                <div key={field.id} className="mb-6">
                  <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label} {field.required && '*'}
                  </label>
                  
                  {field.type === 'text' && (
                    <input
                      id={field.id}
                      type="text"
                      placeholder={field.placeholder}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[field.name] ? 'border-red-500' : 'border-gray-300'}`}
                      {...register(field.name, { required: field.required })}
                    />
                  )}
                  
                  {field.type === 'textarea' && (
                    <textarea
                      id={field.id}
                      placeholder={field.placeholder}
                      rows={4}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[field.name] ? 'border-red-500' : 'border-gray-300'}`}
                      {...register(field.name, { required: field.required })}
                    />
                  )}
                  
                  {field.type === 'select' && (
                    <select
                      id={field.id}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[field.name] ? 'border-red-500' : 'border-gray-300'}`}
                      {...register(field.name, { required: field.required })}
                    >
                      <option value="">Select an option</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                  
                  {field.type === 'radio' && field.options && (
                    <div className="mt-2 space-y-2">
                      {field.options.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={`${field.id}_${option.value}`}
                            type="radio"
                            value={option.value}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                            {...register(field.name, { required: field.required })}
                          />
                          <label htmlFor={`${field.id}_${option.value}`} className="ml-2 text-gray-700">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {field.type === 'checkbox' && field.options && (
                    <div className="mt-2 space-y-2">
                      {field.options.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={`${field.id}_${option.value}`}
                            type="checkbox"
                            value={option.value}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                            {...register(field.name, { required: field.required })}
                          />
                          <label htmlFor={`${field.id}_${option.value}`} className="ml-2 text-gray-700">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {field.type === 'date' && (
                    <input
                      id={field.id}
                      type="date"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[field.name] ? 'border-red-500' : 'border-gray-300'}`}
                      {...register(field.name, { required: field.required })}
                    />
                  )}
                  
                  {field.type === 'file' && (
                    <input
                      id={field.id}
                      type="file"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[field.name] ? 'border-red-500' : 'border-gray-300'}`}
                      {...register(field.name, { required: field.required })}
                    />
                  )}
                  
                  {errors[field.name] && (
                    <p className="mt-1 text-sm text-red-600">This field is required</p>
                  )}
                </div>
              ))}
              
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  type="button"
                  onClick={() => navigate('/form-list')}
                  className="bg-gray-200 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-70"
                >
                  {isSubmitting ? t('common.loading') : t('common.submit')}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default FormDetail;