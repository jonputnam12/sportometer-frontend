import { useState } from 'react';
import SportInput from './components/SportInput';
import QuestionnaireStep, { Question, Response } from './components/QuestionnaireStep';
import ResultsDisplay, { SportResult } from './components/ResultsDisplay';
import ComparisonView from './components/ComparisonView';
import { colors } from './lib/colors';
import './App.css';

// Sample questions data
const sampleQuestions: Question[] = [
  {
    id: 1,
    text: "Does it require physical endurance?",
    category: "Physical Exertion",
    weight: 2.0
  },
  {
    id: 2,
    text: "Does it require athleticism?",
    category: "Physical Exertion",
    weight: 2.0
  },
  {
    id: 3,
    text: "Would most participants experience elevated heart rate or physical fatigue at any point during normal play?",
    category: "Physical Exertion",
    weight: 1.5
  },
  {
    id: 4,
    text: "Does the sport require bursts of high-intensity movement (sprinting, jumping, explosive power)?",
    category: "Physical Exertion",
    weight: 1.5
  },
  {
    id: 5,
    text: "Would most participants consider it a workout?",
    category: "Physical Exertion",
    weight: 1.0
  },
  {
    id: 6,
    text: "Does success in the sport require fine motor skills or precise coordination?",
    category: "Skill",
    weight: 1.5
  },
  {
    id: 7,
    text: "Can a beginner compete effectively against an experienced player?",
    category: "Skill",
    weight: 1.5,
    inverted: true
  },
  {
    id: 8,
    text: "Is there a steep learning curve for newcomers?",
    category: "Skill",
    weight: 1.0
  },
  // More questions would be added here...
];

// Sample sports data for comparison
const sampleSports: SportResult[] = [
  {
    sportName: "Basketball",
    systemScore: 108.8,
    userScore: 106.5,
    categoryScores: {
      physicalExertion: 100,
      skill: 90,
      competition: 95,
      rules: 85,
      governingBodies: 90,
      entertainmentValue: 95,
      physicalMentalBalance: 85
    },
    userCategoryScores: {
      physicalExertion: 95,
      skill: 88,
      competition: 92,
      rules: 82,
      governingBodies: 88,
      entertainmentValue: 96,
      physicalMentalBalance: 82
    },
    scoreDifference: 2.3,
    significantDifference: false,
    userSubmissionCount: 128
  },
  {
    sportName: "Chess",
    systemScore: 78.5,
    userScore: 88.5,
    categoryScores: {
      physicalExertion: 20,
      skill: 100,
      competition: 100,
      rules: 85,
      governingBodies: 80,
      entertainmentValue: 70,
      physicalMentalBalance: 40
    },
    userCategoryScores: {
      physicalExertion: 40,
      skill: 100,
      competition: 100,
      rules: 85,
      governingBodies: 80,
      entertainmentValue: 75,
      physicalMentalBalance: 50
    },
    scoreDifference: -10.0,
    significantDifference: false,
    userSubmissionCount: 95
  },
  {
    sportName: "Golf",
    systemScore: 85.2,
    userScore: 82.8,
    categoryScores: {
      physicalExertion: 60,
      skill: 95,
      competition: 90,
      rules: 90,
      governingBodies: 95,
      entertainmentValue: 75,
      physicalMentalBalance: 80
    },
    userCategoryScores: {
      physicalExertion: 55,
      skill: 95,
      competition: 85,
      rules: 90,
      governingBodies: 95,
      entertainmentValue: 70,
      physicalMentalBalance: 80
    },
    scoreDifference: 2.4,
    significantDifference: false,
    userSubmissionCount: 87
  },
  {
    sportName: "E-Sports",
    systemScore: 65.8,
    userScore: 82.3,
    categoryScores: {
      physicalExertion: 30,
      skill: 90,
      competition: 95,
      rules: 80,
      governingBodies: 70,
      entertainmentValue: 85,
      physicalMentalBalance: 40
    },
    userCategoryScores: {
      physicalExertion: 50,
      skill: 95,
      competition: 95,
      rules: 85,
      governingBodies: 80,
      entertainmentValue: 90,
      physicalMentalBalance: 60
    },
    scoreDifference: -16.5,
    significantDifference: true,
    userSubmissionCount: 156
  },
  {
    sportName: "Bowling",
    systemScore: 72.4,
    userScore: 68.9,
    categoryScores: {
      physicalExertion: 50,
      skill: 85,
      competition: 80,
      rules: 70,
      governingBodies: 75,
      entertainmentValue: 65,
      physicalMentalBalance: 70
    },
    userCategoryScores: {
      physicalExertion: 45,
      skill: 80,
      competition: 75,
      rules: 70,
      governingBodies: 70,
      entertainmentValue: 65,
      physicalMentalBalance: 65
    },
    scoreDifference: 3.5,
    significantDifference: false,
    userSubmissionCount: 62
  },
  {
    sportName: "Poker",
    systemScore: 58.6,
    userScore: 45.2,
    categoryScores: {
      physicalExertion: 10,
      skill: 85,
      competition: 90,
      rules: 75,
      governingBodies: 60,
      entertainmentValue: 80,
      physicalMentalBalance: 30
    },
    userCategoryScores: {
      physicalExertion: 5,
      skill: 70,
      competition: 80,
      rules: 60,
      governingBodies: 40,
      entertainmentValue: 65,
      physicalMentalBalance: 20
    },
    scoreDifference: 13.4,
    significantDifference: false,
    userSubmissionCount: 78
  }
];

