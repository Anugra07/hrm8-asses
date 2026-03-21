import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, Copy, Mail } from 'lucide-react';

const Success = () => {
  const navigate = useNavigate();

  // Mock order data
  const order = {
    id: 'ORD-' + Date.now().toString().slice(-8),
    candidates: [
      { name: 'John Doe', email: 'john.doe@email.com', status: 'Invited' },
      { name: 'Jane Smith', email: 'jane.smith@email.com', status: 'Invited' },
    ],
    assessments: ['Cognitive Ability Test', 'Workplace Personality Profile'],
    expectedCompletion: '24-48 hours',
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-xl w-full">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-success" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">
            Assessments Sent!
          </h1>
          <p className="text-muted-foreground">
            Your candidates have been sent their assessment invitations.
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="bg-card rounded-2xl border border-border shadow-card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Order ID</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-foreground">{order.id}</span>
              <button className="text-muted-foreground hover:text-foreground">
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Candidates</p>
              <div className="space-y-2">
                {order.candidates.map((candidate, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{candidate.name}</p>
                        <p className="text-xs text-muted-foreground">{candidate.email}</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-success/10 text-success rounded-full font-medium">
                      {candidate.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Assessments</p>
              <ul className="text-sm text-foreground space-y-1">
                {order.assessments.map((assessment, i) => (
                  <li key={i}>• {assessment}</li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Expected completion:</span>
                <span className="font-medium text-foreground">{order.expectedCompletion}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Account Ready Message */}
        <div className="bg-success/10 rounded-2xl border border-success/20 p-6 mb-6 text-center">
          <CheckCircle2 className="h-8 w-8 text-success mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Account Ready!
          </h3>
          <p className="text-sm text-muted-foreground">
            Your account has been set up. Access your dashboard to track progress and view results.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="hero" 
            className="flex-1"
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Link to="/" className="flex-1">
            <Button variant="outline" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
