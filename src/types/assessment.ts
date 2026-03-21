export interface Company {
  id: string;
  name: string;
  website?: string;
  country: string;
  industry: string;
  size: string;
  billingEmail: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  mobileCountryCode?: string;
  mobile?: string;
  jobTitle: string;
  companyId: string;
}

export interface Position {
  id: string;
  title: string;
  department?: string;
  location: string;
  category?: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'casual';
  seniority: 'entry' | 'mid' | 'senior' | 'manager' | 'executive';
  workArrangement?: 'on-site' | 'remote' | 'hybrid';
  vacancies?: number;
  skills: string[];
  responsibilities: string;
  requirements?: string[];
  jobDescription?: string;
  pdFileName?: string;
  pdAnalyzed?: boolean;
}

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileCountryCode?: string;
  mobile?: string;
  referenceId?: string;
  country?: string;
}

export interface RecommendationResult {
  primary: Assessment[];
  suggested: Assessment[];
}

export interface Assessment {
  id: string;
  name: string;
  category: 'skills' | 'behavioural' | 'aptitude';
  description: string;
  duration: number; // in minutes
  price: number;
  creditCost: number; // Credits required per candidate
  useCases: string[];
  isRecommended?: boolean;
}

export interface Order {
  id: string;
  companyId: string;
  userId: string;
  positionId: string;
  candidates: Candidate[];
  assessments: Assessment[];
  totalAmount: number;
  status: 'pending' | 'paid' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface BundleTest {
  name: string;
  skills: string[];
}

export interface AssessmentBundle {
  id: string;
  name: string;
  description: string;
  assessmentIds: string[];
  originalPrice: number;
  bundlePrice: number;
  savings: number;
  savingsPercent: number;
  creditCost: number; // Bundle credit cost (discounted)
  originalCredits: number; // Sum of individual assessment credits
  bestFor: string[];
  popular?: boolean;
  tests?: BundleTest[];
}

export interface CustomBundle {
  id: string;
  name: string;
  assessmentIds: string[];
  createdAt: Date;
}

export interface UserPreferences {
  favouriteAssessmentIds: string[];
  customBundles: CustomBundle[];
}

export interface WizardState {
  step: number;
  company: Partial<Company>;
  user: Partial<User>;
  position: Partial<Position>;
  candidates: Candidate[];
  selectedAssessments: Assessment[];
  selectedBundle?: AssessmentBundle | null;
  selectedAddOns?: string[]; // Add-on service IDs
}

// Role management types
export type RoleCandidateStatus = 'invited' | 'in_progress' | 'completed' | 'expired';
export type RoleStatus = 'active' | 'completed' | 'archived';
export type CandidateAssessmentStatus = 'pending' | 'in_progress' | 'completed';

export interface CandidateAssessmentResult {
  assessmentId: string;
  assessmentName: string;
  category: 'skills' | 'behavioural' | 'aptitude';
  status: CandidateAssessmentStatus;
  assignedAt: Date;
  updatedAt?: Date;
  completedAt?: Date;
  reportUrl?: string;
}

export interface RoleCandidate extends Candidate {
  status: RoleCandidateStatus;
  stage?: string;
  completedAt?: Date;
  assessmentResults?: CandidateAssessmentResult[];
  addOnResults?: import('@/data/addons').CandidateAddOnResult[];
}

export interface Role {
  id: string;
  position: Position;
  assessments: Assessment[];
  candidates: RoleCandidate[];
  status: RoleStatus;
  createdAt: Date;
  orderId?: string;
  addOnIds?: string[]; // Add-on service IDs assigned at role level
}

// ============================================
// Company Profile Module Types
// ============================================

export type CompanySize = '1-10' | '11-50' | '51-200' | '201-500' | '501-1000' | '1000+';
export type AddressType = 'headquarters' | 'branch' | 'remote' | 'billing';
export type ContactRole = 'primary' | 'billing' | 'technical' | 'hr';
export type PaymentMethodType = 'credit_card' | 'bank_transfer' | 'invoice';

export interface Address {
  id: string;
  label: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isPrimary: boolean;
  type: AddressType;
}

export interface CompanyContact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: ContactRole;
  isPrimary: boolean;
}

export interface CreditPurchase {
  id: string;
  quantity: number;
  pricePerCredit: number;
  totalPaid: number;
  purchasedAt: Date;
}

export interface CreditBalance {
  id: string;
  availableCredits: number;
  totalPurchased: number;
  totalUsed: number;
  lastPurchase?: CreditPurchase;
  purchaseHistory: CreditPurchase[];
}

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  isDefault: boolean;
  cardBrand?: string;
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  bankName?: string;
}

export interface CompanyProfile {
  id: string;
  name: string;
  businessName?: string;
  legalName?: string;
  tradingName?: string;
  logo?: string;
  website?: string;

  // Primary address
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  primaryCountry?: string;

  // Business details
  industry: string;
  size: CompanySize;
  foundedYear?: number;
  description?: string;

  // Tax & Legal
  taxId?: string;
  registrationNumber?: string;
  country?: string;

  // Contact & Locations
  primaryContactUserId?: string;
  primaryEmail: string;
  primaryPhoneCountryCode?: string;
  primaryPhone?: string;
  addresses: Address[];
  contacts: CompanyContact[];

  // Billing
  billingEmail: string;
  billingCurrency: string;
  paymentMethods: PaymentMethod[];
  invoiceNotes?: string;
  requirePO?: boolean;

  // Credits
  creditBalance: CreditBalance;

  // Preferences
  timezone: string;
  dateFormat: string;
  language: string;

  // Branding
  emailLogoUrl?: string;
  invitationEmailSubject?: string;
  invitationEmailMessage?: string;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

export type SettingsSubTab = 'company' | 'locations' | 'billing' | 'credits' | 'branding';

export type ProfileSubTab = 'personal' | 'security' | 'notifications';
