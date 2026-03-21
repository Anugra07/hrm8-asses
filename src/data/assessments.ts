import { Assessment, RecommendationResult } from '@/types/assessment';

export const assessments: Assessment[] = [
  // Skills Assessments
  {
    id: 'skill-coding-general',
    name: 'General Coding Assessment',
    category: 'skills',
    description: 'Evaluate fundamental programming skills including logic, data structures, and problem-solving.',
    duration: 45,
    price: 75,
    creditCost: 15,
    useCases: ['Software Developer', 'Full Stack Engineer', 'Backend Developer'],
  },
  {
    id: 'skill-excel-advanced',
    name: 'Advanced Excel Proficiency',
    category: 'skills',
    description: 'Test advanced Excel capabilities including formulas, pivot tables, macros, and data analysis.',
    duration: 30,
    price: 45,
    creditCost: 9,
    useCases: ['Financial Analyst', 'Data Analyst', 'Operations Manager'],
  },
  {
    id: 'skill-typing-speed',
    name: 'Typing Speed & Accuracy',
    category: 'skills',
    description: 'Measure typing speed (WPM) and accuracy for data entry and administrative roles.',
    duration: 15,
    price: 30,
    creditCost: 6,
    useCases: ['Data Entry Clerk', 'Administrative Assistant', 'Customer Service'],
  },
  {
    id: 'skill-sales-aptitude',
    name: 'Sales Skills Assessment',
    category: 'skills',
    description: 'Evaluate sales techniques, objection handling, and customer relationship skills.',
    duration: 35,
    price: 60,
    creditCost: 12,
    useCases: ['Sales Representative', 'Account Executive', 'Business Development'],
  },
  {
    id: 'skill-project-management',
    name: 'Project Management Fundamentals',
    category: 'skills',
    description: 'Assess knowledge of project management methodologies, planning, and execution.',
    duration: 40,
    price: 70,
    creditCost: 14,
    useCases: ['Project Manager', 'Product Manager', 'Team Lead'],
  },
  
  // Behavioural Assessments
  {
    id: 'behav-personality',
    name: 'Workplace Personality Profile',
    category: 'behavioural',
    description: 'Comprehensive personality assessment for workplace fit and team dynamics.',
    duration: 25,
    price: 35,
    creditCost: 7,
    useCases: ['All roles', 'Team fit assessment', 'Culture alignment'],
  },
  {
    id: 'behav-leadership',
    name: 'Leadership Style Assessment',
    category: 'behavioural',
    description: 'Identify leadership strengths, styles, and areas for development.',
    duration: 30,
    price: 50,
    creditCost: 10,
    useCases: ['Manager', 'Team Lead', 'Executive', 'Supervisor'],
  },
  {
    id: 'behav-emotional-iq',
    name: 'Emotional Intelligence (EQ)',
    category: 'behavioural',
    description: 'Measure emotional awareness, empathy, and interpersonal effectiveness.',
    duration: 20,
    price: 40,
    creditCost: 8,
    useCases: ['Customer-facing roles', 'Management', 'HR positions'],
  },
  {
    id: 'behav-work-values',
    name: 'Work Values & Motivation',
    category: 'behavioural',
    description: 'Understand what drives and motivates candidates in the workplace.',
    duration: 15,
    price: 25,
    creditCost: 5,
    useCases: ['All roles', 'Retention planning', 'Role matching'],
  },
  
  // Aptitude Assessments
  {
    id: 'apt-cognitive',
    name: 'Cognitive Ability Test',
    category: 'aptitude',
    description: 'Measure reasoning, problem-solving, and learning potential.',
    duration: 35,
    price: 60,
    creditCost: 12,
    useCases: ['All professional roles', 'Graduate programs', 'Technical roles'],
  },
  {
    id: 'apt-numerical',
    name: 'Numerical Reasoning',
    category: 'aptitude',
    description: 'Assess ability to work with numbers, data, and financial information.',
    duration: 25,
    price: 50,
    creditCost: 10,
    useCases: ['Finance roles', 'Analyst positions', 'Accounting'],
  },
  {
    id: 'apt-verbal',
    name: 'Verbal Reasoning',
    category: 'aptitude',
    description: 'Evaluate comprehension, communication, and written analysis skills.',
    duration: 25,
    price: 50,
    creditCost: 10,
    useCases: ['Communications', 'Legal', 'Marketing', 'Management'],
  },
  {
    id: 'apt-abstract',
    name: 'Abstract Reasoning',
    category: 'aptitude',
    description: 'Test pattern recognition and logical thinking without prior knowledge.',
    duration: 20,
    price: 40,
    creditCost: 8,
    useCases: ['Technical roles', 'Design', 'Engineering', 'Research'],
  },
];

