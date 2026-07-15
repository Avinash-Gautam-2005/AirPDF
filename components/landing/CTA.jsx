/**
 * CTA Component
 * 
 * Call-to-action section with gradient background.
 */

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CTA() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600" />
          
          {/* Pattern Overlay */}
          {/* <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:24px_24px]" />
          </div> */}
          
          {/* Glow Effects */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative px-8 py-16 sm:px-16 sm:py-24 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to transform your
              <br />
              printing experience?
            </h2>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Join thousands of students who have already made the switch. 
              Start printing smarter today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login">
                <Button 
                  size="lg" 
                  className="h-14 px-8 text-lg bg-white text-violet-600 hover:bg-gray-100 shadow-lg"
                >
                  Get Started Free
                  <svg 
                    className="ml-2 w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
              <Link href="/login?role=shopkeeper">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-14 px-8 text-lg border-2 border-white/30 text-violet-600 hover:bg-white/10 hover:text-white"
                >
                  Register Your Shop
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold text-white">10K+</div>
                <div className="text-white/60 mt-1">Documents Printed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white">500+</div>
                <div className="text-white/60 mt-1">Happy Students</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white">50+</div>
                <div className="text-white/60 mt-1">Partner Shops</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white">4.9</div>
                <div className="text-white/60 mt-1">User Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
