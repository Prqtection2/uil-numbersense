import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import DashboardView from './views/DashboardView';
import ModuleDetailView from './views/ModuleDetailView';
import PracticeModal from './components/PracticeModal';
import { motion, AnimatePresence } from 'motion/react';

type ViewSate = 'dashboard' | 'practice' | 'leaderboard' | 'settings' | 'module-detail';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewSate>('dashboard');
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [isPracticeModalOpen, setIsPracticeModalOpen] = useState(false);

  const handleModuleSelect = (id: string) => {
    setSelectedModuleId(id);
    setCurrentView('module-detail');
  };

  const handleStartPractice = () => {
    setIsPracticeModalOpen(true);
  };

  const getPageTitle = () => {
    switch (currentView) {
      case 'dashboard': return 'Modules Dashboard';
      case 'practice': return 'Drill Arena';
      case 'leaderboard': return 'State Rankings';
      case 'settings': return 'Account Settings';
      case 'module-detail': return 'Technique Guide';
      default: return 'NumberSense Pro';
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/10">
      <Sidebar 
        activeView={currentView === 'module-detail' ? 'dashboard' : currentView} 
        onNavigate={(view) => {
          setCurrentView(view as ViewSate);
          setSelectedModuleId(null);
        }} 
      />
      
      <TopBar title={getPageTitle()} />

      <main className="md:ml-64 pt-20 px-6 min-h-screen relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView + (selectedModuleId || '')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {currentView === 'dashboard' && (
              <DashboardView onModuleSelect={handleModuleSelect} />
            )}
            
            {currentView === 'module-detail' && (
              <ModuleDetailView 
                onBack={() => setCurrentView('dashboard')} 
                onStartPractice={handleStartPractice}
              />
            )}

            {(currentView === 'practice' || currentView === 'leaderboard' || currentView === 'settings') && (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-12 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                </div>
                <h2 className="text-2xl font-display font-bold text-primary mb-2">Section Under Construction</h2>
                <p className="text-slate-500 max-w-sm mx-auto">
                  We're currently calibrating the {currentView} modules for the upcoming UIL competitive season.
                </p>
                <button 
                  onClick={() => setCurrentView('dashboard')}
                  className="mt-8 text-primary font-bold text-[10px] tracking-widest uppercase hover:underline"
                >
                  Return to Modules
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <PracticeModal 
        isOpen={isPracticeModalOpen} 
        onClose={() => setIsPracticeModalOpen(false)}
        moduleTitle={selectedModuleId === 'm2' ? 'Squaring Numbers Ending in 5' : 'Mental Math Drill'}
      />

      {/* Mobile Nav Overlay is handled by Sidebar's responsive classes (hidden md:flex) */}
      {/* Footer / Legal */}
      <footer className="md:ml-64 py-8 px-6 text-center text-slate-400 text-[10px] font-medium uppercase tracking-[0.2em] border-t border-slate-100 mt-12 bg-white">
        © 2026 NumberSense Pro • Sanctioned UIL Preparatory Material
      </footer>
    </div>
  );
}