export const getAssessmentsByCategory = (category: Assessment['category']) => {
  return assessments.filter(a => a.category === category);
};

export const getRecommendedAssessments = (skills: string[], seniority: string): Assessment[] => {
  const result = getAssessmentRecommendations(skills, seniority);
  return result.primary;
};

export const getAssessmentRecommendations = (skills: string[], seniority: string): RecommendationResult => {
  // Two-tier recommendation logic - in production this would be AI-powered
  const primary: Assessment[] = [];
  const suggested: Assessment[] = [];
  const usedIds = new Set<string>();
  
  // PRIMARY RECOMMENDATIONS - Core tests for the role
  
  // Always recommend cognitive ability for professional roles
  const cognitive = assessments.find(a => a.id === 'apt-cognitive');
  if (cognitive) {
    primary.push({ ...cognitive, isRecommended: true });
    usedIds.add(cognitive.id);
  }
  
  // Add personality for all roles
  const personality = assessments.find(a => a.id === 'behav-personality');
  if (personality) {
    primary.push({ ...personality, isRecommended: true });
    usedIds.add(personality.id);
  }
  
  // Check for technical skills - add to primary
  const techKeywords = ['developer', 'engineer', 'coding', 'programming', 'software', 'technical'];
  if (skills.some(s => techKeywords.some(k => s.toLowerCase().includes(k)))) {
    const coding = assessments.find(a => a.id === 'skill-coding-general');
    if (coding) {
      primary.push({ ...coding, isRecommended: true });
      usedIds.add(coding.id);
    }
  }
  
  // Check for leadership/management - add to primary
  if (['manager', 'executive', 'senior'].includes(seniority.toLowerCase())) {
    const leadership = assessments.find(a => a.id === 'behav-leadership');
    if (leadership) {
      primary.push({ ...leadership, isRecommended: true });
      usedIds.add(leadership.id);
    }
  }
  
  // Check for sales - add to primary
  if (skills.some(s => s.toLowerCase().includes('sales'))) {
    const sales = assessments.find(a => a.id === 'skill-sales-aptitude');
    if (sales) {
      primary.push({ ...sales, isRecommended: true });
      usedIds.add(sales.id);
    }
  }
  
  // SUGGESTED RECOMMENDATIONS - Complementary tests
  
  // Suggest EQ for any role
  const eq = assessments.find(a => a.id === 'behav-eq');
  if (eq && !usedIds.has(eq.id)) {
    suggested.push(eq);
    usedIds.add(eq.id);
  }
  
  // Suggest verbal reasoning for communication-heavy roles
  const commKeywords = ['manager', 'consultant', 'analyst', 'coordinator', 'executive'];
  if (skills.some(s => commKeywords.some(k => s.toLowerCase().includes(k))) || 
      ['manager', 'executive', 'senior'].includes(seniority.toLowerCase())) {
    const verbal = assessments.find(a => a.id === 'apt-verbal');
    if (verbal && !usedIds.has(verbal.id)) {
      suggested.push(verbal);
      usedIds.add(verbal.id);
    }
  }
  
  // Suggest numerical reasoning for analytical roles
  const analyticalKeywords = ['analyst', 'finance', 'accounting', 'data', 'engineer'];
  if (skills.some(s => analyticalKeywords.some(k => s.toLowerCase().includes(k)))) {
    const numerical = assessments.find(a => a.id === 'apt-numerical');
    if (numerical && !usedIds.has(numerical.id)) {
      suggested.push(numerical);
      usedIds.add(numerical.id);
    }
  }
  
  // Suggest culture fit for all roles if not already full
  if (suggested.length < 4) {
    const culture = assessments.find(a => a.id === 'behav-culture');
    if (culture && !usedIds.has(culture.id)) {
      suggested.push(culture);
      usedIds.add(culture.id);
    }
  }
  
  return { primary, suggested };
};
