import { Video, UserCheck, ShieldCheck, GraduationCap, Fingerprint, LucideIcon } from 'lucide-react';

export interface AddOnService {
  id: string;
  name: string;
  icon: LucideIcon;
  category: 'interview' | 'verification' | 'check';
  description: string;
  summary?: string;
  price: number;
  creditCost: number;
  features: string[];
}

export type AddOnStatus = 'pending' | 'in_progress' | 'completed' | 'failed';

export interface CandidateAddOnResult {
  addOnId: string;
  addOnName: string;
  status: AddOnStatus;
  requestedAt: Date;
  completedAt?: Date;
  result?: string;
  reportUrl?: string;
}

export const addOnServices: AddOnService[] = [
  {
    id: 'addon-video-interview',
    name: 'AI Video Interviews',
    icon: Video,
    category: 'interview',
    description: 'AI-powered asynchronous video interviews with automated analysis.',
    summary: 'Candidates record video responses on their own time. AI analyses communication, confidence, and suitability so you can shortlist faster.',
    price: 25,
    creditCost: 5,
    features: [
      'Async candidate recording',
      'AI-powered response analysis',
      'Customisable question sets',
      'Sentiment and confidence scoring',
    ],
  },
  {
    id: 'addon-reference-check',
    name: 'Reference Checks',
    icon: UserCheck,
    category: 'check',
    description: 'Automated reference collection and verification.',
    summary: 'Automated outreach to referees with structured questionnaires. Detect inconsistencies and receive consolidated, fraud-checked reports.',
    price: 85,
    creditCost: 17,
    features: [
      'Automated referee outreach',
      'Structured questionnaires',
      'Fraud detection',
      'Consolidated reports',
    ],
  },
  {
    id: 'addon-identity-verification',
    name: 'Identity Verification',
    icon: ShieldCheck,
    category: 'verification',
    description: 'Verify candidate identity and right-to-work status.',
    summary: 'Confirm candidate identity with document checks, biometric matching, and right-to-work validation across global jurisdictions.',
    price: 40,
    creditCost: 8,
    features: [
      'ID document verification',
      'Right-to-work validation',
      'Biometric matching',
      'Global coverage',
    ],
  },
  {
    id: 'addon-qualification-verification',
    name: 'Qualification Verification',
    icon: GraduationCap,
    category: 'verification',
    description: 'Confirm candidate qualifications and certifications.',
    summary: 'Validate degrees, certifications, and professional licences directly with issuing institutions for complete peace of mind.',
    price: 40,
    creditCost: 8,
    features: [
      'Qualification certificate checks',
      'Professional licence validation',
      'Education history verification',
      'Accreditation confirmation',
    ],
  },
  {
    id: 'addon-criminal-record',
    name: 'Criminal Record Check',
    icon: Fingerprint,
    category: 'check',
    description: 'Screen candidates with criminal background checks.',
    summary: 'National and international criminal background screening with compliance-ready reports and optional ongoing monitoring.',
    price: 50,
    creditCost: 10,
    features: [
      'National police check',
      'International record screening',
      'Ongoing monitoring',
      'Compliance-ready reports',
    ],
  },
];

export const getAddOnById = (id: string) => addOnServices.find(a => a.id === id);
export const getAddOnTotal = (ids: string[]) => 
  ids.reduce((sum, id) => sum + (getAddOnById(id)?.price || 0), 0);
