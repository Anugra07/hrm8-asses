import React, { useState, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Mail, 
  FileText, 
  MoreVertical, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  User,
  ChevronRight,
  GripVertical,
  Send,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { RoleCandidate, CandidateAssessmentResult } from '@/types/assessment';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api';

// Pipeline stages matching Prisma ApplicationStage enum
type PipelineStage = 
  | 'NEW_APPLICATION' 
  | 'RESUME_REVIEW' 
  | 'TECHNICAL_INTERVIEW'
  | 'ONSITE_INTERVIEW'
  | 'OFFER_EXTENDED'
  | 'OFFER_ACCEPTED'
  | 'REJECTED';

interface PipelineCandidate extends RoleCandidate {
  stage: PipelineStage;
  resumeUrl?: string;
}

interface PipelineColumnData {
  id: string; // Can be a PipelineStage enum element OR an assessment ID
  label: string;
  color: string;
  bgColor: string;
  type: 'stage' | 'assessment';
  stageEnum?: PipelineStage; // The underlying Prisma stage enum this maps to
}

// Fixed stages that always exist
const FIXED_STAGES_START: PipelineColumnData[] = [
  { id: 'NEW_APPLICATION', label: 'New', color: 'text-slate-600', bgColor: 'bg-slate-100', type: 'stage', stageEnum: 'NEW_APPLICATION' },
];

const FIXED_STAGES_END: PipelineColumnData[] = [
  { id: 'OFFER_EXTENDED', label: 'Offer', color: 'text-emerald-600', bgColor: 'bg-emerald-100', type: 'stage', stageEnum: 'OFFER_EXTENDED' },
  { id: 'OFFER_ACCEPTED', label: 'Hired', color: 'text-green-600', bgColor: 'bg-green-100', type: 'stage', stageEnum: 'OFFER_ACCEPTED' },
  { id: 'REJECTED', label: 'Rejected', color: 'text-red-600', bgColor: 'bg-red-100', type: 'stage', stageEnum: 'REJECTED' },
];

interface PipelineViewProps {
  jobId: string;
  candidates: PipelineCandidate[];
  rounds: Array<{ id: string; name: string }>; // Added rounds prop
  onCandidateClick?: (candidate: PipelineCandidate) => void;
  onCandidateMove?: (candidateId: string, newStage: PipelineStage) => void;
  onResendEmail?: (candidate: PipelineCandidate) => void;
}

// Helper to get assessment status summary
function getAssessmentStatusSummary(results?: CandidateAssessmentResult[]) {
  if (!results?.length) return null;
  const completed = results.filter(r => r.status === 'completed').length;
  const total = results.length;
  return { completed, total };
}

// Candidate Card Component
function CandidateCard({ 
  candidate, 
  onDragStart,
  onDragEnd,
  onClick,
  onResendEmail,
}: { 
  candidate: PipelineCandidate;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onClick?: () => void;
  onResendEmail?: () => void;
}) {
  const assessmentSummary = getAssessmentStatusSummary(candidate.assessmentResults);

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className={cn(
        "group p-3 bg-card border border-border rounded-lg cursor-grab active:cursor-grabbing",
        "hover:shadow-md transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      )}
    >
      <div className="flex items-start gap-2">
        <GripVertical className="h-4 w-4 text-muted-foreground/50 mt-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {candidate.firstName} {candidate.lastName}
                </p>
                <p className="text-xs text-muted-foreground truncate">{candidate.email}</p>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onClick?.(); }}>
                  <User className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                {candidate.resumeUrl && (
                  <DropdownMenuItem asChild>
                    <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                      <FileText className="h-4 w-4 mr-2" />
                      View CV
                    </a>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onResendEmail?.(); }}>
                  <Send className="h-4 w-4 mr-2" />
                  Resend Invitation
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Assessment Status */}
          {assessmentSummary && (
            <div className="mt-2 pt-2 border-t border-border/50">
              <div className="flex items-center gap-1 text-xs">
                {assessmentSummary.completed === assessmentSummary.total ? (
                  <>
                    <CheckCircle2 className="h-3 w-3 text-success" />
                    <span className="text-success">All assessments complete</span>
                  </>
                ) : assessmentSummary.completed > 0 ? (
                  <>
                    <Clock className="h-3 w-3 text-warning" />
                    <span className="text-warning">{assessmentSummary.completed}/{assessmentSummary.total} complete</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Pending assessments</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Pipeline Column Component
function PipelineColumn({ 
  stage,
  candidates,
  onDrop,
  onCandidateDragStart,
  onCandidateDragEnd,
  onCandidateClick,
  onResendEmail,
}: {
  stage: PipelineColumnData;
  candidates: PipelineCandidate[];
  onDrop: (candidateId: string) => void;
  onCandidateDragStart: (candidateId: string) => void;
  onCandidateDragEnd: () => void;
  onCandidateClick: (candidate: PipelineCandidate) => void;
  onResendEmail: (candidate: PipelineCandidate) => void;
}) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const candidateId = e.dataTransfer.getData('text/plain');
    if (candidateId) {
      onDrop(candidateId);
    }
  }, [onDrop]);

  return (
    <div className="flex flex-col min-w-[280px] max-w-[280px]">
      {/* Column Header */}
      <div className={cn("px-3 py-2 rounded-t-lg", stage.bgColor)}>
        <div className="flex items-center justify-between">
          <h3 className={cn("text-sm font-medium", stage.color)}>{stage.label}</h3>
          <Badge variant="secondary" className="text-xs">
            {candidates.length}
          </Badge>
        </div>
      </div>

      {/* Candidates List */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "flex-1 p-2 space-y-2 bg-muted/30 rounded-b-lg border border-border border-t-0 min-h-[200px] transition-colors",
          isDragOver && "bg-primary/5 border-primary/30"
        )}
      >
        {candidates.length === 0 ? (
          <div className={cn(
            "h-full min-h-[150px] flex items-center justify-center text-center p-4",
            "border-2 border-dashed border-border rounded-lg",
            isDragOver && "border-primary/50 bg-primary/5"
          )}>
            <p className="text-xs text-muted-foreground">
              {isDragOver ? 'Drop here' : 'No candidates'}
            </p>
          </div>
        ) : (
          candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', candidate.id);
                onCandidateDragStart(candidate.id);
              }}
              onDragEnd={onCandidateDragEnd}
              onClick={() => onCandidateClick(candidate)}
              onResendEmail={() => onResendEmail(candidate)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export function PipelineView({
  jobId,
  candidates: initialCandidates,
  rounds,
  onCandidateClick,
  onCandidateMove,
  onResendEmail,
}: PipelineViewProps) {
  const [candidates, setCandidates] = useState<PipelineCandidate[]>(initialCandidates);
  const [draggingCandidateId, setDraggingCandidateId] = useState<string | null>(null);
  const [pendingMove, setPendingMove] = useState<{candidateId: string, stage: PipelineStage | string, roundId?: string} | null>(null);

  // Sync local state
  React.useEffect(() => {
    setCandidates(initialCandidates);
  }, [initialCandidates]);

  // Generate dynamic columns
  const columns = React.useMemo(() => {
    // Filter out any rounds that might be "Fixed" stages masquerading as assessments
    // (This fixes the issue where "New", "Offer", "Hired", "Rejected" appear as assessments if fetched incorrectly)
    const validRounds = rounds.filter(r => !['New', 'Offer', 'Hired', 'Rejected', 'Screening', 'Interview'].includes(r.name));

    const assessmentColumns: PipelineColumnData[] = validRounds.map((round, index) => ({
      id: round.id,
      label: round.name,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      type: 'assessment',
      stageEnum: 'TECHNICAL_INTERVIEW', // Assessments map to TECHNICAL_INTERVIEW generally
    }));

    // User requested to REMOVE "Offer", "Hired", "Rejected" fixed stages.
    // So we only return Start (New) + Assessments.
    return [...FIXED_STAGES_START, ...assessmentColumns];
  }, [rounds]);

  // Group candidates by column
  const candidatesByColumn = React.useMemo(() => {
    const grouped: Record<string, PipelineCandidate[]> = {};
    columns.forEach(col => grouped[col.id] = []);

    candidates.forEach(candidate => {
      // Logic to determine which column a candidate belongs to
      let placed = false;

      // 1. Check if candidate matches a fixed stage
      const fixedStageCol = columns.find(col => col.type === 'stage' && col.id === candidate.stage);
      if (fixedStageCol) {
        grouped[fixedStageCol.id].push(candidate);
        placed = true;
      }
      
      // 2. If not fixed, and stage implies assessment (TECHNICAL_INTERVIEW), find which assessment
      if (!placed && (candidate.stage === 'TECHNICAL_INTERVIEW' || candidate.stage === 'RESUME_REVIEW' || candidate.stage === 'ONSITE_INTERVIEW')) {
        // Find the active assessment for this candidate
        // We look for an incomplete assessment result, or the last completed one?
        // Usually "in progress" means they are at that stage.
        
        // Strategy: Find the LATEST round (highest index) where the candidate has an entry.
        // If they have entries for Round 1 and Round 3, they are likely in Round 3 (skipped Round 2).
        // If the latest entry is 'completed', logic might suggest they are ready for the next one,
        // but typically 'completed' stays in that column until moved? OR they move to next.
        //
        // Current behavior implies: 'In Progress' = In Column. 'Completed' = Ready for next.
        // If I just dragged to 'Video Interview', I created an entry there (NOT_STARTED/IN_PROGRESS).
        // So I should be in Video Interview.
        
        // new Strategy: Sort active rounds by 'updatedAt' (descending) to find the most recent interaction.
        // This handles moving backward (e.g. Round 2 -> Round 1), as Round 1 will have a fresher updatedAt.
        
        // 1. Find all rounds where candidate has an entry
        const activeRounds = rounds
            .map((round, index) => {
                const result = candidate.assessmentResults?.find(r => r.assessmentId === round.id);
                if (!result) return null;
                return { round, result, index };
            })
            .filter((item): item is { round: { id: string; name: string }, result: CandidateAssessmentResult, index: number } => item !== null);

        // 2. Sort by updated_at (or assignedAt/createdAt as fallback)
        activeRounds.sort((a, b) => {
            const timeA = new Date(a.result.updatedAt || a.result.assignedAt).getTime();
            const timeB = new Date(b.result.updatedAt || b.result.assignedAt).getTime();
            return timeB - timeA; // Descending (newest first)
        });

        // 3. Pick the top one
        let targetRound = null;
        if (activeRounds.length > 0) {
            targetRound = activeRounds[0].round;
        } else {
             // No progress in ANY round. Default to first.
             if (rounds.length > 0) {
                 targetRound = rounds[0];
             }
        }

        if (targetRound) {
             // Place in this assessment column if it exists in our columns
             if (grouped[targetRound.id]) {
                 grouped[targetRound.id].push(candidate);
                 placed = true;
             }
        }
      }

      // Fallback: if still not placed (e.g. stage mismatch), dump in New
      if (!placed) {
         if (grouped['NEW_APPLICATION']) grouped['NEW_APPLICATION'].push(candidate);
      }
    });

    return grouped;
  }, [candidates, columns, rounds]);

  // Handle dropping
  const handleDrop = useCallback(async (candidateId: string, targetColumnId: string) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (!candidate) return;

    // Determine the new "Stage" enum and potentially "Round ID"
    // If dropping into a fixed stage (New, Offer, Hired, Rejected)
    const targetCol = columns.find(c => c.id === targetColumnId);
    if (!targetCol) return;

    if (targetCol.type === 'stage') {
        const newStage = targetCol.stageEnum!;
        if (candidate.stage === newStage) return;
        setPendingMove({ candidateId, stage: newStage, roundId: undefined });
    } else {
        // Dropping into an assessment column
        // Moving to an assessment column maps to 'TECHNICAL_INTERVIEW' 
        // AND we pass the roundId so backend creates ApplicationRoundProgress
        
        const newStage = 'TECHNICAL_INTERVIEW';
        const roundId = targetCol.id; // The column ID is the assessment round ID
        
        setPendingMove({ candidateId, stage: newStage, roundId }); 
    }
  }, [candidates, columns]);

  const confirmMove = async () => {
    if (!pendingMove) return;
    const { candidateId, stage, roundId } = pendingMove;
    
    const candidate = candidates.find(c => c.id === candidateId);
    if (!candidate) {
        setPendingMove(null);
        return;
    }

    const oldStage = initialCandidates.find(c => c.id === candidateId)?.stage || candidate.stage;

    // Optimistically update UI
    setCandidates(prev => 
      prev.map(c => c.id === candidateId ? { ...c, stage: stage as PipelineStage } : c)
    );

    try {
      const response = await apiClient.moveCandidate(jobId, candidateId, { stage: stage as PipelineStage, roundId }) as any;
      
      if (response.success) {
        // Find label for toast
        const targetCol = columns.find(c => c.stageEnum === stage || c.id === stage);
        toast.success(`Moved ${candidate.firstName} ${candidate.lastName} to ${targetCol?.label || stage}`);
        onCandidateMove?.(candidateId, stage as PipelineStage);
      } else {
         throw new Error(response.error || 'Failed to move candidate');
      }
    } catch (error: any) {
        console.error("Move failed", error);
        setCandidates(prev => 
             prev.map(c => c.id === candidateId ? { ...c, stage: oldStage } : c)
        );
        const errorMessage = error.response?.data?.error || error.message || 'Failed to move candidate';
        if (errorMessage.includes('Insufficient credits')) {
             toast.error('Insufficient credits.', { description: "Action costs 1 credit." });
        } else {
             toast.error(errorMessage);
        }
    }
    setPendingMove(null);
  };

  // ... (handleResendEmail, handleCandidateClick same as before) ...
  const handleResendEmail = useCallback((candidate: PipelineCandidate) => {
    toast.success(`Invitation resent to ${candidate.email}`);
    onResendEmail?.(candidate);
  }, [onResendEmail]);

  const handleCandidateClick = useCallback((candidate: PipelineCandidate) => {
    onCandidateClick?.(candidate);
  }, [onCandidateClick]);

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 pb-4 min-w-fit">
        {columns.map((col) => (
          <PipelineColumn
            key={col.id}
            stage={col as any} // Cast to any to match props structure since we extended it
            candidates={candidatesByColumn[col.id]}
            onDrop={(candidateId) => handleDrop(candidateId, col.id)}
            onCandidateDragStart={setDraggingCandidateId}
            onCandidateDragEnd={() => setDraggingCandidateId(null)}
            onCandidateClick={handleCandidateClick}
            onResendEmail={handleResendEmail}
          />
        ))}
      </div>

       <AlertDialog open={!!pendingMove} onOpenChange={(open) => !open && setPendingMove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Move Candidate Confirmation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to move this candidate?
              <br />
              <div className="font-semibold text-foreground mt-2 flex items-center gap-2">
                <span>Cost:</span>
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs flex items-center gap-1">
                   1 Credit
                </span>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmMove}>Yes, Move Candidate</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export { type PipelineStage, type PipelineCandidate };
