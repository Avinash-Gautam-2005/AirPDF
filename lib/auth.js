/**
 * NextAuth.js Configuration
 *
 * Handles authentication with Google OAuth and Prisma adapter.
 * Uses JWT strategy for sessions.
 */

import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { cookies } from 'next/headers';
import prisma from './prisma';

export const { handlers, signIn, signOut, auth } = NextAuth( {
  adapter: PrismaAdapter( prisma ),

  providers: [
    Google( {
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    } ),
  ],

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    /**
     * Add user role to JWT token
     */
    async jwt ( { token, user, trigger, session } ) {
      if ( user ) {
        token.id = user.id;

        if ( trigger === 'signUp' ) {
          // New user — use the pending_role cookie
          const cookieStore = await cookies();
          const pendingRole = cookieStore.get( 'pending_role' )?.value;
          token.role = pendingRole || user.role;
          // Clean up the cookie now that JWT has the role
          if ( pendingRole ) cookieStore.delete( 'pending_role' );
        } else {
          // Existing user — always use DB role
          token.role = user.role;
        }
      }

      if ( trigger === 'update' && session?.role ) {
        token.role = session.role;
      }

      return token;
    },

    /**
     * Add role and id to session object
     */
    async session ( { session, token } ) {
      if ( token ) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  events: {
    async createUser ( { user } ) {
      const cookieStore = await cookies();
      const role = cookieStore.get( 'pending_role' )?.value;

      // Only update if cookie exists — otherwise Prisma would set role to undefined
      if ( !role ) return;

      await prisma.user.update( {
        where: { id: user.id },
        data: { role },
      } );

      // If the user signed up as a shopkeeper, create a Shop record
      if ( role === 'SHOPKEEPER' ) {
        try {
          await prisma.shop.create( {
            data: {
              id: user.id,
              name: user.name || 'My Shop',
            },
          } );
        } catch ( err ) {
          console.error( 'Failed to create shop for new shopkeeper:', err );
        }
      }

      // Don't delete cookie here — jwt callback still needs to read it
    },
  },
} );