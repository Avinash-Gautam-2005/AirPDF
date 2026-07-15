/**
 * Auth Provider Component
 * 
 * Wraps the app to provide session context to client components.
 */

'use client';

import { SessionProvider } from 'next-auth/react';

export default function AuthProvider({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
