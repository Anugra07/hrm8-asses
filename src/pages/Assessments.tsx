import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { assessments } from '@/data/assessments';
import { bundles } from '@/data/bundles';
import { Assessment } from '@/types/assessment';
import { Clock, Sparkles, ArrowRight, Package, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { FilterButtonGroup } from '@/components/ui/filter-button-group';
import { categoryColors } from '@/lib/constants';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const AssessmentCard = ({ assessment }: { assessment: Assessment }) => (
  <div className="bg-card rounded-xl border border-border p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col">
    <div className="flex items-start justify-between mb-4">
      <Badge variant="outline" className={categoryColors[assessment.category]}>
        {assessment.category.charAt(0).toUpperCase() + assessment.category.slice(1)}
      </Badge>
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        {assessment.duration} min
      </div>
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2">{assessment.name}</h3>
    <p className="text-sm text-muted-foreground mb-4 flex-1">{assessment.description}</p>
    <div className="mb-4">
      <p className="text-xs text-muted-foreground mb-2">Common use cases:</p>
      <div className="flex flex-wrap gap-1">
        {assessment.useCases.slice(0, 3).map((useCase) => (
          <span key={useCase} className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground">{useCase}</span>
        ))}
      </div>
    </div>
    <div className="flex items-center justify-between pt-4 border-t border-border">
      <div>
        <span className="text-2xl font-bold text-foreground">${assessment.price}</span>
        <span className="text-sm text-muted-foreground"> / candidate</span>
      </div>
      <Link to="/wizard">
        <Button size="sm" variant="default">Select</Button>
      </Link>
    </div>
  </div>
);

const BundleDisplayCard = ({ bundle, isExpanded, onToggle }: { 
  bundle: typeof bundles[0]; 
  isExpanded: boolean; 
  onToggle: () => void; 
}) => {
  const testCount = bundle.tests?.length || 0;

  return (
    <Collapsible open={isExpanded} onOpenChange={onToggle}>
      <div className={`relative bg-card rounded-xl border-2 transition-all overflow-hidden ${
        isExpanded ? 'border-primary/40 shadow-md ring-1 ring-primary/20' : 'border-border hover:border-primary/30 hover:shadow-sm'
      }`}>
        <Package className="absolute top-3 right-3 h-14 w-14 text-primary/[0.06] pointer-events-none" />
        
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Package className="h-4 w-4 text-primary flex-shrink-0" />
            <h3 className="font-semibold text-foreground">{bundle.name}</h3>
          </div>

          <p className="text-xs text-muted-foreground mb-3">{testCount} tests included</p>

          <div className="flex flex-wrap gap-1 mb-4">
            {bundle.bestFor.slice(0, 3).map((role) => (
              <span key={role} className="text-xs px-2 py-0.5 bg-muted rounded-md text-muted-foreground">{role}</span>
            ))}
          </div>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold text-foreground">${bundle.bundlePrice}</span>
            <span className="text-sm text-muted-foreground line-through">${bundle.originalPrice}</span>
            <Badge className="bg-success/10 text-success border-success/20 text-xs">
              Save {bundle.savingsPercent}%
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/wizard" className="flex-1">
              <Button size="sm" variant="default" className="w-full">Select Bundle</Button>
            </Link>
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className={`p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all ${
                  isExpanded ? 'bg-primary/10 text-primary' : ''
                }`}
                aria-label="Toggle bundle details"
              >
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
              </button>
            </CollapsibleTrigger>
          </div>
        </div>

        <CollapsibleContent className="animate-accordion-down">
          <div className="px-5 pb-5 pt-0 border-t border-border/50">
            <div className="pt-4 space-y-4">
              {bundle.tests && bundle.tests.length > 0 && (
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
              )}
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

const Assessments = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAllBundles, setShowAllBundles] = useState(false);
  const [expandedBundle, setExpandedBundle] = useState<string | null>(null);

  const filteredAssessments = activeCategory === 'all' 
    ? assessments 
    : assessments.filter(a => a.category === activeCategory);

  const displayedBundles = showAllBundles ? bundles : bundles.slice(0, 4);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Assessments Library</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Browse our comprehensive library of validated assessments. Each test is designed to give you clear insights into candidate capabilities.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-secondary border border-primary/20">
              <div className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">AI-Powered Recommendations</p>
                <p className="text-xs text-muted-foreground">Start a wizard and get personalized test suggestions based on your role</p>
              </div>
              <Link to="/wizard">
                <Button size="sm" variant="default">
                  Try it
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Role-Specific Bundles */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Package className="h-4 w-4" />
                12 role-specific bundles
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Role-Specific Bundles</h2>
              <p className="text-lg text-muted-foreground">
                Pre-built assessment combinations designed for specific roles — with built-in savings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {displayedBundles.map((bundle) => (
                <BundleDisplayCard
                  key={bundle.id}
                  bundle={bundle}
                  isExpanded={expandedBundle === bundle.id}
                  onToggle={() => setExpandedBundle(expandedBundle === bundle.id ? null : bundle.id)}
                />
              ))}
            </div>

            <div className="text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAllBundles(!showAllBundles)}
              >
                {showAllBundles ? (
                  <>Show Less <ChevronUp className="ml-2 h-4 w-4" /></>
                ) : (
                  <>View All 12 Bundles <ChevronDown className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Library */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Assessment Library</h2>
            <p className="text-lg text-muted-foreground">Browse individual assessments or build your own combination.</p>
          </div>

          <div className="flex justify-center mb-12">
            <FilterButtonGroup
              options={[
                { label: 'All Tests', value: 'all' },
                { label: 'Skills', value: 'skills' },
                { label: 'Behavioural', value: 'behavioural' },
                { label: 'Aptitude', value: 'aptitude' },
              ]}
              value={activeCategory}
              onValueChange={setActiveCategory}
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssessments.map((assessment) => (
              <AssessmentCard key={assessment.id} assessment={assessment} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Not sure which tests to use?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start the assessment wizard and our AI will recommend the best tests based on your specific role requirements.
            </p>
            <Link to="/wizard">
              <Button variant="hero" size="lg">
                Get AI Recommendations
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Assessments;
