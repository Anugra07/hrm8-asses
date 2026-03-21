import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, ClipboardCheck, UserCheck, ShieldCheck, Video, ChevronRight } from 'lucide-react';
import { addOnServices } from '@/data/addons';

const pipelineSteps = [
  { label: 'Screen', icon: ClipboardCheck },
  { label: 'Assess', icon: ClipboardCheck },
  { label: 'Interview', icon: Video },
  { label: 'Verify', icon: ShieldCheck },
  { label: 'Hire', icon: UserCheck },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">Services</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Your Complete Hiring Toolkit
            </h1>
            <p className="text-lg text-muted-foreground">
              Complement your candidate assessments with AI video interviews, automated reference checks, identity verification, and more — all from one platform.
            </p>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-16">
        <div className="container">
          <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            {addOnServices.map((service) => (
              <Card key={service.id} className="flex flex-col md:flex-row border-border/50">
                <CardHeader className="flex-1 md:min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <service.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 md:border-l md:border-border/50 md:py-6">
                  <ul className="space-y-1.5">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ChevronRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="md:flex-col md:items-end md:justify-center md:w-48 md:border-l md:border-border/50 gap-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-foreground">${service.price}</span>
                    <span className="text-sm text-muted-foreground">/candidate</span>
                  </div>
                  <Link to="/wizard" className="w-full md:w-auto">
                    <Button variant="default" className="w-full md:w-auto">Get Started</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              How They Work Together
            </h2>
            <p className="text-muted-foreground">
              A seamless hiring pipeline from first screen to final offer.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-2 max-w-3xl mx-auto">
            {pipelineSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2 md:gap-2">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{step.label}</span>
                </div>
                {i < pipelineSteps.length - 1 && (
                  <ArrowRight className="h-5 w-5 text-muted-foreground hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Streamline Your Hiring?
            </h2>
            <p className="text-muted-foreground mb-8">
              Get started with our complete suite of hiring tools today.
            </p>
            <Link to="/wizard">
              <Button size="lg">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
