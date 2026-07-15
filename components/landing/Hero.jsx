/**
 * Hero Component
 * 
 * Main hero section with gradient text and CTA buttons.
 * Modern SaaS-style design.
 */

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-background to-indigo-50 dark:from-violet-950/20 dark:via-background dark:to-indigo-950/20" />

      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-400/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Grid Pattern */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
          </span>
          Now available for college campuses
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6" style={{ fontFamily: 'var(--font-share-tech)' }}>
          <span className="block text-foreground">Print Documents</span>
          <span className="block mt-2">
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Without the Hassle
              </span>
              {/* Animated Underline */}
              <span
                className="absolute bottom-0 left-0 w-full h-1.5 rounded-full bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-600 origin-left"
                style={{
                  animation: 'underline-grow 0.8s ease-out 0.5s both',
                }}
              />
            </span>
          </span>
        </h1>

        {/* Subheading */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mb-10">
          Scan a QR code, upload your PDF, and pick it up. No phone number sharing,
          no waiting in line. The modern way to print at college stationary shops.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login">
            <Button
              size="lg"
              className="h-14 px-8 text-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/25"
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
          <Link href="#how-it-works">
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 text-lg border-2"
            >
              <svg
                className="mr-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              See How It Works
            </Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        {/* <div className="mt-16 flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground">Trusted by students at</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            <span className="text-lg font-semibold">IIT Delhi</span>
            <span className="text-lg font-semibold">BITS Pilani</span>
            <span className="text-lg font-semibold">NIT Trichy</span>
            <span className="text-lg font-semibold">VIT Vellore</span>
          </div>
        </div> */}
      </div>

      {/* Bottom Fade */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" /> */}
    </section>
  );
}
