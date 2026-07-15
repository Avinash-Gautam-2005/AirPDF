'use client';

/**
 * Role Selection Page
 * 
 * Users choose between Customer or Shopkeeper before signing up.
 * Sets a cookie with the selected role and redirects to login.
 */

import { useRouter } from 'next/navigation';
import { User, Store, ArrowRight } from 'lucide-react';

export default function SelectRolePage() {
  const router = useRouter();

  const handleRoleSelect = (role) => {
    // Set cookie for 1 hour (enough time to complete OAuth)
    document.cookie = `pending_role=${role}; path=/; max-age=3600`;
    router.push('/login');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-background to-indigo-50 dark:from-violet-950/20 dark:via-background dark:to-indigo-950/20" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-400/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
          </span>
          Join AirPDF today
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
          <span className="block text-foreground">How will you use</span>
          <span className="block mt-2">
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              AirPDF?
            </span>
          </span>
        </h1>

        {/* Subheading */}
        <p className="max-w-xl mx-auto text-lg text-muted-foreground mb-12">
          Choose your role to get started. You can always access different features based on your needs.
        </p>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Customer Card */}
          <button
            onClick={() => handleRoleSelect('CUSTOMER')}
            className="group relative p-8 rounded-2xl bg-background/80 backdrop-blur-sm border-2 border-border hover:border-violet-500 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 text-left"
          >
            {/* Icon */}
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
              <User className="w-8 h-8" />
            </div>

            {/* Content */}
            <h3 className="text-2xl font-bold mb-2 text-foreground">I'm a Customer</h3>
            <p className="text-muted-foreground mb-6">
              Upload documents, track orders, and pick up prints from nearby shops. Perfect for students and professionals.
            </p>

            {/* Features */}
            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                Scan QR & upload PDFs
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                Real-time order tracking
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                Secure file handling
              </li>
            </ul>

            {/* CTA */}
            <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-medium group-hover:gap-4 transition-all duration-300">
              Continue as Customer
              <ArrowRight className="w-5 h-5" />
            </div>

            {/* Hover Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </button>

          {/* Shopkeeper Card */}
          <button
            onClick={() => handleRoleSelect('SHOPKEEPER')}
            className="group relative p-8 rounded-2xl bg-background/80 backdrop-blur-sm border-2 border-border hover:border-indigo-500 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 text-left"
          >
            {/* Icon */}
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
              <Store className="w-8 h-8" />
            </div>

            {/* Content */}
            <h3 className="text-2xl font-bold mb-2 text-foreground">I'm a Shopkeeper</h3>
            <p className="text-muted-foreground mb-6">
              Receive print orders digitally, manage your queue, and grow your business. Ideal for print shop owners.
            </p>

            {/* Features */}
            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                Digital order management
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                QR code for your shop
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                Analytics & insights
              </li>
            </ul>

            {/* CTA */}
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium group-hover:gap-4 transition-all duration-300">
              Continue as Shopkeeper
              <ArrowRight className="w-5 h-5" />
            </div>

            {/* Hover Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </button>
        </div>

        {/* Back Link */}
        <p className="mt-12 text-sm text-muted-foreground">
          Already have an account?{' '}
          <button 
            onClick={() => router.push('/login')}
            className="text-violet-600 dark:text-violet-400 hover:underline font-medium"
          >
            Sign in here
          </button>
        </p>
      </div>
    </section>
  );
}
