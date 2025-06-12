import { useState } from 'react';
import { colors } from '../lib/colors';
import { SportResult } from './ResultsDisplay';

type ComparisonViewProps = {
  sports: SportResult[];
  onBack: () => void;
  onSelectSport: (sportName: string) => void;
};

const ComparisonView = ({ sports, onBack, onSelectSport }: ComparisonViewProps) => {
  const [comparisonType, setComparisonType] = useState<'system' | 'user'>('system');
  
  // Sort sports by selected score type
  const sortedSports = [...sports].sort((a, b) => {
    const aScore = comparisonType === 'system' ? a.systemScore : (a.userScore || 0);
    const bScore = comparisonType === 'system' ? b.systemScore : (b.userScore || 0);
    return bScore - aScore;
  });
  
  // Format score for display
  const formatScore = (score: number | undefined) => {
    return score !== undefined ? score.toFixed(1) : 'N/A';
  };
  
  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 
        className="text-2xl font-bold mb-6"
        style={{ color: colors.text.primary }}
      >
        Sport Comparison
      </h1>
      
      {/* Tabs for System/User scores */}
      <div className="flex border-b mb-6 w-full">
        <button
          className={`flex-1 py-3 font-semibold ${comparisonType === 'system' ? 'border-b-2' : ''}`}
          style={{ 
            borderColor: comparisonType === 'system' ? colors.primary.red : 'transparent',
            color: comparisonType === 'system' ? colors.primary.red : colors.text.secondary
          }}
          onClick={() => setComparisonType('system')}
        >
          System Scores
        </button>
        <button
          className={`flex-1 py-3 font-semibold ${comparisonType === 'user' ? 'border-b-2' : ''}`}
          style={{ 
            borderColor: comparisonType === 'user' ? colors.primary.blue : 'transparent',
            color: comparisonType === 'user' ? colors.primary.blue : colors.text.secondary
          }}
          onClick={() => setComparisonType('user')}
        >
          User Scores
        </button>
      </div>
      
      {/* Sport comparison list */}
      <div className="w-full mb-8">
        {sortedSports.map((sport, index) => {
          const score = comparisonType === 'system' ? sport.systemScore : (sport.userScore || 0);
          const hasUserScore = sport.userScore !== undefined;
          
          return (
            <div 
              key={sport.sportName}
              className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => onSelectSport(sport.sportName)}
            >
              <div className="flex-shrink-0 w-8 text-center font-bold" style={{ color: colors.text.secondary }}>
                {index + 1}
              </div>
              <div className="flex-grow ml-4">
                <div className="font-semibold" style={{ color: colors.text.primary }}>
                  {sport.sportName}
                </div>
                {comparisonType === 'user' && !hasUserScore && (
                  <div className="text-xs" style={{ color: colors.text.muted }}>
                    No user ratings yet
                  </div>
                )}
              </div>
              <div 
                className="flex-shrink-0 text-xl font-bold"
                style={{ 
                  color: comparisonType === 'system' ? colors.primary.red : colors.primary.blue,
                  opacity: comparisonType === 'user' && !hasUserScore ? 0.3 : 1
                }}
              >
                {formatScore(comparisonType === 'system' ? sport.systemScore : sport.userScore)}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Insights section */}
      <div className="w-full mb-8 p-4 rounded-lg" style={{ backgroundColor: colors.ui.card }}>
        <h3 
          className="text-lg font-semibold mb-3"
          style={{ color: colors.text.primary }}
        >
          Comparison Insights
        </h3>
        
        <div className="space-y-3">
          <div>
            <div className="font-medium mb-1" style={{ color: colors.text.primary }}>
              Most "Sporty" Activity
            </div>
            <div style={{ color: colors.text.secondary }}>
              {sortedSports.length > 0 ? sortedSports[0].sportName : 'None'} 
              ({formatScore(comparisonType === 'system' 
                ? sortedSports[0]?.systemScore 
                : sortedSports[0]?.userScore)})
            </div>
          </div>
          
          <div>
            <div className="font-medium mb-1" style={{ color: colors.text.primary }}>
              Least "Sporty" Activity
            </div>
            <div style={{ color: colors.text.secondary }}>
              {sortedSports.length > 0 ? sortedSports[sortedSports.length - 1].sportName : 'None'} 
              ({formatScore(comparisonType === 'system' 
                ? sortedSports[sortedSports.length - 1]?.systemScore 
                : sortedSports[sortedSports.length - 1]?.userScore)})
            </div>
          </div>
          
          {comparisonType === 'user' && (
            <div>
              <div className="font-medium mb-1" style={{ color: colors.text.primary }}>
                Most Controversial
              </div>
              <div style={{ color: colors.text.secondary }}>
                {getMostControversial(sports)?.sportName || 'None'} 
                ({getMostControversial(sports)?.scoreDifference?.toFixed(1) || 'N/A'} point difference)
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Back button */}
      <button
        className="px-8 py-3 rounded-full font-bold"
        style={{ 
          backgroundColor: 'transparent',
          color: colors.primary.blue,
          border: `2px solid ${colors.primary.blue}`
        }}
        onClick={onBack}
      >
        Back to Results
      </button>
    </div>
  );
};

// Helper function to get the most controversial sport
function getMostControversial(sports: SportResult[]): SportResult | undefined {
  const sportsWithDifference = sports.filter(
    sport => sport.scoreDifference !== undefined
  );
  
  if (sportsWithDifference.length === 0) return undefined;
  
  return sportsWithDifference.reduce((prev, current) => {
    const prevDiff = Math.abs(prev.scoreDifference || 0);
    const currentDiff = Math.abs(current.scoreDifference || 0);
    return currentDiff > prevDiff ? current : prev;
  });
}

export default ComparisonView;
