// Shared constants for consistent styling and data across the application

export const categoryColors: Record<string, string> = {
  skills: 'bg-info/10 text-info border-info/20',
  behavioural: 'bg-success/10 text-success border-success/20',
  aptitude: 'bg-warning/10 text-warning border-warning/20',
};

export const statusColors: Record<string, string> = {
  invited: 'bg-info/10 text-info',
  in_progress: 'bg-warning/10 text-warning',
  completed: 'bg-success/10 text-success',
  expired: 'bg-destructive/10 text-destructive',
  pending: 'bg-muted text-muted-foreground',
  active: 'bg-success/10 text-success',
  archived: 'bg-muted text-muted-foreground',
};

export const roleStatusColors: Record<string, string> = {
  active: 'bg-success/10 text-success',
  completed: 'bg-info/10 text-info',
  archived: 'bg-muted text-muted-foreground',
};

// User role colors for team management
export const userRoleColors: Record<string, string> = {
  admin: 'bg-purple-100 text-purple-700 border-purple-200',
  manager: 'bg-info/10 text-info border-info/20',
  recruiter: 'bg-success/10 text-success border-success/20',
  viewer: 'bg-muted text-muted-foreground border-muted',
};

// User status colors for team management
export const userStatusColors: Record<string, string> = {
  active: 'bg-success/10 text-success border-success/20',
  pending: 'bg-warning/10 text-warning border-warning/20',
  deactivated: 'bg-muted text-muted-foreground border-muted',
};


// Payment method type colors
export const paymentMethodColors: Record<string, string> = {
  credit_card: 'bg-info/10 text-info border-info/20',
  bank_transfer: 'bg-success/10 text-success border-success/20',
  invoice: 'bg-muted text-muted-foreground border-muted',
};

export const countryCodes = [
  { code: '+61', country: 'AU', flag: '🇦🇺' },
  { code: '+64', country: 'NZ', flag: '🇳🇿' },
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+65', country: 'SG', flag: '🇸🇬' },
  { code: '+91', country: 'IN', flag: '🇮🇳' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+81', country: 'JP', flag: '🇯🇵' },
] as const;

export type CountryCode = typeof countryCodes[number];

// Industries list
export const industries = [
  'Agriculture',
  'Automotive',
  'Banking & Finance',
  'Construction',
  'Consulting',
  'Education',
  'Energy & Utilities',
  'Entertainment & Media',
  'Government',
  'Healthcare',
  'Hospitality & Tourism',
  'Information Technology',
  'Insurance',
  'Legal',
  'Manufacturing',
  'Mining',
  'Non-Profit',
  'Pharmaceuticals',
  'Real Estate',
  'Retail',
  'Telecommunications',
  'Transportation & Logistics',
  'Other',
] as const;

// Company sizes
export const companySizes = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-500', label: '201-500 employees' },
  { value: '501-1000', label: '501-1000 employees' },
  { value: '1000+', label: '1000+ employees' },
] as const;

// Timezones (most common)
export const timezones = [
  { value: 'Pacific/Auckland', label: '(UTC+12:00) Auckland' },
  { value: 'Australia/Sydney', label: '(UTC+10:00) Sydney' },
  { value: 'Australia/Brisbane', label: '(UTC+10:00) Brisbane' },
  { value: 'Australia/Melbourne', label: '(UTC+10:00) Melbourne' },
  { value: 'Australia/Perth', label: '(UTC+08:00) Perth' },
  { value: 'Asia/Singapore', label: '(UTC+08:00) Singapore' },
  { value: 'Asia/Hong_Kong', label: '(UTC+08:00) Hong Kong' },
  { value: 'Asia/Tokyo', label: '(UTC+09:00) Tokyo' },
  { value: 'Asia/Shanghai', label: '(UTC+08:00) Shanghai' },
  { value: 'Asia/Kolkata', label: '(UTC+05:30) Mumbai' },
  { value: 'Asia/Dubai', label: '(UTC+04:00) Dubai' },
  { value: 'Europe/London', label: '(UTC+00:00) London' },
  { value: 'Europe/Paris', label: '(UTC+01:00) Paris' },
  { value: 'Europe/Berlin', label: '(UTC+01:00) Berlin' },
  { value: 'America/New_York', label: '(UTC-05:00) New York' },
  { value: 'America/Chicago', label: '(UTC-06:00) Chicago' },
  { value: 'America/Denver', label: '(UTC-07:00) Denver' },
  { value: 'America/Los_Angeles', label: '(UTC-08:00) Los Angeles' },
] as const;

