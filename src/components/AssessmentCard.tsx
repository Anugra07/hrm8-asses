import { useState } from 'react';
import { Assessment } from '@/types/assessment';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Clock, DollarSign, Check, Plus, ChevronDown } from 'lucide-react';

const categoryColors: Record<string, string> = {
  skills: 'bg-info/10 text-info border-info/20',
  behavioural: 'bg-warning/10 text-warning border-warning/20',
  aptitude: 'bg-primary/10 text-primary border-primary/20',
};

interface AssessmentCardProps {
  assessment: Assessment;
  isSelected: boolean;
  isRecommended?: boolean;
  onToggle: () => void;
}

const AssessmentCard = ({
  assessment,
  isSelected,
  isRecommended = false,
  onToggle,
}: AssessmentCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <div
        className={`rounded-lg border-2 transition-all ${
          isSelected
            ? 'border-primary bg-primary/5'
            : isExpanded
            ? 'border-primary/30 bg-muted/30'
            : 'border-border hover:border-primary/30'
        }`}
      >
        {/* Main Card Content - Clickable to toggle selection */}
        <div
          onClick={onToggle}
          className="p-4 cursor-pointer"
        >
          <div className="flex items-start gap-3">
            {/* Selection Indicator */}
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'
              }`}
            >
              {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
            </div>

            {/* Assessment Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-foreground">{assessment.name}</span>
                {isRecommended && (
                  <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                    Recommended
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <Badge variant="outline" className={categoryColors[assessment.category]}>
                  {assessment.category}
                </Badge>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {assessment.duration} min
                </span>
              </div>
            </div>

            {/* Price and Expand Toggle */}
            <div className="flex items-center gap-2">
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label="Toggle details"
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </CollapsibleTrigger>
              <div className="text-right">
                <span className="font-semibold text-foreground">${assessment.price}</span>
                <div className="text-xs text-muted-foreground">({assessment.creditCost} credits)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Details */}
        <CollapsibleContent className="animate-accordion-down data-[state=closed]:animate-accordion-up">
          <div className="px-4 pb-4 pt-0 border-t border-border/50">
            <div className="pt-4 space-y-4">
              {/* Description */}
              <p className="text-sm text-muted-foreground">{assessment.description}</p>

              {/* Quick Facts */}
              <div className="flex items-center gap-6 py-3 border-y border-border/50">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground font-medium">{assessment.duration} minutes</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground font-medium">${assessment.price} per candidate</span>
                  <span className="text-muted-foreground">({assessment.creditCost} credits)</span>
                </div>
              </div>

              {/* Use Cases */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Best used for:</h4>
                <div className="flex flex-wrap gap-2">
                  {assessment.useCases.map((useCase, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-muted text-muted-foreground font-normal"
                    >
                      {useCase}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <Button
                type="button"
                variant={isSelected ? 'outline' : 'default'}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle();
                }}
                className="w-full"
              >
                {isSelected ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Remove from Selection
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Selection
                  </>
                )}
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export default AssessmentCard;
