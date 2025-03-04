import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import UserLayout from '../../components/Layout/UserLayout';

interface BasicInfoForm {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
}

const OnlineForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<BasicInfoForm>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (data: BasicInfoForm) => {
    setIsSubmitting(true);
    
    // Store user data in localStorage
    localStorage.setItem('userInfo', JSON.stringify(data));
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/form-list');
    }, 1000);
  };

  return (
    <UserLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('forms.basicInfo')}</h1>
        <p className="text-gray-600 mb-8">Please provide your basic information to proceed with the application.</p>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('forms.firstName')} *
                </label>
                <input
                  id="firstName"
                  type="text"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                  {...register('firstName', { required: true })}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">This field is required</p>
                )}
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('forms.lastName')}
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register('lastName')}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
                {t('forms.mobileNumber')} *
              </label>
              <input
                id="mobileNumber"
                type="tel"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'}`}
                {...register('mobileNumber', { 
                  required: true,
                  pattern: /^[0-9]{10}$/
                })}
              />
              {errors.mobileNumber?.type === 'required' && (
                <p className="mt-1 text-sm text-red-600">This field is required</p>
              )}
              {errors.mobileNumber?.type === 'pattern' && (
                <p className="mt-1 text-sm text-red-600">Please enter a valid 10-digit mobile number</p>
              )}
            </div>
            
            <div className="mb-8">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t('forms.email')} *
              </label>
              <input
                id="email"
                type="email"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                {...register('email', { 
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                })}
              />
              {errors.email?.type === 'required' && (
                <p className="mt-1 text-sm text-red-600">This field is required</p>
              )}
              {errors.email?.type === 'pattern' && (
                <p className="mt-1 text-sm text-red-600">Please enter a valid email address</p>
              )}
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-70"
              >
                {isSubmitting ? t('common.loading') : t('common.next')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default OnlineForm;