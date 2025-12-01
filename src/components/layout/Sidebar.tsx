import { Home, Users, ClipboardList, Shield, FileCheck, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  userRole: string | null;
  onLogout: () => void;
}

export function Sidebar({ currentView, onViewChange, userRole, onLogout }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const allMenuItems = [
    { id: 'student', label: 'Student Dashboard', icon: Home },
    { id: 'supervisor', label: 'Supervisor Dashboard', icon: Users },
    { id: 'coordinator', label: 'Coordinator Dashboard', icon: ClipboardList },
    { id: 'hod', label: 'HOD Dashboard', icon: Shield },
    { id: 'evaluator', label: 'Evaluator Dashboard', icon: FileCheck },
  ];

  // Filter menu items based on user role
  const menuItems = userRole 
    ? allMenuItems.filter(item => item.id === userRole)
    : allMenuItems;

  return (
    <div 
      className={`bg-gradient-to-b from-[#1F3B73] to-[#152943] h-screen flex flex-col transition-all duration-300 shadow-xl ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
              <span className="text-[#1F3B73] text-xl">⚓</span>
            </div>
            <div className="text-white">
              <div className="text-sm">Bahria University</div>
              <div className="text-xs opacity-75">FYP Portal</div>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md mx-auto">
            <span className="text-[#1F3B73] text-lg">⚓</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`text-white/75 hover:text-white hover:bg-white/10 rounded p-1 transition-all ${collapsed ? 'hidden' : ''}`}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg mb-2 transition-all ${
                currentView === item.id
                  ? 'bg-white text-[#1F3B73] shadow-md'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
              title={collapsed ? item.label : ''}
            >
              <Icon size={20} />
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        {!collapsed ? (
          <>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-3 text-white/80 hover:bg-red-500/20 hover:text-white transition-all border border-white/20"
            >
              <LogOut size={18} />
              <span className="text-sm">Logout</span>
            </button>
            <div className="text-white/60 text-xs text-center">
              <p>© 2025 Bahria University</p>
              <p className="mt-1">v2.0.1</p>
            </div>
          </>
        ) : (
          <>
            <button
              onClick={onLogout}
              className="text-white/75 hover:text-white hover:bg-red-500/20 rounded p-1.5 transition-all w-full flex items-center justify-center mb-2"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-white/75 hover:text-white hover:bg-white/10 rounded p-1.5 transition-all w-full flex items-center justify-center"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}