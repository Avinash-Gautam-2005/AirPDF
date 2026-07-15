/**
 * Root Page
 * 
 * Main landing page for AirPDF.
 */

import { Navbar, Hero, Features, HowItWorks, CTA, Footer } from '@/components/landing';

export default function RootPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}
