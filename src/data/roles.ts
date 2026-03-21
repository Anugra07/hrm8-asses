import { Role, CandidateAssessmentResult } from '@/types/assessment';
import { assessments } from './assessments';
import { CandidateAddOnResult } from './addons';

const getAssessmentsByIds = (ids: string[]) => 
  ids.map(id => assessments.find(a => a.id === id)).filter(Boolean) as typeof assessments;

// Helper to generate assessment results for a candidate
const generateAssessmentResults = (
  assessmentIds: string[], 
  completedCount: number,
  baseDate: Date
): CandidateAssessmentResult[] => {
  // Assigned date is a few days before the base date
  const assignedDate = new Date(baseDate.getTime() - 7 * 86400000);
  
  return assessmentIds.map((id, index) => {
    const assessment = assessments.find(a => a.id === id);
    if (!assessment) return null;
    
    const isCompleted = index < completedCount;
    const isInProgress = index === completedCount;
    
    return {
      assessmentId: id,
      assessmentName: assessment.name,
      category: assessment.category,
      status: isCompleted ? 'completed' : isInProgress ? 'in_progress' : 'pending',
      assignedAt: assignedDate,
      completedAt: isCompleted ? new Date(baseDate.getTime() - (completedCount - index) * 86400000) : undefined,
      reportUrl: isCompleted ? `/reports/${id}-report.pdf` : undefined,
    } as CandidateAssessmentResult;
  }).filter(Boolean) as CandidateAssessmentResult[];
};

