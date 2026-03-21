import { Shield, Lock, Clock, Award } from 'lucide-react';

const trustItems = [
  {
    icon: Shield,
    title: 'Enterprise-Grade Security',
    description: 'All data encrypted in transit and at rest. SOC 2 compliant infrastructure.',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'GDPR and Australian Privacy Act compliant. Your data stays protected.',
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description: 'Most assessments completed within 24-48 hours. Real-time status updates.',
  },
  {
    icon: Award,
    title: 'Validated Assessments',
    description: 'Scientifically validated tests from industry-leading assessment partners.',
  },
];

const TrustSection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by hiring teams
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built with security, privacy, and reliability at the core.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
