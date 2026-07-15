/**
 * NextAuth API Route Handler
 * 
 * Handles all auth-related requests:
 * - /api/auth/signin
 * - /api/auth/signout
 * - /api/auth/callback/google
 * - /api/auth/session
 */

import { handlers } from '@/lib/auth';

export const { GET, POST } = handlers;
