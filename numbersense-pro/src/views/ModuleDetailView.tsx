import { ArrowLeft, BookOpen, Lightbulb, PencilLine, Bolt, Timer, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ModuleDetailViewProps {
  onBack: () => void;
  onStartPractice: () => void;
}

export default function ModuleDetailView({ onBack, onStartPractice }: ModuleDetailViewProps) {
  const steps = [
    {
      id: 1,
      title: 'Identify the Tens',
      content: "Look at the first digit (the tens place). Let's call this number n.",
    },
    {
      id: 2,
      title: 'Multiply by Successor',
      content: 'Calculate n × (n + 1). This result forms the first part of your result.',
    },
    {
      id: 3,
      title: 'Append 25',
      content: 'Every square of a number ending in 5 ends in 25. Simply write 25 after your previous result.',
    },
  ];

  const examples = [
    { label: 'Example 01', input: '35²', step1: '3 × (3 + 1) = 12', step2: '...25', result: '1,225' },
    { label: 'Example 02', input: '75²', step1: '7 × 8 = 56', step2: '...25', result: '5,625' },
    { label: 'Example 03', input: '115²', step1: '11 × 12 = 132', step2: '...25', result: '13,225' },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="mb-8">
        <button 
          onClick={onBack}
          className="inline-flex items-center text-primary font-bold text-[10px] tracking-widest uppercase hover:gap-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          BACK TO LIBRARY
        </button>
      </div>

      <div className="mb-12">
        <h1 className="text-5xl font-display font-bold text-primary mb-3">Squaring Numbers Ending in 5</h1>
        <p className="text-on-surface-variant max-w-2xl text-lg font-medium opacity-80">
          Master the instant technique for squaring any two-digit number ending in 5. A foundational skill for UIL Number Sense competition speed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <section className="bg-white border border-slate-200 rounded-xl p-8 overflow-hidden relative shadow-sm">
            <Lightbulb className="absolute -top-4 -right-4 w-32 h-32 text-slate-50 rotate-12" />
            <h2 className="text-xl font-display font-bold text-primary mb-8 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-primary-container" />
              How it Works
            </h2>
            
            <div className="space-y-8 relative z-10">
              {steps.map((step) => (
                <div key={step.id} className="flex gap-6">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-sm shadow-md">
                    {step.id}
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold mb-1 text-on-surface">{step.title}</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{step.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-surface-container-low rounded-lg border-l-4 border-primary relative overflow-hidden group">
              <p className="text-[10px] font-bold text-primary uppercase mb-2 tracking-widest">Formula</p>
              <p className="text-2xl font-display font-bold tabular-nums tracking-tight">
                (n5)² = [n × (n+1)] [25]
              </p>
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <CheckCircle2 className="w-12 h-12" />
              </div>
            </div>
          </section>

          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="hidden lg:flex bg-primary-container text-white p-8 rounded-xl shadow-xl relative overflow-hidden group cursor-pointer"
            onClick={onStartPractice}
          >
            <div className="relative z-10">
              <h3 className="text-2xl font-display font-bold mb-2">Ready to Drill?</h3>
              <p className="text-on-primary-container mb-6 opacity-90 font-medium">Practice 20 randomized problems to lock in the muscle memory.</p>
              <button className="bg-white text-primary px-8 py-3 font-display font-bold rounded-lg flex items-center gap-3 shadow-lg group-hover:px-10 transition-all">
                START PRACTICE <Bolt className="w-4 h-4 fill-current" />
              </button>
            </div>
            <Timer className="absolute -bottom-8 -right-8 w-48 h-48 text-white/10 group-hover:rotate-12 transition-transform duration-500" />
          </motion.div>
        </div>

        <div className="space-y-6">
          <section className="bg-white border border-slate-200 rounded-xl p-8 h-full shadow-sm hover:border-primary/20 transition-colors">
            <h2 className="text-xl font-display font-bold text-primary mb-8 flex items-center gap-3">
              <PencilLine className="w-6 h-6 text-primary-container" />
              Worked Examples
            </h2>

            <div className="space-y-6">
              {examples.map((ex, i) => (
                <div key={i} className="group p-6 border border-slate-100 rounded-xl bg-slate-50/50 hover:bg-white hover:border-primary/10 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-primary text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                      {ex.label}
                    </span>
                    <span className="text-xl font-display font-bold text-primary tabular-nums">{ex.input}</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 font-medium">Step 1: Get first part</span>
                      <span className="font-bold text-primary tabular-nums">{ex.step1.split('=')[1]}</span>
                    </div>
                    <div className="h-px bg-slate-200 w-full" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 font-medium">Step 2: Append 25</span>
                      <span className="font-bold text-primary tabular-nums">{ex.step2}</span>
                    </div>
                    <div className="mt-6 pt-6 border-t-2 border-dashed border-slate-200 flex justify-between items-center group-hover:border-primary/20 transition-colors">
                      <span className="font-bold text-on-surface uppercase text-[10px] tracking-widest">Final Result</span>
                      <span className="text-3xl font-display font-bold text-secondary tabular-nums drop-shadow-sm">
                        {ex.result}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="mt-8 lg:hidden">
        <button 
          onClick={onStartPractice}
          className="w-full bg-primary-container text-white py-5 font-bold rounded-xl flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all"
        >
          START PRACTICE <Bolt className="w-5 h-5 fill-current" />
        </button>
      </div>
    </div>
  );
}
