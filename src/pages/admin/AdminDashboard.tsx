import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, CheckCircle, XCircle, Clock, Users } from 'lucide-react';
import AdminLayout from '../../components/Layout/AdminLayout';

interface ApplicationSummary {
  total: number;
  pending: number;
  inProcess: number;
  accepted: number;
  rejected: number;
}

interface RecentApplication {
  id: string;
  trackingCode: string;
  formName: string;
  applicantName: string;
  status: 'pending' | 'in_process' | 'accepted' | 'rejected';
  submittedAt: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState<ApplicationSummary>({
    total: 0,
    pending: 0,
    inProcess: 0,
    accepted: 0,
    rejected: 0
  });
  const [recentApplications, setRecentApplications] = useState<RecentApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin');
      return;
    }

    setTimeout(() => {
      const mockSummary: ApplicationSummary = {
        total: Math.floor(Math.random() * 100) + 50,
        pending: Math.floor(Math.random() * 30) + 10,
        inProcess: Math.floor(Math.random() * 20) + 5,
        accepted: Math.floor(Math.random() * 30) + 10,
        rejected: Math.floor(Math.random() * 10) + 5
      };

      const mockRecentApplications: RecentApplication[] = Array.from({ length: 5 }, (_, i) => ({
        id: Math.random().toString(36).substring(2, 10),
        trackingCode: Math.random().toString(36).substring(2, 10).toUpperCase(),
        formName: ['Building Fire Safety Certificate', 'Fire Safety Equipment Verification', 'Emergency Evacuation Plan', 'Fire Safety Compliance Declaration'][Math.floor(Math.random() * 4)],
        applicantName: ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis', 'Michael Wilson'][Math.floor(Math.random() * 5)],
        status: ['pending', 'in_process', 'accepted', 'rejected'][Math.floor(Math.random() * 4)] as any,
        submittedAt: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString()
      }));

      setSummary(mockSummary);
      setRecentApplications(mockRecentApplications);
      setIsLoading(false);
    }, 1000);
  }, [navigate]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'rejected':
        return <XCircle size={20} className="text-red-500" />;
      case 'in_process':
        return <Clock size={20} className="text-blue-500" />;
      default:
        return <Clock size={20} className="text-yellow-500" />;
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

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading dashboard data...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tracking Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Form</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted On</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentApplications.map((application) => (
              <tr key={application.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/admin/application/${application.id}`)}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{application.trackingCode}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.formName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.applicantName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(application.submittedAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                    {getStatusIcon(application.status)}
                    <span className="ml-1">{getStatusText(application.status)}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
