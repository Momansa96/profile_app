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

  // 🔓 Routes publiques : pas de vérification
  if (isPublicRoute(req)) return;

  // 🚫 Pas connecté : redirection vers sign-in
  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // 🔍 Récupération du rôle depuis Clerk
  const user = await users.getUser(userId);
  const role = (user.publicMetadata?.role as string) || 'CANDIDAT';

  // 🎯 Redirection dynamique à la connexion (IMPORTANT : doit être AVANT les blocages)
  if (url.pathname === '/dashboard' || url.pathname === '/dashboard/') {
    const destination =
      role === 'RECRUTEUR'
        ? '/dashboard/recruter'
        : '/dashboard/candidat/Opportunity';

    console.log('➡️  Redirection vers:', destination);
    return NextResponse.redirect(new URL(destination, req.url));
  }

  // 🚫 Bloque les CANDIDATS qui accèdent aux routes RECRUTEUR
  if (
    role === 'CANDIDAT' &&
    url.pathname.startsWith('/dashboard/recruter')
  ) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  // 🚫 Bloque les RECRUTEURS qui accèdent aux routes CANDIDAT
  if (
    role === 'RECRUTEUR' &&
    url.pathname.startsWith('/dashboard/candidat')
  ) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  // ✅ Tout le reste passe
  console.log('✅ Accès autorisé');
});



export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    
  ],
}