import React, { useState, useMemo, forwardRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FilterButtonGroup } from '@/components/ui/filter-button-group';
import { Search, Clock, DollarSign } from 'lucide-react';
import { Assessment, CandidateAssessmentResult } from '@/types/assessment';
import { assessments } from '@/data/assessments';
import { categoryColors } from '@/lib/constants';

interface AssignAssessmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidate: {
    id: string;
    firstName: string;
    lastName: string;
    assessmentResults?: CandidateAssessmentResult[];
  } | null;
  roleId: string;
  roleName: string;
  onAssign: (candidateId: string, roleId: string, assessmentIds: string[]) => void;
}

export const AssignAssessmentDialog = ({
  open,
  onOpenChange,
  candidate,
  roleId,
  roleName,
  onAssign,
}: AssignAssessmentDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedAssessments, setSelectedAssessments] = useState<string[]>([]);

  // Get already assigned assessment IDs
  const assignedAssessmentIds = useMemo(() => {
    if (!candidate?.assessmentResults) return new Set<string>();
    return new Set(candidate.assessmentResults.map(r => r.assessmentId));
  }, [candidate]);

  // Filter assessments based on search and category
  const filteredAssessments = useMemo(() => {
    return assessments.filter(assessment => {
      const matchesSearch = !searchQuery || 
        assessment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assessment.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || assessment.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  const handleToggleAssessment = (assessmentId: string) => {
    setSelectedAssessments(prev => 
      prev.includes(assessmentId)
        ? prev.filter(id => id !== assessmentId)
        : [...prev, assessmentId]
    );
  };

  const handleAssign = () => {
    if (!candidate || selectedAssessments.length === 0) return;
    onAssign(candidate.id, roleId, selectedAssessments);
    setSelectedAssessments([]);
    setSearchQuery('');
    setCategoryFilter('all');
    onOpenChange(false);
  };

  const handleClose = () => {
    setSelectedAssessments([]);
    setSearchQuery('');
    setCategoryFilter('all');
    onOpenChange(false);
  };

  if (!candidate) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Assign Assessments</DialogTitle>
          <DialogDescription>
            Add assessments for <span className="font-medium text-foreground">{candidate.firstName} {candidate.lastName}</span> in the <span className="font-medium text-foreground">{roleName}</span> role.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search assessments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Category Filter */}
          <FilterButtonGroup
            options={[
              { label: 'All', value: 'all' },
              { label: 'Skills', value: 'skills' },
              { label: 'Behavioural', value: 'behavioural' },
              { label: 'Aptitude', value: 'aptitude' },
            ]}
            value={categoryFilter}
            onValueChange={setCategoryFilter}
          />

          {/* Assessment List */}
          <ScrollArea className="h-[300px] rounded-md border border-border">
            <div className="p-2 space-y-1">
              {filteredAssessments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No assessments found
                </div>
              ) : (
                filteredAssessments.map((assessment) => {
                  const isAssigned = assignedAssessmentIds.has(assessment.id);
                  const isSelected = selectedAssessments.includes(assessment.id);

                  return (
                    <div
                      key={assessment.id}
                      className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                        isAssigned 
                          ? 'bg-muted/30 opacity-60 cursor-not-allowed' 
                          : isSelected 
                            ? 'bg-primary/5 border border-primary/20' 
                            : 'hover:bg-muted/50 cursor-pointer border border-transparent'
                      }`}
                      onClick={() => !isAssigned && handleToggleAssessment(assessment.id)}
                    >
                      <Checkbox
                        checked={isSelected || isAssigned}
                        disabled={isAssigned}
                        onCheckedChange={() => !isAssigned && handleToggleAssessment(assessment.id)}
                        className="mt-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm text-foreground">
                            {assessment.name}
                          </span>
                          <Badge 
                            variant="outline" 
                            className={`${categoryColors[assessment.category]} text-[10px] px-1.5 py-0`}
                          >
                            {assessment.category}
                          </Badge>
                          {isAssigned && (
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                              Already assigned
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {assessment.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {assessment.duration} min
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            ${assessment.price}
                            <span className="text-muted-foreground/60">({assessment.creditCost} credits)</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </ScrollArea>

          {/* Selection Summary */}
          {selectedAssessments.length > 0 && (
            <div className="flex items-center justify-between text-sm bg-muted/50 rounded-lg px-3 py-2">
              <span className="text-muted-foreground">
                {selectedAssessments.length} assessment{selectedAssessments.length !== 1 ? 's' : ''} selected
              </span>
              <span className="font-medium text-foreground">
                ${selectedAssessments.reduce((total, id) => {
                  const assessment = assessments.find(a => a.id === id);
                  return total + (assessment?.price || 0);
                }, 0)}
              </span>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            variant="hero"
            onClick={handleAssign} 
            disabled={selectedAssessments.length === 0}
          >
            Assign {selectedAssessments.length > 0 ? `(${selectedAssessments.length})` : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