// App states
type AppState = 'input' | 'questionnaire' | 'results' | 'comparison';

function App() {
  const [appState, setAppState] = useState<AppState>('input');
  const [currentSport, setCurrentSport] = useState<string>('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<{[key: number]: number}>({});
  const [currentResult, setCurrentResult] = useState<SportResult | null>(null);
  
  // Handle sport input submission
  const handleSportSubmit = (sportName: string) => {
    setCurrentSport(sportName);
    setAppState('questionnaire');
    setCurrentQuestionIndex(0);
    setResponses({});
  };
  
  // Handle question response
  const handleQuestionResponse = (response: Response) => {
    setResponses({
      ...responses,
      [response.questionId]: response.value
    });
  };
  
  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate result
      calculateResult();
    }
  };
  
  // Calculate result based on responses
  const calculateResult = () => {
    // In a real implementation, this would call the API
    // For the mockup, we'll generate a sample result
    
    // Find an existing sport or create a new one
    const existingSport = sampleSports.find(
      sport => sport.sportName.toLowerCase() === currentSport.toLowerCase()
    );
    
    if (existingSport) {
      setCurrentResult(existingSport);
    } else {
      // Generate a random score between 50 and 100
      const randomScore = Math.floor(Math.random() * 50) + 50;
      
      const newResult: SportResult = {
        sportName: currentSport,
        systemScore: randomScore,
        categoryScores: {
          physicalExertion: Math.floor(Math.random() * 100),
          skill: Math.floor(Math.random() * 100),
          competition: Math.floor(Math.random() * 100),
          rules: Math.floor(Math.random() * 100),
          governingBodies: Math.floor(Math.random() * 100),
          entertainmentValue: Math.floor(Math.random() * 100),
          physicalMentalBalance: Math.floor(Math.random() * 100)
        }
      };
      
      setCurrentResult(newResult);
    }
    
    setAppState('results');
  };
  
  // Handle comparison view
  const handleCompare = () => {
    setAppState('comparison');
  };
  
  // Handle try another sport
  const handleTryAnother = () => {
    setAppState('input');
    setCurrentSport('');
    setCurrentQuestionIndex(0);
    setResponses({});
    setCurrentResult(null);
  };
  
  // Handle back to results
  const handleBackToResults = () => {
    setAppState('results');
  };
  
  // Handle select sport from comparison
  const handleSelectSport = (sportName: string) => {
    const selectedSport = sampleSports.find(
      sport => sport.sportName === sportName
    );
    
    if (selectedSport) {
      setCurrentResult(selectedSport);
      setCurrentSport(sportName);
      setAppState('results');
    }
  };
  
  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: colors.ui.background }}>
      {appState === 'input' && (
        <SportInput onSubmit={handleSportSubmit} />
      )}
      
      {appState === 'questionnaire' && currentQuestionIndex < sampleQuestions.length && (
        <QuestionnaireStep
          question={sampleQuestions[currentQuestionIndex]}
          currentStep={currentQuestionIndex + 1}
          totalSteps={sampleQuestions.length}
          onAnswer={handleQuestionResponse}
          onNext={handleNextQuestion}
          selectedValue={responses[sampleQuestions[currentQuestionIndex].id] || null}
        />
      )}
      
      {appState === 'results' && currentResult && (
        <ResultsDisplay
          result={currentResult}
          onCompare={handleCompare}
          onTryAnother={handleTryAnother}
        />
      )}
      
      {appState === 'comparison' && (
        <ComparisonView
          sports={sampleSports}
          onBack={handleBackToResults}
          onSelectSport={handleSelectSport}
        />
      )}
    </div>
  );
}

export default App;
