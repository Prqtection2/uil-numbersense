import { cn } from '../lib/utils';
import { Timer, Trophy, Zap, Bolt, X, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduleTitle: string;
}

export default function PracticeModal({ isOpen, onClose, moduleTitle }: PracticeModalProps) {
  const modes = [
    {
      id: 'standard',
      title: 'Standard',
      description: '80 Questions / 10 Min. The official competition format for full assessment.',
      icon: Timer,
      recommended: true,
    },
    {
      id: 'sprint',
      title: 'Sprint',
      description: '20 Questions / Fast. High-intensity burst for quick refinement of speed.',
      icon: Bolt,
    },
    {
      id: 'targeted',
      title: 'Targeted',
      description: 'Specific to this Module. Focuses exclusively on your weakest areas.',
      icon: Trophy,
    },
    {
      id: 'endless',
      title: 'Endless',
      description: 'Untimed. Relaxed practice without the clock. Great for learning.',
      icon: Zap,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-white w-full max-w-3xl shadow-2xl overflow-hidden border border-slate-200 relative z-10 rounded-sm"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-2xl font-display font-semibold text-primary">Choose Your Practice</h2>
                <p className="text-sm text-slate-500 font-medium">{moduleTitle}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded transition-colors text-slate-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {modes.map((mode) => (
                  <div 
                    key={mode.id}
                    className="group relative bg-white border border-slate-200 p-5 flex flex-col hover:border-primary transition-all duration-200 cursor-pointer rounded-sm"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-blue-50 text-primary flex items-center justify-center rounded transition-colors group-hover:bg-primary group-hover:text-white">
                        <mode.icon className="w-6 h-6" />
                      </div>
                      {mode.recommended && (
                        <span className="text-[9px] bg-slate-100 text-slate-600 px-2 py-1 font-bold uppercase tracking-widest rounded-sm">
                          Recommended
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1 font-display">{mode.title}</h4>
                    <p className="text-sm text-slate-500 mb-6 flex-grow">{mode.description}</p>
                    <button className="w-full bg-primary text-white py-2.5 font-bold uppercase tracking-wider text-[10px] hover:bg-primary-container transition-colors flex items-center justify-center gap-2 rounded-sm group-hover:shadow-md">
                      Begin <Play className="w-3 h-3 fill-current" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-end items-center">
              <button onClick={onClose} className="text-slate-500 hover:text-slate-700 text-[10px] font-bold uppercase tracking-widest transition-colors">
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
