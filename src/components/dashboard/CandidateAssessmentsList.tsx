import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Eye, Download, CheckCircle2, Clock, Circle, ChevronDown, ChevronUp } from 'lucide-react';
import { CandidateAssessmentResult } from '@/types/assessment';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { categoryColors } from '@/lib/constants';

interface CandidateAssessmentsListProps {
  assessmentResults?: CandidateAssessmentResult[];
  compact?: boolean;
  maxVisible?: number;
  showHeaders?: boolean;
}

export const CandidateAssessmentsList = ({ 
  assessmentResults = [], 
  compact = false,
  maxVisible = 3,
  showHeaders = false,
}: CandidateAssessmentsListProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!assessmentResults || assessmentResults.length === 0) {
    return <span className="text-muted-foreground text-sm">No assessments</span>;
  }

  const completedCount = assessmentResults.filter(a => a.status === 'completed').length;
  const totalCount = assessmentResults.length;
  const hasMore = assessmentResults.length > maxVisible;
  const visibleAssessments = isExpanded ? assessmentResults : assessmentResults.slice(0, maxVisible);

  const handleView = (result: CandidateAssessmentResult) => {
    toast.info(`Report preview for "${result.assessmentName}" coming soon`);
  };

  const handleDownload = (result: CandidateAssessmentResult) => {
    toast.success(`Download started for "${result.assessmentName}" report`);
  };

  const getStatusIcon = (status: CandidateAssessmentResult['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-3.5 w-3.5 text-success" />;
      case 'in_progress':
        return <Clock className="h-3.5 w-3.5 text-warning" />;
      default:
        return <Circle className="h-3.5 w-3.5 text-muted-foreground" />;
    }
  };

  const getStatusLabel = (status: CandidateAssessmentResult['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      default:
        return 'Pending';
    }
  };

  const formatDate = (date?: Date) => {
    if (!date) return '—';
    return format(new Date(date), 'd MMM yy');
  };

  if (compact) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-sm cursor-default">
              <span className="font-medium text-foreground">{completedCount}</span>
              <span className="text-muted-foreground">/{totalCount}</span>
            </span>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <div className="space-y-1.5">
              {assessmentResults.map((result, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs">
                  {getStatusIcon(result.status)}
                  <span>{result.assessmentName}</span>
                </div>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="space-y-1">
      {/* Grid layout with fixed columns for alignment */}
      <div className="grid gap-y-1">
        {/* Header Row - only shown when showHeaders is true */}
        {showHeaders && (
          <div 
            className="grid items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-wide font-medium border-b border-border/50 pb-1 mb-1"
            style={{ gridTemplateColumns: '20px auto 1fr 72px 72px 28px 28px' }}
          >
            <span></span>
            <span>Type</span>
            <span>Assessment</span>
            <span>Assigned</span>
            <span>Done</span>
            <span className="text-center">View</span>
            <span className="text-center">DL</span>
          </div>
        )}
        
        {visibleAssessments.map((result, idx) => (
          <div 
            key={idx} 
            className="grid items-center gap-2 text-sm"
            style={{ gridTemplateColumns: '20px auto 1fr 72px 72px 28px 28px' }}
          >
            {/* Status Icon */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-default flex items-center justify-center w-5">
                    {getStatusIcon(result.status)}
                  </span>
                </TooltipTrigger>
                <TooltipContent side="left">
                  {getStatusLabel(result.status)}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {/* Category Badge */}
            <Badge variant="outline" className={`${categoryColors[result.category]} text-[10px] px-1.5 py-0 whitespace-nowrap`}>
              {result.category.slice(0, 3)}
            </Badge>
            
            {/* Assessment Name */}
            <span className="text-muted-foreground truncate min-w-0" title={result.assessmentName}>
              {result.assessmentName}
            </span>
            
            {/* Assigned Date */}
            <span className="text-xs text-muted-foreground whitespace-nowrap text-center">
              {formatDate(result.assignedAt)}
            </span>
            
            {/* Completed Date */}
            <span className="text-xs text-muted-foreground whitespace-nowrap text-center">
              {formatDate(result.completedAt)}
            </span>
            
            {/* View Button - always reserve space */}
            <div className="flex items-center justify-center">
              {result.status === 'completed' ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={() => handleView(result)}
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>View Report</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <div className="h-7 w-7" /> 
              )}
            </div>
            
            {/* Download Button - always reserve space */}
            <div className="flex items-center justify-center">
              {result.status === 'completed' ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={() => handleDownload(result)}
                      >
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Download Report</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <div className="h-7 w-7" />
              )}
            </div>
          </div>
        ))}
      </div>
      
      {hasMore && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs text-primary hover:underline mt-1"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-3 w-3" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3" />
              +{assessmentResults.length - maxVisible} more
            </>
          )}
        </button>
      )}
    </div>
  );
};
