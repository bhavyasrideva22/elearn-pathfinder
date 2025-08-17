import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AssessmentResult } from '@/types/assessment';
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Target,
  Download,
  Share
} from 'lucide-react';

interface AssessmentResultsProps {
  result: AssessmentResult;
  onRestart: () => void;
}

export function AssessmentResults({ result, onRestart }: AssessmentResultsProps) {
  const getRecommendationIcon = () => {
    switch (result.recommendation) {
      case 'yes':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'maybe':
        return <AlertCircle className="h-8 w-8 text-yellow-500" />;
      case 'no':
        return <XCircle className="h-8 w-8 text-red-500" />;
    }
  };

  const getRecommendationColor = () => {
    switch (result.recommendation) {
      case 'yes':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'maybe':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'no':
        return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  const getRecommendationTitle = () => {
    switch (result.recommendation) {
      case 'yes':
        return 'Excellent Fit!';
      case 'maybe':
        return 'Good Potential';
      case 'no':
        return 'Consider Alternatives';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Hero Results Section */}
      <div className="bg-gradient-hero text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-6">Your Assessment Results</h1>
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-lg border-2 ${getRecommendationColor()}`}>
            {getRecommendationIcon()}
            <span className="text-2xl font-semibold">{getRecommendationTitle()}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Overall Score */}
        <Card className="mb-8 shadow-medium">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Overall Compatibility Score</CardTitle>
            <CardDescription>Your fit for an E-learning Specialist career</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
              <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20"></div>
              <span className="text-4xl font-bold">{result.overallScore}</span>
            </div>
            <Progress value={result.overallScore} className="w-full max-w-md mx-auto h-4 mb-4" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {result.recommendationReason}
            </p>
          </CardContent>
        </Card>

        {/* Detailed Scores */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-soft">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Psychometric
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold mb-2">{result.psychometricScore}</div>
              <Progress value={result.psychometricScore} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                Personality and motivation fit
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Technical
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold mb-2">{result.technicalScore}</div>
              <Progress value={result.technicalScore} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                Current technical readiness
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                WISCAR Avg
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold mb-2">
                {Math.round(
                  (result.wiscarScores.will +
                    result.wiscarScores.interest +
                    result.wiscarScores.skill +
                    result.wiscarScores.cognitive +
                    result.wiscarScores.ability +
                    result.wiscarScores.realWorldAlignment) / 6
                )}
              </div>
              <Progress 
                value={Math.round(
                  (result.wiscarScores.will +
                    result.wiscarScores.interest +
                    result.wiscarScores.skill +
                    result.wiscarScores.cognitive +
                    result.wiscarScores.ability +
                    result.wiscarScores.realWorldAlignment) / 6
                )} 
                className="mb-2" 
              />
              <p className="text-sm text-muted-foreground">
                Comprehensive readiness analysis
              </p>
            </CardContent>
          </Card>
        </div>

        {/* WISCAR Breakdown */}
        <Card className="mb-8 shadow-medium">
          <CardHeader>
            <CardTitle>WISCAR Framework Detailed Analysis</CardTitle>
            <CardDescription>
              Your readiness across six key dimensions for e-learning specialist success
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { key: 'will', label: 'Will (Commitment)', value: result.wiscarScores.will },
                { key: 'interest', label: 'Interest (Passion)', value: result.wiscarScores.interest },
                { key: 'skill', label: 'Skill (Current Abilities)', value: result.wiscarScores.skill },
                { key: 'cognitive', label: 'Cognitive (Problem-solving)', value: result.wiscarScores.cognitive },
                { key: 'ability', label: 'Ability (Learning Capacity)', value: result.wiscarScores.ability },
                { key: 'realWorldAlignment', label: 'Real-world Alignment', value: result.wiscarScores.realWorldAlignment }
              ].map((dimension) => (
                <div key={dimension.key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{dimension.label}</span>
                    <span className="text-sm font-semibold">{dimension.value}/100</span>
                  </div>
                  <Progress value={dimension.value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Career Roles */}
        <Card className="mb-8 shadow-medium">
          <CardHeader>
            <CardTitle>Recommended Career Roles</CardTitle>
            <CardDescription>
              E-learning roles ranked by your compatibility score
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {result.careerRoles.map((role, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div className="flex-1">
                    <h3 className="font-semibold">{role.title}</h3>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{role.matchScore}%</div>
                    <Progress value={role.matchScore} className="w-24" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8 shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Your Next Steps
            </CardTitle>
            <CardDescription>
              Personalized recommendations based on your assessment results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {result.nextSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">{index + 1}</Badge>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Path */}
        <Card className="mb-8 shadow-medium">
          <CardHeader>
            <CardTitle>Suggested Learning Path</CardTitle>
            <CardDescription>
              Progressive steps to build your e-learning specialist expertise
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {result.learningPath.map((phase, index) => (
                <Badge key={index} variant="secondary" className="px-4 py-2">
                  {index + 1}. {phase}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="gradient" size="lg" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Report
            </Button>
            <Button variant="outline" size="lg" className="flex items-center gap-2">
              <Share className="h-4 w-4" />
              Share Results
            </Button>
            <Button variant="secondary" size="lg" onClick={onRestart}>
              Take Assessment Again
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Your results are based on current industry standards and validated assessment frameworks. 
            Continue developing your skills and consider retaking this assessment as you grow.
          </p>
        </div>
      </div>
    </div>
  );
}