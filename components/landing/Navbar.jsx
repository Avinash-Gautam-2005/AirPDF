/**
 * Navbar Component
 * 
 * Modern navigation bar with logo, links, and auth buttons.
 */

'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import useSmoothScroll from '@/hooks/useSmoothScroll';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const {data:session} = useSession();
  const scrollTo = useSmoothScroll();
  const router = useRouter();
  

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              AirPDF
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollTo('features')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollTo('how-it-works')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              How it Works
            </button>
            <button
              onClick={() => scrollTo('pricing')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {session? (<Button onClick={()=>router.push('/login')} className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                    login
                  </Button>):(<Button onClick={()=>router.push('/select')} className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                    Get Started
                  </Button>)}
                  
               
          </div>
        </div>
      </div>
    </nav>
  );
}
