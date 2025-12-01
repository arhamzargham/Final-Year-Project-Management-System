import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { StudentDashboard } from './components/student/StudentDashboard';
import { SupervisorDashboard } from './components/supervisor/SupervisorDashboard';
import { CoordinatorDashboard } from './components/coordinator/CoordinatorDashboard';
import { HODDashboard } from './components/hod/HODDashboard';
import { EvaluatorDashboard } from './components/evaluator/EvaluatorDashboard';
import { LoginPage } from './components/LoginPage';
import { useState } from 'react';

// Protected Route Component
function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#1F3B73] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function AppContent() {
  const { isAuthenticated, user } = useAuth();
  const [currentView, setCurrentView] = useState('overview');

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  const getHeaderTitle = () => {
    switch (user?.role) {
      case 'student':
        return 'My Project Hub';
      case 'supervisor':
        return 'Faculty Cockpit';
      case 'coordinator':
        return 'Admin Control Room';
      case 'hod':
        return 'Executive Overseer';
      case 'evaluator':
        return 'Grading Interface';
      default:
        return 'Dashboard';
    }
  };

  const getDashboardComponent = () => {
    switch (user?.role) {
      case 'student':
        return <StudentDashboard />;
      case 'supervisor':
        return <SupervisorDashboard />;
      case 'coordinator':
        return <CoordinatorDashboard />;
      case 'hod':
        return <HODDashboard />;
      case 'evaluator':
        return <EvaluatorDashboard />;
      default:
        return <div>Unknown role</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        userRole={user?.role || 'student'}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getHeaderTitle()} username={user?.name || ''} />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  {getDashboardComponent()}
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  {getDashboardComponent()}
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}