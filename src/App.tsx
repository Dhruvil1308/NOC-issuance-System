import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

// User Pages
import LanguageSelection from './pages/user/LanguageSelection';
import UserDashboard from './pages/user/UserDashboard';
import OnlineForm from './pages/user/OnlineForm';
import FormList from './pages/user/FormList';
import FormDetail from './pages/user/FormDetail';
import ApplicationStatus from './pages/user/ApplicationStatus';
import DocumentLinks from './pages/user/DocumentLinks';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ApplicationReview from './pages/admin/ApplicationReview';
import ApplicationDetail from './pages/admin/ApplicationDetail';
import OfficerManagement from './pages/admin/OfficerManagement';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<LanguageSelection />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/online-form" element={<OnlineForm />} />
          <Route path="/form-list" element={<FormList />} />
          <Route path="/form/:id" element={<FormDetail />} />
          <Route path="/status" element={<ApplicationStatus />} />
          <Route path="/documents" element={<DocumentLinks />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/applications" element={<ApplicationReview />} />
          <Route path="/admin/application/:id" element={<ApplicationDetail />} />
          <Route path="/admin/officers" element={<OfficerManagement />} />
        </Routes>
      </Router>
    </I18nextProvider>
  );
}

export default App;