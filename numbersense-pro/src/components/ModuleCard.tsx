import { Module } from '../types';
import { cn } from '../lib/utils';
import { CheckCircle2, History, Lock, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface ModuleCardProps {
  key?: string | number;
  module: Module;
  onClick?: () => void;
  className?: string;
}

export default function ModuleCard({ module, onClick, className }: ModuleCardProps) {
  const isLocked = module.status === 'locked';
  const isMastered = module.status === 'mastered';
  const isInProgress = module.status === 'in-progress';

  return (
    <motion.div
      whileHover={!isLocked ? { scale: 1.02 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      onClick={!isLocked ? onClick : undefined}
      className={cn(
        "bg-white border p-4 rounded-xl transition-all duration-200",
        isLocked ? "bg-slate-50 opacity-70 cursor-not-allowed border-slate-200" : "cursor-pointer hover:shadow-lg border-slate-200",
        isInProgress && "border-primary/30",
        module.essential && "border-2 border-primary/40",
        className
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div className={cn(
          "w-10 h-10 rounded flex items-center justify-center font-bold text-sm",
          isLocked ? "bg-slate-200 text-slate-400" : "bg-blue-50 text-primary"
        )}>
          {module.iconText}
        </div>
        {isMastered && <CheckCircle2 className="w-5 h-5 text-green-600 fill-green-50" />}
        {isLocked && <Lock className="w-5 h-5 text-slate-400" />}
        {isInProgress && <History className="w-5 h-5 text-amber-500" />}
      </div>

      <div className="flex items-center gap-2 mb-1">
        <h3 className={cn(
          "font-display font-semibold transition-colors",
          isLocked ? "text-slate-700" : "text-on-surface"
        )}>
          {module.title}
        </h3>
        {module.essential && (
          <span className="px-1.5 py-0.5 bg-secondary-container/10 text-secondary rounded text-[9px] font-bold uppercase tracking-tighter shrink-0">
            Essential
          </span>
        )}
      </div>

      <p className={cn(
        "text-sm mb-4 line-clamp-2",
        isLocked ? "text-slate-400" : "text-slate-500"
      )}>
        {module.description}
      </p>

      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className={cn(
          "text-[10px] font-bold uppercase tracking-wider",
          isLocked ? "text-slate-400" : "text-primary"
        )}>
          {module.category}
        </span>
        
        {module.avgSpeed && (
          <span className="text-xs font-semibold text-slate-700 tabular-nums">
            {module.avgSpeed}
          </span>
        )}

        {isLocked && module.level && (
          <span className="text-[10px] font-medium text-slate-400 italic">
            Unlocks at Lvl {module.level}
          </span>
        )}

        {isInProgress && module.mastery && (
          <div className="w-16 bg-slate-100 h-1 rounded-full overflow-hidden">
            <div 
              className="bg-amber-500 h-full transition-all duration-300" 
              style={{ width: `${module.mastery}%` }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
