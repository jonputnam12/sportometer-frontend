// Sportometer color palette based on user preferences
// Inspired by MLB, NFL, and NBA logos: bold reds, deep blues, whites, and touches of silver or black

export const colors = {
  // Primary colors
  primary: {
    red: '#DC1C2E',      // Bold red
    blue: '#002D72',     // Deep navy blue
    white: '#FFFFFF',    // Pure white
    silver: '#A7A8AA',   // Silver/gray
    black: '#000000',    // Black
  },
  
  // UI colors
  ui: {
    background: '#FFFFFF',
    card: '#F8F9FA',
    border: '#E9ECEF',
    hover: '#F1F3F5',
    focus: '#E9ECEF',
  },
  
  // Text colors
  text: {
    primary: '#212529',
    secondary: '#495057',
    muted: '#6C757D',
    light: '#ADB5BD',
    white: '#FFFFFF',
  },
  
  // Status colors
  status: {
    success: '#28A745',
    warning: '#FFC107',
    error: '#DC3545',
    info: '#17A2B8',
  },
  
  // Category colors for charts
  categories: {
    physicalExertion: '#DC1C2E',    // Red
    skill: '#002D72',               // Navy
    competition: '#0077C8',         // Bright blue
    rules: '#A7A8AA',               // Silver
    governingBodies: '#FFB81C',     // Gold
    entertainmentValue: '#E31837',  // Bright red
    physicalMentalBalance: '#00843D', // Green
  },
  
  // Tier colors
  tiers: {
    barelyASport: '#6C757D',        // Gray
    borderline: '#FFC107',          // Yellow
    sportIsh: '#17A2B8',            // Teal
    certifiedSport: '#0077C8',      // Blue
    eliteContender: '#DC1C2E',      // Red
  },
};

// Tier thresholds
export const tierThresholds = {
  barelyASport: { min: 0, max: 39.9 },
  borderline: { min: 40, max: 59.9 },
  sportIsh: { min: 60, max: 79.9 },
  certifiedSport: { min: 80, max: 94.9 },
  eliteContender: { min: 95, max: 120 },
};

// Tier names
export const tierNames = {
  barelyASport: 'Barely a Sport',
  borderline: 'Borderline',
  sportIsh: 'Sport-ish',
  certifiedSport: 'Certified Sport',
  eliteContender: 'Elite Contender',
};

// Get tier based on score
export const getTier = (score: number) => {
  if (score >= tierThresholds.eliteContender.min) return 'eliteContender';
  if (score >= tierThresholds.certifiedSport.min) return 'certifiedSport';
  if (score >= tierThresholds.sportIsh.min) return 'sportIsh';
  if (score >= tierThresholds.borderline.min) return 'borderline';
  return 'barelyASport';
};

// Get tier name based on score
export const getTierName = (score: number) => {
  return tierNames[getTier(score)];
};

// Get tier color based on score
export const getTierColor = (score: number) => {
  return colors.tiers[getTier(score)];
};
