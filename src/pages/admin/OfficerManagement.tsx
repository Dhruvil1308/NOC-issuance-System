import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Users, UserPlus, Edit, Trash2 } from 'lucide-react';
import AdminLayout from '../../components/Layout/AdminLayout';
import { Officer } from '../../types';

interface OfficerForm {
  name: string;
  email: string;
  role: 'admin' | 'officer';
}

const OfficerManagement: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<OfficerForm>();
  
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingOfficer, setEditingOfficer] = useState<Officer | null>(null);

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin');
      return;
    }
    
    // Simulate API call to fetch officers
    setTimeout(() => {
      // Generate mock data
      const mockOfficers: Officer[] = [
        {
          id: '1',
          name: 'John Officer',
          email: 'john.officer@example.com',
          role: 'officer',
          assignedApplications: ['app1', 'app2', 'app3']
        },
        {
          id: '2',
          name: 'Sarah Inspector',
          email: 'sarah.inspector@example.com',
          role: 'officer',
          assignedApplications: ['app4', 'app5']
        },
        {
          id: '3',
          name: 'Mike Reviewer',
          email: 'mike.reviewer@example.com',
          role: 'officer',
          assignedApplications: ['app6', 'app7', 'app8', 'app9']
        },
        {
          id: '4',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin',
          assignedApplications: []
        }
      ];
      
      setOfficers(mockOfficers);
      setIsLoading(false);
    }, 1000);
  }, [navigate]);

  const onSubmit = (data: OfficerForm) => {
    setIsAdding(true);
    
    // Simulate API call to add/update officer
    setTimeout(() => {
      if (editingOfficer) {
        // Update existing officer
        const updatedOfficers = officers.map(officer => 
          officer.id === editingOfficer.id 
            ? { ...officer, name: data.name, email: data.email, role: data.role }
            : officer
        );
        setOfficers(updatedOfficers);
      } else {
        // Add new officer
        const newOfficer: Officer = {
          id: Math.random().toString(36).substring(2, 10),
          name: data.name,
          email: data.email,
          role: data.role,
          assignedApplications: []
        };
        setOfficers([...officers, newOfficer]);
      }
      
      setIsAdding(false);
      setShowAddForm(false);
      setEditingOfficer(null);
      reset();
    }, 1000);
  };

  const handleEdit = (officer: Officer) => {
    setEditingOfficer(officer);
    setShowAddForm(true);
    reset({
      name: officer.name,
      email: officer.email,
      role: officer.role
    });
  };

  const handleDelete = (id: string) => {
    // Simulate API call to delete officer
    const updatedOfficers = officers.filter(officer => officer.id !== id);
    setOfficers(updatedOfficers);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading officers...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Officer Management</h1>
          
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 flex items-center"
            >
              <UserPlus size={18} className="mr-2" />
              Add New Officer
            </button>
          )}
        </div>
        
        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              {editingOfficer ? 'Edit Officer' : 'Add New Officer'}
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter officer name"
                    {...register('name', { required: true })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">Name is required</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter email address"
                    {...register('email', { 
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                    })}
                  />
                  {errors.email?.type === 'required' && (
                    <p className="mt-1 text-sm text-red-600">Email is required</p>
                  )}
                  {errors.email?.type === 'pattern' && (
                    <p className="mt-1 text-sm text-red-600">Invalid email address</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register('role', { required: true })}
                  >
                    <option value="officer">Officer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingOfficer(null);
                    reset();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-70"
                >
                  {isAdding ? 'Saving...' : (editingOfficer ? 'Update' : 'Add Officer')}
                </button>
              </div>
            </form>
          </div>
        )}
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center mb-6">
            <Users size={20} className="text-gray-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-800">Officers</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned Applications
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {officers.map((officer) => (
                  <tr key={officer.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {officer.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {officer.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        officer.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {officer.role === 'admin' ? 'Admin' : 'Officer'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {officer.assignedApplications.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(officer)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(officer.id)}
                          className="text-red-600 hover:text-red-800"
                          disabled={officer.role === 'admin'}
                        >
                          <Trash2 size={18} className={officer.role === 'admin' ? 'opacity-50 cursor-not-allowed' : ''} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OfficerManagement;