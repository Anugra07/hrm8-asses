import { AssessmentBundle } from '@/types/assessment';
import { assessments } from './assessments';

export const bundles: AssessmentBundle[] = [
  {
    id: 'bundle-sales-performance',
    name: 'Sales Performance Bundle',
    description: 'Comprehensive sales assessment covering prospecting, negotiation, and closing skills alongside behavioural profiling.',
    assessmentIds: [],
    originalPrice: 95,
    bundlePrice: 75,
    savings: 20,
    savingsPercent: 21,
    creditCost: 15,
    originalCredits: 19,
    bestFor: ['Sales Representatives', 'BDMs', 'Account Managers'],
    popular: true,
    tests: [
      {
        name: 'Sales Skills Assessment',
        skills: ['Prospecting and qualification', 'Objection handling', 'Negotiation techniques', 'Closing scenarios', 'Pipeline management'],
      },
      {
        name: 'Behavioural – Sales Performance Profile',
        skills: ['Achievement drive', 'Resilience', 'Persuasion style', 'Competitive orientation', 'Communication confidence'],
      },
      {
        name: 'Verbal & Logical Aptitude Test',
        skills: ['Commercial reasoning', 'Situational judgement', 'Pattern recognition'],
      },
    ],
  },
  {
    id: 'bundle-sales-leadership',
    name: 'Sales Leadership Bundle',
    description: 'Assess sales management capabilities including strategy, forecasting, coaching, and leadership influence.',
    assessmentIds: [],
    originalPrice: 110,
    bundlePrice: 85,
    savings: 25,
    savingsPercent: 23,
    creditCost: 17,
    originalCredits: 22,
    bestFor: ['Sales Managers', 'Regional Managers', 'Head of Sales'],
    tests: [
      {
        name: 'Sales Strategy & Forecasting Assessment',
        skills: ['Revenue modelling', 'Territory planning', 'KPI analysis', 'Coaching scenarios', 'Performance diagnostics'],
      },
      {
        name: 'Behavioural – Leadership & Influence Profile',
        skills: ['Coaching orientation', 'Accountability', 'Influence style', 'Conflict management', 'Team motivation drivers'],
      },
      {
        name: 'Advanced Critical Reasoning Aptitude Test',
        skills: ['Data interpretation', 'Risk assessment', 'Strategic prioritisation'],
      },
    ],
  },
  {
    id: 'bundle-engineering',
    name: 'Engineering & Technical Professionals Bundle',
    description: 'Tailored for engineering disciplines — covers technical fundamentals, numerical aptitude, and work style profiling.',
    assessmentIds: [],
    originalPrice: 100,
    bundlePrice: 80,
    savings: 20,
    savingsPercent: 20,
    creditCost: 16,
    originalCredits: 20,
    bestFor: ['Mechanical Engineers', 'Electrical Engineers', 'Civil Engineers', 'Project Engineers'],
    tests: [
      {
        name: 'Engineering Technical Skills Assessment',
        skills: ['Discipline fundamentals', 'Technical calculations', 'Standards and compliance', 'Drawing interpretation', 'Problem diagnosis'],
      },
      {
        name: 'Numerical & Analytical Aptitude Test',
        skills: ['Quantitative reasoning', 'Logical structuring', 'Data interpretation'],
      },
      {
        name: 'Behavioural – Engineering Work Style Profile',
        skills: ['Detail orientation', 'Process discipline', 'Risk awareness', 'Accountability under deadlines'],
      },
    ],
  },
  {
    id: 'bundle-software-it',
    name: 'Software & IT Bundle',
    description: 'End-to-end technical assessment for developers and IT professionals — coding, logic, and collaboration profiling.',
    assessmentIds: [],
    originalPrice: 100,
    bundlePrice: 80,
    savings: 20,
    savingsPercent: 20,
    creditCost: 16,
    originalCredits: 20,
    bestFor: ['Developers', 'Engineers', 'Data Analysts', 'IT Specialists'],
    popular: true,
    tests: [
      {
        name: 'Technical Coding Assessment',
        skills: ['Language proficiency', 'Debugging exercises', 'Algorithmic logic', 'Code optimisation'],
      },
      {
        name: 'Analytical & Logical Aptitude Test',
        skills: ['Structured problem solving', 'Pattern identification', 'Logical sequencing'],
      },
      {
        name: 'Behavioural – Collaboration & Delivery Profile',
        skills: ['Attention to detail', 'Task ownership', 'Team collaboration', 'Adaptability'],
      },
    ],
  },
  {
    id: 'bundle-professional-office',
    name: 'Professional & Office Roles Bundle',
    description: 'Ideal for office-based professionals — covers role-specific skills, verbal-numerical aptitude, and team fit.',
    assessmentIds: [],
    originalPrice: 90,
    bundlePrice: 70,
    savings: 20,
    savingsPercent: 22,
    creditCost: 14,
    originalCredits: 18,
    bestFor: ['Finance', 'HR', 'Admin', 'Operations Coordinators'],
    tests: [
      {
        name: 'Role-Specific Skills Assessment',
        skills: ['Excel or accounting fundamentals', 'Policy comprehension', 'Data accuracy', 'Written communication'],
      },
      {
        name: 'Verbal & Numerical Aptitude Test',
        skills: ['Reading comprehension', 'Data interpretation', 'Logical reasoning'],
      },
      {
        name: 'Behavioural – Organisation & Team Fit Profile',
        skills: ['Conscientiousness', 'Dependability', 'Time management', 'Collaboration style'],
      },
    ],
  },
  {
    id: 'bundle-executive',
    name: 'Executive & Senior Leadership Bundle',
    description: 'Premium assessment for C-Suite and senior leaders — strategic simulations, leadership profiling, and advanced cognition.',
    assessmentIds: [],
    originalPrice: 125,
    bundlePrice: 95,
    savings: 30,
    savingsPercent: 24,
    creditCost: 19,
    originalCredits: 25,
    bestFor: ['C-Suite', 'General Managers', 'Senior Leaders'],
    tests: [
      {
        name: 'Strategic Decision-Making Simulation',
        skills: ['Scenario analysis', 'Financial trade-offs', 'Risk evaluation', 'Long-term impact judgement'],
      },
      {
        name: 'Advanced Behavioural Leadership Profile',
        skills: ['Influence style', 'Pressure response', 'Leadership derailers', 'Cultural impact'],
      },
      {
        name: 'Advanced Cognitive Reasoning Test',
        skills: ['Complex problem structuring', 'Ambiguity tolerance', 'Strategic prioritisation'],
      },
    ],
  },
  {
    id: 'bundle-customer-service',
    name: 'Customer Service & Contact Centre Bundle',
    description: 'Evaluate customer-facing skills including conflict resolution, communication clarity, and service orientation.',
    assessmentIds: [],
    originalPrice: 85,
    bundlePrice: 65,
    savings: 20,
    savingsPercent: 24,
    creditCost: 13,
    originalCredits: 17,
    bestFor: ['Customer Service Officers', 'Call Centre Agents'],
    tests: [
      {
        name: 'Customer Handling Skills Assessment',
        skills: ['Conflict resolution', 'Objection management', 'Service scenario judgement', 'Communication clarity'],
      },
      {
        name: 'Verbal Aptitude Test',
        skills: ['Reading comprehension', 'Tone interpretation', 'Response accuracy'],
      },
      {
        name: 'Behavioural – Service Orientation Profile',
        skills: ['Emotional control', 'Empathy', 'Patience', 'Reliability'],
      },
    ],
  },
  {
    id: 'bundle-operations',
    name: 'Operations & Supply Chain Bundle',
    description: 'Assess operational acumen covering workflow optimisation, logistics reasoning, and process discipline.',
    assessmentIds: [],
    originalPrice: 95,
    bundlePrice: 75,
    savings: 20,
    savingsPercent: 21,
    creditCost: 15,
    originalCredits: 19,
    bestFor: ['Logistics Managers', 'Warehouse Supervisors', 'Planners'],
    tests: [
      {
        name: 'Operations Process Skills Assessment',
        skills: ['Workflow optimisation', 'Inventory logic', 'Scheduling fundamentals', 'Compliance awareness'],
      },
      {
        name: 'Numerical & Logical Aptitude Test',
        skills: ['Data interpretation', 'Quantitative reasoning', 'Structured sequencing'],
      },
      {
        name: 'Behavioural – Reliability & Process Discipline Profile',
        skills: ['Rule adherence', 'Accountability', 'Detail focus', 'Risk awareness'],
      },
    ],
  },
  {
    id: 'bundle-project-management',
    name: 'Project Management Bundle',
    description: 'Comprehensive PM assessment — planning, risk analysis, stakeholder management, and delivery accountability.',
    assessmentIds: [],
    originalPrice: 110,
    bundlePrice: 85,
    savings: 25,
    savingsPercent: 23,
    creditCost: 17,
    originalCredits: 22,
    bestFor: ['Construction PMs', 'IT PMs', 'Engineering PMs'],
    tests: [
      {
        name: 'Project Planning & Delivery Skills Assessment',
        skills: ['Risk analysis', 'Budget estimation', 'Timeline planning', 'Stakeholder scenarios'],
      },
      {
        name: 'Critical Reasoning Aptitude Test',
        skills: ['Scenario prioritisation', 'Decision speed', 'Problem structuring'],
      },
      {
        name: 'Behavioural – Stakeholder & Delivery Profile',
        skills: ['Influence', 'Communication clarity', 'Accountability', 'Stress tolerance'],
      },
    ],
  },
  {
    id: 'bundle-graduate',
    name: 'Graduate & Early Career Bundle',
    description: 'Entry-level assessment measuring cognitive aptitude, reasoning fundamentals, and work ethic indicators.',
    assessmentIds: [],
    originalPrice: 75,
    bundlePrice: 60,
    savings: 15,
    savingsPercent: 20,
    creditCost: 12,
    originalCredits: 15,
    bestFor: ['Graduates', 'Entry-Level Professionals'],
    popular: true,
    tests: [
      {
        name: 'General Cognitive Aptitude Test',
        skills: ['Logical reasoning', 'Learning agility', 'Pattern recognition'],
      },
      {
        name: 'Verbal & Numerical Reasoning Test',
        skills: ['Communication comprehension', 'Data basics', 'Analytical interpretation'],
      },
      {
        name: 'Behavioural – Work Ethic & Learning Profile',
        skills: ['Motivation', 'Coachability', 'Reliability', 'Adaptability'],
      },
    ],
  },
  {
    id: 'bundle-finance',
    name: 'Finance & Accounting Specialist Bundle',
    description: 'Specialist assessment for finance professionals — accounting skills, numerical precision, and integrity profiling.',
    assessmentIds: [],
    originalPrice: 100,
    bundlePrice: 80,
    savings: 20,
    savingsPercent: 20,
    creditCost: 16,
    originalCredits: 20,
    bestFor: ['Accountants', 'Financial Analysts', 'Payroll Officers'],
    tests: [
      {
        name: 'Accounting & Financial Skills Assessment',
        skills: ['Financial statement interpretation', 'Reconciliation logic', 'Compliance fundamentals'],
      },
      {
        name: 'Advanced Numerical Aptitude Test',
        skills: ['Data precision', 'Error detection', 'Quantitative analysis'],
      },
      {
        name: 'Behavioural – Integrity & Accuracy Profile',
        skills: ['Attention to detail', 'Risk awareness', 'Ethical orientation', 'Compliance mindset'],
      },
    ],
  },
  {
    id: 'bundle-healthcare',
    name: 'Healthcare & Care Services Bundle',
    description: 'Purpose-built for healthcare roles — clinical scenario judgement, verbal aptitude, and empathy profiling.',
    assessmentIds: [],
    originalPrice: 90,
    bundlePrice: 70,
    savings: 20,
    savingsPercent: 22,
    creditCost: 14,
    originalCredits: 18,
    bestFor: ['Nurses', 'Support Workers', 'Allied Health', 'Care Staff'],
    tests: [
      {
        name: 'Healthcare Scenario Skills Assessment',
        skills: ['Patient handling judgement', 'Ethical decision scenarios', 'Safety protocol awareness'],
      },
      {
        name: 'Situational Judgement & Verbal Aptitude Test',
        skills: ['Response prioritisation', 'Instruction comprehension', 'Scenario reasoning'],
      },
      {
        name: 'Behavioural – Empathy & Reliability Profile',
        skills: ['Emotional stability', 'Compassion', 'Dependability', 'Rule adherence'],
      },
    ],
  },
];

