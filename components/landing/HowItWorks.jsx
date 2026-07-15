'use client';

/**
 * HowItWorks Component
 * 
 * Step-by-step guide with scroll-triggered animated purple timeline.
 * The line grows and each step fades in as the user scrolls to this section.
 */

import { useEffect, useRef, useState } from 'react';
import { steps } from "@/Data/landing";

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasEntered) {
          setHasEntered(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasEntered]);

  // Animate progress from 0 to 100 once the section enters viewport
  useEffect(() => {
    if (!hasEntered) return;

    let frame;
    let start;
    const duration = 2000; // 2 seconds for full animation

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [hasEntered]);

  // Each step activates at a certain % of the timeline
  const getStepState = (index) => {
    const threshold = (index / (steps.length - 1)) * 100;
    // Step activates slightly before the line reaches it
    const activateAt = index === 0 ? 0 : threshold - 5;
    return progress >= activateAt ? 'active' : 'inactive';
  };

  return (
    <section id="how-it-works" className="py-24" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How it{' '}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              works
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From scan to print in under 2 minutes. It's that simple.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Background Line (static gray track) */}
          <div className="hidden lg:block absolute top-1/2 left-[16.67%] right-[16.67%] h-1 bg-muted rounded-full -translate-y-1/2" />

          {/* Animated Purple Line (fills on scroll) */}
          <div
            className="hidden lg:block absolute top-1/2 left-[10%] h-1 rounded-full -translate-y-1/2 bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-600"
            style={{
              width: `${(progress / 100) * 80}%`,
              transition: 'none',
              boxShadow: progress > 0 ? '0 0 12px rgba(139, 92, 246, 0.5), 0 0 24px rgba(139, 92, 246, 0.2)' : 'none',
            }}
          />

          {/* Mobile: Vertical animated line */}
          <div className="lg:hidden absolute left-[1 rem] top-0 bottom-0 w-1 bg-muted rounded-full" />
          <div
            className="lg:hidden absolute left-[1 rem] top-0 w-1 rounded-full bg-gradient-to-b from-violet-600 via-purple-500 to-indigo-600"
            style={{
              height: `${progress}%`,
              transition: 'none',
              boxShadow: progress > 0 ? '0 0 12px rgba(139, 92, 246, 0.5)' : 'none',
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => {
              const state = getStepState(index);
              return (
                <div
                  key={index}
                  className="relative flex flex-col items-center text-center lg:items-center"
                >
                  {/* Step Number with Icon */}
                  <div
                    className={`relative mb-6 transition-all duration-700 ease-out ${state === 'active'
                        ? 'opacity-100 translate-y-0 scale-100'
                        : 'opacity-0 translate-y-6 scale-90'
                      }`}
                  >
                    <div
                      className={`w-24 h-24 rounded-2xl mb-6 flex items-center justify-center text-white shadow-lg transition-all duration-500 ${state === 'active'
                          ? 'bg-gradient-to-br from-violet-500 to-indigo-500 shadow-violet-500/25'
                          : 'bg-muted text-muted-foreground'
                        }`}
                    >
                      {step.icon}
                    </div>
                    <div
                      className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${state === 'active'
                          ? 'bg-background border-2 border-violet-500 text-violet-600 scale-100'
                          : 'bg-muted border-2 border-muted text-muted-foreground scale-75'
                        }`}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`transition-all duration-700 ease-out ${state === 'active'
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                      }`}
                    style={{ transitionDelay: state === 'active' ? '200ms' : '0ms' }}
                  >
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground max-w-xs">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Demo Preview */}
        <div className="mt-20 relative rounded-2xl overflow-hidden border border-border shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-indigo-500/10" />
          <div className="relative bg-muted/50 p-8 lg:p-12">
            <div className="aspect-video rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-white/80 text-lg">Watch Demo Video</p>
                <p className="text-white/50 text-sm mt-1">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
