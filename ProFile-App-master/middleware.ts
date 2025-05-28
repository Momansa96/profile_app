import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// 1️⃣ Définir les routes accessibles sans être connecté
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/',
  '/mention_legales',
  '/privacy_policy',
  '/dashboard/candidat/Mon-Portfolio(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  const { userId, user } = auth() 
  const url = req.nextUrl         

  if (isPublicRoute(req)) return

  await auth().protect()

  if (url.pathname === '/dashboard') {
    const role = user?.publicMetadata?.role || 'CANDIDAT'

    if (role === 'RECRUTEUR') {
      // Redirection vers l’espace recruteur
      return NextResponse.redirect(new URL('/dashboard/recruter', req.url))
    } else {
      // Redirection vers l’espace candidat
      return NextResponse.redirect(new URL('/dashboard/candidat/Opportunity', req.url))
    }
  }

})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    
  ],
}