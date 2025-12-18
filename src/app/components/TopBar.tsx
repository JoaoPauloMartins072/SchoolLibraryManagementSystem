import { Search, Bell } from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface TopBarProps {
  userName: string;
  userRole: 'student' | 'staff';
  userAvatar: string;
}

export function TopBar({ userName, userRole, userAvatar }: TopBarProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            type="search"
            placeholder="Quick search books..."
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <Avatar>
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-slate-900">{userName}</p>
            <p className="text-xs text-slate-500 capitalize">{userRole}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
