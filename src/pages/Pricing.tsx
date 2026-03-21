import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Star, Package, ChevronDown } from 'lucide-react';
import { addOnServices } from '@/data/addons';
import { creditTiers } from '@/lib/constants';
import { bundles } from '@/data/bundles';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const pricingTiers = [
  {
    name: 'Behavioural Tests',
    from: 25,
    description: 'Personality & workplace fit',
    features: [
      'Personality profiles',
      'Leadership style',
      'Emotional intelligence',
      'Work values & motivation',
      'Team dynamics fit',
    ],
  },
  {
    name: 'Skills Tests',
    from: 30,
    description: 'Practical skills assessments',
    features: [
      'Coding & technical skills',
      'Excel & software proficiency',
      'Sales aptitude',
      'Project management',
      'Typing speed & accuracy',
    ],
  },
  {
    name: 'Aptitude Tests',
    from: 40,
    description: 'Cognitive & reasoning ability',
    features: [
      'Cognitive ability',
      'Numerical reasoning',
      'Verbal reasoning',
      'Abstract reasoning',
      'Learning potential',
    ],
  },
];

const BundlePricingCard = ({ bundle }: { bundle: typeof bundles[0] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const testCount = bundle.tests?.length || 0;

  return (
    <div className="relative bg-card rounded-2xl border border-border p-8 shadow-card hover:shadow-card-hover transition-all">
      {bundle.popular && (
        <span className="absolute -top-3 left-6 inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-sm">
          <Star className="h-3 w-3" />
          Popular
        </span>
      )}
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {bundle.name}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        {bundle.description}
      </p>

      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-3xl font-bold text-foreground">
          ${bundle.bundlePrice}
        </span>
        <span className="text-muted-foreground"> / candidate</span>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {bundle.bestFor.map((role) => (
          <span
            key={role}
            className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground"
          >
            {role}
          </span>
        ))}
      </div>

      {/* Expandable test details */}
      {bundle.tests && bundle.tests.length > 0 && (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 mb-4 transition-colors">
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            {testCount} tests included
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-4 mb-4 pl-1 border-l-2 border-primary/20">
              {bundle.tests.map((test) => (
                <div key={test.name} className="pl-4">
                  <p className="text-sm font-medium text-foreground mb-1">{test.name}</p>
                  <ul className="space-y-1">
                    {test.skills.map((skill) => (
                      <li key={skill} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Check className="h-3 w-3 text-success flex-shrink-0" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      <Link to="/wizard">
        <Button variant="outline" className="w-full">
          Select Bundle
          <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </Link>
    </div>
  );
};

const Pricing = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Simple, transparent pricing
            </h1>
          </div>

          {/* Assessments Section */}
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-2">Assessments</h2>
            <p className="text-muted-foreground">
              Choose from behavioural, skills, and aptitude tests.
            </p>
          </div>

          {/* Pricing Tiers */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier) => (
              <div 
                key={tier.name} 
                className="bg-card rounded-2xl border border-border p-8 shadow-card hover:shadow-card-hover transition-all"
              >
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {tier.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {tier.description}
                </p>
                <div className="mb-6">
                  <span className="text-sm text-muted-foreground">From </span>
                  <span className="text-4xl font-bold text-foreground">${tier.from}</span>
                  <span className="text-muted-foreground"> / candidate</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-success flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/assessments">
                  <Button variant="outline" className="w-full">
                    View Tests
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Bundles */}
      <section id="bundles" className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Package className="h-4 w-4" />
                12 role-specific bundles
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Assessment Bundles
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Pre-built test combinations designed for specific roles. Each bundle includes 3 assessments covering skills, aptitude, and behavioural profiling.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bundles.map((bundle) => (
                <BundlePricingCard key={bundle.id} bundle={bundle} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Services
              </h2>
              <p className="text-muted-foreground">
                Complement your assessments with verification and screening services.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
              {addOnServices.map((addon) => (
                <div 
                  key={addon.id}
                  className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.4rem)] bg-card rounded-2xl border border-border p-8 shadow-card hover:shadow-card-hover transition-all"
                >
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <addon.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground mb-2">{addon.name}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{addon.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground">${addon.price}</span>
                    <span className="text-muted-foreground"> / candidate</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {addon.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-success flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/wizard">
                    <Button variant="outline" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Credit Packs */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Credit Packs
              </h2>
              <p className="text-muted-foreground">
                Buy credits at $5 each (or less with volume discounts) — credits never expire.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {creditTiers.map((tier) => (
                <div 
                  key={tier.quantity}
                  className="relative bg-card rounded-xl p-6 border-2 border-border text-center hover:border-primary/40 hover:shadow-card-hover transition-all pt-8"
                >
                  {tier.discount > 0 && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center whitespace-nowrap rounded-full bg-success px-2 py-0.5 text-xs font-bold text-success-foreground shadow-sm">
                      {tier.discount}% OFF
                    </span>
                  )}
                  <div className="text-3xl font-bold text-foreground mb-1">{tier.quantity}</div>
                  <div className="text-sm text-muted-foreground mb-4">credits</div>
                  <div className="text-xl font-bold text-foreground mb-1">
                    ${Math.round(tier.quantity * tier.pricePerCredit).toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ${tier.pricePerCredit.toFixed(2)}/credit
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link to="/wizard">
                <Button variant="hero" size="lg">
                  Purchase Credits
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How pricing works */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              How pricing works
            </h2>
            
            <div className="bg-card rounded-2xl border border-border p-8 shadow-card">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Select assessments</h4>
                    <p className="text-sm text-muted-foreground">
                      Choose one or more assessments for your role. Each has its own per-candidate price.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Add candidates</h4>
                    <p className="text-sm text-muted-foreground">
                      Total cost = (Assessment price × Number of assessments) × Number of candidates
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Pay once</h4>
                    <p className="text-sm text-muted-foreground">
                      One-time payment. No recurring charges. Access results forever.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-success text-success-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Save with credits</h4>
                    <p className="text-sm text-muted-foreground">
                      Pre-purchase credits to unlock volume discounts of up to 30%. Use credits to pay for any assessment or service. Credits never expire.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-muted rounded-lg space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Example:</strong> 3 assessments ($32 avg) × 4 candidates = $384
                </p>
                <p className="text-sm text-success font-medium">
                  <strong>With credits:</strong> That's ~77 credits. Buy a 100-credit pack for $425 ($4.25/credit) and save on this role and future hires.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to start assessing?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              No account required. See your exact price before you pay.
            </p>
            <Link to="/wizard">
              <Button variant="hero" size="lg">
                Start an Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
