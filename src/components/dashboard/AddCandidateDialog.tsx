import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2, UserPlus, Upload, FileText, Loader2, X } from 'lucide-react';
import { RoleCandidate } from '@/types/assessment';
import { countryCodes } from '@/lib/constants';
import { apiClient } from '@/lib/api';
import { toast } from 'sonner';

interface NewCandidateForm {
  firstName: string;
  lastName: string;
  email: string;
  mobileCountryCode: string;
  mobile: string;
  cvFile: File | null;
  cvFileName: string;
}

const emptyCandidate: NewCandidateForm = {
  firstName: '',
  lastName: '',
  email: '',
  mobileCountryCode: '+61',
  mobile: '',
  cvFile: null,
  cvFileName: '',
};

interface AddCandidateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roleName: string;
  roleId: string;
  onAddCandidates: (candidates: RoleCandidate[]) => void;
  useApi?: boolean; // If true, use the API to add candidates
}

export function AddCandidateDialog({
  open,
  onOpenChange,
  roleName,
  roleId,
  onAddCandidates,
  useApi = true,
}: AddCandidateDialogProps) {
  const [candidates, setCandidates] = useState<NewCandidateForm[]>([{ ...emptyCandidate }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const addCandidateRow = () => {
    setCandidates([...candidates, { ...emptyCandidate }]);
  };

  const removeCandidateRow = (index: number) => {
    if (candidates.length > 1) {
      setCandidates(candidates.filter((_, i) => i !== index));
    }
  };

  const updateCandidate = (index: number, field: keyof NewCandidateForm, value: string | File | null) => {
    const updated = [...candidates];
    if (field === 'cvFile' && value instanceof File) {
      updated[index] = { ...updated[index], cvFile: value, cvFileName: value.name };
    } else if (field === 'cvFile' && value === null) {
      updated[index] = { ...updated[index], cvFile: null, cvFileName: '' };
    } else if (typeof value === 'string') {
      updated[index] = { ...updated[index], [field]: value };
    }
    setCandidates(updated);
  };

  const handleFileSelect = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload a PDF or Word document');
        return;
      }
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      updateCandidate(index, 'cvFile', file);
    }
  };

  const removeCvFile = (index: number) => {
    updateCandidate(index, 'cvFile', null);
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index]!.value = '';
    }
  };

  const isValid = candidates.every(
    (c) => c.firstName.trim() && c.lastName.trim() && c.email.trim()
  );

  const handleSubmit = async () => {
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);

    try {
      if (useApi && roleId) {
        // Use API to add each candidate
        const addedCandidates: RoleCandidate[] = [];
        let successCount = 0;
        let errorCount = 0;

        for (const candidate of candidates) {
          try {
            const response = await apiClient.addCandidateToJob(
              roleId,
              {
                firstName: candidate.firstName.trim(),
                lastName: candidate.lastName.trim(),
                email: candidate.email.trim(),
                mobile: candidate.mobile.trim() || undefined,
                mobileCountryCode: candidate.mobileCountryCode,
              },
              candidate.cvFile || undefined
            );

            if (response.success && response.data) {
              successCount++;
              addedCandidates.push({
                id: response.data.candidateId,
                firstName: candidate.firstName.trim(),
                lastName: candidate.lastName.trim(),
                email: candidate.email.trim(),
                mobileCountryCode: candidate.mobileCountryCode,
                mobile: candidate.mobile.trim() || undefined,
                status: 'invited' as const,
                stage: 'NEW_APPLICATION',
              });
            } else {
              errorCount++;
              console.error(`Failed to add candidate ${candidate.email}:`, response.error);
            }
          } catch (err) {
            errorCount++;
            console.error(`Error adding candidate ${candidate.email}:`, err);
          }
        }

        if (successCount > 0) {
          toast.success(`Successfully added ${successCount} candidate${successCount !== 1 ? 's' : ''}`);
          onAddCandidates(addedCandidates);
        }
        if (errorCount > 0) {
          toast.error(`Failed to add ${errorCount} candidate${errorCount !== 1 ? 's' : ''}`);
        }
      } else {
        // Fallback to local-only (for mock data)
        const newCandidates: RoleCandidate[] = candidates.map((c, i) => ({
          id: `new-${Date.now()}-${i}`,
          firstName: c.firstName.trim(),
          lastName: c.lastName.trim(),
          email: c.email.trim(),
          mobileCountryCode: c.mobileCountryCode,
          mobile: c.mobile.trim() || undefined,
          status: 'invited' as const,
          stage: 'NEW_APPLICATION',
        }));

        toast.success(`Added ${newCandidates.length} candidate${newCandidates.length !== 1 ? 's' : ''}`);
        onAddCandidates(newCandidates);
      }

      setCandidates([{ ...emptyCandidate }]);
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to add candidates:', error);
      toast.error('Failed to add candidates. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setCandidates([{ ...emptyCandidate }]);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Add Candidates
          </DialogTitle>
          <DialogDescription>
            Add one or more candidates to <span className="font-medium text-foreground">{roleName}</span>.
            They will receive an email invitation to complete the assessments.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {candidates.map((candidate, index) => (
            <div
              key={index}
              className="p-4 bg-muted/50 rounded-lg border border-border space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  Candidate {index + 1}
                </span>
                {candidates.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                    onClick={() => removeCandidateRow(index)}
                    disabled={isSubmitting}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor={`firstName-${index}`}>First Name *</Label>
                  <Input
                    id={`firstName-${index}`}
                    value={candidate.firstName}
                    onChange={(e) => updateCandidate(index, 'firstName', e.target.value)}
                    placeholder="John"
                    className="mt-1.5"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Label htmlFor={`lastName-${index}`}>Last Name *</Label>
                  <Input
                    id={`lastName-${index}`}
                    value={candidate.lastName}
                    onChange={(e) => updateCandidate(index, 'lastName', e.target.value)}
                    placeholder="Doe"
                    className="mt-1.5"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`email-${index}`}>Email Address *</Label>
                <Input
                  id={`email-${index}`}
                  type="email"
                  value={candidate.email}
                  onChange={(e) => updateCandidate(index, 'email', e.target.value)}
                  placeholder="john.doe@example.com"
                  className="mt-1.5"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <Label htmlFor={`mobile-${index}`}>Mobile (Optional)</Label>
                <div className="flex gap-2 mt-1.5">
                  <Select
                    value={candidate.mobileCountryCode}
                    onValueChange={(value) => updateCandidate(index, 'mobileCountryCode', value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((cc) => (
                        <SelectItem key={cc.code} value={cc.code}>
                          {cc.flag} {cc.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id={`mobile-${index}`}
                    type="tel"
                    value={candidate.mobile}
                    onChange={(e) => updateCandidate(index, 'mobile', e.target.value)}
                    placeholder="400 000 000"
                    className="flex-1"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* CV Upload Section */}
              <div>
                <Label>CV / Resume (Optional)</Label>
                <div className="mt-1.5">
                  {candidate.cvFile ? (
                    <div className="flex items-center gap-2 p-3 bg-background rounded-lg border border-border">
                      <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="flex-1 text-sm truncate">{candidate.cvFileName}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        onClick={() => removeCvFile(index)}
                        disabled={isSubmitting}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className={`
                        flex items-center justify-center gap-2 p-3 
                        border-2 border-dashed border-border rounded-lg
                        cursor-pointer transition-colors
                        hover:bg-muted/50 hover:border-primary/50
                        ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                      onClick={() => !isSubmitting && fileInputRefs.current[index]?.click()}
                    >
                      <Upload className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Click to upload CV (PDF, DOC, DOCX)
                      </span>
                      <input
                        ref={(el) => (fileInputRefs.current[index] = el)}
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={(e) => handleFileSelect(index, e)}
                        className="hidden"
                        disabled={isSubmitting}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={addCandidateRow}
            disabled={isSubmitting}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Candidate
          </Button>
        </div>

        <DialogFooter className="border-t border-border pt-4">
          <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="hero" onClick={handleSubmit} disabled={!isValid || isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4 mr-2" />
                Add {candidates.length} Candidate{candidates.length !== 1 ? 's' : ''}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
