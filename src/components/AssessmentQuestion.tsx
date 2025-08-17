import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Question, AssessmentResponse } from '@/types/assessment';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface AssessmentQuestionProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  sectionTitle: string;
  sectionDescription: string;
  onAnswer: (response: AssessmentResponse) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoBack: boolean;
  isLastQuestion: boolean;
  currentResponse?: AssessmentResponse;
}

export function AssessmentQuestion({
  question,
  questionIndex,
  totalQuestions,
  sectionTitle,
  sectionDescription,
  onAnswer,
  onNext,
  onPrevious,
  canGoBack,
  isLastQuestion,
  currentResponse
}: AssessmentQuestionProps) {
  const [selectedValue, setSelectedValue] = useState<string>(
    currentResponse?.value?.toString() || ''
  );

  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  const handleAnswerChange = (value: string) => {
    setSelectedValue(value);
    const numericValue = question.type === 'multiple_choice' 
      ? question.options?.indexOf(value) || 0
      : parseInt(value);
    
    onAnswer({
      questionId: question.id,
      value: numericValue
    });
  };

  const handleNext = () => {
    if (selectedValue) {
      onNext();
    }
  };

  const renderQuestionInput = () => {
    if (question.type === 'likert' && question.scale) {
      return (
        <RadioGroup value={selectedValue} onValueChange={handleAnswerChange}>
          <div className="space-y-4">
            {Array.from({ length: question.scale.max - question.scale.min + 1 }, (_, i) => {
              const value = (question.scale!.min + i).toString();
              const labelIndex = i;
              return (
                <div key={value} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/50 transition-smooth">
                  <RadioGroupItem value={value} id={value} />
                  <Label htmlFor={value} className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{value}</span>
                      <span className="text-sm text-muted-foreground">
                        {question.scale.labels[labelIndex]}
                      </span>
                    </div>
                  </Label>
                </div>
              );
            })}
          </div>
        </RadioGroup>
      );
    }

    if (question.type === 'multiple_choice' && question.options) {
      return (
        <RadioGroup value={selectedValue} onValueChange={handleAnswerChange}>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/50 transition-smooth">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-secondary p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="px-3 py-1">
              {sectionTitle}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Question {questionIndex + 1} of {totalQuestions}
            </span>
          </div>
          <Progress value={progress} className="h-2 mb-4" />
          <p className="text-sm text-muted-foreground">{sectionDescription}</p>
        </div>

        {/* Question Card */}
        <Card className="shadow-medium mb-8">
          <CardHeader>
            <CardTitle className="text-xl">{question.text}</CardTitle>
            {question.type === 'scenario' && (
              <CardDescription>
                Choose the best response for this scenario:
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {renderQuestionInput()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={!canGoBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Progress: {Math.round(progress)}%
            </p>
          </div>

          <Button
            onClick={handleNext}
            disabled={!selectedValue}
            variant="default"
            className="flex items-center gap-2"
          >
            {isLastQuestion ? 'Complete Assessment' : 'Next'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}