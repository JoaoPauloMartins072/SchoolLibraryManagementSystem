import { Home, Search, Book, BookOpen, User, Shield, LogOut } from 'lucide-react';
import { Badge } from './ui/badge';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  userRole: 'student' | 'staff';
  onLogout: () => void;
}

export function Sidebar({ currentView, onNavigate, userRole, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'search', label: 'Search Books', icon: Search },
    { id: 'borrow', label: 'Borrow Book', icon: Book },
    { id: 'return', label: 'Return Book', icon: BookOpen },
    { id: 'account', label: 'My Account', icon: User },
  ];

  return (
    <aside className="w-64 bg-blue-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-blue-800">
        <h1 className="text-xl font-bold">School Library</h1>
        <p className="text-sm text-blue-200 mt-1">Management System</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === item.id
                ? 'bg-blue-800 text-white'
                : 'text-blue-100 hover:bg-blue-800/50'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
        
        {userRole === 'staff' && (
          <button
            onClick={() => onNavigate('admin')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mt-4 border border-yellow-400/30 ${
              currentView === 'admin'
                ? 'bg-blue-800 text-white'
                : 'text-blue-100 hover:bg-blue-800/50'
            }`}
          >
            <Shield className="w-5 h-5" />
            <span>Admin Panel</span>
            <Badge variant="secondary" className="ml-auto text-xs">Staff</Badge>
          </button>
        )}
      </nav>

      <div className="p-4 border-t border-blue-800">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-800/50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
