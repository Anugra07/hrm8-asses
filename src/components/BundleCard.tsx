import { useState } from 'react';
import { AssessmentBundle, Assessment } from '@/types/assessment';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Check, ChevronDown, Clock, Package, Sparkles, FileText } from 'lucide-react';

interface BundleCardProps {
  bundle: AssessmentBundle;
  bundleAssessments: Assessment[];
  isSelected: boolean;
  isRecommended: boolean;
  onSelect: () => void;
}

const BundleCard = ({
  bundle,
  bundleAssessments,
  isSelected,
  isRecommended,
  onSelect,
}: BundleCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalDuration = bundleAssessments.reduce((sum, a) => sum + a.duration, 0);
  const testCount = bundle.tests?.length || bundleAssessments.length;

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <div
        className={`relative rounded-xl border-2 transition-all overflow-hidden ${
          isSelected
            ? 'border-primary bg-gradient-to-br from-primary/8 to-primary/15 shadow-md'
            : 'border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 hover:border-primary/40 hover:shadow-sm'
        } ${isExpanded ? 'ring-1 ring-primary/20' : ''}`}
      >
        {/* Main Card Content */}
        {/* Watermark */}
        <Package className="absolute top-3 right-3 h-16 w-16 text-primary/[0.06] pointer-events-none" />

        <div className="p-5">
          <div className="flex items-start gap-4">
            {/* Selection Indicator */}
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => onSelect()}
              onClick={(e) => e.stopPropagation()}
              className="mt-0.5"
            />

            <div className="flex-1 min-w-0">
              {/* Bundle Name + Badges */}
              <div className="flex items-center gap-2 mb-1">
                <Package className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="font-semibold text-foreground">{bundle.name}</span>
                {isRecommended && (
                  <Badge className="bg-primary/10 text-primary border-0 text-xs">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Recommended
                  </Badge>
                )}
                {bundle.popular && !isRecommended && (
                  <Badge className="bg-primary/10 text-primary border-0 text-xs">
                    Popular
                  </Badge>
                )}
              </div>

              {/* Assessment Count */}
              <p className="text-xs text-muted-foreground mb-3">
                {testCount} assessments included
              </p>

              {/* Pricing */}
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-foreground">
                    ${bundle.bundlePrice}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    ${bundle.originalPrice}
                  </span>
                  <Badge
                    className="bg-primary text-primary-foreground border-0 text-xs"
                  >
                    Save {bundle.savingsPercent}%
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">
                  ({bundle.creditCost} credits • was {bundle.originalCredits})
                </span>
              </div>
            </div>

            {/* Expand/Collapse Button */}
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className={`p-1.5 rounded-full text-muted-foreground hover:text-primary/70 hover:bg-primary/20 transition-all ${
                  isExpanded ? 'bg-primary/20 text-primary/70' : ''
                }`}
                aria-label="Toggle bundle details"
              >
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </CollapsibleTrigger>
          </div>
        </div>

        {/* Expanded Details */}
        <CollapsibleContent className="animate-accordion-down">
          <div className="px-5 pb-5 pt-0 border-t border-border/50">
            <div className="pt-4 space-y-4">
              {/* Quick Stats */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{totalDuration} min total</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  <span>{bundleAssessments.length} tests</span>
                </div>
              </div>

              {/* Included Assessments/Tests */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  Included assessments:
                </p>
                {bundle.tests && bundle.tests.length > 0 ? (
                  <div className="space-y-3">
                    {bundle.tests.map((test) => (
                      <div key={test.name}>
                        <p className="text-sm font-medium text-foreground mb-1">{test.name}</p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                          {test.skills.map((skill) => (
                            <div key={skill} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Check className="h-3 w-3 text-success flex-shrink-0" />
                              {skill}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                    {bundleAssessments.map((assessment) => (
                      <div
                        key={assessment.id}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Check className="h-3.5 w-3.5 text-success flex-shrink-0" />
                        <span className="text-foreground">{assessment.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Best For Tags */}
              {bundle.bestFor && bundle.bestFor.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">
                    Best for:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {bundle.bestFor.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs bg-muted/50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export default BundleCard;
