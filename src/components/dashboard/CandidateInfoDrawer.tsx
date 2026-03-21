import React from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle 
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Download,
  ExternalLink,
  Send,
  Calendar,
} from 'lucide-react';
import { RoleCandidate, CandidateAssessmentResult } from '@/types/assessment';
import { CandidateAddOnResult, addOnServices } from '@/data/addons';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface CandidateInfoDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidate: RoleCandidate | null;
  roleName?: string;
  resumeUrl?: string;
  onResendEmail?: () => void;
}

const statusColors: Record<string, string> = {
  completed: 'bg-success/10 text-success border-success/20',
  in_progress: 'bg-warning/10 text-warning border-warning/20',
  pending: 'bg-muted text-muted-foreground border-muted',
  invited: 'bg-info/10 text-info border-info/20',
  expired: 'bg-destructive/10 text-destructive border-destructive/20',
};

const statusLabels: Record<string, string> = {
  completed: 'Completed',
  in_progress: 'In Progress',
  pending: 'Pending',
  invited: 'Invited',
  expired: 'Expired',
};

export function CandidateInfoDrawer({
  open,
  onOpenChange,
  candidate,
  roleName,
  resumeUrl,
  onResendEmail,
}: CandidateInfoDrawerProps) {
  if (!candidate) return null;

  const handleResendEmail = () => {
    toast.success(`Invitation email resent to ${candidate.email}`);
    onResendEmail?.();
  };

  const handleDownloadReport = (assessmentName: string) => {
    toast.success(`Downloading ${assessmentName} report...`);
  };

  // Calculate assessment statistics
  const assessmentStats = candidate.assessmentResults?.reduce(
    (acc, result) => {
      acc.total++;
      if (result.status === 'completed') acc.completed++;
      else if (result.status === 'in_progress') acc.inProgress++;
      else acc.pending++;
      return acc;
    },
    { total: 0, completed: 0, inProgress: 0, pending: 0 }
  ) || { total: 0, completed: 0, inProgress: 0, pending: 0 };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <span className="block">{candidate.firstName} {candidate.lastName}</span>
              {roleName && (
                <span className="text-sm font-normal text-muted-foreground">{roleName}</span>
              )}
            </div>
          </SheetTitle>
          <SheetDescription>Candidate details and assessment progress</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Contact Information */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a 
                  href={`mailto:${candidate.email}`} 
                  className="text-sm text-primary hover:underline"
                >
                  {candidate.email}
                </a>
              </div>
              {candidate.mobile && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    {candidate.mobileCountryCode} {candidate.mobile}
                  </span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* CV / Resume */}
          {resumeUrl && (
            <>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3">Resume / CV</h4>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="flex items-center gap-2" asChild>
                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                      <FileText className="h-4 w-4" />
                      View CV
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Status */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Current Status</h4>
            <Badge className={cn("text-sm", statusColors[candidate.status])}>
              {statusLabels[candidate.status] || candidate.status}
            </Badge>
            {candidate.completedAt && (
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                Completed: {format(new Date(candidate.completedAt), 'PPP')}
              </div>
            )}
          </div>

          <Separator />

          {/* Assessment Progress */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Assessment Progress</h4>
            
            {assessmentStats.total > 0 ? (
              <>
                {/* Progress Summary */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="p-3 bg-success/10 rounded-lg text-center">
                    <p className="text-lg font-bold text-success">{assessmentStats.completed}</p>
                    <p className="text-xs text-success/80">Completed</p>
                  </div>
                  <div className="p-3 bg-warning/10 rounded-lg text-center">
                    <p className="text-lg font-bold text-warning">{assessmentStats.inProgress}</p>
                    <p className="text-xs text-warning/80">In Progress</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg text-center">
                    <p className="text-lg font-bold text-muted-foreground">{assessmentStats.pending}</p>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                </div>

                {/* Individual Assessments */}
                <div className="space-y-2">
                  {candidate.assessmentResults?.map((result, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {result.assessmentName}
                        </p>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {result.status === 'completed' && result.completedAt ? (
                            <span>Completed {format(new Date(result.completedAt), 'PP')}</span>
                          ) : (
                            <span>Assigned {format(new Date(result.assignedAt), 'PP')}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {result.status === 'completed' ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-success" />
                            {result.reportUrl && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 w-7 p-0"
                                onClick={() => handleDownloadReport(result.assessmentName)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            )}
                          </>
                        ) : result.status === 'in_progress' ? (
                          <Clock className="h-4 w-4 text-warning" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No assessments assigned yet.</p>
            )}
          </div>

          {/* Add-On Services */}
          {candidate.addOnResults && candidate.addOnResults.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3">Services</h4>
                <div className="space-y-2">
                  {candidate.addOnResults.map((result, index) => {
                    const addon = addOnServices.find(a => a.id === result.addOnId);
                    const statusColor: Record<string, string> = {
                      completed: 'bg-success/10 text-success border-success/20',
                      in_progress: 'bg-warning/10 text-warning border-warning/20',
                      pending: 'bg-muted text-muted-foreground border-muted',
                      failed: 'bg-destructive/10 text-destructive border-destructive/20',
                    };
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          {addon && <addon.icon className="h-4 w-4 text-primary" />}
                          <div>
                            <p className="text-sm font-medium text-foreground">{result.addOnName}</p>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(result.requestedAt), 'PP')}
                            </p>
                          </div>
                        </div>
                        <Badge className={cn("text-xs", statusColor[result.status])}>
                          {result.status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Actions */}
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={handleResendEmail}
            >
              <Send className="h-4 w-4 mr-2" />
              Resend Invitation Email
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
