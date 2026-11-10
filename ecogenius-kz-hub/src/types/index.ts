export type SectionId = 
  | 'home'
  | 'ecoclean'
  | 'ecobio'
  | 'ecocompost'
  | 'ecofertilizer'
  | 'ecofood'
  | 'ecolab'
  | 'ecoquiz'
  | 'explorer'
  | 'calculator';

export interface ObservationLog {
  id: string;
  dayNumber: number;
  date: string;
  notes: string;
  color: string;
  odor: string;
  phOrTexture?: string;
  imageUrl?: string;
}

export interface LabExperiment {
  id: string;
  title: string;
  category: 'cleaner' | 'bioplastic' | 'compost' | 'fertilizer' | 'food' | 'other';
  categoryLabelKz: string;
  wasteUsed: string;
  startDate: string;
  durationDays: number;
  status: 'active' | 'completed' | 'planned';
  hypothesis: string;
  safetyConfirmed: boolean;
  logs: ObservationLog[];
  conclusion?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export interface WasteItem {
  id: string;
  name: string;
  latinOrScientific?: string;
  category: 'жеміс-жидек' | 'көкөніс' | 'сусын-дән' | 'басқа';
  icon: string;
  description: string;
  keyNutrients: string[];
  potentialUses: {
    title: string;
    description: string;
    difficulty: 'Оңай' | 'Орташа' | 'Зертханалық';
    timeRequired: string;
    sectionLink?: SectionId;
  }[];
  stepByStepRecipe: {
    title: string;
    materials: string[];
    steps: string[];
    safetyTip: string;
  };
  scientificInsight: string;
  whatNotToDo: string;
}
