import { Search, Bell, UserCircle, Menu } from 'lucide-react';

interface TopBarProps {
  title: string;
  onMenuClick?: () => void;
}

export default function TopBar({ title, onMenuClick }: TopBarProps) {
  return (
    <header className="flex justify-between items-center w-full px-6 h-16 bg-white border-b border-slate-200 fixed top-0 left-0 md:left-64 md:w-[calc(100%-16rem)] z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-display text-xl font-bold tracking-tight text-primary-container">{title}</span>
      </div>

      <div className="flex items-center gap-base sm:gap-4">
        <div className="hidden sm:flex bg-slate-100 rounded-full px-4 py-1.5 items-center gap-2 border border-slate-200/50">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Find a trick..." 
            className="bg-transparent border-none focus:outline-none text-sm w-48"
          />
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2">
          <button className="p-2 text-slate-600 hover:bg-slate-50 transition-colors rounded-full relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border border-white"></span>
          </button>
          <button className="p-2 text-slate-600 hover:bg-slate-50 transition-colors rounded-full">
            <UserCircle className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
