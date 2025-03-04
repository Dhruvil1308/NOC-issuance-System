import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, CheckCircle, XCircle, Clock, AlertCircle, User, Calendar, Mail, Phone, FileText } from 'lucide-react';
import AdminLayout from '../../components/Layout/AdminLayout';

interface Application {
  id: string;
  trackingCode: string;
  formId: string;
  formName: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  status: 'pending' | 'in_process' | 'accepted' | 'rejected';
  statusReason?: string;
  assignedTo?: string;
  formData: Record<string, any>;
  submittedAt: string;
  updatedAt: string;
}

interface StatusUpdateForm {
  status: 'pending' | 'in_process' | 'accepted' | 'rejected';
  statusReason?: string;
  assignedTo?: string;
}

const ApplicationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<StatusUpdateForm>();
  
  const [application, setApplication] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  const selectedStatus = watch('status');

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin');
      return;
    }
    
    // Simulate API call to fetch application details
    setTimeout(() => {
      // Generate mock data for a single application
      const mockApplication: Application = {
        id: id || '',
        trackingCode: Math.random().toString(36).substring(2, 10).toUpperCase(),
        formId: `form${Math.floor(Math.random() * 4) + 1}`,
        formName: ['Building Fire Safety Certificate', 'Fire Safety Equipment Verification', 'Emergency Evacuation Plan', 'Fire Safety Compliance Declaration'][Math.floor(Math.random() * 4)],
        applicantName: 'John Doe',
        applicantEmail: 'john.doe@example.com',
        applicantPhone: '+91 9876543210',
        status: ['pending', 'in_process', 'accepted', 'rejected'][Math.floor(Math.random() * 4)] as any,
        statusReason: Math.random() > 0.7 ? 'Documents incomplete' : undefined,
        assignedTo: Math.random() > 0.3 ? ['John Officer', 'Sarah Inspector', 'Mike Reviewer'][Math.floor(Math.random() * 3)] : undefined,
        formData: {
          buildingName: 'Sunrise Apartments',
          buildingAddress: '123 Main Street, Ahmedabad, Gujarat',
          buildingType: 'residential',
          buildingHeight: '45',
          buildingArea: '2500',
          occupancyType: 'residential',
          ownerName: 'John Doe',
          ownerContact: '+91 9876543210',
          // Additional fields based on form type
          fireExtinguishers: 'yes',
          fireExtinguishersCount: '10',
          fireAlarmSystem: 'yes',
          sprinklerSystem: 'yes',
          emergencyExits: 'yes',
          emergencyExitsCount: '4',
          lastMaintenanceDate: '2025-01-15',
          maintenanceCompany: 'SafeGuard Fire Systems'
        },
        submittedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString()
      };
      
      setApplication(mockApplication);
      setIsLoading(false);
    }, 1000);
  }, [id, navigate]);

  const onSubmit = (data: StatusUpdateForm) => {
    setIsUpdating(true);
    
    // Simulate API call to update application status
    setTimeout(() => {
      if (application) {
        const updatedApplication = {
          ...application,
          status: data.status,
          statusReason: data.statusReason,
          assignedTo: data.assignedTo,
          updatedAt: new Date().toISOString()
        };
        
        setApplication(updatedApplication);
        setIsUpdating(false);
        setUpdateSuccess(true);
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setUpdateSuccess(false);
        }, 3000);
      }
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'rejected':
        return <XCircle size={20} className="text-red-500" />;
      case 'in_process':
        return <Clock size={20} className="text-blue-500" />;
      default:
        return <AlertCircle size={20} className="text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'Accepted';
      case 'rejected':
        return 'Rejected';
      case 'in_process':
        return 'In Process';
      default:
        return 'Pending';
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

  if (isLoading || !application) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading application details...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/admin/applications')}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Application Details</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Application Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-800 mb-1">{application.formName}</h2>
                  <p className="text-sm text-gray-500">Tracking Code: {application.trackingCode}</p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                  {getStatusIcon(application.status)}
                  <span className="ml-1">{getStatusText(application.status)}</span>
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start">
                  <User size={18} className="text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Applicant</p>
                    <p className="font-medium">{application.applicantName}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail size={18} className="text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{application.applicantEmail}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone size={18} className="text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{application.applicantPhone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar size={18} className="text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Submitted On</p>
                    <p className="font-medium">{new Date(application.submittedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              
              {application.assignedTo && (
                <div className="bg-blue-50 p-3 rounded-md mb-6">
                  <p className="text-sm text-blue-700">
                    <span className="font-medium">Assigned to:</span> {application.assignedTo}
                  </p>
                </div>
              )}
              
              {application.statusReason && (
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Status Reason:</span> {application.statusReason}
                  </p>
                </div>
              )}
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center mb-4">
                <FileText size={20} className="text-gray-500 mr-2" />
                <h2 className="text-lg font-medium text-gray-800">Form Data</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(application.formData).map(([key, value]) => (
                  <div key={key} className="border-b border-gray-100 pb-2">
                    <p className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Update Status */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Update Application Status</h2>
              
              {updateSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
                  Application status updated successfully!
                </div>
              )}
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    defaultValue={application.status}
                    {...register('status', { required: true })}
                  >
                    <option value="pending">Pending</option>
                    <option value="in_process">In Process</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                
                {selectedStatus === 'rejected' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rejection Reason
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      placeholder="Provide reason for rejection"
                      {...register('statusReason', { required: selectedStatus === 'rejected' })}
                    ></textarea>
                    {errors.statusReason && (
                      <p className="mt-1 text-sm text-red-600">Rejection reason is required</p>
                    )}
                  </div>
                )}
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assign To
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    defaultValue={application.assignedTo || ''}
                    {...register('assignedTo')}
                  >
                    <option value="">Unassigned</option>
                    <option value="John Officer">John Officer</option>
                    <option value="Sarah Inspector">Sarah Inspector</option>
                    <option value="Mike Reviewer">Mike Reviewer</option>
                  </select>
                </div>
                
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-70"
                >
                  {isUpdating ? 'Updating...' : 'Update Status'}
                </button>
              </form>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Actions</h2>
              
              <div className="space-y-3">
                <button className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200">
                  Send Email to Applicant
                </button>
                <button className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200">
                  Download Form Data
                </button>
                <button className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200">
                  Print Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ApplicationDetail;