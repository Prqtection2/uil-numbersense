import { LayoutGrid, Calculator, Trophy, Settings, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

export default function Sidebar({ activeView, onNavigate }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Modules', icon: LayoutGrid },
    { id: 'practice', label: 'Practice', icon: Calculator },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen py-8 bg-slate-50 border-r border-slate-200 w-64 z-40">
      <div className="px-6 mb-10">
        <h1 className="font-display font-black text-primary text-2xl tracking-tighter">NumberSense Pro</h1>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">UIL Academic Prep</p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 ease-in-out font-display text-sm font-medium rounded-lg",
              activeView === item.id 
                ? "bg-blue-50 text-primary border-r-4 border-primary rounded-r-none" 
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="px-6 py-4 mt-auto border-t border-slate-200">
        <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-white font-bold shrink-0">
            JD
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-on-surface truncate">John Doe</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Student Portal</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
