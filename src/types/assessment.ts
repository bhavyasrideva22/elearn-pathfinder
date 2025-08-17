export interface Question {
  id: string;
  text: string;
  type: 'likert' | 'multiple_choice' | 'scenario';
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory?: string;
  options?: string[];
  scale?: {
    min: number;
    max: number;
    labels: string[];
  };
}

export interface AssessmentResponse {
  questionId: string;
  value: number | string;
}

export interface WISCARScores {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorldAlignment: number;
}

export interface AssessmentResult {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: WISCARScores;
  overallScore: number;
  recommendation: 'yes' | 'maybe' | 'no';
  recommendationReason: string;
  careerRoles: Array<{
    title: string;
    matchScore: number;
    description: string;
  }>;
  nextSteps: string[];
  learningPath: string[];
}

export interface AssessmentState {
  currentSection: 'intro' | 'psychometric' | 'technical' | 'wiscar' | 'results';
  currentQuestionIndex: number;
  responses: AssessmentResponse[];
  result?: AssessmentResult;
  isComplete: boolean;
}