export const getBundleAssessments = (bundle: AssessmentBundle) => {
  return bundle.assessmentIds
    .map(id => assessments.find(a => a.id === id))
    .filter(Boolean);
};

export const getBundleTestCount = (bundle: AssessmentBundle): number => {
  return bundle.tests?.length || bundle.assessmentIds.length;
};

export const getRecommendedBundle = (skills: string[], seniority: string): AssessmentBundle | null => {
  const skillsLower = skills.map(s => s.toLowerCase()).join(' ');
  
  const techKeywords = ['developer', 'engineer', 'coding', 'programming', 'software', 'technical'];
  if (techKeywords.some(k => skillsLower.includes(k))) {
    return bundles.find(b => b.id === 'bundle-software-it') || null;
  }
  
  if (skillsLower.includes('sales')) {
    return bundles.find(b => b.id === 'bundle-sales-performance') || null;
  }
  
  if (['manager', 'executive'].includes(seniority.toLowerCase())) {
    return bundles.find(b => b.id === 'bundle-executive') || null;
  }
  
  if (seniority.toLowerCase() === 'senior') {
    return bundles.find(b => b.id === 'bundle-professional-office') || null;
  }
  
  return bundles.find(b => b.id === 'bundle-graduate') || null;
};

export const findMatchingBundle = (selectedAssessmentIds: string[]): AssessmentBundle | null => {
  const selectedSet = new Set(selectedAssessmentIds);
  
  return bundles.find(bundle => {
    if (bundle.assessmentIds.length === 0) return false;
    if (bundle.assessmentIds.length !== selectedAssessmentIds.length) return false;
    return bundle.assessmentIds.every(id => selectedSet.has(id));
  }) || null;
};
