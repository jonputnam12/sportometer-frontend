import { useState } from 'react';
import { colors } from '../lib/colors';

type SportInputProps = {
  onSubmit: (sportName: string) => void;
};

const SportInput = ({ onSubmit }: SportInputProps) => {
  const [sportName, setSportName] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  
  // Popular sports suggestions
  const popularSports = [
    'Basketball', 'Football', 'Baseball', 'Hockey', 
    'Soccer', 'Golf', 'Tennis', 'Swimming',
    'Chess', 'Poker', 'E-Sports', 'Bowling'
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sportName.trim()) {
      onSubmit(sportName.trim());
    }
  };
  
  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h1 
          className="text-4xl font-bold mb-3"
          style={{ color: colors.text.primary }}
        >
          Sportometer
        </h1>
        <p 
          className="text-lg"
          style={{ color: colors.text.secondary }}
        >
          How "sporty" is your activity? Let's find out!
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="w-full mb-8">
        <div className="relative">
          <input
            type="text"
            value={sportName}
            onChange={(e) => setSportName(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
            placeholder="Enter a sport or activity..."
            className="w-full px-6 py-4 text-lg rounded-full border-2 focus:outline-none transition-colors"
            style={{ 
              borderColor: isInputFocused ? colors.primary.blue : colors.ui.border,
              color: colors.text.primary
            }}
          />
          <button
            type="submit"
            className="absolute right-2 top-2 px-6 py-2 rounded-full font-bold text-white transition-all"
            style={{ 
              backgroundColor: sportName.trim() ? colors.primary.red : colors.text.light,
              cursor: sportName.trim() ? 'pointer' : 'not-allowed'
            }}
            disabled={!sportName.trim()}
          >
            Rate It
          </button>
        </div>
      </form>
      
      {/* Popular sports */}
      <div className="w-full">
        <h3 
          className="text-sm font-semibold mb-3"
          style={{ color: colors.text.secondary }}
        >
          Popular Activities
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularSports.map((sport) => (
            <button
              key={sport}
              className="px-4 py-2 rounded-full text-sm transition-colors"
              style={{ 
                backgroundColor: colors.ui.card,
                color: colors.text.secondary,
                border: `1px solid ${colors.ui.border}`
              }}
              onClick={() => {
                setSportName(sport);
                setTimeout(() => onSubmit(sport), 100);
              }}
            >
              {sport}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SportInput;
