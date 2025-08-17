import { Question } from '@/types/assessment';

export const assessmentQuestions: Question[] = [
  // Psychometric Section - Interest Scale
  {
    id: 'psycho_1',
    text: 'I enjoy creating engaging content using digital tools.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    }
  },
  {
    id: 'psycho_2',
    text: 'I find troubleshooting technical issues to improve learning experiences rewarding.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    }
  },
  {
    id: 'psycho_3',
    text: 'I actively seek feedback to improve my work continuously.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'motivation',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    }
  },
  {
    id: 'psycho_4',
    text: 'I prefer working in a structured environment with clear guidelines.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    }
  },
  {
    id: 'psycho_5',
    text: 'I enjoy collaborating with diverse teams to solve complex problems.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    }
  },

  // Technical Section
  {
    id: 'tech_1',
    text: 'Which of these best describes SCORM?',
    type: 'multiple_choice',
    category: 'technical',
    options: [
      'A type of learning management system',
      'A set of technical standards for e-learning software products',
      'A programming language for creating online courses',
      'A certification for e-learning professionals'
    ]
  },
  {
    id: 'tech_2',
    text: 'What is the primary purpose of formative assessment in e-learning?',
    type: 'multiple_choice',
    category: 'technical',
    options: [
      'To assign final grades to learners',
      'To provide feedback during the learning process',
      'To test learners at the end of a course',
      'To measure course completion rates'
    ]
  },
  {
    id: 'tech_3',
    text: 'Which file format is best for interactive e-learning content?',
    type: 'multiple_choice',
    category: 'technical',
    options: [
      'PDF',
      'MP4',
      'HTML5',
      'DOCX'
    ]
  },
  {
    id: 'tech_4',
    text: 'A learner reports they cannot access a course module. What would be your first troubleshooting step?',
    type: 'scenario',
    category: 'technical',
    options: [
      'Check their browser compatibility and cache',
      'Immediately escalate to IT support',
      'Ask them to restart their computer',
      'Send them a new login link'
    ]
  },

  // WISCAR Framework
  {
    id: 'wiscar_w1',
    text: 'I dedicate regular time each week to learning new e-learning tools and techniques.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'will',
    scale: {
      min: 1,
      max: 5,
      labels: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always']
    }
  },
  {
    id: 'wiscar_i1',
    text: 'I follow e-learning blogs, forums, or industry publications regularly.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'interest',
    scale: {
      min: 1,
      max: 5,
      labels: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always']
    }
  },
  {
    id: 'wiscar_s1',
    text: 'How would you rate your current familiarity with authoring tools like Articulate Storyline or Adobe Captivate?',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'skill',
    scale: {
      min: 1,
      max: 5,
      labels: ['No Experience', 'Basic', 'Intermediate', 'Advanced', 'Expert']
    }
  },
  {
    id: 'wiscar_c1',
    text: 'When facing a complex e-learning design challenge, I can break it down into manageable components.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'cognitive',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    }
  },
  {
    id: 'wiscar_a1',
    text: 'I adapt quickly when learning new software or technologies.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'ability',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    }
  },
  {
    id: 'wiscar_r1',
    text: 'Creating engaging educational content that helps others learn would be fulfilling work for me.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'realWorldAlignment',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    }
  }
];

export const sectionInfo = {
  psychometric: {
    title: 'Personality & Motivation Assessment',
    description: 'This section evaluates your personality traits, interests, and motivations that align with e-learning specialist roles.',
    duration: '5-7 minutes'
  },
  technical: {
    title: 'Technical Knowledge & Skills',
    description: 'Test your current understanding of e-learning technologies, tools, and best practices.',
    duration: '8-10 minutes'
  },
  wiscar: {
    title: 'WISCAR Framework Analysis',
    description: 'Comprehensive evaluation of your Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment.',
    duration: '7-9 minutes'
  }
};