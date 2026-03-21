import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import HowItWorksPreview from '@/components/home/HowItWorksPreview';
import TrustSection from '@/components/home/TrustSection';
import ServicesPreview from '@/components/home/ServicesPreview';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <HowItWorksPreview />
      <TrustSection />
      <ServicesPreview />
      <CTASection />
    </Layout>
  );
};

export default Index;
