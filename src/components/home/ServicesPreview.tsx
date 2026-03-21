import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { addOnServices } from '@/data/addons';

const ServicesPreview = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Beyond Assessments
          </h2>
          <p className="text-lg text-muted-foreground">
            A complete hiring toolkit to screen, assess, interview, and verify — all in one place.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-5 max-w-6xl mx-auto mb-10">
          {addOnServices.map((item) => (
            <Card key={item.id} className="border-border/50 w-full md:w-[calc(33.333%-0.85rem)]">
              <CardContent className="p-7">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-xl">{item.name}</h3>
                </div>
                <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                  {item.summary || item.description}
                </p>
                <ul className="space-y-1.5">
                  {item.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="text-sm text-muted-foreground/80 flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-primary/40 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/services">
            <Button variant="outline" className="group">
              View Services & Pricing
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
