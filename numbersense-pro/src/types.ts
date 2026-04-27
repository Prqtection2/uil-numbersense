export type Category = 'Arithmetic' | 'Fractions' | 'Squaring' | 'Percentage' | 'Foundations' | 'Advanced' | 'Algebra';

export interface Module {
  id: string;
  title: string;
  description: string;
  category: Category;
  mastery?: number;
  avgSpeed?: string;
  status: 'locked' | 'unlocked' | 'mastered' | 'in-progress';
  level?: number;
  iconText: string;
  essential?: boolean;
}

export interface UserStats {
  modulesMastered: number;
  totalModules: number;
  avgSpeed: string;
  speedDelta: string;
  globalRank: string;
  totalStudents: string;
  streak: number;
}