export const roles: Role[] = [
  {
    id: 'role-1',
    position: {
      id: 'pos-1',
      title: 'Software Engineer',
      location: 'Sydney, NSW',
      employmentType: 'full-time',
      seniority: 'mid',
      skills: ['JavaScript', 'React', 'Node.js'],
      responsibilities: 'Develop and maintain web applications',
    },
    assessments: getAssessmentsByIds(['apt-cognitive', 'skill-coding-general', 'behav-personality']),
    candidates: [
      {
        id: 'c1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        status: 'completed',
        completedAt: new Date('2025-01-16'),
        assessmentResults: generateAssessmentResults(
          ['apt-cognitive', 'skill-coding-general', 'behav-personality'],
          3, // all completed
          new Date('2025-01-16')
        ),
        addOnResults: [
          { addOnId: 'addon-identity-verification', addOnName: 'Identity Verification', status: 'completed', requestedAt: new Date('2025-01-12'), completedAt: new Date('2025-01-14'), result: 'Clear' },
          { addOnId: 'addon-reference-check', addOnName: 'Reference Checks', status: 'completed', requestedAt: new Date('2025-01-12'), completedAt: new Date('2025-01-15'), result: 'Positive', reportUrl: '/reports/ref-c1.pdf' },
        ] as CandidateAddOnResult[],
      },
      {
        id: 'c2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@email.com',
        status: 'in_progress',
        assessmentResults: generateAssessmentResults(
          ['apt-cognitive', 'skill-coding-general', 'behav-personality'],
          1, // 1 completed, 1 in progress
          new Date('2025-01-17')
        ),
        addOnResults: [
          { addOnId: 'addon-identity-verification', addOnName: 'Identity Verification', status: 'in_progress', requestedAt: new Date('2025-01-15') },
        ] as CandidateAddOnResult[],
      },
      {
        id: 'c3',
        firstName: 'Alex',
        lastName: 'Chen',
        email: 'alex.chen@email.com',
        status: 'invited',
        assessmentResults: generateAssessmentResults(
          ['apt-cognitive', 'skill-coding-general', 'behav-personality'],
          0, // none started
          new Date('2025-01-18')
        ),
      },
    ],
    status: 'active',
    createdAt: new Date('2025-01-10'),
    orderId: 'ORD-12345678',
    addOnIds: ['addon-identity-verification', 'addon-reference-check'],
  },
  {
    id: 'role-2',
    position: {
      id: 'pos-2',
      title: 'Product Manager',
      location: 'Melbourne, VIC',
      employmentType: 'full-time',
      seniority: 'senior',
      skills: ['Product Strategy', 'Agile', 'Data Analysis'],
      responsibilities: 'Lead product development and roadmap planning',
    },
    assessments: getAssessmentsByIds(['apt-cognitive', 'behav-personality', 'behav-leadership']),
    candidates: [
      {
        id: 'c4',
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'mike.j@email.com',
        status: 'completed',
        completedAt: new Date('2025-01-14'),
        assessmentResults: generateAssessmentResults(
          ['apt-cognitive', 'behav-personality', 'behav-leadership'],
          3,
          new Date('2025-01-14')
        ),
      },
      {
        id: 'c5',
        firstName: 'Emma',
        lastName: 'Williams',
        email: 'emma.w@email.com',
        status: 'completed',
        completedAt: new Date('2025-01-15'),
        assessmentResults: generateAssessmentResults(
          ['apt-cognitive', 'behav-personality', 'behav-leadership'],
          3,
          new Date('2025-01-15')
        ),
      },
    ],
    status: 'completed',
    createdAt: new Date('2025-01-05'),
    orderId: 'ORD-12345677',
  },
  {
    id: 'role-3',
    position: {
      id: 'pos-3',
      title: 'Sales Representative',
      location: 'Brisbane, QLD',
      employmentType: 'full-time',
      seniority: 'entry',
      skills: ['Sales', 'Communication', 'CRM'],
      responsibilities: 'Generate leads and close deals with potential clients',
    },
    assessments: getAssessmentsByIds(['skill-sales-aptitude', 'behav-personality', 'behav-emotional-iq']),
    candidates: [
      {
        id: 'c6',
        firstName: 'Sarah',
        lastName: 'Wilson',
        email: 'sarah.w@email.com',
        status: 'completed',
        completedAt: new Date('2025-01-14'),
        assessmentResults: generateAssessmentResults(
          ['skill-sales-aptitude', 'behav-personality', 'behav-emotional-iq'],
          3,
          new Date('2025-01-14')
        ),
      },
      {
        id: 'c7',
        firstName: 'David',
        lastName: 'Brown',
        email: 'david.b@email.com',
        status: 'completed',
        completedAt: new Date('2025-01-13'),
        assessmentResults: generateAssessmentResults(
          ['skill-sales-aptitude', 'behav-personality', 'behav-emotional-iq'],
          3,
          new Date('2025-01-13')
        ),
      },
      {
        id: 'c8',
        firstName: 'Lisa',
        lastName: 'Taylor',
        email: 'lisa.t@email.com',
        status: 'completed',
        completedAt: new Date('2025-01-15'),
        assessmentResults: generateAssessmentResults(
          ['skill-sales-aptitude', 'behav-personality', 'behav-emotional-iq'],
          3,
          new Date('2025-01-15')
        ),
      },
      {
        id: 'c9',
        firstName: 'James',
        lastName: 'Anderson',
        email: 'james.a@email.com',
        status: 'completed',
        completedAt: new Date('2025-01-16'),
        assessmentResults: generateAssessmentResults(
          ['skill-sales-aptitude', 'behav-personality', 'behav-emotional-iq'],
          3,
          new Date('2025-01-16')
        ),
      },
      {
        id: 'c10',
        firstName: 'Rachel',
        lastName: 'Martinez',
        email: 'rachel.m@email.com',
        status: 'in_progress',
        assessmentResults: generateAssessmentResults(
          ['skill-sales-aptitude', 'behav-personality', 'behav-emotional-iq'],
          2, // 2 completed, 1 in progress
          new Date('2025-01-17')
        ),
      },
    ],
    status: 'active',
    createdAt: new Date('2025-01-08'),
    orderId: 'ORD-12345676',
  },
  {
    id: 'role-4',
    position: {
      id: 'pos-4',
      title: 'UX Designer',
      location: 'Perth, WA',
      employmentType: 'contract',
      seniority: 'mid',
      skills: ['Figma', 'User Research', 'Prototyping'],
      responsibilities: 'Design user-centered interfaces and conduct research',
    },
    assessments: getAssessmentsByIds(['apt-abstract', 'behav-personality']),
    candidates: [
      {
        id: 'c11',
        firstName: 'Olivia',
        lastName: 'Garcia',
        email: 'olivia.g@email.com',
        status: 'invited',
        assessmentResults: generateAssessmentResults(
          ['apt-abstract', 'behav-personality'],
          0,
          new Date('2025-01-18')
        ),
      },
      {
        id: 'c12',
        firstName: 'Noah',
        lastName: 'Lee',
        email: 'noah.l@email.com',
        status: 'invited',
        assessmentResults: generateAssessmentResults(
          ['apt-abstract', 'behav-personality'],
          0,
          new Date('2025-01-18')
        ),
      },
    ],
    status: 'active',
    createdAt: new Date('2025-01-17'),
  },
];

export const getRolesByStatus = (status: Role['status']) => 
  roles.filter(role => role.status === status);

export const getRoleCandidateStats = (role: Role) => ({
  total: role.candidates.length,
  invited: role.candidates.filter(c => c.status === 'invited').length,
  inProgress: role.candidates.filter(c => c.status === 'in_progress').length,
  completed: role.candidates.filter(c => c.status === 'completed').length,
  expired: role.candidates.filter(c => c.status === 'expired').length,
});
