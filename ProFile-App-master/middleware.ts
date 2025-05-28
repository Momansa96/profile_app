import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { users } from '@clerk/clerk-sdk-node';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/',
  '/mention_legales',
  '/privacy_policy',
  '/dashboard/candidat/Mon-Portfolio(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const url = req.nextUrl;

  const allowedRoutes = {
  CANDIDAT: [
    '/dashboard/candidat',
    '/dashboard/candidat/Opportunity',
  ],
  RECRUTEUR: [
    '/dashboard/recruter',
  ],
};


  if (isPublicRoute(req)) return;

  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  const user = await users.getUser(userId);
  const role = user.publicMetadata?.role || 'CANDIDAT';

  // 🎯 Redirection dynamique à la connexion
  if (url.pathname === '/dashboard') {
    const destination =
      role === 'RECRUTEUR'
        ? '/dashboard/recruter'
        : '/dashboard/candidat/Opportunity';

    return NextResponse.redirect(new URL(destination, req.url));
  }

  // Bloque les candidats qui accèdent à une route réservée aux recruteurs
if (
  role === 'CANDIDAT' &&
  url.pathname.startsWith('/dashboard/recruter')
) {
  return NextResponse.redirect(new URL('/unauthorized', req.url));
}

// Bloque les recruteurs qui accèdent à une route réservée aux candidats
if (
  role === 'RECRUTEUR' &&
  url.pathname.startsWith('/dashboard/candidat')
) {
  return NextResponse.redirect(new URL('/unauthorized', req.url));
}

  // ✅ Tout le reste passe
});



export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    
  ],
}