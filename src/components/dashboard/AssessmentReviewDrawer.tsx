import React, { useState } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle 
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  User, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Download,
  Send,
  Calendar,
  FileText,
  Eye,
  RotateCcw,
  Trophy,
  Loader2,
} from 'lucide-react';
import { RoleCandidate, CandidateAssessmentResult } from '@/types/assessment';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface CandidateWithResults {
  candidate: RoleCandidate;
  result: CandidateAssessmentResult;
}

interface AssessmentReviewDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidates: RoleCandidate[];
  assessmentName?: string;
  assessmentId?: string;
  onResendEmail?: (candidate: RoleCandidate, assessmentId: string) => void;
}

// Get score color based on value
function getScoreColor(score?: number): string {
  if (!score) return 'text-muted-foreground';
  if (score >= 80) return 'text-success';
  if (score >= 60) return 'text-warning';
  return 'text-destructive';
}

// Individual assessment result card
function AssessmentResultCard({
  candidateResult,
  onResendEmail,
  onViewReport,
}: {
  candidateResult: CandidateWithResults;
  onResendEmail?: () => void;
  onViewReport?: () => void;
}) {
  const { candidate, result } = candidateResult;
  const [isResending, setIsResending] = useState(false);

  const handleResend = async () => {
    setIsResending(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    onResendEmail?.();
    setIsResending(false);
  };

  return (
    <div className="p-4 bg-card border border-border rounded-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">
              {candidate.firstName} {candidate.lastName}
            </p>
            <p className="text-sm text-muted-foreground">{candidate.email}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {result.status === 'completed' ? (
            <>
              <Badge className="bg-success/10 text-success border-success/20">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Completed
              </Badge>
              {result.reportUrl && (
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onViewReport}>
                  <Eye className="h-4 w-4" />
                </Button>
              )}
            </>
          ) : result.status === 'in_progress' ? (
            <Badge className="bg-warning/10 text-warning border-warning/20">
              <Clock className="h-3 w-3 mr-1" />
              In Progress
            </Badge>
          ) : (
            <Badge className="bg-muted text-muted-foreground">
              <AlertCircle className="h-3 w-3 mr-1" />
              Pending
            </Badge>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Assigned: {format(new Date(result.assignedAt), 'PP')}
          </span>
          {result.completedAt && (
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Completed: {format(new Date(result.completedAt), 'PP')}
            </span>
          )}
        </div>
        
        {result.status !== 'completed' && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 text-xs"
            onClick={handleResend}
            disabled={isResending}
          >
            {isResending ? (
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            ) : (
              <Send className="h-3 w-3 mr-1" />
            )}
            Resend Invite
          </Button>
        )}
      </div>
    </div>
  );
}

export function AssessmentReviewDrawer({
  open,
  onOpenChange,
  candidates,
  assessmentName = 'Assessment',
  assessmentId,
  onResendEmail,
}: AssessmentReviewDrawerProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');

  // Flatten candidates with their assessment results
  const allResults: CandidateWithResults[] = candidates.flatMap(candidate => 
    (candidate.assessmentResults || [])
      .filter(result => !assessmentId || result.assessmentId === assessmentId)
      .map(result => ({ candidate, result }))
  );

  // Filter by tab
  const filteredResults = allResults.filter(({ result }) => {
    switch (activeTab) {
      case 'pending':
        return result.status === 'pending' || result.status === 'in_progress';
      case 'completed':
        return result.status === 'completed';
      default:
        return true;
    }
  });

  // Calculate stats
  const stats = {
    total: allResults.length,
    completed: allResults.filter(r => r.result.status === 'completed').length,
    pending: allResults.filter(r => r.result.status === 'pending' || r.result.status === 'in_progress').length,
  };

  const handleResendAll = () => {
    const pendingCount = stats.pending;
    toast.success(`Resending invitations to ${pendingCount} candidate${pendingCount !== 1 ? 's' : ''}...`);
  };

  const handleDownloadAll = () => {
    const completedCount = stats.completed;
    toast.success(`Downloading ${completedCount} report${completedCount !== 1 ? 's' : ''}...`);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-hidden flex flex-col">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            {assessmentName}
          </SheetTitle>
          <SheetDescription>
            Review assessment submissions and manage pending invitations
          </SheetDescription>
        </SheetHeader>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-3 my-4">
          <div className="p-3 bg-muted/50 rounded-lg text-center">
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
          <div className="p-3 bg-success/10 rounded-lg text-center">
            <p className="text-2xl font-bold text-success">{stats.completed}</p>
            <p className="text-xs text-success/80">Completed</p>
          </div>
          <div className="p-3 bg-warning/10 rounded-lg text-center">
            <p className="text-2xl font-bold text-warning">{stats.pending}</p>
            <p className="text-xs text-warning/80">Pending</p>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="flex gap-2 mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={handleResendAll}
            disabled={stats.pending === 0}
          >
            <Send className="h-4 w-4 mr-2" />
            Resend All Pending
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={handleDownloadAll}
            disabled={stats.completed === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            Download All
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'all' | 'pending' | 'completed')}>
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">
              All
              <Badge variant="secondary" className="ml-1.5 h-5 px-1.5 text-xs">
                {stats.total}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex-1">
              Pending
              <Badge variant="secondary" className="ml-1.5 h-5 px-1.5 text-xs">
                {stats.pending}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex-1">
              Completed
              <Badge variant="secondary" className="ml-1.5 h-5 px-1.5 text-xs">
                {stats.completed}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 mt-4 -mx-6 px-6">
            <TabsContent value={activeTab} className="mt-0 space-y-3">
              {filteredResults.length === 0 ? (
                <div className="text-center py-8">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                    {activeTab === 'completed' ? (
                      <Trophy className="h-6 w-6 text-muted-foreground" />
                    ) : activeTab === 'pending' ? (
                      <Clock className="h-6 w-6 text-muted-foreground" />
                    ) : (
                      <FileText className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    No {activeTab === 'all' ? '' : activeTab} submissions
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activeTab === 'pending' 
                      ? 'All candidates have completed their assessments'
                      : activeTab === 'completed'
                      ? 'No candidates have completed this assessment yet'
                      : 'No candidates have been assigned this assessment'
                    }
                  </p>
                </div>
              ) : (
                filteredResults.map((candidateResult, index) => (
                  <AssessmentResultCard
                    key={`${candidateResult.candidate.id}-${candidateResult.result.assessmentId}-${index}`}
                    candidateResult={candidateResult}
                    onResendEmail={() => {
                      toast.success(`Invitation resent to ${candidateResult.candidate.email}`);
                      onResendEmail?.(candidateResult.candidate, candidateResult.result.assessmentId);
                    }}
                    onViewReport={() => {
                      toast.success(`Viewing report for ${candidateResult.candidate.firstName} ${candidateResult.candidate.lastName}`);
                    }}
                  />
                ))
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
