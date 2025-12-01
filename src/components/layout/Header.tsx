import { Search, Bell, User, ChevronDown } from 'lucide-react';

interface HeaderProps {
  title: string;
  username?: string;
}

export function Header({ title, username = 'User' }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <div>
        <h1 className="text-gray-900 text-xl">{title}</h1>
        <p className="text-sm text-gray-500 mt-0.5">Welcome back, {username}</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Global Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search projects, students..."
            className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg w-80 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F3B73] focus:border-transparent transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 hover:bg-gray-100 rounded-lg transition-all group">
          <Bell size={20} className="text-gray-600 group-hover:text-[#1F3B73]" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#EF4444] rounded-full ring-2 ring-white"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-300">
          <div className="w-9 h-9 bg-gradient-to-br from-[#1F3B73] to-[#2a4d8f] rounded-lg flex items-center justify-center shadow-sm">
            <User size={18} className="text-white" />
          </div>
          <div className="text-sm">
            <div className="text-gray-900">{username}</div>
            <div className="text-xs text-gray-500">Logged In</div>
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
}