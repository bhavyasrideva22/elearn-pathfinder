import { useState, useEffect } from 'react';
import { AssessmentIntro } from '@/components/AssessmentIntro';
import { AssessmentQuestion } from '@/components/AssessmentQuestion';
import { AssessmentResults } from '@/components/AssessmentResults';
import { assessmentQuestions, sectionInfo } from '@/data/questions';
import { calculateAssessmentResult } from '@/utils/assessmentCalculator';
import { AssessmentState, AssessmentResponse } from '@/types/assessment';

export default function Assessment() {
  const [assessmentState, setAssessmentState] = useState<AssessmentState>({
    currentSection: 'intro',
    currentQuestionIndex: 0,
    responses: [],
    isComplete: false
  });

  const getCurrentQuestion = () => {
    return assessmentQuestions[assessmentState.currentQuestionIndex];
  };

  const getCurrentSectionInfo = () => {
    const question = getCurrentQuestion();
    if (!question) return sectionInfo.psychometric;
    
    return sectionInfo[question.category as keyof typeof sectionInfo] || sectionInfo.psychometric;
  };

  const handleStartAssessment = () => {
    setAssessmentState(prev => ({
      ...prev,
      currentSection: 'psychometric'
    }));
  };

  const handleAnswer = (response: AssessmentResponse) => {
    setAssessmentState(prev => {
      const existingIndex = prev.responses.findIndex(r => r.questionId === response.questionId);
      const newResponses = [...prev.responses];
      
      if (existingIndex >= 0) {
        newResponses[existingIndex] = response;
      } else {
        newResponses.push(response);
      }
      
      return {
        ...prev,
        responses: newResponses
      };
    });
  };

  const handleNext = () => {
    setAssessmentState(prev => {
      const nextIndex = prev.currentQuestionIndex + 1;
      
      if (nextIndex >= assessmentQuestions.length) {
        // Assessment complete, calculate results
        const result = calculateAssessmentResult(prev.responses);
        return {
          ...prev,
          currentSection: 'results',
          result,
          isComplete: true
        };
      }
      
      const nextQuestion = assessmentQuestions[nextIndex];
      const newSection = nextQuestion.category === 'psychometric' ? 'psychometric' :
                        nextQuestion.category === 'technical' ? 'technical' : 'wiscar';
      
      return {
        ...prev,
        currentQuestionIndex: nextIndex,
        currentSection: newSection
      };
    });
  };

  const handlePrevious = () => {
    setAssessmentState(prev => {
      const prevIndex = Math.max(0, prev.currentQuestionIndex - 1);
      const prevQuestion = assessmentQuestions[prevIndex];
      const newSection = prevQuestion.category === 'psychometric' ? 'psychometric' :
                        prevQuestion.category === 'technical' ? 'technical' : 'wiscar';
      
      return {
        ...prev,
        currentQuestionIndex: prevIndex,
        currentSection: newSection
      };
    });
  };

  const handleRestart = () => {
    setAssessmentState({
      currentSection: 'intro',
      currentQuestionIndex: 0,
      responses: [],
      isComplete: false
    });
  };

  const getCurrentResponse = () => {
    const question = getCurrentQuestion();
    if (!question) return undefined;
    
    return assessmentState.responses.find(r => r.questionId === question.id);
  };

  // Render appropriate component based on current section
  if (assessmentState.currentSection === 'intro') {
    return <AssessmentIntro onStartAssessment={handleStartAssessment} />;
  }

  if (assessmentState.currentSection === 'results' && assessmentState.result) {
    return <AssessmentResults result={assessmentState.result} onRestart={handleRestart} />;
  }

  // Render question component
  const currentQuestion = getCurrentQuestion();
  const sectionInfo = getCurrentSectionInfo();
  
  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <AssessmentQuestion
      question={currentQuestion}
      questionIndex={assessmentState.currentQuestionIndex}
      totalQuestions={assessmentQuestions.length}
      sectionTitle={sectionInfo.title}
      sectionDescription={sectionInfo.description}
      onAnswer={handleAnswer}
      onNext={handleNext}
      onPrevious={handlePrevious}
      canGoBack={assessmentState.currentQuestionIndex > 0}
      isLastQuestion={assessmentState.currentQuestionIndex === assessmentQuestions.length - 1}
      currentResponse={getCurrentResponse()}
    />
  );
}