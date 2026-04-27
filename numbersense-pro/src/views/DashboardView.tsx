import { MODULES, USER_STATS, PERFORMANCE_DATA } from '../constants';
import ModuleCard from '../components/ModuleCard';
import { Timer, Medal, Bolt, TrendingUp, Rocket } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell } from 'recharts';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface DashboardViewProps {
  onModuleSelect: (id: string) => void;
}

export default function DashboardView({ onModuleSelect }: DashboardViewProps) {
  return (
    <div className="space-y-8 pb-12">
      <section>
        <h2 className="text-2xl font-display font-semibold text-on-surface mb-6">Progress Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Modules Mastered Card */}
          <div className="bg-surface-container-lowest border border-slate-200 p-6 rounded-xl flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Modules Mastered</span>
            <div className="flex items-end justify-between">
              <span className="text-5xl font-display font-bold text-primary tabular-nums leading-none">
                {USER_STATS.modulesMastered}
              </span>
              <span className="text-sm font-medium text-slate-400 mb-1">/ {USER_STATS.totalModules}</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(USER_STATS.modulesMastered / USER_STATS.totalModules) * 100}%` }}
                className="bg-primary h-full"
              />
            </div>
          </div>

          {/* Average Speed Card */}
          <div className="bg-surface-container-lowest border border-slate-200 p-6 rounded-xl flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Average Speed</span>
            <div className="flex items-center gap-2">
              <Timer className="w-6 h-6 text-primary-container" />
              <span className="text-2xl font-bold text-on-surface tabular-nums">{USER_STATS.avgSpeed}</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">{USER_STATS.speedDelta}</p>
          </div>

          {/* Global Rank Card */}
          <div className="bg-surface-container-lowest border border-slate-200 p-6 rounded-xl flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Global Rank</span>
            <div className="flex items-center gap-2">
              <Medal className="w-6 h-6 text-secondary" />
              <span className="text-2xl font-bold text-on-surface">{USER_STATS.globalRank}</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">{USER_STATS.totalStudents}</p>
          </div>

          {/* Daily Streak Card */}
          <div className="bg-primary-container p-6 rounded-xl flex flex-col gap-2 text-white shadow-lg overflow-hidden relative group">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-primary-container opacity-80 z-10">Practice Streak</span>
            <div className="flex items-center gap-2 z-10">
              <Bolt className="w-6 h-6 fill-current" />
              <span className="text-2xl font-bold tabular-nums">{USER_STATS.streak} Days</span>
            </div>
            <p className="text-xs text-on-primary-container z-10">Next reward: Silver Badge</p>
            <Bolt className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 rotate-12 group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-display font-semibold text-on-surface">Module Library</h2>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {['All', 'Arithmetic', 'Fractions', 'Squaring', 'Percentage'].map((cat, i) => (
              <button 
                key={cat}
                className={cn(
                  "whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all",
                  i === 0 ? "bg-primary-container text-white shadow-md shadow-primary/20" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {MODULES.map((module) => (
            <ModuleCard 
              key={module.id} 
              module={module} 
              onClick={() => onModuleSelect(module.id)} 
            />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-display font-bold text-primary">Weekly Performance Curve</h3>
              <p className="text-xs text-slate-400 font-medium mt-1">Mental agility tracking over 7 days</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
                <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Speed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-slate-200 rounded-full"></div>
                <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Accuracy</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PERFORMANCE_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                  dy={10}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }}
                />
                <Bar dataKey="speed" radius={[4, 4, 0, 0]} barSize={32}>
                  {PERFORMANCE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === PERFORMANCE_DATA.length - 1 ? '#0b3a89' : '#2D52A2'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-secondary-container p-8 rounded-xl flex flex-col justify-between text-white overflow-hidden relative shadow-lg group">
          <div className="relative z-10">
            <div className="bg-white/20 w-fit px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest mb-4">LIVE EVENT</div>
            <h3 className="text-2xl font-display font-bold leading-tight">Elite Challenge Live</h3>
            <p className="text-sm mt-3 opacity-90 leading-relaxed">Compete for the State Ranking. High-stakes mental math arena. 4 hours remaining.</p>
          </div>
          <button className="relative z-10 w-full mt-8 bg-white text-secondary font-bold py-3.5 rounded-lg shadow-xl hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-2">
            Enter Room <Rocket className="w-4 h-4" />
          </button>
          <TrendingUp className="absolute -right-8 -bottom-8 w-48 h-48 opacity-10 transform -rotate-12 group-hover:scale-110 transition-transform duration-500" />
        </div>
      </section>
    </div>
  );
}