// Date formats
export const dateFormats = [
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (31/12/2024)' },
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (12/31/2024)' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (2024-12-31)' },
  { value: 'DD MMM YYYY', label: 'DD MMM YYYY (31 Dec 2024)' },
  { value: 'MMM DD, YYYY', label: 'MMM DD, YYYY (Dec 31, 2024)' },
] as const;

// Languages
export const languages = [
  { value: 'en-AU', label: 'English (Australia)' },
  { value: 'en-US', label: 'English (US)' },
  { value: 'en-GB', label: 'English (UK)' },
  { value: 'en-NZ', label: 'English (New Zealand)' },
] as const;

// Currencies
export const currencies = [
  { value: 'AUD', label: 'AUD - Australian Dollar', symbol: '$' },
  { value: 'USD', label: 'USD - US Dollar', symbol: '$' },
  { value: 'EUR', label: 'EUR - Euro', symbol: '€' },
  { value: 'GBP', label: 'GBP - British Pound', symbol: '£' },
  { value: 'NZD', label: 'NZD - New Zealand Dollar', symbol: '$' },
  { value: 'SGD', label: 'SGD - Singapore Dollar', symbol: '$' },
  { value: 'INR', label: 'INR - Indian Rupee', symbol: '₹' },
] as const;

// Countries list
export const countries = [
  'Australia',
  'New Zealand',
  'United States',
  'United Kingdom',
  'Canada',
  'Singapore',
  'Hong Kong',
  'India',
  'Germany',
  'France',
  'Japan',
  'China',
  'Netherlands',
  'Ireland',
  'Switzerland',
] as const;

// Credit tiers with volume discounts ($5 base per credit)
export const creditTiers = [
  { quantity: 20, discount: 0, pricePerCredit: 5.00 },
  { quantity: 50, discount: 10, pricePerCredit: 4.50 },
  { quantity: 100, discount: 15, pricePerCredit: 4.25 },
  { quantity: 250, discount: 20, pricePerCredit: 4.00 },
  { quantity: 500, discount: 25, pricePerCredit: 3.75 },
  { quantity: 1000, discount: 30, pricePerCredit: 3.50 },
] as const;

export type CreditTier = typeof creditTiers[number];

// Credit cost ranges by category (for reference)
export const creditCostRanges = {
  skills: { min: 4, max: 10 },
  behavioural: { min: 5, max: 9 },
  aptitude: { min: 6, max: 9 },
} as const;

// Calculate credit cost from price (1 credit = $5 base)
export const calculateCreditCost = (price: number): number => {
  return Math.round(price / 5);
};

export const getCreditTierPrice = (quantity: number) => {
  const tier = creditTiers.find(t => t.quantity === quantity);
  if (!tier) return null;
  const basePrice = 5;
  return {
    total: Math.round(tier.pricePerCredit * quantity),
    savings: Math.round(basePrice * quantity * (tier.discount / 100)),
    pricePerCredit: tier.pricePerCredit,
    discount: tier.discount,
  };
};

// Address types
export const addressTypes = [
  { value: 'headquarters', label: 'Headquarters' },
  { value: 'branch', label: 'Branch Office' },
  { value: 'remote', label: 'Remote Office' },
  { value: 'billing', label: 'Billing Address' },
] as const;
