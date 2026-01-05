// App theme constants
export const COLORS = {
  PRIMARY: '#FF6B35',      // Orange
  SECONDARY: '#004E89',    // Blue
  SUCCESS: '#4CAF50',      // Green
  WARNING: '#FFA500',      // Orange
  ERROR: '#F44336',        // Red
  LIGHT: '#f5f5f5',        // Light gray
  WHITE: '#ffffff',
  DARK: '#333333',
  GRAY: '#999999',
  BORDER: '#dddddd',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const FONT_SIZES = {
  xs: 11,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 24,
  xxxl: 28,
};

export const FONT_WEIGHTS = {
  light: '300',
  normal: '400',
  medium: '500',
  bold: '700',
  bolder: '800',
} as const;

// Feature flags
export const FEATURES = {
  PAYMENT_INTEGRATION: false,
  USER_RATINGS: false,
  FAVORITES: false,
  COUPONS: false,
};
