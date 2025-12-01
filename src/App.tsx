import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { StudentDashboard } from './components/student/StudentDashboard';
import { SupervisorDashboard } from './components/supervisor/SupervisorDashboard';
import { CoordinatorDashboard } from './components/coordinator/CoordinatorDashboard';
import { HODDashboard } from './components/hod/HODDashboard';
import { EvaluatorDashboard } from './components/evaluator/EvaluatorDashboard';
import { LoginPage } from './components/LoginPage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [currentView, setCurrentView] = useState('student');

  const handleLogin = (role: string, user: string) => {
    setUserRole(role.toLowerCase());
    setUsername(user);
    setCurrentView(role.toLowerCase());
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUsername('');
    setCurrentView('student');
  };

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const getHeaderTitle = () => {
    switch (currentView) {
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

  const renderDashboard = () => {
    switch (currentView) {
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
        return <StudentDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F4F5F7]">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView}
        userRole={userRole}
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getHeaderTitle()} username={username} />
        <main className="flex-1 overflow-auto">
          {renderDashboard()}
        </main>
      </div>
    </div>
  );
}