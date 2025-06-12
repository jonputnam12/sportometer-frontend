import { useState } from 'react';
import { colors } from '../lib/colors';

// Define the question type
export type Question = {
  id: number;
  text: string;
  category: string;
  weight: number;
  inverted?: boolean;
};

// Define the response type
export type Response = {
  questionId: number;
  value: number;
};

// Define the props for the QuestionnaireStep component
type QuestionnaireStepProps = {
  question: Question;
  currentStep: number;
  totalSteps: number;
  onAnswer: (response: Response) => void;
  onNext: () => void;
  selectedValue: number | null;
};

// Scale labels
const scaleLabels = [
  'Not at all',
  'Slightly',
  'Sometimes',
  'Often',
  'Definitely'
];

const QuestionnaireStep = ({
  question,
  currentStep,
  totalSteps,
  onAnswer,
  onNext,
  selectedValue
}: QuestionnaireStepProps) => {
  // Handle radio button change
  const handleChange = (value: number) => {
    onAnswer({ questionId: question.id, value });
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Progress bar and step counter */}
      <div className="w-full mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span style={{ color: colors.text.secondary }}>Question {currentStep} of {totalSteps}</span>
          <span style={{ color: colors.text.secondary }}>{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="h-2.5 rounded-full" 
            style={{ 
              width: `${(currentStep / totalSteps) * 100}%`,
              backgroundColor: colors.primary.red
            }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="w-full mb-8">
        <h2 
          className="text-xl font-bold mb-2 text-center"
          style={{ color: colors.text.primary }}
        >
          {question.text}
        </h2>
        <div 
          className="text-sm text-center px-4 py-1 rounded-full inline-block"
          style={{ 
            backgroundColor: getCategoryColor(question.category),
            color: colors.text.white
          }}
        >
          {question.category}
        </div>
      </div>

      {/* Radio buttons */}
      <div className="w-full grid grid-cols-5 gap-2 mb-8">
        {[1, 2, 3, 4, 5].map((value) => (
          <div key={value} className="flex flex-col items-center">
            <button
              className="w-12 h-12 rounded-full mb-2 flex items-center justify-center border-2 focus:outline-none transition-all"
              style={{
                backgroundColor: selectedValue === value ? colors.primary.blue : 'white',
                borderColor: selectedValue === value ? colors.primary.blue : colors.ui.border,
                color: selectedValue === value ? 'white' : colors.text.primary,
              }}
              onClick={() => handleChange(value)}
            >
              {value}
            </button>
            <span className="text-xs text-center" style={{ color: colors.text.secondary }}>
              {scaleLabels[value - 1]}
            </span>
          </div>
        ))}
      </div>

      {/* Next button */}
      <button
        className="px-8 py-3 rounded-full font-bold text-white transition-all"
        style={{ 
          backgroundColor: selectedValue ? colors.primary.red : colors.text.light,
          cursor: selectedValue ? 'pointer' : 'not-allowed'
        }}
        onClick={onNext}
        disabled={!selectedValue}
      >
        Next Question
      </button>
    </div>
  );
};

// Helper function to get category color
function getCategoryColor(category: string): string {
  const categoryMap: {[key: string]: string} = {
    'Physical Exertion': colors.categories.physicalExertion,
    'Skill': colors.categories.skill,
    'Competition': colors.categories.competition,
    'Rules': colors.categories.rules,
    'Governing Bodies': colors.categories.governingBodies,
    'Entertainment Value': colors.categories.entertainmentValue,
    'Physical vs. Mental Balance': colors.categories.physicalMentalBalance,
  };
  
  return categoryMap[category] || colors.primary.blue;
}

export default QuestionnaireStep;
