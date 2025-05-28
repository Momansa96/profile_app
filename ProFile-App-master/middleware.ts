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

  // 🔓 Autoriser les routes publiques
  if (isPublicRoute(req)) return;

  // 🔐 Si non connecté, rediriger vers la page de connexion
  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // 🎯 Redirection dynamique si l'utilisateur arrive sur /dashboard
  if (url.pathname === '/dashboard') {
    const user = await users.getUser(userId);
    const role = user.publicMetadata?.role || 'CANDIDAT';

    const destination =
      role === 'RECRUTEUR' ? '/dashboard/candidat/Opportunity' : '/dashboard/recruter';

    return NextResponse.redirect(new URL(destination, req.url));
  }

  // ✅ Pour toutes les autres routes protégées, continuer
});



export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    
  ],
}