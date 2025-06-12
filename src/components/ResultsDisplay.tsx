import { useState } from 'react';
import { colors, getTierName, getTierColor } from '../lib/colors';

// Define the result type
export type SportResult = {
  sportName: string;
  systemScore: number;
  userScore?: number;
  categoryScores: {
    [key: string]: number;
  };
  userCategoryScores?: {
    [key: string]: number;
  };
  scoreDifference?: number;
  significantDifference?: boolean;
  userSubmissionCount?: number;
};

type ResultsDisplayProps = {
  result: SportResult;
  onCompare: () => void;
  onTryAnother: () => void;
};

const ResultsDisplay = ({ result, onCompare, onTryAnother }: ResultsDisplayProps) => {
  const [activeTab, setActiveTab] = useState<'system' | 'user'>('system');
  
  // Format score for display
  const formatScore = (score: number) => {
    return score.toFixed(1);
  };
  
  // Get the active score based on the selected tab
  const activeScore = activeTab === 'system' ? result.systemScore : (result.userScore || 0);
  const activeTier = getTierName(activeScore);
  const activeTierColor = getTierColor(activeScore);
  
  // Category names and their display names
  const categories = [
    { key: 'physicalExertion', name: 'Physical Exertion' },
    { key: 'skill', name: 'Skill' },
    { key: 'competition', name: 'Competition' },
    { key: 'rules', name: 'Rules' },
    { key: 'governingBodies', name: 'Governing Bodies' },
    { key: 'entertainmentValue', name: 'Entertainment Value' },
    { key: 'physicalMentalBalance', name: 'Physical vs. Mental' },
  ];
  
  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 
        className="text-3xl font-bold mb-2"
        style={{ color: colors.text.primary }}
      >
        {result.sportName}
      </h1>
      
      {/* Score display */}
      <div className="w-full mb-8">
        {/* Tabs for System/User scores */}
        {result.userScore && (
          <div className="flex border-b mb-6">
            <button
              className={`flex-1 py-3 font-semibold ${activeTab === 'system' ? 'border-b-2' : ''}`}
              style={{ 
                borderColor: activeTab === 'system' ? colors.primary.red : 'transparent',
                color: activeTab === 'system' ? colors.primary.red : colors.text.secondary
              }}
              onClick={() => setActiveTab('system')}
            >
              System Score
            </button>
            <button
              className={`flex-1 py-3 font-semibold ${activeTab === 'user' ? 'border-b-2' : ''}`}
              style={{ 
                borderColor: activeTab === 'user' ? colors.primary.blue : 'transparent',
                color: activeTab === 'user' ? colors.primary.blue : colors.text.secondary
              }}
              onClick={() => setActiveTab('user')}
            >
              User Score {result.userSubmissionCount ? `(${result.userSubmissionCount})` : ''}
            </button>
          </div>
        )}
        
        {/* Score and tier */}
        <div className="flex flex-col items-center">
          <div 
            className="text-7xl font-bold mb-2"
            style={{ color: activeTierColor }}
          >
            {formatScore(activeScore)}
          </div>
          <div 
            className="text-xl font-semibold px-6 py-2 rounded-full"
            style={{ 
              backgroundColor: activeTierColor,
              color: colors.text.white
            }}
          >
            {activeTier}
          </div>
          
          {/* Score difference */}
          {activeTab === 'user' && result.scoreDifference !== undefined && (
            <div 
              className="mt-4 text-sm px-4 py-1 rounded-full"
              style={{ 
                backgroundColor: result.significantDifference ? colors.status.warning : colors.status.info,
                color: colors.text.white
              }}
            >
              {result.significantDifference ? 'Significant difference' : 'Close agreement'} with system score: 
              {result.scoreDifference > 0 ? ' +' : ' '}
              {result.scoreDifference.toFixed(1)} points
            </div>
          )}
        </div>
      </div>
      
      {/* Category scores */}
      <div className="w-full mb-8">
        <h3 
          className="text-lg font-semibold mb-4"
          style={{ color: colors.text.primary }}
        >
          Category Breakdown
        </h3>
        
        <div className="space-y-4">
          {categories.map((category) => {
            const categoryKey = category.key as keyof typeof result.categoryScores;
            const score = activeTab === 'system' 
              ? result.categoryScores[categoryKey] || 0
              : (result.userCategoryScores?.[categoryKey] || 0);
            
            return (
              <div key={category.key} className="w-full">
                <div className="flex justify-between mb-1">
                  <span style={{ color: colors.text.secondary }}>{category.name}</span>
                  <span style={{ color: colors.text.secondary }}>{Math.round(score)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full" 
                    style={{ 
                      width: `${score}%`,
                      backgroundColor: getCategoryColor(category.name)
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <button
          className="flex-1 px-6 py-3 rounded-full font-bold text-white"
          style={{ backgroundColor: colors.primary.blue }}
          onClick={onCompare}
        >
          Compare with Other Sports
        </button>
        <button
          className="flex-1 px-6 py-3 rounded-full font-bold"
          style={{ 
            backgroundColor: 'transparent',
            color: colors.primary.red,
            border: `2px solid ${colors.primary.red}`
          }}
          onClick={onTryAnother}
        >
          Rate Another Sport
        </button>
      </div>
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
    'Physical vs. Mental': colors.categories.physicalMentalBalance,
  };
  
  return categoryMap[category] || colors.primary.blue;
}

export default ResultsDisplay;
