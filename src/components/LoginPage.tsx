import { useState } from 'react';
import { User, Lock, LogIn, GraduationCap, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter your email and password');
      return;
    }

    setLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
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
          <p className="text-lg text-blue-100">FYP Management System</p>
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
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-sm text-gray-700 mb-2 flex items-center gap-2">
                <User size={16} className="text-[#1F3B73]" />
                University Email
                <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="your.email@bu.edu.pk"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F3B73] focus:border-transparent transition-all text-sm"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm text-gray-700 mb-2 flex items-center gap-2">
                <Lock size={16} className="text-[#1F3B73]" />
                Password
                <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F3B73] focus:border-transparent transition-all text-sm"
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#1F3B73] border-gray-300 rounded focus:ring-2 focus:ring-[#1F3B73]"
                />
                <span className="text-gray-700 group-hover:text-[#1F3B73] transition-colors">
                  Remember me
                </span>
              </label>
              <a
                href="/forgot-password"
                className="text-[#1F3B73] hover:text-[#2a4d8f] transition-colors font-medium"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#1F3B73] to-[#2a4d8f] text-white py-3.5 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <a
                href="/register"
                className="text-[#1F3B73] hover:text-[#2a4d8f] font-medium transition-colors"
              >
                Register here
              </a>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-blue-100">
            &copy; 2025 Bahria University. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
