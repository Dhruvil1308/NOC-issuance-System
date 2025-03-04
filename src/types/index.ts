export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  mobileNumber: string;
  createdAt: string;
}

export interface Application {
  id: string;
  trackingCode: string;
  userId: string;
  formId: string;
  formData: any;
  status: 'pending' | 'in_process' | 'accepted' | 'rejected';
  statusReason?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Form {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
}

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date' | 'file';
  required: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface Officer {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'officer';
  assignedApplications: string[];
}