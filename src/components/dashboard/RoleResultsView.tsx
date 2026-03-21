import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Download,
  Users,
  BarChart3,
  CheckCircle2,
  Clock,
  Circle,
} from 'lucide-react';
import { Role } from '@/types/assessment';
import { CandidateAssessmentsList } from './CandidateAssessmentsList';
import { categoryColors } from '@/lib/constants';

interface RoleResultsViewProps {
  role: Role;
}

export function RoleResultsView({ role }: RoleResultsViewProps) {
  const completedCandidates = role.candidates.filter(
    (c) => c.status === 'completed'
  );
  const inProgressCandidates = role.candidates.filter(
    (c) => c.status === 'in_progress'
  );
  const invitedCandidates = role.candidates.filter(
    (c) => c.status === 'invited'
  );

  // Calculate assessment completion stats
  const getAssessmentCompletionStats = () => {
    const stats: Record<string, { completed: number; total: number; name: string }> = {};
    
    role.assessments.forEach(assessment => {
      stats[assessment.id] = { completed: 0, total: 0, name: assessment.name };
    });
    
    role.candidates.forEach(candidate => {
      candidate.assessmentResults?.forEach(result => {
        if (stats[result.assessmentId]) {
          stats[result.assessmentId].total++;
          if (result.status === 'completed') {
            stats[result.assessmentId].completed++;
          }
        }
      });
    });
    
    return stats;
  };

  const assessmentStats = getAssessmentCompletionStats();

  if (role.candidates.length === 0) {
    return (
      <div className="bg-muted/50 rounded-lg border border-dashed border-border p-8 text-center">
        <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No Candidates Yet
        </h3>
        <p className="text-muted-foreground mb-4">
          Add candidates to this role to see their assessment results here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Total</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {role.candidates.length}
          </p>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span className="text-sm text-muted-foreground">Completed</span>
          </div>
          <p className="text-2xl font-bold text-success">
            {completedCandidates.length}
          </p>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-warning" />
            <span className="text-sm text-muted-foreground">In Progress</span>
          </div>
          <p className="text-2xl font-bold text-warning">
            {inProgressCandidates.length}
          </p>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Circle className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Invited</span>
          </div>
          <p className="text-2xl font-bold text-muted-foreground">
            {invitedCandidates.length}
          </p>
        </div>
      </div>

      {/* Assessment Completion Stats */}
      <div className="bg-card rounded-lg border border-border p-4">
        <h4 className="font-medium text-foreground mb-4">Assessment Completion</h4>
        <div className="space-y-3">
          {role.assessments.map((assessment) => {
            const stats = assessmentStats[assessment.id];
            const completionPercent = stats?.total > 0 
              ? Math.round((stats.completed / stats.total) * 100) 
              : 0;
            
            return (
              <div key={assessment.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className={`${categoryColors[assessment.category]} text-xs`}
                  >
                    {assessment.category}
                  </Badge>
                  <span className="text-sm text-foreground">{assessment.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {stats?.completed || 0}/{stats?.total || 0}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({completionPercent}%)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Candidate Results List */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h4 className="font-medium text-foreground">Candidate Results</h4>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export All Results
          </Button>
        </div>
        <div className="divide-y divide-border">
          {role.candidates.map((candidate) => {
            const completedAssessments = candidate.assessmentResults?.filter(
              r => r.status === 'completed'
            ).length || 0;
            const totalAssessments = candidate.assessmentResults?.length || 0;
            
            return (
              <div
                key={candidate.id}
                className="flex items-start justify-between p-4 hover:bg-muted/50"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {candidate.firstName} {candidate.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">{candidate.email}</p>
                    {candidate.completedAt && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Completed: {new Date(candidate.completedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      {completedAssessments}/{totalAssessments} Assessments
                    </p>
                    <div className="mt-2">
                      <CandidateAssessmentsList 
                        assessmentResults={candidate.assessmentResults}
                        maxVisible={3}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
