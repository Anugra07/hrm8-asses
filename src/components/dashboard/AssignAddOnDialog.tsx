import React, { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { DollarSign } from 'lucide-react';
import { addOnServices, CandidateAddOnResult } from '@/data/addons';

interface AssignAddOnDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidate: {
    id: string;
    firstName: string;
    lastName: string;
    addOnResults?: CandidateAddOnResult[];
  } | null;
  roleId: string;
  roleName: string;
  onAssign: (candidateId: string, roleId: string, addOnIds: string[]) => void;
}

export const AssignAddOnDialog = ({
  open,
  onOpenChange,
  candidate,
  roleId,
  roleName,
  onAssign,
}: AssignAddOnDialogProps) => {
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const assignedAddOnIds = useMemo(() => {
    if (!candidate?.addOnResults) return new Set<string>();
    return new Set(candidate.addOnResults.map(r => r.addOnId));
  }, [candidate]);

  const handleToggle = (id: string) => {
    setSelectedAddOns(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAssign = () => {
    if (!candidate || selectedAddOns.length === 0) return;
    onAssign(candidate.id, roleId, selectedAddOns);
    setSelectedAddOns([]);
    onOpenChange(false);
  };

  const handleClose = () => {
    setSelectedAddOns([]);
    onOpenChange(false);
  };

  if (!candidate) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Assign Services</DialogTitle>
          <DialogDescription>
            Add services for <span className="font-medium text-foreground">{candidate.firstName} {candidate.lastName}</span> in the <span className="font-medium text-foreground">{roleName}</span> role.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[400px]">
          <div className="space-y-2 p-1">
            {addOnServices.map((addon) => {
              const isAssigned = assignedAddOnIds.has(addon.id);
              const isSelected = selectedAddOns.includes(addon.id);

              return (
                <div
                  key={addon.id}
                  className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                    isAssigned
                      ? 'bg-muted/30 opacity-60 cursor-not-allowed'
                      : isSelected
                        ? 'bg-primary/5 border border-primary/20'
                        : 'hover:bg-muted/50 cursor-pointer border border-transparent'
                  }`}
                  onClick={() => !isAssigned && handleToggle(addon.id)}
                >
                  <Checkbox
                    checked={isSelected || isAssigned}
                    disabled={isAssigned}
                    onCheckedChange={() => !isAssigned && handleToggle(addon.id)}
                    className="mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <addon.icon className="h-4 w-4 text-primary shrink-0" />
                      <span className="font-medium text-sm text-foreground">{addon.name}</span>
                      {isAssigned && (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                          Already assigned
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{addon.description}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <DollarSign className="h-3 w-3" />
                      ${addon.price}
                      <span className="text-muted-foreground/60">({addon.creditCost} credits)</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {selectedAddOns.length > 0 && (
          <div className="flex items-center justify-between text-sm bg-muted/50 rounded-lg px-3 py-2">
            <span className="text-muted-foreground">
              {selectedAddOns.length} service{selectedAddOns.length !== 1 ? 's' : ''} selected
            </span>
            <span className="font-medium text-foreground">
              ${selectedAddOns.reduce((total, id) => {
                const addon = addOnServices.find(a => a.id === id);
                return total + (addon?.price || 0);
              }, 0)}
            </span>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button variant="hero" onClick={handleAssign} disabled={selectedAddOns.length === 0}>
            Assign {selectedAddOns.length > 0 ? `(${selectedAddOns.length})` : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
