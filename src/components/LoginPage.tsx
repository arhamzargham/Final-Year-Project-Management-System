import { useState } from 'react';
import { User, Lock, LogIn, GraduationCap, Shield } from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: string, username: string) => void;
}

type UserRole = 'Student' | 'Supervisor' | 'Coordinator' | 'HOD' | 'Evaluator';

export function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const roles: { value: UserRole; label: string }[] = [
    { value: 'Student', label: 'Student - Project Management' },
    { value: 'Supervisor', label: 'Supervisor - Faculty Portal' },
    { value: 'Coordinator', label: 'Coordinator - Administration' },
    { value: 'HOD', label: 'Head of Department - Executive' },
    { value: 'Evaluator', label: 'External Evaluator - Grading' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRole) {
      setError('Please select your role');
      return;
    }
    
    if (!username || !password) {
      setError('Please enter your username and password');
      return;
    }

    // Simple validation - in production, this would connect to a backend
    if (password.length >= 4) {
      onLogin(selectedRole, username);
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1e3a] via-[#1F3B73] to-[#0f1e3a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-2xl mb-4 transform hover:scale-105 transition-transform">
            <Shield size={40} className="text-[#1F3B73]" />
          </div>
          <h1 className="text-3xl text-white mb-2">Bahria University</h1>
          <p className="text-lg text-blue-100">FYP Governance Engine</p>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mt-3"></div>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-[#1F3B73] via-[#2a4d8f] to-[#1F3B73] px-8 py-6">
            <h2 className="text-xl text-white text-center">Sign In to Your Account</h2>
            <p className="text-sm text-blue-100 text-center mt-1">Enter your credentials to access the system</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {/* Role Selection */}
            <div>
              <label className="block text-sm text-gray-700 mb-2 flex items-center gap-2">
                <GraduationCap size={16} className="text-[#1F3B73]" />
                Select Your Role
                <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedRole}
                onChange={(e) => {
                  setSelectedRole(e.target.value as UserRole);
                  setError('');
                }}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F3B73] focus:border-transparent transition-all text-sm bg-white"
              >
                <option value="">-- Choose your role --</option>
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Username or Email
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError('');
                  }}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F3B73] focus:border-transparent transition-all text-sm"
                  placeholder="Enter your username or email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Password
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F3B73] focus:border-transparent transition-all text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-3 flex items-start gap-3 animate-shake">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">!</span>
                </div>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#1F3B73] text-[#1F3B73] cursor-pointer"
                />
                <span className="group-hover:text-gray-900 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-[#1F3B73] hover:underline hover:text-[#2a4d8f] transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#1F3B73] via-[#2a4d8f] to-[#1F3B73] text-white py-3.5 rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm font-medium transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <LogIn size={18} />
              Sign In to Dashboard
            </button>
          </form>

          {/* Card Footer */}
          <div className="px-8 pb-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
              <p className="text-xs text-gray-700 mb-2">
                <strong className="text-[#1F3B73]">Demo Access:</strong> For testing purposes
              </p>
              <div className="bg-white rounded-lg p-2 border border-blue-300">
                <p className="text-xs text-gray-600">
                  Username: <code className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">any</code> • 
                  Password: <code className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded ml-1">demo</code>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-blue-100 text-xs space-y-1">
          <p>© 2025 Bahria University FYP Governance Engine</p>
          <p className="text-blue-200/60">Secure • Enterprise-Grade • Role-Based Access Control</p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 border-4 border-white/10 rounded-full"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 border-4 border-white/10 rounded-full"></div>
    </div>
  );
}