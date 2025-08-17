import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Users, TrendingUp } from 'lucide-react';

interface AssessmentIntroProps {
  onStartAssessment: () => void;
}

export function AssessmentIntro({ onStartAssessment }: AssessmentIntroProps) {
  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Hero Section */}
      <div className="relative bg-gradient-hero text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6">
            E-learning Specialist Career Assessment
          </h1>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Discover if becoming an E-learning Specialist is the right career move for you. 
            Get personalized insights based on your skills, interests, and aptitude.
          </p>
          <Button 
            variant="hero" 
            size="lg" 
            onClick={onStartAssessment}
            className="text-lg px-8 py-4 h-auto"
          >
            Start Assessment
          </Button>
        </div>
      </div>

      {/* What is an E-learning Specialist Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What is an E-learning Specialist?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A professional who designs, develops, and delivers engaging online learning experiences 
            using technology, instructional design principles, multimedia, and analytics.
          </p>
        </div>

        {/* Career Roles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: 'E-learning Specialist',
              description: 'Design and develop comprehensive online learning programs',
              skills: ['Instructional Design', 'LMS Management', 'Content Creation']
            },
            {
              title: 'Learning Technologist',
              description: 'Implement and support learning technologies and platforms',
              skills: ['Technical Support', 'Platform Integration', 'Training']
            },
            {
              title: 'Instructional Designer',
              description: 'Create effective learning materials and curricula',
              skills: ['Curriculum Design', 'Assessment Creation', 'Learning Theory']
            },
            {
              title: 'Digital Learning Developer',
              description: 'Build interactive multimedia learning content',
              skills: ['Multimedia Production', 'Interactive Design', 'Web Technologies']
            },
            {
              title: 'LMS Administrator',
              description: 'Manage learning management systems and user experience',
              skills: ['System Administration', 'User Management', 'Data Analytics']
            },
            {
              title: 'Learning Experience Designer',
              description: 'Focus on user experience and engagement in learning',
              skills: ['UX Design', 'User Research', 'Engagement Strategy']
            }
          ].map((role, index) => (
            <Card key={index} className="h-full shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader>
                <CardTitle className="text-lg">{role.title}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {role.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Traits Section */}
        <Card className="mb-16 shadow-medium">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Key Success Traits</CardTitle>
            <CardDescription>
              Essential skills and personality traits for thriving as an E-learning Specialist
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <CheckCircle className="h-6 w-6 text-accent" />,
                  title: 'Technical Proficiency',
                  description: 'Comfort with authoring tools, LMS platforms, and multimedia technologies'
                },
                {
                  icon: <Users className="h-6 w-6 text-accent" />,
                  title: 'Collaboration Skills',
                  description: 'Ability to work with diverse teams and stakeholders effectively'
                },
                {
                  icon: <TrendingUp className="h-6 w-6 text-accent" />,
                  title: 'Analytical Mindset',
                  description: 'Skills in analyzing learning data and improving educational outcomes'
                },
                {
                  icon: <CheckCircle className="h-6 w-6 text-accent" />,
                  title: 'Creative Problem-Solving',
                  description: 'Innovation in digital content creation and engagement strategies'
                },
                {
                  icon: <Users className="h-6 w-6 text-accent" />,
                  title: 'Continuous Learning',
                  description: 'Adaptability and willingness to stay current with emerging technologies'
                },
                {
                  icon: <TrendingUp className="h-6 w-6 text-accent" />,
                  title: 'Communication Excellence',
                  description: 'Clear communication with learners, teams, and technical stakeholders'
                }
              ].map((trait, index) => (
                <div key={index} className="flex items-start space-x-3">
                  {trait.icon}
                  <div>
                    <h3 className="font-semibold mb-1">{trait.title}</h3>
                    <p className="text-sm text-muted-foreground">{trait.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assessment Overview */}
        <Card className="shadow-medium">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Assessment Overview</CardTitle>
            <CardDescription>
              This comprehensive assessment evaluates your fit across multiple dimensions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Clock className="h-8 w-8 text-primary" />,
                  title: 'Psychometric Analysis',
                  description: 'Personality compatibility, interests, and motivation assessment',
                  duration: '5-7 minutes'
                },
                {
                  icon: <CheckCircle className="h-8 w-8 text-primary" />,
                  title: 'Technical Evaluation',
                  description: 'Current knowledge of e-learning tools, technologies, and best practices',
                  duration: '8-10 minutes'
                },
                {
                  icon: <TrendingUp className="h-8 w-8 text-primary" />,
                  title: 'WISCAR Framework',
                  description: 'Comprehensive readiness analysis across six key dimensions',
                  duration: '7-9 minutes'
                }
              ].map((section, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">{section.icon}</div>
                  <h3 className="font-semibold mb-2">{section.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{section.description}</p>
                  <Badge variant="outline">{section.duration}</Badge>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground mb-4">
                Total estimated time: 20-30 minutes
              </p>
              <Button 
                variant="gradient" 
                size="lg" 
                onClick={onStartAssessment}
                className="text-lg px-8 py-4 h-auto"
              >
                Begin Your Assessment Journey
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}