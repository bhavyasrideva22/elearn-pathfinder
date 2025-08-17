import { AssessmentResponse, AssessmentResult, WISCARScores } from '@/types/assessment';
import { assessmentQuestions } from '@/data/questions';

export function calculateAssessmentResult(responses: AssessmentResponse[]): AssessmentResult {
  // Create response map for easy lookup
  const responseMap = new Map<string, number>();
  responses.forEach(response => {
    responseMap.set(response.questionId, typeof response.value === 'number' ? response.value : 0);
  });

  // Calculate psychometric score
  const psychometricQuestions = assessmentQuestions.filter(q => q.category === 'psychometric');
  const psychometricTotal = psychometricQuestions.reduce((sum, q) => {
    const response = responseMap.get(q.id) || 0;
    // Normalize to 0-100 scale (assuming 1-5 scale, convert to 0-100)
    const normalized = ((response - 1) / 4) * 100;
    return sum + normalized;
  }, 0);
  const psychometricScore = Math.round(psychometricTotal / psychometricQuestions.length);

  // Calculate technical score
  const technicalQuestions = assessmentQuestions.filter(q => q.category === 'technical');
  const technicalTotal = technicalQuestions.reduce((sum, q) => {
    const response = responseMap.get(q.id) || 0;
    // For multiple choice, correct answers get full points
    const correctAnswers = [1, 1, 2, 0]; // Correct answer indices for technical questions
    const questionIndex = technicalQuestions.indexOf(q);
    const isCorrect = response === correctAnswers[questionIndex];
    return sum + (isCorrect ? 100 : 0);
  }, 0);
  const technicalScore = Math.round(technicalTotal / technicalQuestions.length);

  // Calculate WISCAR scores
  const wiscarQuestions = assessmentQuestions.filter(q => q.category === 'wiscar');
  const wiscarScores: WISCARScores = {
    will: 0,
    interest: 0,
    skill: 0,
    cognitive: 0,
    ability: 0,
    realWorldAlignment: 0
  };

  // Group WISCAR responses by subcategory
  const wiscarByCategory = wiscarQuestions.reduce((acc, q) => {
    if (!q.subcategory) return acc;
    if (!acc[q.subcategory]) acc[q.subcategory] = [];
    acc[q.subcategory].push(q.id);
    return acc;
  }, {} as Record<string, string[]>);

  // Calculate scores for each WISCAR dimension
  Object.entries(wiscarByCategory).forEach(([category, questionIds]) => {
    const categoryTotal = questionIds.reduce((sum, qId) => {
      const response = responseMap.get(qId) || 0;
      const normalized = ((response - 1) / 4) * 100;
      return sum + normalized;
    }, 0);
    const categoryScore = Math.round(categoryTotal / questionIds.length);
    
    if (category in wiscarScores) {
      (wiscarScores as any)[category] = categoryScore;
    }
  });

  // Calculate overall score (weighted average)
  const overallScore = Math.round(
    (psychometricScore * 0.3) + 
    (technicalScore * 0.3) + 
    (Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6 * 0.4)
  );

  // Determine recommendation
  let recommendation: 'yes' | 'maybe' | 'no';
  let recommendationReason: string;

  if (overallScore >= 80) {
    recommendation = 'yes';
    recommendationReason = 'Excellent alignment across all dimensions. You show strong potential for success as an E-learning Specialist.';
  } else if (overallScore >= 60) {
    recommendation = 'maybe';
    recommendationReason = 'Good foundation with some areas for development. With focused learning, you could excel in this field.';
  } else {
    recommendation = 'no';
    recommendationReason = 'Current assessment suggests exploring alternative career paths might be more suitable at this time.';
  }

  // Generate career roles with match scores
  const careerRoles = [
    {
      title: 'E-learning Specialist',
      matchScore: Math.max(60, overallScore),
      description: 'Design and develop comprehensive online learning programs and manage e-learning platforms.'
    },
    {
      title: 'Learning Technologist',
      matchScore: Math.max(55, overallScore - 5),
      description: 'Implement and support learning technologies, integrate platforms, and provide technical training.'
    },
    {
      title: 'Instructional Designer',
      matchScore: Math.max(50, overallScore - 10),
      description: 'Create effective learning materials, design curricula, and develop assessment strategies.'
    },
    {
      title: 'Digital Learning Developer',
      matchScore: Math.max(45, technicalScore),
      description: 'Build interactive multimedia learning content using authoring tools and web technologies.'
    },
    {
      title: 'LMS Administrator',
      matchScore: Math.max(40, technicalScore - 5),
      description: 'Manage learning management systems, user experience, and analyze learning data.'
    }
  ].sort((a, b) => b.matchScore - a.matchScore);

  // Generate next steps based on scores
  const nextSteps: string[] = [];
  
  if (recommendation === 'yes') {
    nextSteps.push(
      'Enroll in an advanced e-learning specialist certification program',
      'Start building a portfolio of sample e-learning modules',
      'Join professional e-learning communities and forums',
      'Practice with industry-standard authoring tools like Articulate Storyline',
      'Consider specializing in emerging areas like VR/AR learning or AI-powered education'
    );
  } else if (recommendation === 'maybe') {
    if (technicalScore < 70) {
      nextSteps.push('Complete beginner courses in e-learning authoring tools');
      nextSteps.push('Learn LMS administration basics');
    }
    if (psychometricScore < 70) {
      nextSteps.push('Explore instructional design principles and learning theory');
      nextSteps.push('Practice creating educational content in various formats');
    }
    nextSteps.push('Volunteer to create training materials for local organizations');
    nextSteps.push('Connect with e-learning professionals for mentorship opportunities');
  } else {
    nextSteps.push('Consider related roles in digital content creation or educational technology support');
    nextSteps.push('Explore alternative careers in training and development');
    nextSteps.push('Develop foundational digital skills before reconsidering e-learning specialization');
  }

  // Generate learning path
  const learningPath = ['Foundation Building', 'Skill Development', 'Practical Application', 'Professional Growth'];

  return {
    psychometricScore,
    technicalScore,
    wiscarScores,
    overallScore,
    recommendation,
    recommendationReason,
    careerRoles,
    nextSteps,
    learningPath
  };
}