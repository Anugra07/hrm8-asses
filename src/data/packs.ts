/**
 * Assessment Packs
 * Simple 3-tier pack structure for HRM8-Assess
 */

export interface AssessmentPack {
    id: string;
    name: string;
    description: string;
    assessmentCount: number;
    price: number;
    popular?: boolean;
    features: string[];
}

export const assessmentPacks: AssessmentPack[] = [
    {
        id: 'pack-basic',
        name: 'Basic Pack',
        description: '1 assessment for quick screening',
        assessmentCount: 1,
        price: 39,
        features: [
            'Quick turnaround',
            'Basic scoring report',
            'Email notifications',
        ],
    },
    {
        id: 'pack-standard',
        name: 'Standard Pack',
        description: '2 assessments for better insights',
        assessmentCount: 2,
        price: 69,
        popular: true,
        features: [
            'Detailed analysis',
            'Comparative scoring',
            'Skill breakdown',
            'PDF reports',
        ],
    },
    {
        id: 'pack-comprehensive',
        name: 'Comprehensive Pack',
        description: '3 assessments for complete evaluation',
        assessmentCount: 3,
        price: 99,
        features: [
            'Full evaluation',
            'In-depth reports',
            'Hiring recommendations',
            'Candidate ranking',
            'Priority support',
        ],
    },
];

// Question types for AI recommendations
export const questionTypes = [
    { id: 'multiple-choice', name: 'Multiple Choice', description: 'Select one correct answer', icon: '○' },
    { id: 'multiple-select', name: 'Multiple Select', description: 'Select all that apply', icon: '☑' },
    { id: 'short-answer', name: 'Short Answer', description: 'Brief text response', icon: '✎' },
    { id: 'long-answer', name: 'Long Answer', description: 'Detailed written response', icon: '📝' },
    { id: 'code-challenge', name: 'Code Challenge', description: 'Write and test code', icon: '💻' },
    { id: 'video-interview', name: 'Video Interview', description: 'Record video response', icon: '📹' },
];

export const getPackById = (id: string): AssessmentPack | undefined => {
    return assessmentPacks.find(pack => pack.id === id);
};
